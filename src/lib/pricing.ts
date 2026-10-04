/**
 * Aturan durasi & harga (TASK-013/TASK-014, keputusan D-014).
 * Fungsi murni — dipakai bersama oleh frontend dan backend Convex.
 */

const DAY_MS = 86_400_000;
/** Zona waktu operasional (Asia/Jakarta, UTC+7) — lihat CONFIG.example.php. */
const TZ_OFFSET_MS = 7 * 3_600_000;

/** "YYYY-MM-DD" → Date lokal (tanpa kejutan timezone UTC). */
export function parseDateOnly(iso: string): Date {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, (month ?? 1) - 1, day ?? 1);
}

/**
 * Durasi = jumlah hari kalender **termasuk** tanggal ambil dan tanggal
 * kembali, minimal 1 hari. Contoh: hari yang sama = 1; 4 Okt → 5 Okt = 2;
 * 31 Des → 2 Jan = 3. Aturan ini mengikuti rencana uji TC-P01..TC-P03 dan
 * terdokumentasi di DECISIONS.md D-014.
 */
export function rentalDays(startDate: string, endDate: string): number {
  const diff = Math.round(
    (parseDateOnly(endDate).getTime() - parseDateOnly(startDate).getTime()) /
      DAY_MS,
  );
  return Math.max(1, diff + 1);
}

/**
 * Total harga = opsi **termurah** di antara: (a) semua hari tarif harian,
 * (b) paket mingguan + sisa hari harian, (c) paket bulanan dibulatkan ke atas.
 * Dihitung identik di klien dan server dari fungsi yang sama.
 * Pilihan termurah menjamin durasi lebih panjang tidak pernah lebih mahal
 * dari durasi lebih pendek (mis. 29 hari harus ≤ 30 hari).
 * Aturan lengkap: DECISIONS.md D-014.
 */
export function computeTotal(
  days: number,
  priceDay: number,
  priceWeek: number,
  priceMonth: number,
): number {
  if (days <= 0) return 0;
  const daily = days * priceDay;
  const weeks = Math.floor(days / 7);
  const weekly = weeks * priceWeek + (days - weeks * 7) * priceDay;
  const monthly = Math.ceil(days / 30) * priceMonth;
  return Math.min(daily, weekly, monthly);
}

/** Hari ini menurut zona waktu operasional, format ISO. */
export function todayJakarta(): string {
  return new Date(Date.now() + TZ_OFFSET_MS).toISOString().slice(0, 10);
}

/** Batas akhir pemesanan: 180 hari ke depan. */
export function maxBookingDate(): string {
  return new Date(Date.now() + TZ_OFFSET_MS + 180 * DAY_MS)
    .toISOString()
    .slice(0, 10);
}
