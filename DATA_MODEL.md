# DATA_MODEL — Ryokourent

Status dokumen: FASE 0

Konvensi: semua nama field memakai prefix `ryokourent_` (atau `_ryokourent_`
untuk meta WP). Input disanitasi, output di-escape. Nilai contoh adalah
placeholder (TODO) — bukan data produksi.

## 1. Entitas `motor` (CPT `motor` / tabel `motors`)

### 1.1 Field

| Field | Tipe | Wajib | Sumber | Keterangan |
| --- | --- | --- | --- | --- |
| `id` | string / post ID | otomatis | sistem | Kunci utama |
| `slug` | string | otomatis | sistem | `honda-vario-160` |
| `name` | string | ya | input admin | "Honda Vario 160" |
| `brand` | string | ya | input admin | Honda / Yamaha / Vespa / Suzuki / Kawasaki |
| `category` | taxonomy / enum | ya | pilih | Lihat §2 |
| `year` | number (int) | ya | input admin | 2022–2026 |
| `engine_cc` | number (int) | ya | input admin | 110–650 |
| `transmission` | enum | ya | turunan kategori | `matic` / `manual` |
| `price_day` | number (IDR) | ya | settings/admin | Harga per hari |
| `price_week` | number (IDR) | ya | settings/admin | Harga per minggu |
| `price_month` | number (IDR) | ya | settings/admin | Harga per bulan |
| `features` | string[] | tidak | input admin | "2 helm", "jas hujan", "bagasi" |
| `description` | text | tidak | input admin | Deskripsi singkat |
| `image_url` | string (URL) | tidak | input admin | TODO: foto asli |
| `availability_status` | enum | ya | sistem/operator | `available` / `limited` / `rented` |
| `unit_count` | number | internal | sistem | **Tidak pernah ditampilkan ke publik** (aturan #16) |
| `sort_order` | number | tidak | input admin | Urutan katalog |
| `is_published` | boolean | ya | sistem | Sama dengan status post |

### 1.2 Contoh record (placeholder)

```json
{
  "name": "Honda Vario 160",
  "brand": "Honda",
  "category": "matic",
  "year": 2024,
  "engine_cc": 160,
  "transmission": "matic",
  "price_day": 75000,
  "price_week": 475000,
  "price_month": 1750000,
  "features": ["2 helm", "jas hujan", "USB charger"],
  "availability_status": "available"
}
```

## 2. Taxonomy `kategori_motor`

| Term | Slug | Keterangan |
| --- | --- | --- |
| Matic | `matic` | Skuter matik harian |
| Manual | `manual` | Motor kopling manual |
| Listrik | `listrik` | Motor listrik (TODO: ready atau tidak) |

Alasan memakai taxonomy (bukan hardcoded): katalog bisa difilter, tema bisa
menampilkan archive, dan penambahan kategori tidak menyentuh kode plugin.

## 3. Entitas `penyewaan` (CPT `penyewaan` / tabel `bookings`) — pasca-v1

| Field | Tipe | Wajib | Keterangan |
| --- | --- | --- | --- |
| `booking_code` | string | otomatis | `RYK-20261004-A1B2`, unik |
| `motor_id` | ref | ya | Relasi ke `motor` |
| `customer_name` | string | ya | Disanitasi, max 100 char |
| `customer_phone` | string | ya | Format WA: `628xx` / `+628xx` |
| `customer_email` | string | tidak | Opsional |
| `start_date` | date | ya | `YYYY-MM-DD` |
| `end_date` | date | ya | Wajib >= `start_date` |
| `start_time` | time | ya | Dalam jam operasional (08.00–20.00) |
| `end_time` | time | ya | — |
| `duration_days` | number | turunan | Dihitung sistem, bukan input user |
| `price_day` / `price_week` / `price_month` | number | turunan | Snapshot harga saat booking |
| `total_price` | number | turunan | Dihitung `pricing.php` / fungsi pricing |
| `status` | enum | otomatis | Lihat §4 |
| `notes` | text | tidak | Catatan operator |
| `created_by` | ref user | sistem | Admin/operator yang input |
| `created_at` | timestamp | sistem | — |

Tahap awal: **tidak** menyimpan KTP, foto, atau dokumen identitas (aturan #15).
Tidak ada field pembayaran online (aturan #17).

## 4. Status booking

| Status | Arti | Bisa berpindah ke |
| --- | --- | --- |
| `pending` | Menunggu konfirmasi operator | `confirmed`, `cancelled`, `rejected` |
| `confirmed` | Disetujui, menunggu hari H | `active`, `cancelled` |
| `active` | Unit sedang disewa | `completed` |
| `completed` | Sewa selesai, unit kembali | — |
| `cancelled` | Dibatalkan penyewa/operator | — |
| `rejected` | Ditolak (bentrok/tidak valid) | — |

Aturan: unit hanya boleh punya **satu** booking `active`/`confirmed` yang
menempati rentang tanggal yang sama.

## 5. Relasi unit motor ↔ booking

```
motor (1) ──────< (N) penyewaan
   │                    │
   │                    └── motor_id → motor.id
   ├── availability_status = turunan dari booking aktif terdekat
   └── unit_count → internal, tidak pernah dipublikasikan
```

Pencegahan double booking (TASK-017):

1. Cari semua booking motor tersebut dengan status `pending|confirmed|active`
   yang rentang tanggalnya overlap dengan request.
2. Jika ada ≥ 1 → tolak booking, tampilkan tanggal yang bentrok.
3. Pengecekan dan insert wajib dalam satu transaksi/lock (WordPress: transaksi
   `$wpdb`; Convex: mutation tunggal yang atomik) supaya dua request bersamaan
   tidak lolos.

## 6. Settings (options / tabel `settings`)

| Key | Tipe | Contoh (placeholder) |
| --- | --- | --- |
| `ryokourent_whatsapp_number` | string | `6281234567890` (TODO) |
| `ryokourent_timezone` | string | `Asia/Jakarta` |
| `ryokourent_price_day/week/month` | number | `75000` / `475000` / `1750000` |
| `ryokourent_min_days` / `max_days` | number | `1` / `30` |
| `ryokourent_open_hour` / `close_hour` | string | `08:00` / `20:00` |
| `ryokourent_location_name` / `address` / `map_url` | string | placeholder (TODO) |
| `ryokourent_default_booking_status` | enum | `pending` |

## 7. Pemetaan tipe ke kode v1

| Field | TypeScript (v1) | WordPress meta | Convex (masa depan) |
| --- | --- | --- | --- |
| `name` | `Motor.name` | `_ryokourent_name` | `motors.name` |
| `price_day` | `Motor.priceDay` | `_ryokourent_price_day` | `motors.priceDay` |
| `availability_status` | `Motor.status` | `_ryokourent_status` | `motors.status` |
| `category` | `Motor.category` | taxonomy term | `motors.category` |

Tipe `Motor` didefinisikan di `src/data/motors.ts`.
