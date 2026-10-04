import { getAuthUserId } from "@convex-dev/auth/server";
import { ConvexError } from "convex/values";
import {
  mutation,
  query,
  type MutationCtx,
  type QueryCtx,
} from "./_generated/server";

async function hasAdminRecord(ctx: MutationCtx | QueryCtx) {
  const admins = await ctx.db
    .query("users")
    .filter((q) => q.eq(q.field("role"), "admin"))
    .take(1);
  return admins.length > 0;
}

/**
 * Apakah sudah ada admin? Dipakai halaman /admin untuk menampilkan tombol
 * klaim akses hanya saat belum ada admin sama sekali.
 */
export const hasAdmin = query({
  args: {},
  handler: async (ctx) => {
    return await hasAdminRecord(ctx);
  },
});

/**
 * Klaim akses admin — hanya berhasil bila BELUM ada admin sama sekali
 * (bootstrap pemilik bisnis). TODO produksi: ganti dengan penetapan admin
 * lewat invite/role management.
 */
export const claimAdmin = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new ConvexError("Silakan masuk terlebih dahulu.");
    }
    if (await hasAdminRecord(ctx)) {
      throw new ConvexError(
        "Admin sudah ditetapkan. Minta pemilik akun admin menambahkan Anda.",
      );
    }
    await ctx.db.patch(userId, { role: "admin" });
    return true;
  },
});
