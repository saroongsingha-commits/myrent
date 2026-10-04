import { getAuthUserId } from "@convex-dev/auth/server";
import { ConvexError, v } from "convex/values";
import { MOTORS } from "../data/motors";
import {
  mutation,
  query,
  type MutationCtx,
  type QueryCtx,
} from "./_generated/server";

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

/** Pengguna mengirim ulasan; tampil publik hanya setelah disetujui admin. */
export const create = mutation({
  args: {
    motorId: v.optional(v.string()),
    rating: v.number(),
    body: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await requireUser(ctx);
    const user = await ctx.db.get(userId);

    const rating = Math.round(args.rating);
    if (rating < 1 || rating > 5) {
      throw new ConvexError("Rating harus antara 1 sampai 5.");
    }
    const body = args.body.trim();
    if (body.length < 10) {
      throw new ConvexError("Ulasan minimal 10 karakter.");
    }
    if (body.length > 800) {
      throw new ConvexError("Ulasan maksimal 800 karakter.");
    }
    if (args.motorId && !MOTORS.some((m) => m.id === args.motorId)) {
      throw new ConvexError("Unit tidak ditemukan.");
    }

    const authorName =
      user?.name || user?.email?.split("@")[0] || "Pelanggan Ryokourent";

    await ctx.db.insert("reviews", {
      userId,
      authorName,
      motorId: args.motorId,
      rating,
      body,
      status: "pending",
      createdAt: Date.now(),
    });

    return { status: "pending" as const };
  },
});

/** Ulasan terpublikasi — boleh dilihat tanpa login. */
export const listApproved = query({
  args: { motorId: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const items = await ctx.db
      .query("reviews")
      .withIndex("by_status", (q) => q.eq("status", "approved"))
      .order("desc")
      .take(60);
    return args.motorId
      ? items.filter((r) => r.motorId === args.motorId)
      : items;
  },
});

/** Ulasan milik pengguna yang sedang masuk. */
export const listMine = query({
  args: {},
  handler: async (ctx) => {
    const userId = await requireUser(ctx);
    return await ctx.db
      .query("reviews")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .take(50);
  },
});

/** Antrean moderasi — khusus admin. */
export const listPending = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    return await ctx.db
      .query("reviews")
      .withIndex("by_status", (q) => q.eq("status", "pending"))
      .order("desc")
      .take(50);
  },
});

/** Setujui atau sembunyikan ulasan — khusus admin. */
export const moderate = mutation({
  args: {
    id: v.id("reviews"),
    status: v.union(v.literal("approved"), v.literal("hidden")),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const review = await ctx.db.get(args.id);
    if (!review) throw new ConvexError("Ulasan tidak ditemukan.");
    await ctx.db.patch(args.id, { status: args.status });
  },
});
