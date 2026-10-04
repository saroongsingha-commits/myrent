# ARCHITECTURE — Ryokourent

Status dokumen: FASE 0

## 0. Catatan arsitektur (baca dulu)

Blueprint asli meminta WordPress + GeneratePress + plugin `ryokourent-core`.
Lingkungan kerja proyek ini adalah aplikasi web Vite + React + Convex — runtime
WordPress (PHP, WP-Cron, wp-admin) tidak dapat dijalankan di sini.

Keputusan (detail di `DECISIONS.md`, D-001):

- Arsitektur WordPress tetap didokumentasikan sebagai **target rujukan** untuk
  fase booking (FASE 2–4 di hosting WordPress).
- **Versi 1 (landing + katalog) dibangun di runtime yang tersedia**: Vite +
  React + Convex Auth, dengan model data yang dipetakan 1:1 ke CPT blueprint.
- Struktur folder plugin WordPress tidak diubah; alasan perubahan sudah
  dijelaskan sebelum penerapan, sesuai aturan kerja.

## 1. Arsitektur target WordPress (rujukan FASE 2–4)

### 1.1 Struktur folder

```
wp-content/
├── plugins/
│   └── ryokourent-core/
│       ├── ryokourent-core.php      # loader, konstanta, require modul
│       ├── uninstall.php            # bersihkan opsi saat uninstal
│       ├── readme.txt
│       ├── includes/
│       │   ├── post-types.php       # CPT motor & penyewaan
│       │   ├── taxonomies.php       # kategori motor
│       │   ├── meta-boxes.php       # field data motor / booking
│       │   ├── booking.php          # simpan booking
│       │   ├── availability.php     # cek ketersediaan + anti double booking
│       │   ├── pricing.php          # durasi & harga harian/mingguan/bulanan
│       │   ├── whatsapp.php         # generator pesan WA
│       │   ├── user-roles.php       # role operator
│       │   ├── settings.php         # opsi harga & nomor WA
│       │   └── helpers.php          # sanitize/escape/format rupiah
│       ├── admin/
│       │   ├── dashboard.php
│       │   ├── booking-columns.php
│       │   └── admin-settings.php
│       ├── public/
│       │   ├── shortcodes.php
│       │   ├── forms.php
│       │   └── templates.php
│       ├── assets/css/  assets/js/  tests/
│       └── tests/
└── themes/
    └── generatepress-child/
        ├── style.css  functions.php  screenshot.png  templates/
```

### 1.2 Pembagian plugin dan theme

| Komponen | Tanggung jawab | Boleh berisi | Tidak boleh berisi |
| --- | --- | --- | --- |
| `ryokourent-core` (plugin) | Seluruh logika bisnis: CPT, meta, booking, pricing, availability, WA, role, settings, shortcode | Hook, validasi, query, REST (jika perlu) | HTML tampilan rumit, styling frontend |
| GeneratePress child theme | Tampilan: template, gaya, layout landing/katalog | Template + CSS/JS ringan | Logika booking, query booking, opsi bisnis |
| `functions.php` child theme | Hanya enkripsi theme: enqueue style, dukungan theme | Fungsi tampilan kecil | Logika bisnis utama (dilarang) |

### 1.3 Alur data booking (target)

```
Form booking (public)
  → sanitasi input (sanitize_text_field / sanitize_email / absint)
  → validasi wajib isi + format telepon + tanggal selesai >= mulai
  → pricing.php  : hitung durasi → harga total
  → availability.php : cek overlap booking aktif untuk unit tersebut
       └─ jika bentrok → tolak, tampilkan pesan
  → insert post CPT penyewaan (status: pending)
  → meta: kode booking, motor_id, tanggal, durasi, total, kontak
  → whatsapp.php : buat pesan ter-encode → tautan wa.me
  → operator ubah status di dashboard (nonce + capability)
```

### 1.4 Hubungan antarfitur

```
CPT motor ──< taxonomy kategori motor
CPT motor ──< CPT penyewaan (relasi via meta _ryokourent_motor_id)
CPT penyewaan ── status booking (draft/pending/confirmed/active/completed/cancelled)
settings (opsi) ──> pricing, whatsapp
user-roles ──> dashboard, booking-columns, settings
availability ──> booking (dipanggil sebelum insert)
```

### 1.5 Keamanan dasar (target WordPress)

- Prefix `ryokourent_` untuk function, hook, option, meta key.
- Semua aksi admin: `check_admin_referer` / nonce + capability check.
- Semua output di-escape (`esc_html`, `esc_attr`, `esc_url`).
- Semua input di-sanitasi sebelum disimpan.
- Query database manual wajib prepared statement `$wpdb->prepare`.
- Tidak ada kredensial di repo; opsi sensitif lewat wp-config / environment.
- Tidak mengungkap jumlah unit fisik ke publik (aturan #16).
- Tidak menyimpan foto/dokumen identitas di tahap awal (aturan #15).

## 2. Arsitektur runtime v1 (yang dibangun sekarang)

### 2.1 Stack

| Lapisan | Teknologi |
| --- | --- |
| Build | Vite + TypeScript |
| UI | React 19, Tailwind v4, shadcn/ui, Framer Motion |
| Routing | React Router v7 (impor dari `react-router`) |
| Backend/Auth | Convex + Convex Auth (email OTP & anonymous) |
| Data katalog v1 | Modul data statis `src/data/motors.ts` (lihat D-002) |
| Package manager | Bun |

### 2.2 Route

| Route | Komponen | Akses | Keterangan |
| --- | --- | --- | --- |
| `/` | `src/pages/Landing.tsx` | Publik | Landing + katalog (isi v1) |
| `/auth` | `src/pages/Auth.tsx` | Publik | `redirectAfterAuth=/dashboard` |
| `/dashboard` | `src/pages/Dashboard.tsx` | `RequireAuth` | Workspace terproteksi |
| `*` | `src/pages/NotFound.tsx` | Publik | 404 |

### 2.3 Struktur folder (frontend)

```
src/
├── main.tsx              # bootstrap route + provider (jangan diubah sembarangan)
├── index.css             # token theme Terminal terang
├── pages/                # route-level components
├── components/
│   ├── landing/          # bagian landing: Navbar, Hero, Catalog, Faq, dst.
│   ├── RequireAuth.tsx   # penjaga route terproteksi (returnTo)
│   └── ui/               # primitif shadcn
├── data/motors.ts        # data katalog v1 (TODO: pindah ke backend CMS)
├── hooks/use-auth.ts     # satu-satunya sumber data user di frontend
└── convex/               # backend: auth + users (jangan ubah file auth)
```

### 2.4 Alur data katalog v1

```
src/data/motors.ts (array statis, tipe Motor)
  → Landing/Catalog (filter kategori via state lokal)
  → tampil: nama, brand, cc, kategori, harga, status
  → status ketersediaan dirender sebagai teks, TANPA angka unit
```

TODO (pasca-v1): pindahkan ke tabel Convex `motors` (query publik) atau CMS,
agar operator bisa mengubah data tanpa redeploy.

### 2.5 Alur auth

```
Landing CTA "Masuk" → /auth → Convex Auth (email OTP / guest)
  → redirect /dashboard (returnTo diprioritaskan bila ada)
RequireAuth: belum login → blok di halaman + tautan /auth?returnTo=…
```

## 3. Pemetaan WordPress ↔ runtime v1 ↔ masa depan

| Konsep blueprint | Target WordPress | Runtime v1 sekarang | Masa depan (Convex) |
| --- | --- | --- | --- |
| CPT `motor` | `register_post_type('motor')` | `src/data/motors.ts` (tipe `Motor`) | tabel `motors` |
| CPT `penyewaan` | `register_post_type('penyewaan')` | — (pasca-v1) | tabel `bookings` |
| Kategori motor | `register_taxonomy` | `categories` pada tipe `Motor` | field `category` |
| Meta field motor | meta box + `_ryokourent_*` | properti tipe `Motor` | field tabel |
| Status booking | status post | — | field enum `status` |
| Role operator | `add_role('ryokourent_operator')` | — | field `role` (sudah ada di schema) |
| Settings harga/WA | options API | `.env.example` placeholder | tabel `settings` |
| Shortcode katalog | `[ryokourent_katalog]` | komponen `Catalog` | — |
| Nonce + capability | WP nonce/caps | Convex Auth + cek role di backend | sama |

## 4. Keamanan dasar v1

- Route `/dashboard` dijaga `RequireAuth`; redirect memakai `returnTo` yang
  divalidasi path relatif (anti open redirect).
- Semua teks data katalog di-escape otomatis oleh React; URL gambar hanya dari
  sumber tepercaya (dataset lokal / HTTPS publik).
- Tidak ada API key / kredensial di repo; lihat `.env.example` untuk contoh
  palsu. Rahasia hanya lewat environment / panel Keys.
- Belum ada endpoint publik yang menulis data di v1 → permukaan serangan kecil.
- Pasca-v1: setiap query/mutation Convex wajib cek `ctx.auth` + role di sisi
  server; jangan pernah mengandalkan pengecekan frontend saja.
