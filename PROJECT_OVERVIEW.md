# PROJECT_OVERVIEW — Ryokourent

Status dokumen: FASE 0 (Analisis dan Perencanaan)
Terakhir diperbarui: 2026-10-04

## 1. Tujuan Proyek

Ryokourent adalah website rental motor yang mobile-first, dengan alur sewa yang
aman (tanpa double booking) dan komunikasi pelanggan lewat WhatsApp.

Tujuan jangka panjang (setelah v1):

- Katalog motor dan detail motor yang jelas untuk calon penyewa.
- Form booking dengan perhitungan durasi dan harga otomatis.
- Validasi ketersediaan unit dan pencegahan double booking.
- Generator pesan WhatsApp untuk konfirmasi booking.
- Dashboard admin/operator dengan perubahan status booking.
- Pengaturan harga dan nomor WhatsApp tanpa menyentuh kode.

## 2. Target Pengguna

| Pengguna | Kebutuhan utama | Status v1 |
| --- | --- | --- |
| Calon penyewa (publik) | Cari & bandingkan unit, jadwalkan sewa, pantau booking, tulis ulasan | Aktif |
| Admin / operator | Kelola semua: ubah status booking, moderasi ulasan | Aktif (`/admin`) |

Jawaban scope v1: **kedua pengguna** — pelanggan lewat landing, katalog, dan
dashboard; tim bisnis lewat area admin. Nama resmi produk: **Ryokourent App**.

## 3. Ruang Lingkup MVP (Versi 1 + perluasan v1.1)

Satu hal yang wajib jalan: **landing page + katalog motor**, kini diperluas
sesuai arahan 2026-10-04 menjadi pengalaman utuh bagi pelanggan bisnis.

### 3.1 Termasuk v1 / v1.1

- Landing page mobile-first, theme Terminal terang, nada premium-serius.
- Katalog motor dengan pencarian + filter kategori; status tanpa angka stok.
- Halaman detail per unit: spesifikasi, tarif, status, dan ulasan.
- Booking/jadwal online: pilih tanggal & jam, durasi dan harga dihitung
  otomatis, rentang beririsan ditolak di server, kode booking diterbitkan.
- Autentikasi (email OTP / tamu) dan dashboard pengguna: booking saya,
  ulasan saya, pembatalan booking.
- Area admin (`/admin`): ubah status booking, moderasi ulasan, bootstrap
  admin pertama.
- Ulasan pelanggan (posting konten) + social proof di landing.
- FAQ dan informasi lokasi/area layanan Malang Raya & Batu.
- Penamaan “Ryokourent App” di seluruh halaman (sumber: `src/lib/site.ts`).
- Struktur repo + dokumen FASE 0.

### 3.2 Masih ditunda

| Fitur | Task | Catatan |
| --- | --- | --- |
| Nomor WhatsApp asli + tautan wa.me otomatis | TASK-018 | ringkasan bisa disalin; tautan aktif setelah nomor diisi |
| Pengaturan harga & nomor WA lewat UI admin | TASK-024 | sementara di `src/lib/site.ts` |
| Role operator (di luar admin) | TASK-020, TASK-021 | admin dulu |
| Foto unit & galeri | TASK-008 (sebagian) | TODO foto asli milik sendiri |
| Pindah katalog dari data statis ke backend/CMS | D-002 | operasi tulis belum ada |
| Pembayaran online | — | Ditunda tanpa batas (lihat aturan proyek) |

## 4. Asumsi Bisnis (sementara, ditandai TODO)

Semua nilai di bawah adalah placeholder sampai pemilik bisnis mengonfirmasi.

| Asumsi | Nilai sementara | Catatan |
| --- | --- | --- |
| Nomor WhatsApp | `6281234567890` | TODO: nomor asli, format kode negara tanpa `+` |
| Mata uang | IDR | TODO: konfirmasi |
| Zona waktu | Asia/Jakarta | TODO: konfirmasi |
| Harga harian | Rp75.000 | TODO: daftar harga resmi per unit |
| Harga mingguan | Rp475.000 | TODO |
| Harga bulanan | Rp1.750.000 | TODO |
| Jam operasional | 08.00–20.00 WIB | TODO |
| Lokasi | "Toko Ryokourent — Alamat Contoh" | TODO: alamat + tautan Google Maps |
| Minimum sewa | 1 hari | TODO |
| Maksimum sewa | 30 hari | TODO |
| Deposit | Rp100.000 | TODO: perlu atau tidak |
| Jumlah unit fisik | Tidak dipublikasikan | Aturan proyek #16 — status saja, tanpa angka stok |
| Data identitas pelanggan | Tidak disimpan di tahap awal | Aturan proyek #15 |
| Foto motor | Placeholder publik dulu | TODO: foto asli milik sendiri |

## 5. Fase Proyek

| Fase | Isi | Status |
| --- | --- | --- |
| FASE 0 | Analisis dan perencanaan (dokumen di repo ini) | Selesai |
| FASE 1 | Repo, kerangka, coding standards, branch strategy | Menunggu persetujuan |
| FASE 2 | Implementasi fitur inti (TASK-003 s/d TASK-030) | Menunggu FASE 1 |
| FASE 3 | Integrasi, testing, hardening | Menunggu FASE 2 |
| FASE 4 | Dokumentasi dan deployment | Menunggu FASE 3 |

Rincian task ada di `TASKS.md`. Alur kerja AI ada di `AI_WORKFLOW.md`.
Keputusan arsitektur ada di `DECISIONS.md`. Skenario uji ada di `TESTING.md`.
