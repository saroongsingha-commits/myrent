/** Format angka sebagai Rupiah tanpa desimal: 75000 → "Rp75.000". */
export function formatRupiah(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/** Format jam: "08:00" → "08.00" (gaya penulisan Indonesia). */
export function formatJam(value: string): string {
  return value.replace(":", ".");
}
