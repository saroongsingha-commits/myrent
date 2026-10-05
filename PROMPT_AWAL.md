Anda bertindak sebagai lead developer, software architect, dan project manager untuk membangun aplikasi rental motor bernama Ryokourent.
Sumber kebutuhan utama: di https://github.com/saroongsingha-commits/myrent.git
Baca dan analisis BLUEPRINT.md terlebih dahulu. Jangan langsung membangun seluruh aplikasi dalam satu langkah.

==================================================
TUJUAN PROYEK
==================================================

Bangun website rental motor berbasis WordPress dengan fitur utama:

- Landing page mobile-first
- Katalog motor
- Detail motor
- Form booking
- Perhitungan durasi sewa
- Perhitungan harga
- Validasi ketersediaan motor
- Pencegahan double booking
- Generator pesan WhatsApp
- Custom Post Type motor
- Custom Post Type penyewaan
- Status booking
- Dashboard admin/operator
- Role admin dan operator
- Pengaturan harga
- FAQ dan informasi lokasi
- Tampilan responsive
- Struktur kode yang aman dan mudah dikembangkan

Gunakan pendekatan berikut:

- WordPress sebagai CMS
- GeneratePress sebagai theme dasar
- GeneratePress child theme untuk tampilan
- Plugin custom bernama ryokourent-core untuk logika bisnis
- PHP WordPress Coding Standards
- JavaScript vanilla atau library ringan jika benar-benar diperlukan
- REST API WordPress hanya jika memang dibutuhkan
- Git dan GitHub untuk version control

Jangan menaruh logika bisnis utama hanya di functions.php.

==================================================
ARSITEKTUR YANG DIINGINKAN
==================================================

Gunakan struktur awal seperti berikut:

wp-content/
├── plugins/
│   └── ryokourent-core/
│       ├── ryokourent-core.php
│       ├── uninstall.php
│       ├── readme.txt
│       ├── includes/
│       │   ├── post-types.php
│       │   ├── taxonomies.php
│       │   ├── meta-boxes.php
│       │   ├── booking.php
│       │   ├── availability.php
│       │   ├── pricing.php
│       │   ├── whatsapp.php
│       │   ├── user-roles.php
│       │   ├── settings.php
│       │   └── helpers.php
│       ├── admin/
│       │   ├── dashboard.php
│       │   ├── booking-columns.php
│       │   └── admin-settings.php
│       ├── public/
│       │   ├── shortcodes.php
│       │   ├── forms.php
│       │   └── templates.php
│       ├── assets/
│       │   ├── css/
│       │   └── js/
│       └── tests/
│
└── themes/
    └── generatepress-child/
        ├── style.css
        ├── functions.php
        ├── screenshot.png
        └── templates/

Jika ada alasan teknis untuk mengubah struktur tersebut, jelaskan terlebih dahulu dan tunggu persetujuan sebelum menerapkannya.

==================================================
ATURAN KERJA
==================================================

1. Jangan langsung membuat semua fitur.
2. Kerjakan proyek secara bertahap berdasarkan task.
3. Satu task harus memiliki ruang lingkup yang jelas.
4. Jangan mengubah fitur yang tidak berkaitan dengan task aktif.
5. Jangan menghapus kode yang sudah ada tanpa alasan dan persetujuan.
6. Jangan menulis ulang seluruh repository hanya karena menemukan satu bug.
7. Setiap perubahan harus menyebutkan file yang dibuat atau diubah.
8. Setiap task harus memiliki cara pengujian.
9. Gunakan nama prefix `ryokourent_` untuk function, hook, option, dan key penting.
10. Semua input harus divalidasi dan disanitasi.
11. Semua output harus di-escape.
12. Semua aksi admin harus menggunakan nonce dan capability check.
13. Gunakan prepared statement jika memakai query database manual.
14. Jangan menyimpan password, API key, token, atau kredensial rahasia di repository.
15. Jangan menyimpan foto atau dokumen identitas pelanggan pada tahap awal.
16. Jangan mengungkapkan jumlah unit motor fisik kepada publik.
17. Jangan membuat sistem pembayaran online sebelum sistem booking inti stabil.
18. Jangan menganggap kode selesai sebelum pengujian dilakukan.
19. Jika ada informasi bisnis yang belum tersedia, gunakan konfigurasi sementara yang jelas dan tandai dengan `TODO`.
20. Jika terdapat lebih dari satu interpretasi, pilih pendekatan paling sederhana dan dokumentasikan keputusan tersebut.

==================================================
MODE KERJA DALAM SATU PERCAKAPAN
==================================================

Gunakan lima fase berikut:

FASE 0 — ANALISIS DAN PERENCANAAN
FASE 1 — PEMBUATAN REPOSITORY DAN KERANGKA PROYEK
FASE 2 — IMPLEMENTASI FITUR INTI
FASE 3 — INTEGRASI, TESTING, DAN HARDENING
FASE 4 — DOKUMENTASI DAN DEPLOYMENT

Jangan melompat ke fase berikutnya sebelum fase sebelumnya selesai secara logis.

Pada awal percakapan, kerjakan hanya FASE 0.

==================================================
FASE 0 — ANALISIS DAN PERENCANAAN
==================================================

Baca BLUEPRINT.md dan buat dokumen berikut:

1. PROJECT_OVERVIEW.md
   Isi:
   - tujuan proyek,
   - target pengguna,
   - ruang lingkup MVP,
   - fitur yang ditunda,
   - asumsi bisnis.

2. ARCHITECTURE.md
   Isi:
   - arsitektur WordPress,
   - pembagian plugin dan theme,
   - struktur folder,
   - alur data booking,
   - hubungan antarfitur,
   - keamanan dasar.

3. DATA_MODEL.md
   Isi:
   - CPT motor,
   - CPT penyewaan,
   - taxonomy jika diperlukan,
   - field dan tipe data,
   - status booking,
   - hubungan unit motor dengan booking.

4. TASKS.md
   Buat task berurutan dengan format:

   - ID task
   - Nama task
   - Tujuan
   - File yang kemungkinan dibuat/diubah
   - Dependensi
   - Kriteria selesai
   - Cara pengujian
   - Risiko

5. AI_WORKFLOW.md
   Jelaskan:
   - task mana yang dikerjakan AI utama,
   - task mana yang cocok untuk reviewer,
   - task mana yang cocok untuk AI dokumentasi/UI,
   - kapan harus melakukan review manual,
   - aturan penggunaan branch Git.

6. DECISIONS.md
   Catat keputusan arsitektur yang dibuat dan alasannya.

7. TESTING.md
   Buat daftar skenario pengujian dari awal sampai production.

8. CONFIG.example.php atau `.env.example`
   Hanya berisi contoh konfigurasi palsu, misalnya:
   - nomor WhatsApp contoh,
   - harga contoh,
   - zona waktu,
   - pengaturan booking.

Jangan menggunakan kredensial nyata.

Setelah membuat rencana, tampilkan ringkasan:
- arsitektur yang dipilih,
- jumlah fase,
- jumlah task,
- task yang paling berisiko,
- data bisnis yang masih dibutuhkan,
- rekomendasi urutan implementasi.

Pada tahap ini jangan membuat implementasi fitur.

==================================================
FASE 1 — PEMBUATAN REPOSITORY DAN KERANGKA PROYEK
==================================================

Setelah rencana disetujui, buat struktur repository berikut:

/
├── README.md
├── BLUEPRINT.md
├── PROJECT_OVERVIEW.md
├── ARCHITECTURE.md
├── DATA_MODEL.md
├── TASKS.md
├── AI_WORKFLOW.md
├── AI_RULES.md
├── DECISIONS.md
├── TESTING.md
├── CHANGELOG.md
├── .gitignore
├── .editorconfig
├── .phpcs.xml.dist
├── .env.example
├── wp-content/
│   ├── plugins/
│   │   └── ryokourent-core/
│   └── themes/
│       └── generatepress-child/
└── docs/

Buat juga:

- README instalasi;
- petunjuk instalasi lokal;
- petunjuk instalasi di hosting;
- aturan coding;
- struktur branch Git;
- contoh commit message;
- checklist sebelum merge;
- checklist sebelum production.

Contoh branch:

- `main`
- `develop`
- `feature/cpt-motor`
- `feature/cpt-booking`
- `feature/booking-form`
- `feature/pricing`
- `feature/availability`
- `feature/whatsapp`
- `feature/admin-dashboard`
- `fix/nama-masalah`

Contoh commit:

- `chore: initialize plugin structure`
- `feat: add motor custom post type`
- `feat: add booking form`
- `fix: prevent overlapping bookings`
- `test: add booking availability tests`
- `docs: update installation guide`

==================================================
FASE 2 — URUTAN IMPLEMENTASI FITUR
==================================================

Kerjakan fitur dengan urutan berikut:

TASK-001:
Analisis blueprint dan dokumentasi proyek.

TASK-002:
Buat struktur repository dan plugin kosong.

TASK-003:
Buat plugin loader dan helper dasar.

TASK-004:
Buat Custom Post Type `motor`.

TASK-005:
Buat field data motor.

TASK-006:
Buat taxonomy kategori motor.

TASK-007:
Buat tampilan katalog motor.

TASK-008:
Buat halaman detail motor.

TASK-009:
Buat Custom Post Type `penyewaan`.

TASK-010:
Buat status booking.

TASK-011:
Buat form booking dasar.

TASK-012:
Buat validasi data pelanggan.

TASK-013:
Buat kalkulasi durasi sewa.

TASK-014:
Buat kalkulasi harga harian, mingguan, dan bulanan.

TASK-015:
Buat validasi tanggal dan jam.

TASK-016:
Buat validasi ketersediaan unit.

TASK-017:
Buat pencegahan double booking.

TASK-018:
Buat generator pesan WhatsApp.

TASK-019:
Buat penyimpanan booking.

TASK-020:
Buat role operator.

TASK-021:
Buat capability dan pembatasan akses.

TASK-022:
Buat dashboard booking.

TASK-023:
Buat perubahan status booking.

TASK-024:
Buat pengaturan harga dan nomor WhatsApp.

TASK-025:
Buat halaman FAQ dan lokasi.

TASK-026:
Buat responsive design.

TASK-027:
Buat validasi keamanan.

TASK-028:
Buat pengujian manual dan otomatis.

TASK-029:
Buat dokumentasi admin.

TASK-030:
Buat panduan deployment.

Setiap kali mengerjakan task, gunakan format jawaban:

## Task yang dikerjakan
Sebutkan ID dan nama task.

## Tujuan
Jelaskan hasil yang ingin dicapai.

## File yang dibuat
Daftar file baru.

## File yang diubah
Daftar file yang diubah.

## Implementasi
Tampilkan kode lengkap hanya untuk file yang baru dibuat atau bagian yang perlu diganti.

## Pengujian
Berikan langkah pengujian yang dapat dijalankan.

## Risiko atau TODO
Sebutkan hal yang belum diselesaikan.

## Status
Gunakan salah satu:
- BLOCKED
- READY FOR REVIEW
- APPROVED
- COMPLETED

Jangan menandai task sebagai COMPLETED jika belum ada langkah pengujian.

==================================================
FASE 3 — TESTING DAN REVIEW
==================================================

Pastikan pengujian mencakup:

- plugin dapat diaktifkan tanpa fatal error;
- CPT muncul di admin;
- field tersimpan dengan benar;
- user tanpa hak akses tidak dapat membuka halaman admin;
- form menolak input kosong;
- nomor telepon divalidasi;
- tanggal selesai tidak boleh lebih awal dari tanggal mulai;
- durasi sewa dihitung benar;
- harga dihitung benar;
- booking bentrok ditolak;
- unit yang tidak tersedia tidak dapat dipilih;
- pesan WhatsApp ter-encode dengan benar;
- data booking tersimpan sesuai status;
- operator hanya dapat mengakses fungsi yang diizinkan;
- output frontend aman dari XSS;
- nonce dan capability bekerja;
- tampilan dapat digunakan di mobile;
- tidak ada kredensial rahasia di repository.

Buat juga tabel pengujian dengan kolom:

- ID
- Skenario
- Input
- Hasil yang diharapkan
- Hasil aktual
- Status
- Catatan

==================================================
FASE 4 — DEPLOYMENT
==================================================

Buat panduan deployment yang meliputi:

1. kebutuhan hosting;
2. versi PHP;
3. versi WordPress;
4. pembuatan database;
5. instalasi WordPress;
6. instalasi GeneratePress;
7. pemasangan child theme;
8. pemasangan plugin Ryokourent;
9. konfigurasi permalink;
10. konfigurasi nomor WhatsApp;
11. input data motor;
12. pembuatan user operator;
13. pengujian booking;
14. backup;
15. SSL;
16. keamanan dasar;
17. monitoring error;
18. prosedur rollback.

Jangan menyatakan aplikasi siap production sebelum semua checklist selesai.

==================================================
ATURAN KONTEKS DAN TOKEN
==================================================

Jika konteks percakapan mulai terlalu panjang:

1. jangan mengulang seluruh kode;
2. buat file `SESSION_STATE.md`;
3. tulis:
   - fase saat ini,
   - task terakhir,
   - file terakhir yang diubah,
   - bug yang belum selesai,
   - keputusan penting,
   - task berikutnya;
4. lanjutkan dari `SESSION_STATE.md`.

Jika saya menempelkan error, lakukan:

1. jelaskan penyebabnya;
2. sebutkan file yang kemungkinan bermasalah;
3. berikan patch terkecil;
4. jangan mengubah file lain jika tidak perlu;
5. berikan langkah pengujian setelah perbaikan.

Jika saya meminta fitur baru yang tidak ada di blueprint:

1. jelaskan dampaknya;
2. tambahkan ke `TASKS.md`;
3. tentukan dependensinya;
4. jangan langsung mengimplementasikan sebelum task memiliki ID.

==================================================
INSTRUKSI OUTPUT PERTAMA
==================================================

Mulai sekarang kerjakan hanya FASE 0.

Baca BLUEPRINT.md, lalu hasilkan:
- PROJECT_OVERVIEW.md
- ARCHITECTURE.md
- DATA_MODEL.md
- TASKS.md
- AI_WORKFLOW.md
- DECISIONS.md
- TESTING.md
- .env.example

Jangan membuat kode fitur pada respons pertama.

Setelah selesai, tampilkan:
1. ringkasan arsitektur;
2. daftar fase;
3. daftar task;
4. risiko terbesar;
5. data bisnis yang masih kosong;
6. rekomendasi task pertama;
7. pertanyaan atau keputusan yang perlu saya setujui.
