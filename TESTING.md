# TESTING — Ryokourent

Status dokumen: FASE 0 (rencana skenario; hasil diisi saat pengujian dijalankan).

Kolom: **ID | Skenario | Input | Hasil yang diharapkan | Hasil aktual | Status | Catatan**

Status: `MENUNGGU` (belum dijalankan) · `LULUS` · `GAGAL` · `N/A-WordPress` (hanya untuk skenario WordPress) · `DITUNDA` (fitur belum dibangun).

---

## 1. Skenario v1 (landing + katalog) — wajib lulus sebelum v1 disebut selesai

| ID | Skenario | Input | Hasil yang diharapkan | Hasil aktual | Status | Catatan |
| --- | --- | --- | --- | --- | --- | --- |
| TC-001 | Typecheck frontend | `bun tsc -b --noEmit` | Exit 0, tanpa error tipe | exit 0, tanpa output error | LULUS | Dijalankan 2026-10-04 |
| TC-002 | Landing render | Buka `/` | Hero, katalog, FAQ, lokasi, footer tampil; tanpa error console | — | MENUNGGU | Review manual |
| TC-003 | Filter katalog | Klik tiap kategori + "Semua" | Daftar tersaring sesuai kategori; "Semua" menampilkan seluruh unit | — | MENUNGGU | Review manual |
| TC-004 | Responsif | Lebar 360 / 768 / 1280 px | Tanpa overflow horizontal; grid menyesuaikan (1/2/3 kolom) | — | MENUNGGU | DevTools responsive |
| TC-005 | Tanpa angka unit | Periksa kartu katalog | Hanya status teks (`TERSEDIA`/`TERBATAS`/`DISIWA`), tidak ada angka stok | Pencarian kode: `unit_count`/`unitCount`/"stok" tidak ada di `src/` (hanya komentar aturan) | LULUS | Aturan #16; verifikasi visual di preview |
| TC-006 | CTA masuk | Klik "Masuk" (belum login) | Menuju `/auth`; setelah OTP sukses → `/dashboard` | — | MENUNGGU | Alur auth |
| TC-007 | Route terproteksi | Buka `/dashboard` tanpa login | Diblokir dengan penjelasan + tautan `/auth?returnTo=%2Fdashboard`; setelah login kembali ke `/dashboard` | — | MENUNGGU | `RequireAuth` |
| TC-008 | 404 | Buka `/halaman-ada-tidak` | Halaman 404 tampil | — | MENUNGGU | — |
| TC-009 | Tanpa kredensial di repo | `rg -i "(api_key\|password\|secret\|token) *[:=]"` | Tidak ada kecocokan kredensial; hanya placeholder | Tidak ada kecocokan; nomor WA placeholder hanya di dokumen/config contoh | LULUS | Aturan #14; jalankan ulang sebelum merge |
| TC-010 | Theme terang konsisten | Cek `/`, `/auth`, `/dashboard` | Semua memakai permukaan off-white + monospace; tidak ada palet gelap; kontras teks lolos | — | MENUNGGU | Arahan desain |
| TC-011 | Animasi | Interaksi hover/scroll di landing | Framer Motion jalan halus, tanpa layout shift mengganggu | — | MENUNGGU | — |
| TC-012 | Aksesibilitas dasar | Keyboard tab + screen reader ringan | Fokus terlihat, urutan logis, CTA berlabel jelas | — | MENUNGGU | — |
| TC-013 | Halaman detail unit | Buka `/motor/honda-vario-160` lalu `/motor/tidak-ada` | Slug valid tampil (spec, tarif, form jadwal, ulasan); slug asing → 404 | — | MENUNGGU | TASK-033 |
| TC-014 | Pencarian katalog | Ketik `vario`, `listrik`, `helm`, `zzz` | Hasil tersaring benar; `zzz` → pesan "tidak ada yang cocok" | — | MENUNGGU | TASK-034 |
| TC-015 | Booking sukses | Form valid (jadwal bebas) saat masuk akun | Booking tersimpan `pending`, kode `RKL-…` tampil, muncul di dashboard | — | MENUNGGU | TASK-035 |
| TC-016 | Tolak rentang beririsan | Booking unit sama dengan tanggal menimpa booking pending/confirmed/active | Ditolak server dengan pesan tanggal bentrok; booking kedua tidak tersimpan | — | MENUNGGU | **risiko tertinggi** (TASK-017) |
| TC-017 | Booking butuh akun | Buka form tanpa login | Gerbang masuk muncul dengan `returnTo` ke unit; setelah masuk, form tampil | — | MENUNGGU | D-013 |
| TC-018 | Dashboard pengguna | Login → `/dashboard` | Dua tab; booking & ulasan tampil; batalkan mengubah status jadi DIBATALKAN | — | MENUNGGU | TASK-036 |
| TC-019 | Gerbang admin | Buka `/admin` tanpa login, sebagai non-admin, dan saat belum ada admin | Tanpa login → RequireAuth; non-admin ditolak server; panel klaim hanya bila belum ada admin | — | MENUNGGU | TASK-037 |
| TC-020 | Alur ulasan | Kirim ulasan 1–5 bintang; setujui dari admin | Awal MENUNGGU TINJAUAN; setelah disetujui tampil di landing & halaman unit | — | MENUNGGU | TASK-038 |
| TC-021 | Transisi status admin | `pending → confirmed` lalu `completed → active` | Pertama berhasil; kedua ditolak server | — | MENUNGGU | TASK-037 |
| TC-022 | Penamaan & copy | Periksa seluruh halaman | "Ryokourent App" konsisten; tagline Malang Raya & Batu; tanpa copy placeholder lama | — | MENUNGGU | TASK-039 |
| TC-023 | Smoke backend terdeploy | `bun convex run access:hasAdmin` · `reviews:listApproved` · `bookings:listAll` (tanpa sesi) | Dua query publik sukses; listAll ditolak server dengan pesan ConvexError | `false` · `[]` · ditolak: "Silakan masuk terlebih dahulu…" | LULUS | Dijalankan 2026-10-04 via CLI; gerbang auth terbukti |
| TC-024 | Asersi fungsi durasi & harga | Skrip `bun -e` atas `rentalDays`/`computeTotal`: kasus TC-P01..P08, paket 7/30 hari berlaku utuh untuk semua unit, total monoton 1–90 hari, 29 hari ≤ 30 hari | Semua asersi lulus (exit 0) | `ALL_PRICING_ASSERTIONS_PASS` | LULUS | Dijalankan 2026-10-04; level fungsi — alur penuh via form = TC-P01..P08 |

## 2. Skenario booking inti (dites terhadap backend Convex — lihat D-012)

Catatan: skenario di bawah kini diuji terhadap implementasi Convex
(`src/convex/bookings.ts` dan kawan-kannya); kolom Status diisi MENUNGGU
sampai pengujian dijalankan, lalu diganti LULUS/GAGAL.

### 2.1 Form & validasi

| ID | Skenario | Input | Hasil yang diharapkan | Hasil aktual | Status | Catatan |
| --- | --- | --- | --- | --- | --- | --- |
| TC-F01 | Submit kosong | Semua field kosong | Ditolak, pesan per field | — | MENUNGGU | TASK-011 / TASK-035 |
| TC-F02 | Telepon invalid | `0812abc` | Ditolak, format WA diminta | — | MENUNGGU | TASK-012 |
| TC-F03 | Nama terlalu panjang | 500 karakter | Ditolak (maks 100) | — | MENUNGGU | TASK-012 |
| TC-F04 | Tanggal selesai < mulai | 2026-10-10 → 2026-10-01 | Ditolak dengan pesan jelas | — | MENUNGGU | TASK-015 |
| TC-F05 | Di luar jam operasional | Mulai 05:00 | Ditolak (08:00–20:00) | — | MENUNGGU | TASK-015 |

### 2.2 Durasi & harga

| ID | Skenario | Input | Hasil yang diharapkan | Hasil aktual | Status | Catatan |
| --- | --- | --- | --- | --- | --- | --- |
| TC-P01 | Sewa 1 hari | 4 Okt → 4 Okt | Durasi = 1 hari | — | MENUNGGU | TASK-013 |
| TC-P02 | Lewat tengah malam | 4 Okt → 5 Okt | Durasi = 2 hari | — | MENUNGGU | TASK-013 |
| TC-P03 | Lewat tahun | 31 Des → 2 Jan | Durasi benar (3 hari) | — | MENUNGGU | TASK-013 |
| TC-P04 | Durasi negatif | 5 Okt → 4 Okt | Ditolak sebelum kalkulasi | — | MENUNGGU | TASK-015 |
| TC-P05 | Harga harian | 1 hari × Rp75.000 | Total Rp75.000 | — | MENUNGGU | TASK-014 |
| TC-P06 | Harga mingguan | 7 hari | Total = harga mingguan | — | MENUNGGU | TASK-014 |
| TC-P07 | Harga bulanan | 30 hari | Total = harga bulanan | — | MENUNGGU | TASK-014 |
| TC-P08 | Campuran | 10 hari | Kombinasi konsisten + terdokumentasi | — | MENUNGGU | D-014 |

### 2.3 Ketersediaan & anti double booking

| ID | Skenario | Input | Hasil yang diharapkan | Hasil aktual | Status | Catatan |
| --- | --- | --- | --- | --- | --- | --- |
| TC-A01 | Unit `rented` dipilih | Pilih unit berstatus disewa | Ditolak server-side | — | MENUNGGU | TASK-016 |
| TC-A02 | Rentang overlap | Booking 4–6 Okt lalu 5–7 Okt | Booking kedua ditolak, tanggal bentrok disebut | — | MENUNGGU | TASK-017 / TC-016 |
| TC-A03 | Rentang tidak overlap | 4–6 Okt lalu 7–9 Okt | Kedua booking diterima | — | MENUNGGU | TASK-017 |
| TC-B01 | Konkurensi | 2 submit bersamaan untuk unit & tanggal sama | Tepat satu sukses, satu gagal | — | MENUNGGU | **Risiko tertinggi** |
| TC-B02 | Booking `cancelled` | Rentang punya booking dibatalkan | Boleh booking ulang | — | MENUNGGU | TASK-017 |
| TC-B03 | Booking `completed` | Rentang lampau | Tidak menghalangi booking baru | — | MENUNGGU | TASK-017 |

### 2.4 WhatsApp, penyimpanan, status

| ID | Skenario | Input | Hasil yang diharapkan | Hasil aktual | Status | Catatan |
| --- | --- | --- | --- | --- | --- | --- |
| TC-W01 | Encode pesan | Nama + tanggal + spasi | Pesan ringkasan terbentuk utuh (siap salin/wa.me) | — | MENUNGGU | TASK-018 (nomor masih TODO) |
| TC-W02 | Nomor dari settings | Nomor placeholder | Nomor tidak di-hardcode di komponen | — | MENUNGGU | `src/lib/site.ts` |
| TC-S01 | Simpan booking | Data valid | Record `pending` + kode booking unik | — | MENUNGGU | TASK-019 |
| TC-S02 | Kode booking unik | 100 booking serentak | Tanpa duplikat | — | MENUNGGU | TASK-019 |
| TC-ST01 | Transisi valid | `pending → confirmed` | Berhasil + tercatat siapa/kapan | — | MENUNGGU | TASK-023 |
| TC-ST02 | Transisi invalid | `completed → active` | Ditolak | — | MENUNGGU | TASK-023 |

### 2.5 Akses & keamanan

| ID | Skenario | Input | Hasil yang diharapkan | Hasil aktual | Status | Catatan |
| --- | --- | --- | --- | --- | --- | --- |
| TC-R01 | User biasa baca booking | Query daftar booking tanpa role | Ditolak di server | — | MENUNGGU | TASK-021 |
| TC-R02 | Non-admin ubah data admin | Mutation admin sebagai non-admin | Ditolak (hanya admin) | — | MENUNGGU | TASK-037 |
| TC-R03 | Nonce/capability (target WP) | Aksi admin tanpa nonce | Ditolak | — | N/A-WordPress | Aturan #12 |
| TC-X01 | XSS pada output | Nama motor berisi `<script>` | Dirender sebagai teks, tidak dieksekusi | — | MENUNGGU | React escape + review |
| TC-X02 | Input aneh | Karakter unicode, emoji, HTML | Disanitasi sebelum disimpan | — | MENUNGGU | TASK-012 |
| TC-DB01 | Dashboard booking | Login pengguna | Daftar reactive + filter status | — | MENUNGGU | TASK-036 |
| TC-SET01 | Simpan harga | Angka valid/nonvalid | Valid tersimpan; nonvalid ditolak | — | DITUNDA | TASK-024 (belum dibangun) |

## 3. Pengaktifan & instalasi (target WordPress — FASE 3/4)

| ID | Skenario | Input | Hasil yang diharapkan | Hasil aktual | Status | Catatan |
| --- | --- | --- | --- | --- | --- | --- |
| TC-I01 | Aktivasi plugin | Aktifkan `ryokourent-core` | Tanpa fatal error/notice | — | N/A-WordPress | — |
| TC-I02 | CPT muncul | Lihat wp-admin | Menu motor & penyewaan ada | — | N/A-WordPress | — |
| TC-I03 | Field tersimpan | Isi meta motor, simpan | Nilai terbaca kembali | — | N/A-WordPress | — |
| TC-I04 | Akses ditolak | User tanpa role buka halaman admin booking | Ditolak (capability) | — | N/A-WordPress | — |
| TC-I05 | Child theme aktif | Aktifkan `generatepress-child` | Gaya katalog sesuai, tanpa error | — | N/A-WordPress | — |
| TC-I06 | Mobile UI | Perangkat fisik/emulator | Booking bisa diselesaikan di mobile | — | N/A-WordPress | — |

## 4. Checklist keamanan (TASK-027)

- [ ] Plugin/theme aktif tanpa fatal error
- [ ] Semua aksi admin punya nonce + capability check
- [ ] Semua output di-escape; semua input disanitasi
- [ ] Query manual memakai prepared statement
- [ ] Tidak ada kredensial di repository (TC-009)
- [ ] Tidak ada data identitas pelanggan tersimpan
- [ ] Tidak ada angka unit fisik di payload/UI publik (TC-005)
- [ ] Otorisasi dicek di server untuk setiap mutation (TC-R01/R02)
- [ ] Anti double booking lulus uji konkurensi (TC-B01)
- [ ] File auth backend tidak diubah tanpa review

## 5. Cara menjalankan

1. **Otomatis (v1):** `bun tsc -b --noEmit` dan `bun run lint` dari root proyek.
2. **Manual (v1):** buka preview, jalankan tiap baris §1 pada lebar 360/768/1280,
   catat kolom *Hasil aktual* + *Status*.
3. **Pasca-v1:** jalankan §2 saat task terkait selesai; jangan menandai task
   `COMPLETED` sebelum barisnya terisi.
4. Uji regresi diulang sebelum merge ke `main` dan sebelum FASE 4.
