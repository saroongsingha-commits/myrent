import { getAuthUserId } from "@convex-dev/auth/server";
import { ConvexError, v } from "convex/values";
import { MOTORS } from "../data/motors";
import { computeTotal, rentalDays, todayJakarta } from "../lib/pricing";
import { bookingStatusValidator, type BookingStatus } from "./schema";
import {
  mutation,
  query,
  type MutationCtx,
  type QueryCtx,
} from "./_generated/server";

/** Transisi status yang diizinkan (DATA_MODEL.md §4). */
const TRANSITIONS: Record<BookingStatus, BookingStatus[]> = {
  pending: ["confirmed", "cancelled", "rejected"],
  confirmed: ["active", "cancelled"],
  active: ["completed"],
  completed: [],
  cancelled: [],
  rejected: [],
};

async function requireUser(ctx: MutationCtx | QueryCtx) {
  const userId = await getAuthUserId(ctx);
  if (userId === null) {
    throw new ConvexError("Silakan masuk terlebih dahulu untuk melanjutkan.");
  }
  return userId;
}

async function requireAdmin(ctx: MutationCtx | QueryCtx) {
  const userId = await requireUser(ctx);
  const user = await ctx.db.get(userId);
  if (!user || user.role !== "admin") {
    throw new ConvexError("Akses ditolak: hanya admin yang boleh melakukan ini.");
  }
  return userId;
}

/** Booking baru dari halaman detail motor. Validasi diulang di server. */
export const create = mutation({
  args: {
    motorId: v.string(),
    customerName: v.string(),
    phone: v.string(),
    email: v.optional(v.string()),
    startDate: v.string(),
    endDate: v.string(),
    startTime: v.string(),
    endTime: v.string(),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await requireUser(ctx);

    const motor = MOTORS.find((m) => m.id === args.motorId);
    if (!motor) throw new ConvexError("Unit tidak ditemukan.");
    if (motor.status === "rented") {
      throw new ConvexError(
        "Unit ini sedang disewa dan belum tersedia. Silakan pilih unit atau jadwal lain.",
      );
    }

    const customerName = args.customerName.trim();
    if (customerName.length < 2 || customerName.length > 100) {
      throw new ConvexError("Nama pelanggan harus 2–100 karakter.");
    }

    const phone = args.phone.replace(/[\s()-]/g, "");
    if (!/^(\+?62|0)8\d{7,11}$/.test(phone)) {
      throw new ConvexError("Nomor WhatsApp tidak valid. Gunakan format 08xx atau 628xx.");
    }

    if (args.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(args.email)) {
      throw new ConvexError("Format email tidak valid.");
    }

    const ISO = /^\d{4}-\d{2}-\d{2}$/;
    if (!ISO.test(args.startDate) || !ISO.test(args.endDate)) {
      throw new ConvexError("Format tanggal tidak valid.");
    }
    if (args.endDate < args.startDate) {
      throw new ConvexError("Tanggal kembali tidak boleh sebelum tanggal ambil.");
    }
    const today = todayJakarta();
    if (args.startDate < today) {
      throw new ConvexError("Tanggal ambil sudah lewat.");
    }
    const durationDays = rentalDays(args.startDate, args.endDate);
    if (durationDays > 30) {
      throw new ConvexError("Durasi maksimal 30 hari.");
    }

    const TIME = /^([01]\d|2[0-3]):[0-5]\d$/;
    if (!TIME.test(args.startTime) || !TIME.test(args.endTime)) {
      throw new ConvexError("Format jam tidak valid.");
    }
    if (args.startTime < "08:00" || args.endTime > "20:00") {
      throw new ConvexError("Jam operasional 08.00–20.00 WIB.");
    }
    if (
      args.startDate === args.endDate &&
      args.endTime <= args.startTime
    ) {
      throw new ConvexError("Jam kembali harus setelah jam ambil.");
    }

    const notes = args.notes?.trim();
    if (notes && notes.length > 500) {
      throw new ConvexError("Catatan maksimal 500 karakter.");
    }

    // Cek ketersediaan: tolak jika ada booking aktif yang rentangnya beririsan.
    const occupied = await ctx.db
      .query("bookings")
      .withIndex("by_motor", (q) => q.eq("motorId", args.motorId))
      .filter((q) =>
        q.or(
          q.eq(q.field("status"), "pending"),
          q.eq(q.field("status"), "confirmed"),
          q.eq(q.field("status"), "active"),
        ),
      )
      .take(200);
    const clash = occupied.find(
      (b) => b.startDate <= args.endDate && args.startDate <= b.endDate,
    );
    if (clash) {
      throw new ConvexError(
        `Unit sudah dipesan pada rentang tanggal itu (${clash.startDate} s/d ${clash.endDate}). Silakan pilih tanggal lain.`,
      );
    }

    const total = computeTotal(
      durationDays,
      motor.priceDay,
      motor.priceWeek,
      motor.priceMonth,
    );
    const code = `RKL-${args.startDate.replace(/-/g, "")}-${Math.random()
      .toString(36)
      .slice(2, 6)
      .toUpperCase()}`;

    const id = await ctx.db.insert("bookings", {
      code,
      motorId: motor.id,
      motorName: motor.name,
      userId,
      customerName,
      phone,
      email: args.email?.trim() || undefined,
      startDate: args.startDate,
      endDate: args.endDate,
      startTime: args.startTime,
      endTime: args.endTime,
      durationDays,
      total,
      notes: notes || undefined,
      status: "pending",
      createdAt: Date.now(),
    });

    return { id, code };
  },
});

/** Booking milik pengguna yang sedang masuk. */
export const listMine = query({
  args: {},
  handler: async (ctx) => {
    const userId = await requireUser(ctx);
    return await ctx.db
      .query("bookings")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .take(50);
  },
});

/** Pembatalan oleh pemilik booking (hanya sebelum dimulai). */
export const cancelMine = mutation({
  args: { id: v.id("bookings") },
  handler: async (ctx, args) => {
    const userId = await requireUser(ctx);
    const booking = await ctx.db.get(args.id);
    if (!booking || booking.userId !== userId) {
      throw new ConvexError("Booking tidak ditemukan.");
    }
    if (booking.status !== "pending" && booking.status !== "confirmed") {
      throw new ConvexError("Booking ini sudah tidak bisa dibatalkan.");
    }
    await ctx.db.patch(args.id, { status: "cancelled" });
  },
});

/** Seluruh booking — khusus admin (area admin). */
export const listAll = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    return await ctx.db.query("bookings").order("desc").take(200);
  },
});

/** Ubah status booking — khusus admin, transisi divalidasi. */
export const updateStatus = mutation({
  args: { id: v.id("bookings"), status: bookingStatusValidator },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const booking = await ctx.db.get(args.id);
    if (!booking) throw new ConvexError("Booking tidak ditemukan.");
    const allowed = TRANSITIONS[booking.status];
    if (!allowed.includes(args.status)) {
      throw new ConvexError(
        `Transisi ${booking.status} → ${args.status} tidak diizinkan.`,
      );
    }
    await ctx.db.patch(args.id, { status: args.status });
  },
});
