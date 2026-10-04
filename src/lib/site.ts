/**
 * Konfigurasi tampilan situs — SEMUA nilai placeholder sampai pemilik bisnis
 * mengonfirmasi (TODO, lihat CONFIG.example.php dan TASK-024).
 * Satu sumber agar nomor/lokasi tidak terpecah di banyak komponen.
 */
export const SITE = {
  name: "Ryokourent App",
  tagline:
    "Rental motor mudah dan cepat untuk wisata, kuliah, dinas, dan acara keluarga di Malang Raya & Batu.",
  serviceArea: "Malang Raya & Batu",
  hours: "08.00–20.00 WIB",
  /**
   * Nomor WhatsApp resmi. Selama kosong, tautan wa.me TIDAK ditampilkan dan
   * pengguna memakai tombol salin pesan. Isi dengan format 628xxxxxxxxxx.
   * TODO: ganti dengan nomor asli Ryokourent App.
   */
  whatsappNumber: "",
  whatsappDisplay: "nomor resmi menyusul (TODO)",
  address: "Alamat pengambilan di Malang Raya — alamat persis menyusul (TODO)",
  mapUrl: "", // TODO: tautan Google Maps setelah alamat dikonfirmasi
} as const;

/** Susun tautan WhatsApp bila nomor sudah dipasang; null jika belum. */
export function waLink(text: string): string | null {
  if (!SITE.whatsappNumber) return null;
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
