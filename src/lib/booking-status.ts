import type { BookingStatus } from "@/convex/schema";

export const BOOKING_STATUS_META: Record<
  BookingStatus,
  { label: string; className: string; hint: string }
> = {
  pending: {
    label: "MENUNGGU KONFIRMASI",
    className: "text-warn",
    hint: "Booking diterima, menunggu tinjauan admin.",
  },
  confirmed: {
    label: "DIKONFIRMASI",
    className: "text-ok",
    hint: "Disetujui — unit disiapkan sesuai jadwal.",
  },
  active: {
    label: "BERJALAN",
    className: "text-ok",
    hint: "Unit sedang disewa.",
  },
  completed: {
    label: "SELESAI",
    className: "text-idle",
    hint: "Sewa selesai dan unit telah kembali.",
  },
  cancelled: {
    label: "DIBATALKAN",
    className: "text-idle",
    hint: "Dibatalkan oleh pelanggan atau admin.",
  },
  rejected: {
    label: "DITOLAK",
    className: "text-destructive",
    hint: "Tidak dapat dipenuhi (jadwal bentrok atau data bermasalah).",
  },
};

/**
 * Transisi yang diizinkan di UI. Server tetap otoritatif
 * (src/convex/bookings.ts) — daftar ini hanya membatasi pilihan yang ditawarkan.
 */
export const NEXT_STATUS: Record<BookingStatus, BookingStatus[]> = {
  pending: ["confirmed", "cancelled", "rejected"],
  confirmed: ["active", "cancelled"],
  active: ["completed"],
  completed: [],
  cancelled: [],
  rejected: [],
};

export const REVIEW_STATUS_META: Record<
  "pending" | "approved" | "hidden",
  { label: string; className: string }
> = {
  pending: { label: "MENUNGGU TINJAUAN", className: "text-warn" },
  approved: { label: "DIPUBLIKASIKAN", className: "text-ok" },
  hidden: { label: "DISIMPAN", className: "text-idle" },
};
