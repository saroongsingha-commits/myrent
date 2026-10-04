import { ConvexError } from "convex/values";

/** Pesan ramah pengguna dari error Convex; fallback aman untuk error tak dikenal. */
export function errorMessage(error: unknown): string {
  if (error instanceof ConvexError) {
    if (typeof error.data === "string") return error.data;
    return "Data yang dikirim tidak valid. Periksa isian Anda.";
  }
  if (error instanceof Error && error.message && !error.message.includes("https://convex.dev")) {
    return error.message;
  }
  return "Terjadi kesalahan. Silakan coba lagi.";
}
