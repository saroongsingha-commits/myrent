# TASKS — Ryokourent

Status dokumen: FASE 0. Urutan task mengikuti blueprint. kolom **Scope**:
`v1` = wajib di versi 1 (landing + katalog), `pasca-v1` = setelah v1 disetujui.

Format tiap task: Tujuan / File / Dependensi / Kriteria selesai / Cara
pengujian / Risiko. Task baru di luar blueprint diberi ID baru (aturan proyek:
fitur baru wajib punya ID sebelum diimplementasikan).

---

## TASK v1 (wajib jalan di versi 1)

### TASK-001 — Analisis blueprint dan dokumentasi proyek
- **Tujuan:** Dokumen FASE 0 lengkap sebelum kode fitur.
- **File:** `PROJECT_OVERVIEW.md`, `ARCHITECTURE.md`, `DATA_MODEL.md`, `TASKS.md`, `AI_WORKFLOW.md`, `DECISIONS.md`, `TESTING.md`, `CONFIG.example.php`
- **Dependensi:** —
- **Kriteria selesai:** 8 dokumen ada, memuat isi wajib masing-masing, tanpa kredensial nyata.
- **Pengujian:** ceklist keberadaan file + review silang isi; cari string `628`/`password`/`api_key` di repo harus berupa placeholder.
- **Risiko:** asumsi bisnis belum dikonfirmasi → semua ditandai TODO.
- **Scope:** v1 (FASE 0)

### TASK-002 — Buat struktur repository dan plugin kosong
- **Tujuan:** Kerangka repo rapi: folder landing, data, docs, konfigurasi standar.
- **File:** `README.md`, `src/components/landing/`, `src/data/`, `docs/`, `.editorconfig` (bila belum ada), `.gitignore` (bila belum ada)
- **Dependensi:** TASK-001
- **Kriteria selesai:** struktur folder sesuai `ARCHITECTURE.md` §2.3; `bun tsc -b --noEmit` tetap hijau.
- **Pengujian:** `bun tsc -b --noEmit` dan `bun run lint`.
- **Risiko:** skeleton WordPress (plugin/theme) hanya bisa dibuat bila target hosting WP dikonfirmasi → ditahan di FASE 1.
- **Scope:** v1

### TASK-003 — Buat plugin loader dan helper dasar
- **Tujuan:** Modul util bersama untuk format harga/tanggal (di runtime v1) dan loader plugin (target WP).
- **File:** `src/lib/format.ts` (v1); `wp-content/plugins/ryokourent-core/ryokourent-core.php` + `includes/helpers.php` (pasca-v1)
- **Dependensi:** TASK-002
- **Kriteria selesai:** format rupiah dan tanggal bisa dipakai komponen katalog tanpa duplikasi kode.
- **Pengujian:** typecheck; contoh render harga `Rp75.000` di katalog.
- **Risiko:** format lokal (id-ID) berbeda per browser → pakai `Intl.NumberFormat('id-ID')`.
- **Scope:** v1 (helper), pasca-v1 (loader WP)

### TASK-004 — Buat Custom Post Type `motor`
- **Tujuan:** Entitas motor sebagai sumber data katalog.
- **File:** `src/data/motors.ts` (v1, tipe `Motor`); `includes/post-types.php` (pasca-v1)
- **Dependensi:** TASK-003
- **Kriteria selesai:** tipe `Motor` lengkap sesuai `DATA_MODEL.md` §1.1; data contoh placeholder bertanda TODO.
- **Pengujian:** typecheck; jumlah record tampil benar di katalog.
- **Risiko:** data statis harus dipindah ke backend/CMS setelah v1 (tercatat di DECISIONS D-002).
- **Scope:** v1 (tipe + data), pasca-v1 (CPT WP)

### TASK-005 — Buat field data motor
- **Tujuan:** Semua field wajib tersedia dan tampil di katalog.
- **File:** `src/data/motors.ts`; `includes/meta-boxes.php` (pasca-v1)
- **Dependensi:** TASK-004
- **Kriteria selesai:** nama, brand, kategori, tahun, cc, harga, fitur, status ada dan dirender.
- **Pengujian:** bandingkan record di data dengan yang dirender (TC-004 di TESTING.md).
- **Risiko:** field berlebihan memenuhi kartu → tampilkan yang wajib saja.
- **Scope:** v1

### TASK-006 — Buat taxonomy kategori motor
- **Tujuan:** Kategori motor untuk filter katalog.
- **File:** `src/data/motors.ts` (enum `category`); `includes/taxonomies.php` (pasca-v1)
- **Dependensi:** TASK-005
- **Kriteria selesai:** kategori `matic`/`manual`/`listrik` tersedia dan dipakai filter.
- **Pengujian:** pilih tiap kategori → daftar tersaring benar; pilih "Semua" → daftar penuh.
- **Risiko:** kategori baru butuh perubahan kode (dipindah ke CMS pasca-v1).
- **Scope:** v1

### TASK-007 — Buat tampilan katalog motor
- **Tujuan:** Katalog mudah dipindai di mobile: nama, spec, harga, status.
- **File:** `src/components/landing/Catalog.tsx`, `src/components/landing/MotorCard.tsx`
- **Dependensi:** TASK-006
- **Kriteria selesai:** daftar + filter kategori; status hanya teks (tanpa angka unit); harga harian tampil.
- **Pengujian:** TC-003, TC-004, TC-005 di `TESTING.md`.
- **Risiko:** menampilkan angka stok → melanggar aturan #16; dicek saat review.
- **Scope:** v1

### TASK-031 — Buat landing page mobile-first *(task baru, dari scope v1)*
- **Tujuan:** Satu halaman wajib v1: landing + katalog dengan CTA masuk.
- **File:** `src/pages/Landing.tsx`, `src/components/landing/Navbar.tsx`, `Hero.tsx`, `HowItWorks.tsx`, `FaqSection.tsx`, `LocationSection.tsx`, `FooterCta.tsx`
- **Dependensi:** TASK-002, TASK-007, TASK-032, TASK-025, TASK-026
- **Kriteria selesai:** hero, katalog, cara sewa, FAQ, lokasi, footer; CTA ke `/auth` (atau `/dashboard` bila sudah login); navbar logo → `/`.
- **Pengujian:** TC-002, TC-006, TC-007 di `TESTING.md` (desktop + mobile).
- **Risiko:** konten placeholder terlihat final → tandai TODO bila bisnis belum konfirm.
- **Scope:** v1

### TASK-032 — Buat theme Terminal terang *(task baru, dari arahan desain)*
- **Tujuan:** Satu visual system: monospace, grid rapi, aksen hijau/amber, permukaan off-white.
- **File:** `src/index.css`, `index.html`, komponen `src/components/landing/*`
- **Dependensi:** TASK-002
- **Kriteria selesai:** token warna terang (bukan palet gelap), font monospace, radius kecil, aksen status terkendali; shadcn ikut token.
- **Pengujian:** TC-010 di `TESTING.md` (semua halaman terang, teks kontras).
- **Risiko:** font monospace bikin paragraf padat → jaga lebar baris + ukuran teks.
- **Scope:** v1

### TASK-025 — Buat halaman FAQ dan lokasi
- **Tujuan:** Jawab pertanyaan umum + tampilkan lokasi sebagai bagian landing.
- **File:** `src/components/landing/FaqSection.tsx`, `LocationSection.tsx`
- **Dependensi:** TASK-031
- **Kriteria selesai:** ≥5 FAQ; lokasi + jam operasional + tautan peta placeholder (TODO).
- **Pengujian:** buka tiap FAQ (accordion), cek tautan peta ter-escape `rel="noopener noreferrer"`.
- **Risiko:** alamat asli belum ada → placeholder ditandai TODO.
- **Scope:** v1

### TASK-026 — Buat responsive design
- **Tujuan:** Layout mulus dari 360px sampai desktop lebar.
- **File:** komponen `src/components/landing/*`, `src/pages/Landing.tsx`, `src/index.css`
- **Dependensi:** TASK-031
- **Kriteria selesai:** tanpa overflow horizontal; grid katalog menyesuaikan; nav mobile praktis.
- **Pengujian:** TC-004 (lebar 360/768/1280).
- **Risiko:** tabel lebar di mobile → pakai kartu/list, bukan tabel.
- **Scope:** v1

### TASK-028 (sebagian) — Pengujian v1
- **Tujuan:** Bukti v1 berfungsi sebelum disebut selesai.
- **File:** `TESTING.md`
- **Dependensi:** TASK-007, TASK-031, TASK-032
- **Kriteria selesai:** skenario v1 diisi hasil aktual + status; typecheck hijau.
- **Pengujian:** jalankan skenario `TESTING.md` §2.
- **Risiko:** hasil manual butuh browser → ditandai MENUNGGU REVIEW MANUAL bila belum dijalankan.
- **Scope:** v1

---

## TASK pasca-v1 (FASE 2 — dijalankan setelah v1 disetujui)

### TASK-008 — Buat halaman detail motor
- **Tujuan:** Halaman per unit: galeri, spec lengkap, CTA sewa.
- **File:** `src/pages/MotorDetail.tsx` + route; `public/templates/single-motor.php` (WP)
- **Dependensi:** TASK-007
- **Kriteria selesai:** route per motor tampil benar, 404 untuk slug salah.
- **Pengujian:** buka 2 slug valid + 1 invalid.
- **Risiko:** duplikasi markup dengan kartu katalog → ekstrak bersama.
- **Scope:** pasca-v1

### TASK-009 — Buat Custom Post Type `penyewaan`
- **Tujuan:** Entitas booking siap menerima data.
- **File:** `src/convex/schema.ts` (tabel `bookings`) atau `includes/post-types.php` (WP)
- **Dependensi:** TASK-004, TASK-010
- **Kriteria selesai:** field sesuai `DATA_MODEL.md` §3; validasi schema lulus.
- **Pengujian:** tulis 1 record uji lewat mutation terproteksi; baca balik.
- **Risiko:** perubahan schema butuh codegen (`bun convex dev --once`).
- **Scope:** pasca-v1

### TASK-010 — Buat status booking
- **Tujuan:** Enum status + transisi yang diizinkan.
- **File:** `src/convex/schema.ts`, `src/lib/booking-status.ts`; `includes/booking.php` (WP)
- **Dependensi:** TASK-009
- **Kriteria selesai:** 6 status sesuai `DATA_MODEL.md` §4; transisi invalid ditolak.
- **Pengujian:** coba transisi `completed → active` harus gagal.
- **Risiko:** transisi longgar → booking konsisten tapi salah status.
- **Scope:** pasca-v1

### TASK-011 — Buat form booking dasar
- **Tujuan:** Form publik: unit, kontak, tanggal, catatan.
- **File:** `src/components/booking/BookingForm.tsx`; `public/forms.php` (WP)
- **Dependensi:** TASK-009, TASK-012, TASK-015
- **Kriteria selesai:** submit kosong ditolak dengan pesan jelas; sukses menampilkan ringkasan.
- **Pengujian:** TC-F01..TC-F05 di `TESTING.md`.
- **Risiko:** validasi hanya di client → wajib ulang di server.
- **Scope:** pasca-v1

### TASK-012 — Buat validasi data pelanggan
- **Tujuan:** Nama, telepon, email (opsional) tervalidasi & disanitasi.
- **File:** `src/lib/validators.ts` (zod sudah terpasang); `includes/booking.php` (WP)
- **Dependensi:** TASK-011
- **Kriteria selesai:** telepon pola `628xx`/`+628xx`; nama 2–100 char; tanpa penyimpanan identitas (aturan #15).
- **Pengujian:** 10 kasus input (kosong, karakter aneh, telepon salah, email salah).
- **Risiko:** normalisasi nomor WA salah → pesan WA gagal.
- **Scope:** pasca-v1

### TASK-013 — Buat kalkulasi durasi sewa
- **Tujuan:** Durasi hari dihitung sistem, bukan input user.
- **File:** `src/lib/pricing.ts`; `includes/pricing.php` (WP)
- **Dependensi:** TASK-015
- **Kriteria selesai:** same-day = 1 hari; 32 Des→2 Jan benar; tidak negatif.
- **Pengujian:** unit test kasus tepi (TC-P01..TC-P04).
- **Risiko:** salah timezone → meleset 1 hari (pakai Asia/Jakarta konsisten).
- **Scope:** pasca-v1

### TASK-014 — Buat kalkulasi harga harian, mingguan, dan bulanan
- **Tujuan:** Total harga benar untuk durasi apa pun.
- **File:** `src/lib/pricing.ts`; `includes/pricing.php` + `includes/settings.php` (WP)
- **Dependensi:** TASK-013, TASK-024
- **Kriteria selesai:** 7 hari = harga mingguan, 30 hari = harga bulanan, campuran dihitung konsisten; aturan tertulis di `DECISIONS.md`.
- **Pengujian:** TC-P05..TC-P08 (perbandingan manual).
- **Risiko:** aturan mixing harian+mingguan tidak disepakati → dokumentasikan dulu.
- **Scope:** pasca-v1

### TASK-015 — Buat validasi tanggal dan jam
- **Tujuan:** Tanggal mulai ≥ hari ini; selesai ≥ mulai; dalam jam operasional.
- **File:** `src/lib/validators.ts`; `includes/booking.php` (WP)
- **Dependensi:** TASK-011
- **Kriteria selesai:** 6 kasus invalid ditolak dengan pesan spesifik.
- **Pengujian:** TC-D01..TC-D06.
- **Risiko:** input `YYYY-MM-DD` vs locale → pakai parsing eksplisit.
- **Scope:** pasca-v1

### TASK-016 — Buat validasi ketersediaan unit
- **Tujuan:** Unit yang tidak tersedia tidak bisa dipilih/dikirim.
- **File:** `src/convex/bookings.ts` (query availability); `includes/availability.php` (WP)
- **Dependensi:** TASK-015, TASK-017
- **Kriteria selesai:** status unit non-available ditolak server-side.
- **Pengujian:** TC-A01..TC-A03.
- **Risiko:** cek hanya status lama → harus cek jadwal booking terbaru.
- **Scope:** pasca-v1

### TASK-017 — Buat pencegahan double booking ⚠ risiko tertinggi
- **Tujuan:** Dua booking overlap untuk unit sama tidak pernah lolos.
- **File:** `src/convex/bookings.ts` (mutation atomik + index overlap); `includes/booking.php` (WP: transaksi + lock)
- **Dependensi:** TASK-016
- **Kriteria selesai:** request serentak → hanya 1 yang sukses; sisanya ditolak.
- **Pengujian:** TC-B01..TC-B05 termasuk uji konkurensi 2 submit bersamaan.
- **Risiko:** race condition → wajib review manual + uji konkurensi sebelum APPROVED.
- **Scope:** pasca-v1

### TASK-018 — Buat generator pesan WhatsApp
- **Tujuan:** Pesan ringkas ter-encode, siap kirim ke wa.me.
- **File:** `src/lib/whatsapp.ts`; `includes/whatsapp.php` (WP)
- **Dependensi:** TASK-014, TASK-019
- **Kriteria selesai:** URL `wa.me/628...?text=` ter-encode UTF-8; nomor dari settings, bukan hardcoded.
- **Pengujian:** TC-W01 (spasi & karakter khusus), TC-W02 (nomor placeholder).
- **Risiko:** nomor salah → pesan gagal; tandai TODO sampai nomor asli ada.
- **Scope:** pasca-v1

### TASK-019 — Buat penyimpanan booking
- **Tujuan:** Booking tersimpan dengan status default benar.
- **File:** `src/convex/bookings.ts`; `includes/booking.php` (WP)
- **Dependensi:** TASK-009, TASK-017
- **Kriteria selesai:** record sesuai input ter-sanitasi + status `pending` + kode booking unik.
- **Pengujian:** TC-S01..TC-S03; baca ulang record.
- **Risiko:** kode booking tabrakan → format + suffix acak + unique index.
- **Scope:** pasca-v1

### TASK-020 — Buat role operator
- **Tujuan:** Role `operator` (selain `admin`) untuk staf lapangan.
- **File:** `src/convex/schema.ts` (enum role sudah ada); `includes/user-roles.php` (WP)
- **Dependensi:** TASK-022
- **Kriteria selesai:** user bisa diberi role operator; role tampil di profil.
- **Pengujian:** buat 1 user operator uji, verifikasi `useAuth().user.role`.
- **Risiko:** role default kosong → tetapkan default `user`.
- **Scope:** pasca-v1

### TASK-021 — Buat capability dan pembatasan akses
- **Tujuan:** Operator hanya melihat/mengubah yang diizinkan.
- **File:** `src/convex/bookings.ts` (cek role di setiap mutation); `includes/user-roles.php` (WP caps)
- **Dependensi:** TASK-020
- **Kriteria selesai:** user biasa gagal membaca daftar booking; operator tidak bisa ubah pengaturan harga.
- **Pengujian:** TC-R01..TC-R03 (uji dari sisi server, bukan UI).
- **Risiko:** cek hanya di frontend → tidak aman; wajib server-side.
- **Scope:** pasca-v1

### TASK-022 — Buat dashboard booking
- **Tujuan:** Daftar booking + filter status untuk admin/operator.
- **File:** `src/pages/Dashboard.tsx` (ganti konten starter); `admin/dashboard.php` (WP)
- **Dependensi:** TASK-019, TASK-021
- **Kriteria selesai:** daftar reactive, filter status, detail bisa dibuka.
- **Pengujian:** TC-DB01..TC-DB03.
- **Risiko:** data banyak tanpa paginasi → tambah paginasi dini.
- **Scope:** pasca-v1

### TASK-023 — Buat perubahan status booking
- **Tujuan:** Tombol ubah status dengan transisi valid + audit.
- **File:** `src/convex/bookings.ts` (mutation `updateStatus`); `admin/booking-columns.php` (WP)
- **Dependensi:** TASK-022, TASK-010
- **Kriteria selesai:** transisi invalid ditolak; perubahan tercatat (siapa, kapan).
- **Pengujian:** TC-ST01..TC-ST03.
- **Risiko:** tanpa audit trail → tambah field `updated_by`/`updated_at`.
- **Scope:** pasca-v1

### TASK-024 — Buat pengaturan harga dan nomor WhatsApp
- **Tujuan:** Ubah harga & nomor WA tanpa menyentuh kode.
- **File:** `src/convex/settings.ts` + halaman admin; `admin/admin-settings.php` + `includes/settings.php` (WP)
- **Dependensi:** TASK-021
- **Kriteria selesai:** hanya admin; validasi numerik; tersimpan sebagai opsi bertabel.
- **Pengujian:** TC-SET01..TC-SET03.
- **Risiko:** nomor tidak valid tersimpan → regex saat simpan.
- **Scope:** pasca-v1

### TASK-027 — Buat validasi keamanan
- **Tujuan:** Audit keamanan menyeluruh sebelum production.
- **File:** seluruh `src/convex/*` dan form publik
- **Dependensi:** TASK-017, TASK-021, TASK-024
- **Kriteria selesai:** seluruh checklist keamanan `TESTING.md` §4 lulus.
- **Pengujian:** checklist §4 + uji manual role.
- **Risiko:** kredensial tidak sengaja ter-commit → jalur pemeriksaan pre-merge.
- **Scope:** pasca-v1

### TASK-028 (lanjutan) — Pengujian manual dan otomatis
- **Tujuan:** Test plan lengkap + hasil nyata.
- **File:** `TESTING.md`, `src/lib/*.test.ts` (bila runner ditambahkan)
- **Dependensi:** semua task FASE 2
- **Kriteria selesai:** semua skenario statusnya LULUS atau GAGAL-TERPERBAIKI; tidak ada MENUNGGU di akhir FASE 3.
- **Pengujian:** jalankan seluruh `TESTING.md`.
- **Risiko:** tanpa runner otomatis → manual saja dulu, catat di DECISIONS.
- **Scope:** pasca-v1

### TASK-029 — Buat dokumentasi admin
- **Tujuan:** Panduan operator: input motor, kelola booking, ubah status, settings.
- **File:** `docs/ADMIN_GUIDE.md`
- **Dependensi:** TASK-022, TASK-024
- **Kriteria selesai:** langkah screenshot-ready, bahasa sederhana.
- **Pengujian:** orang non-developer ikuti panduan tanpa bertanya.
- **Risiko:** dokumen basi setelah perubahan UI → sinkronkan saat review.
- **Scope:** pasca-v1

### TASK-030 — Buat panduan deployment
- **Tujuan:** Checklist rilis FASE 4 (hosting, SSL, backup, rollback).
- **File:** `docs/DEPLOYMENT.md`
- **Dependensi:** TASK-027, TASK-028, TASK-029
- **Kriteria selesai:** 18 butir deployment dari blueprint tercakup; checklist sebelum production kosong (belum lulus) sampai semua dicek.
- **Pengujian:** review silang dengan checklist FASE 4.
- **Risiko:** menyatakan siap production terlalu cepat → aturan: semua checklist wajib tercentang.
- **Scope:** pasca-v1

---

## TASK perluasan v1.1 (arahan 2026-10-04)

Fitur baru di luar blueprint awal: diberi ID lebih dulu, lalu diimplementasikan
pada iterasi yang sama atas permintaan eksplisit (nama “Ryokourent App”,
pengguna pelanggan bisnis, alur booking/detail/dashboard/admin/ulasan).

### TASK-033 — Halaman detail satu unit
- **Tujuan:** Buka satu unit: spesifikasi, tarif, status, ulasan, form jadwal.
- **File:** `src/pages/MotorDetail.tsx`, route `/motor/:slug` (di `src/main.tsx`)
- **Dependensi:** TASK-007, TASK-035
- **Kriteria selesai:** slug valid tampil; slug asing → 404; booking & ulasan tampil.
- **Pengujian:** TC-013 di `TESTING.md`.
- **Risiko:** duplikasi markup dengan kartu katalog.
- **Scope:** v1.1 — COMPLETED (pengujian visual MENUNGGU)

### TASK-034 — Pencarian katalog
- **Tujuan:** Cari unit berdasarkan nama/brand/kategori/fitur + filter kategori.
- **File:** `src/components/landing/Catalog.tsx`
- **Dependensi:** TASK-007
- **Kriteria selesai:** kata kunci menyaring daftar; hasil kosong punya pesan jelas.
- **Pengujian:** TC-014.
- **Risiko:** pencarian hanya di klien (data masih statis) — cukup untuk v1.1.
- **Scope:** v1.1 — COMPLETED (pengujian visual MENUNGGU)

### TASK-035 — Booking/jadwal + penyimpanan backend
- **Tujuan:** Pengguna menjadwalkan sewa; server memvalidasi, menghitung harga, menolak rentang beririsan.
- **File:** `src/convex/schema.ts`, `src/convex/bookings.ts`, `src/lib/pricing.ts`, `src/components/booking/BookingForm.tsx`
- **Dependensi:** TASK-004, TASK-013, TASK-014, TASK-015, TASK-016, TASK-017
- **Kriteria selesai:** booking tersimpan `pending` + kode unik; overlap ditolak; harga dihitung ulang di server; error pakai `ConvexError` sehingga pesan sampai ke klien.
- **Pengujian:** TC-015, TC-016, TC-017 + skenario §2 di `TESTING.md`.
- **Risiko:** atomisitas Convex mutation menutup race; sisa risiko = aturan harga campuran (D-014) belum dikonfirmasi bisnis.
- **Scope:** v1.1 — READY FOR REVIEW

### TASK-036 — Dashboard pengguna
- **Tujuan:** Pengguna melihat booking & ulasannya, bisa membatalkan booking.
- **File:** `src/pages/Dashboard.tsx`
- **Dependensi:** TASK-035, TASK-038
- **Kriteria selesai:** dua tab (booking/ulasan), status tampil, batalkan dengan konfirmasi.
- **Pengujian:** TC-018.
- **Risiko:** query butuh sesi login (sudah dijaga `RequireAuth`).
- **Scope:** v1.1 — READY FOR REVIEW

### TASK-037 — Area admin
- **Tujuan:** Admin mengelola semua: ubah status booking, moderasi ulasan.
- **File:** `src/pages/Admin.tsx`, `src/convex/access.ts`, `src/convex/bookings.ts` (`listAll`, `updateStatus`), `src/convex/reviews.ts` (`listPending`, `moderate`)
- **Dependensi:** TASK-035, TASK-038
- **Kriteria selesai:** non-admin ditolak di server; transisi status valid; bootstrap admin pertama klaim mandiri (TODO produksi).
- **Pengujian:** TC-019.
- **Risiko:** klaim admin mandiri hanya aman untuk instalasi tunggal → lihat D-015.
- **Scope:** v1.1 — READY FOR REVIEW

### TASK-038 — Ulasan pelanggan (post content)
- **Tujuan:** Pengguna mengirim ulasan; tampil publik setelah moderasi.
- **File:** `src/convex/reviews.ts`, `src/components/reviews/*`, `src/components/landing/Testimonials.tsx`
- **Dependensi:** TASK-036, TASK-037
- **Kriteria selesai:** wajib login; 1–5 bintang; status pending; admin setujui → tampil.
- **Pengujian:** TC-020.
- **Risiko:** tanpa verifikasi penyewaan — disederhanakan dulu, dicatat di sini.
- **Scope:** v1.1 — READY FOR REVIEW

### TASK-039 — Penamaan & copy Ryokourent App
- **Tujuan:** Nama “Ryokourent App”, positioning Malang Raya & Batu, nada premium-serius di seluruh halaman.
- **File:** `index.html`, `src/lib/site.ts`, komponen landing, `src/pages/{Auth,Dashboard,NotFound}.tsx`
- **Dependensi:** —
- **Kriteria selesai:** satu sumber nama/tagline (`SITE`); tata bahasa Indonesia benar; tanpa copy placeholder lama.
- **Pengujian:** TC-022.
- **Risiko:** teks bisnis (alamat, WA) masih TODO.
- **Scope:** v1.1 — COMPLETED

### TASK-040 — Peningkatan gaya premium
- **Tujuan:** Tombol utama tinta gelap (serius), hijau hanya untuk status/aksen.
- **File:** `src/index.css`
- **Dependensi:** TASK-032
- **Kriteria selesai:** `--primary` tinta; kontras lolos; tema tetap terang.
- **Pengujian:** TC-010.
- **Risiko:** —
- **Scope:** v1.1 — COMPLETED

---

## Ringkasan

| Metrik | Nilai |
| --- | --- |
| Total task | 40 (30 blueprint + 10 baru: TASK-031…TASK-040) |
| Task v1 / v1.1 | 20 (termasuk TASK-028 sebagian) |
| Task pasca-v1 | 20 penuh + TASK-028 (bagian FASE 3) |
| Task berisiko tertinggi | TASK-017 (double booking), TASK-037 (akses admin), TASK-027 (security audit) |
