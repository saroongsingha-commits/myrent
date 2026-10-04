# BLUEPRINT TEKNIS WEBSITE RYOKOURENT
**Rental Sepeda Motor Malang Raya & Kota Wisata Batu**
*Dokumen Arsitektur Sistem, Wireframe, Rekomendasi WordPress, Skema CPT & Format Pemesanan WhatsApp*

---

## 1. Konsep dan Tujuan Website

### A. Profil & Identitas Bisnis
* **Nama Brand:** Ryokourent
* **Kategori Bisnis:** Rental Sepeda Motor & Adventure Fleet
* **Wilayah Layanan:** Malang Raya (Kota Malang, Kabupaten Malang) dan Kota Wisata Batu
* **Dua Lokasi Pool:**
  * **Pool 1 (Malang):** Jl. MT Haryono Gg. 21 No. 23, Dinoyo, Lowokwaru, Malang *(akses mudah ke kawasan kampus UB/UIN, dekat poros Soekarno-Hatta & Stasiun)*.
  * **Pool 2 (Kota Batu):** Jl. Belakang Pompa Bensin, Jl. Diponegoro, Batu *(jantung kota wisata, dekat Alun-Alun Batu & Jatim Park)*.
* **Jam Operasional:** 07.00 – 23.00 WIB
* **Layanan Antar & Ambil Unit:** Fleksibel, menyesuaikan situasi dan kondisi lapangan (sikon).

### B. Tujuan Website
1. **Zero-Friction WhatsApp Booking:** Menghilangkan kerumitan registrasi atau checkout berbelit-belit. Pelanggan cukup memilih armada, menentukan tanggal/jam sewa, mengisi data verifikasi identitas, lalu langsung terhubung ke WhatsApp Admin dengan draf pesanan yang rapi dan terstruktur.
2. **Inspirasi Visual Adaptif:** Terinspirasi dari struktur visual *merapilandrover.com* yang tegas, berlatar gelap kontras tinggi (navy/hitam dengan aksen kuning/oranye energik), modern, bersih, tanpa elemen dekoratif berlebih, serta mengutamakan konversi langsung ke WhatsApp tanpa menyalin teks, gambar, atau identitas merek aslinya.
3. **Edukasi Keamanan & Aturan Armada:** Mengedukasi pelanggan mengenai perbedaan medan jalan di Malang-Batu dan **kewajiban tegas penggunaan Trail CRF 150L untuk rute Bromo** demi mencegah kerusakan transmisi skutik dan kecelakaan di lautan pasir.
4. **Mobile-First Performance:** Struktur kode ultra-ringan yang dimuat di bawah 1.5 detik pada koneksi smartphone 4G.

---

## 2. Struktur Halaman (Page Hierarchy)

1. **Navbar (Top Bar Contract 3-Zona):**
   * **Zona Brand:** Wordmark teks tunggal `Ryokourent`.
   * **Zona Navigasi:** Unit Motor, Cara Sewa, Lokasi Pool, Syarat & FAQ, Form Booking.
   * **Zona Aksi:** Tombol cepat *"Booking WA"*.
2. **Hero Section:**
   * Headline terarah untuk wisatawan, mahasiswa, dan mobilitas harian.
   * Subheadline informatif mencakup 2 pool Dinoyo & Batu serta jam operasional 07.00–23.00.
   * CTA Ganda: *"Booking via WhatsApp"* & *"Lihat Unit"*.
   * Tiga Trust Badge: 2 Pool Resmi, Jam 07.00–23.00, Antar-Ambil Fleksibel Sikon.
3. **Keunggulan Layanan (01–06):**
   * 01. Dua Pool Strategis (Dinoyo Malang & Diponegoro Batu)
   * 02. Unit Prima & Rutin Servis (Termasuk 2 Helm SNI + Jas Hujan)
   * 03. Jam Pelayanan Panjang (07.00 – 23.00 WIB)
   * 04. Layanan Antar & Ambil Unit (Menyesuaikan Sikon)
   * 05. Unit Khusus Bromo Adventure (Trail CRF 150L Wajib)
   * 06. Transaksi Transparan & Cepat via WhatsApp
4. **Katalog Unit Motor:**
   * Tab filter: Semua Unit, BeAT Series, Scoopy & Vario, Trail Adventure.
   * Grid kartu motor dengan foto asli, spesifikasi cc, transmisi, keunggulan rute, status ketersediaan, format harga placeholder (Harian, Mingguan, Bulanan), tombol *"Sewa Sekarang"*, dan tombol *"Chat WA"*.
5. **Konsultan Rute & Armada Ryokou:**
   * Fitur analisa rute berdasarkan kontur jalan (Bromo, tanjakan Batu, atau keliling kota).
6. **Cara Sewa 3 Langkah:**
   * (1) Pilih Motor & Tanggal
   * (2) Kirim Data Identitas
   * (3) Motor Diantar atau Diambil
7. **Area Layanan & Dua Lokasi Pool:**
   * Informasi detail Pool Malang Dinoyo & Pool Batu Diponegoro, keunggulan akses, link Google Maps, dan ketentuan antar-jemput.
8. **Syarat, Ketentuan & FAQ Accordion:**
   * Syarat identitas (e-KTP asli + 2 dokumen pendukung sah).
   * Ketentuan batas wilayah Malang Raya & Kota Batu (luar kota wajib konfirmasi tertulis).
   * 7 Pertanyaan umum (dokumen jaminan, keterlambatan, trip Bromo, alasan CRF wajib, batas wilayah, luar kota, jadwal operasional).
9. **Form Booking Minimal & Live WhatsApp Generator:**
   * Formulir input ringkas dengan penghitung durasi sewa otomatis.
   * Pratinjau draf pesan WhatsApp yang dapat disalin atau dikirim langsung ke WhatsApp admin.
10. **Footer & Floating Mobile Bar:**
    * Tombol Admin CPT di posisi kiri atas halaman terakhir (footer).
    * Footer informatif dengan alamat lengkap 2 pool, jam kerja, dan copyright.
    * Floating mobile bar di bawah layar (tinggi $\le 15\%$ viewport HP).

---

## 3. Copywriting Utama

* **Headline Hero:**
  > *"Eksplorasi Malang & Wisata Batu Lebih Bebas, Praktis, dan Tanpa Macet."*
* **Subheadline Hero:**
  > *"Solusi sewa motor terpercaya untuk wisatawan, mahasiswa, dan mobilitas harian. Dari skutik lincah hemat BBM untuk keliling kota hingga motor Trail CRF 150L khusus petualangan Bromo, siap diantar ke lokasi Anda."*
* **Deskripsi Kategori Unit:**
  * **Honda BeAT Series (Deluxe, CBS, Street):**
    > *"Lincah dan super irit untuk keliling dalam kota Malang. Bodi ramping memudahkan bermanuver di gang kuliner, kawasan kampus Dinoyo-Suhat, hingga pusat oleh-oleh tanpa khawatir macet atau boros BBM."*
  * **Honda Scoopy & Vario Series (Scoopy, Vario 125, Vario 160):**
    > *"Nyaman, bertenaga, dan stylish untuk perjalanan wisata berpasangan maupun harian. Sangat mantap dan stabil diajak melibas rute menanjak menuju Kota Wisata Batu dengan bagasi lapang untuk barang bawaan."*
  * **Honda Trail CRF 150L:**
    > *"Didesain khusus untuk penjelajah sejati dan WAJIB untuk trip ke Kaldera Gunung Bromo. Suspensi Showa upside-down dan ban dual-purpose siap melintasi medan pasir berbisik dan tanjakan ekstrem dengan aman."*
* **Copywriting Cara Sewa (3 Langkah):**
  1. **Pilih Motor & Tanggal:** *"Tentukan armada yang sesuai dengan rute Anda dan tentukan tanggal mulai serta durasi sewa."*
  2. **Kirim Data Identitas:** *"Lengkapi formulir identitas dan nomor darurat, draf pesan rapi otomatis tersusun untuk admin WhatsApp."*
  3. **Motor Diantar atau Diambil:** *"Admin mengonfirmasi ketersediaan slot. Ambil unit di Pool Malang/Batu atau gunakan layanan antar sesuai situasi dan kondisi."*
* **Copywriting Aturan Penting:**
  * *"Peringatan Trip Bromo: Demi keselamatan jiwa dan kondisi transmisi motor, seluruh unit matik DILARANG KERAS ke lautan pasir Bromo. Trip Bromo WAJIB menyewa unit Honda Trail CRF 150L."*
  * *"Perjalanan Luar Kota: Penggunaan armada di luar batas wilayah Malang Raya dan Kota Batu WAJIB memperoleh persetujuan tertulis admin sebelum keberangkatan."*

---

## 4. Struktur Katalog Motor

| Nama Motor | Kategori | Kapasitas Mesin | Karakter Rute | Harga Harian | Harga Mingguan | Harga Bulanan | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Honda BeAT Deluxe** | BeAT Series | 110 cc eSP | Lincah & Sangat Irit | `Rp [Tanya Admin]` | `Rp [Paket Mingguan]` | `Rp [Paket Bulanan]` | Tersedia |
| **Honda BeAT CBS** | BeAT Series | 110 cc eSP | Lincah & Irit Dalam Kota | `Rp [Tanya Admin]` | `Rp [Paket Mingguan]` | `Rp [Paket Bulanan]` | Tersedia |
| **Honda BeAT Street** | BeAT Series | 110 cc eSP | Lincah & Naked Handlebar | `Rp [Tanya Admin]` | `Rp [Paket Mingguan]` | `Rp [Paket Bulanan]` | Booking Menipis |
| **Honda Scoopy** | Scoopy-Vario | 110 cc eSP | Nyaman & Stylish Retro | `Rp [Tanya Admin]` | `Rp [Paket Mingguan]` | `Rp [Paket Bulanan]` | Tersedia |
| **Honda Vario 125** | Scoopy-Vario | 125 cc Liquid | Nyaman & Bagasi Lega | `Rp [Tanya Admin]` | `Rp [Paket Mingguan]` | `Rp [Paket Bulanan]` | Tersedia |
| **Honda Vario 160** | Scoopy-Vario | 160 cc 4-Valve | Nyaman, Bertenaga, Stabil | `Rp [Tanya Admin]` | `Rp [Paket Mingguan]` | `Rp [Paket Bulanan]` | Booking Menipis |
| **Trail CRF 150L** | Trail Adventure | 150 cc Manual | Adventure (**Wajib Bromo**) | `Rp [Tanya Admin]` | `Rp [Paket Mingguan]` | `Rp [Paket Bulanan]` | Tersedia |

*Setiap sewa mencakup: 2 Helm SNI bersih + 2 Jas Hujan.*

---

## 5. Alur dan Form Booking

### A. Formulir Booking Minimal (Field Input):
1. **Nama Pelanggan:** Nama lengkap sesuai e-KTP.
2. **Alamat Sesuai KTP:** Alamat domisili asal.
3. **Alamat Domisili / Tempat Menginap:** Hotel, homestay, villa, atau kost di Malang/Batu.
4. **ID Akun Medsos:** Instagram / Facebook (untuk verifikasi profil).
5. **Nomor WhatsApp:** Nomor kontak utama penyewa.
6. **Nomor Kontak Darurat:** Nomor keluarga/kerabat yang tidak ikut trip.
7. **Pilihan Motor:** Dropdown armada (BeAT Deluxe, BeAT CBS, BeAT Street, Scoopy, Vario 125, Vario 160, CRF 150L).
8. **Lokasi Pengambilan:** Pool Malang Dinoyo, Pool Batu Diponegoro, Stasiun Malang, atau Antar ke Lokasi Menginap (menyesuaikan sikon).
9. **Jadwal Sewa:** Tanggal & Jam Mulai (07.00–23.00) dan Tanggal & Jam Selesai.
10. **Catatan Tambahan:** Ukuran helm, perlengkapan anak, atau tujuan rute khusus.

### B. Alur Pemrosesan (End-to-End Workflow):
```
Pelanggan Melihat Katalog Unit di Web
          ↓
Memilih Tanggal & Jam Sewa
          ↓
Mengisi Formulir Booking Ringkas
          ↓
Sistem Menghitung Durasi & Menyusun Format Pesan
          ↓
Data Tersimpan ke Database (CPT "Penyewaan", Status: "Menunggu")
          ↓
Pelanggan Diarahkan ke WhatsApp Resmi Ryokourent (wa.me)
          ↓
Admin Menerima Pesan, Cek Slot Unit & Jadwal Antar
          ↓
Admin Meminta Foto e-KTP + 2 Data Pendukung & Pembayaran DP
          ↓
Admin Mengubah Status di WordPress: "Menunggu" → "Dikonfirmasi"
          ↓
Hari H: Serah Terima Unit di Pool / Stasiun → Status: "Berjalan"
          ↓
Unit Kembali & Selesai Sewa → Status: "Selesai" (Deposit Dikembalikan)
```

---

## 6. Rekomendasi WordPress dan Plugin

* **Pilihan Theme:** **GeneratePress** (Rekomendasi Utama) atau **Kadence Theme**.
  * Skor PageSpeed 98–100, CSS sangat ramping (< 50KB), tanpa dependency jQuery.
* **Editor:** **WordPress Native Block Editor (Gutenberg)** dipadukan dengan Spectra atau Kadence Blocks. Hindari Elementor agar loading mobile tetap kilat.
* **Katalog Armada:** Custom Post Type `motor` (dapat dibuat native via `functions.php`).
* **Formulir Booking:** **Fluent Forms** atau **WS Form**.
  * Menyimpan data booking langsung ke tabel WordPress.
  * Fitur redirect otomatis ke link `https://wa.me/628xxxxxxxxxx?text=...`.
* **Pencegahan Double Booking:**
  * Pembatasan kuota dan validasi tanggal di sisi form.
  * Verifikasi manual ketersediaan plat motor oleh admin saat konfirmasi pesan masuk.
* **Plugin Caching:** **LiteSpeed Cache** atau **WP Rocket** untuk optimasi gambar WebP dan cache statis.

---

## 7. Struktur Data Penyewaan (CPT & Status)

### A. Kode PHP Siap Pasang (`functions.php` Tema Anak):
```php
<?php
/**
 * Registrasi CPT Motor, CPT Penyewaan, dan Status Kustom Ryokourent
 * Tambahkan pada functions.php tema anak (child theme) Anda
 */

add_action('init', 'ryokou_register_custom_post_types');
function ryokou_register_custom_post_types() {
    // 1. CPT Armada Motor
    register_post_type('motor', array(
        'labels' => array(
            'name'               => 'Armada Motor',
            'singular_name'      => 'Motor',
            'add_new_item'       => 'Tambah Motor Baru',
            'edit_item'          => 'Edit Data Motor',
        ),
        'public'        => true,
        'has_archive'   => true,
        'menu_icon'     => 'dashicons-car',
        'supports'      => array('title', 'editor', 'thumbnail', 'custom-fields'),
        'show_in_rest'  => true,
    ));

    // 2. CPT Data Penyewaan (Internal Admin)
    register_post_type('penyewaan', array(
        'labels' => array(
            'name'               => 'Penyewaan Motor',
            'singular_name'      => 'Penyewaan',
            'add_new_item'       => 'Catat Booking Baru',
            'edit_item'          => 'Detail Booking',
        ),
        'public'          => false,
        'show_ui'         => true,
        'show_in_menu'    => true,
        'menu_icon'       => 'dashicons-calendar-alt',
        'supports'        => array('title', 'custom-fields'),
        'capability_type' => 'post',
    ));
}

// 3. Daftarkan Status Kustom untuk Alur Penyewaan
add_action('init', 'ryokou_register_rental_statuses');
function ryokou_register_rental_statuses() {
    $statuses = array(
        'menunggu'     => array('label' => 'Menunggu Konfirmasi', 'color' => '#f59e0b'),
        'dikonfirmasi' => array('label' => 'Dikonfirmasi',       'color' => '#0284c7'),
        'berjalan'     => array('label' => 'Sewa Berjalan',      'color' => '#10b981'),
        'selesai'      => array('label' => 'Selesai',            'color' => '#64748b'),
        'dibatalkan'   => array('label' => 'Dibatalkan',         'color' => '#ef4444'),
    );

    foreach ($statuses as $slug => $data) {
        register_post_status('status_' . $slug, array(
            'label'                     => _x($data['label'], 'post'),
            'public'                    => true,
            'exclude_from_search'       => false,
            'show_in_admin_all_list'    => true,
            'show_in_admin_status_list' => true,
            'label_count'               => _n_noop($data['label'] . ' <span class="count">(%s)</span>', $data['label'] . ' <span class="count">(%s)</span>'),
        ));
    }
}
```

### B. Skema Field ACF CPT "Penyewaan":
* `customer_name` (Text): Nama pelanggan sesuai KTP
* `customer_ktp_address` (Textarea): Alamat resmi di KTP
* `customer_stay_address` (Text): Tempat menginap di Malang/Batu
* `customer_whatsapp` (Text): No. WhatsApp aktif
* `customer_emergency_phone` (Text): No. kontak darurat keluarga
* `customer_social_media` (Text): ID Instagram / Facebook
* `rented_motor_id` (Post Object Relation ke CPT `motor`)
* `pickup_location` (Select): Pool Dinoyo | Pool Batu | Stasiun | Hotel
* `start_datetime` (DateTime) & `end_datetime` (DateTime)
* `total_days` (Number): Durasi hari sewa
* `booking_status` (Select): Menunggu | Dikonfirmasi | Berjalan | Selesai | Dibatalkan

### C. Sistem Hak Akses (Role-Based Access Control / RBAC):
1. **Peran Administrator (`role: admin`):**
   * Otoritas penuh (*Full Access*) atas seluruh sistem operasional.
   * **HANYA ADMIN** yang berwenang:
     * Menambah, mengedit, mengaktifkan/menonaktifkan, dan menghapus akun staf (*User Login Management*).
     * Menambah model unit baru dan mengatur banyaknya unit fisik armada (kuota/stok motor per model).
     * Mengubah harga sewa satuan per unit model.
     * Menjalankan **Multi-Update Harga (Bulk Pricing)** saat musim liburan (High Season/Lebaran/Nataru).
     * Menambah dan mengedit **Paket Harga Khusus** (misal: Paket Bromo, Weekend Batu).
2. **Peran Operator (`role: operator`):**
   * Otoritas operasional harian (*Daily Operational Access*):
     * Melihat catatan penyewaan masuk.
     * Mengubah status pesanan (*Menunggu* → *Dikonfirmasi* → *Berjalan* → *Selesai* → *Dibatalkan*).
     * Memverifikasi data e-KTP dan kontak darurat pelanggan.
     * Memantau sisa kuota unit motor yang siap disewa di pool.
     * **DIBATASI:** Tidak memiliki hak akses untuk menambah/mengedit user login staf lain maupun merombak skema harga inti.

### D. Inventaris Internal Model Unit & Banyaknya Unit Fisik:
* **Prinsip Tampilan:**
  Banyaknya unit fisik (misal: 8 unit BeAT Deluxe, 6 unit Vario 160, 5 unit Trail CRF 150L beserta plat nomornya) **TIDAK DITAMPILKAN DI KATALOG PUBLIK**. Hal ini menjaga tampilan halaman depan tetap elegan, bersih, dan profesional.
* **Fungsi Internal:**
  Data kuota unit fisik digunakan khusus di dashboard Admin CPT untuk:
  1. Menghitung ketersediaan unit real-time (*Tersedia = Total Unit - Sedang Jalan - Dalam Servis*).
  2. Mencegah *double booking* armada pada tanggal yang sama.
  3. Mencatat riwayat servis dan alokasi plat nomor motor per penyewa.

### E. Manajemen Tarif Rental (Satuan, Multi-Update & Paket):
1. **Tarif Satuan:** Pengaturan harga harian (24 jam), mingguan (7 hari), dan bulanan (30 hari) per model motor.
2. **Multi-Update Harga (Bulk Adjustment):** Fitur penyesuaian harga sekaligus berdasarkan kategori (*Semua Unit*, *Khusus BeAT*, *Khusus Vario/Scoopy*, *Khusus CRF*) dengan opsi kenaikan nominal (+Rp 10.000 / +Rp 15.000) atau persentase (+10% / +20%) untuk periode liburan.
3. **Paket Harga Khusus:** Skema paket hemat seperti *Paket Weekend Batu 2 Hari*, *Paket Sunrise Bromo 24 Jam*, *Paket Mingguan Hemat*, dan *Paket Bulanan Mahasiswa*.

---

## 8. Contoh Pesan WhatsApp Otomatis

Format draf pesan teks siap kirim:

```text
Halo Admin Ryokourent, saya ingin melakukan pemesanan sewa motor dengan rincian berikut:

📋 DATA PENYEWA
• Nama Lengkap   : Dimas Aditya Pratama
• Alamat KTP     : Jl. Merak No. 12, Surabaya
• Tempat Menginap: Hotel Santika Premiere Malang
• No. WhatsApp   : 081298765432
• No. Darurat    : 081345678901 (Keluarga)
• Akun Medsos    : @dimas_adit

🛵 UNIT & LOKASI
• Unit Motor     : Honda Vario 160
• Lokasi Ambil   : Diantar ke Stasiun Malang Kota Baru (Sesuai Sikon)

⏱️ JADWAL SEWA
• Mulai Sewa     : 02/10/2026, Pukul 08:30 WIB
• Selesai Sewa   : 04/10/2026, Pukul 17:00 WIB
• Estimasi Durasi: 3 Hari (~57 Jam)

📝 CATATAN TAMBAHAN:
Butuh 2 helm ukuran L dan jas hujan setelan.

Mohon konfirmasi ketersediaan unit dan rincian dokumen jaminan yang perlu saya bawa. Terima kasih!
```

---

## 9. Wireframe Teks Sederhana

```text
===================================================================================
[RYOKOURENT]          [Unit Motor]  [Cara Sewa]  [Lokasi Pool]  [Syarat/FAQ]  [BOOKING WA]
===================================================================================
HERO BANNER
  Kicker     : MALANG RAYA & KOTA WISATA BATU · 2 POOL RESMI · 07.00 - 23.00 WIB
  Headline   : Eksplorasi Malang & Wisata Batu Lebih Bebas, Praktis, dan Tanpa Macet.
  Subheadline: Dari BeAT irit dalam kota hingga Trail CRF 150L khusus Bromo.
  [ Tombol: Booking via WhatsApp ]    [ Tombol: Lihat Pilihan Unit ]
  Trust Badges: [Pool Dinoyo & Diponegoro] [Jam 07-23 WIB] [Antar-Ambil Sikon]
-----------------------------------------------------------------------------------
01-06 KEUNGGULAN LAYANAN
  [01. 2 Pool Malang & Batu] [02. Unit Prima & Servis] [03. Jam 07.00 - 23.00 WIB]
  [04. Antar-Jemput Sikon]   [05. Trail Wajib Bromo]   [06. Booking Cepat via WA]
-----------------------------------------------------------------------------------
KATALOG ARMADA MOTOR
  Tabs: [Semua Unit]  [BeAT Series]  [Scoopy & Vario]  [Trail CRF 150L (Bromo)]
  +----------------------+  +----------------------+  +----------------------+
  | [Foto Motor]         |  | [Foto Motor]         |  | [Foto Motor]         |
  | Honda BeAT Deluxe    |  | Honda Vario 160      |  | Honda Trail CRF 150L |
  | 110 cc · Lincah/Irit |  | 160 cc · Tanjakan    |  | 150 cc · Wajib Bromo  |
  | Harian: Rp [Tanya WA]|  | Harian: Rp [Tanya WA]|  | Harian: Rp [Tanya WA]|
  | [Sewa Sekarang] [WA] |  | [Sewa Sekarang] [WA] |  | [Sewa Sekarang] [WA] |
  +----------------------+  +----------------------+  +----------------------+
-----------------------------------------------------------------------------------
ASISTEN KONSULTASI RUTE WISATA & ARMADA RYOKOU
  [ Input Tujuan: Misal "Bromo via Tumpang" / "Jatim Park 2 Batu" ] -> [Cek Rute]
-----------------------------------------------------------------------------------
CARA SEWA 3 LANGKAH
  (1) Pilih Motor & Tanggal  →  (2) Kirim Data ke WA  →  (3) Motor Diantar/Diambil
-----------------------------------------------------------------------------------
AREA LAYANAN & DUA POOL KAMI
  [ Pool 1: Malang Dinoyo ]                 [ Pool 2: Kota Wisata Batu ]
  Jl. MT Haryono Gg. 21 No. 23 Dinoyo       Jl. Belakang Pompa Bensin Diponegoro
  07.00 - 23.00 WIB                         07.00 - 23.00 WIB
  *Catatan: Antar-jemput unit menyesuaikan situasi & kondisi armada lapangan
-----------------------------------------------------------------------------------
SYARAT & KETENTUAN + FAQ ACCORDION
  Syarat : e-KTP Asli + 2 Dokumen Pendukung, SIM C, Batas Malang & Batu, Wajib CRF Bromo
  FAQ    : [Q1: Dokumen Jaminan] [Q2: Overtime] [Q3: Aturan Bromo] [Q4: Antar Jemput]
-----------------------------------------------------------------------------------
FORM BOOKING & LIVE WHATSAPP GENERATOR
  [Nama Lengkap]             [Nomor WhatsApp Aktif]
  [Alamat Sesuai KTP]        [Alamat Tempat Menginap Malang/Batu]
  [Nomor Kontak Darurat]     [Akun Medsos IG/FB]
  [Pilihan Motor]            [Lokasi Ambil/Antar]
  [Jadwal Mulai]             [Jadwal Selesai]
  [Catatan Tambahan]
  -------------------------------------------------------------
  -> [ LIVE PREVIEW DRAF PESAN WHATSAPP ]
  -> [ TOMBOL: KIRIM PESANAN KE WHATSAPP ]  [ TOMBOL: SIMPAN KE CPT ]
-----------------------------------------------------------------------------------
FOOTER (HALAMAN TERAKHIR)
  [ Tombol: Admin CPT (Dashboard Penyewaan) ] -> Posisi Kiri Atas Halaman Terakhir
  Ryokourent © 2026 · Dinoyo Malang & Diponegoro Batu · CS: 07.00 - 23.00 WIB
-----------------------------------------------------------------------------------
[STICKY MOBILE BAR (<=15% TINGGI LAYAR): "Lihat Motor" | "Booking via WhatsApp"]
===================================================================================
```

---

## 10. Rekomendasi Tahap Implementasi

1. **Tahap 1: Setup Lingkungan Hosting & Theme (Hari 1–2)**
   * Gunakan cloud hosting berbasis LiteSpeed server di Indonesia/Singapura dengan PHP $\ge 8.2$.
   * Pasang theme **GeneratePress** atau **Kadence Theme** dan aktifkan child theme.
2. **Tahap 2: Daftarkan CPT & Custom Fields (Hari 3–4)**
   * Salin kode registrasi CPT `motor`, CPT `penyewaan`, dan custom statuses ke file `functions.php`.
   * Konfigurasi field spesifikasi dan status penyewaan menggunakan **ACF**.
   * Input data 7 armada motor (BeAT Deluxe, CBS, Street, Scoopy, Vario 125, Vario 160, CRF 150L) beserta foto asli berlatar bersih.
3. **Tahap 3: Desain Halaman Depan & Generator WhatsApp (Hari 5–7)**
   * Buat Landing Page satu halaman menggunakan Gutenberg Blocks sesuai wireframe.
   * Hubungkan form booking ke sistem redirect WhatsApp dengan format link `https://wa.me/628xxxxxxxxxx?text=...`.
4. **Tahap 4: Uji Coba Alur Booking & Verifikasi Lapangan (Hari 8–9)**
   * Uji coba simulasi pesanan dari ponsel Android dan iPhone.
   * Latih tim CS WhatsApp untuk merespon dalam waktu < 5 menit dengan SOP verifikasi identitas e-KTP.
   * Buat Google Business Profile untuk **Pool Malang Dinoyo** dan **Pool Batu Diponegoro**.
5. **Tahap 5: Peluncuran Resmi (Go-Live) & Maintenance**
   * Aktifkan LiteSpeed Cache dan integrasikan Google Search Console.
   * Mulai kampanye promosi digital lokal bertarget wisatawan Malang & Batu.
