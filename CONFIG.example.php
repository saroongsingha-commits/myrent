<?php
/**
 * Ryokourent — contoh konfigurasi (FASE 0)
 *
 * Berkas ini HANYA contoh. Semua nilai palsu/placeholder.
 * Jangan simpan password, API key, token, atau kredensial nyata di repository.
 *
 * Catatan: `.env.example` diblokir oleh platform Freebuff (dianggap berkas
 * sensitif), jadi spec FASE 0 memakai alternatif yang diizinkan: CONFIG.example.php.
 *
 * Penggunaan di target WordPress (FASE 4):
 *   Salin konstanta yang dibutuhkan ke wp-config.php, atau simpan sebagai
 *   opsi melalui Settings API (TASK-024) — jangan commit file berisi nilai asli.
 *
 * Penggunaan di runtime v1 (Vite/React):
 *   Variabel client hanya VITE_CONVEX_URL (sudah diisi platform).
 *   Kunci backend diisi lewat panel "Keys / API keys", bukan lewat Git.
 */

// --- Runtime (sudah diisi platform; jangan commit nilai asli) ---------------
// VITE_CONVEX_URL=https://example-deployment.example.convex.cloud
// CONVEX_DEPLOYMENT=dev:example-deployment-name

// --- Info bisnis — TODO: ganti dengan data asli Ryokourent ------------------
define('RYOKOURENT_WHATSAPP_NUMBER', '6281234567890');      // TODO: nomor asli, format 628xx
define('RYOKOURENT_TIMEZONE', 'Asia/Jakarta');              // TODO: konfirmasi
define('RYOKOURENT_CURRENCY', 'IDR');                       // TODO: konfirmasi
define('RYOKOURENT_LOCATION_NAME', 'Toko Ryokourent (contoh)');
define('RYOKOURENT_LOCATION_ADDRESS', 'Jl. Contoh No. 1, Kota Contoh (contoh)');
define('RYOKOURENT_LOCATION_MAP_URL', 'https://maps.example.com/placeholder');
define('RYOKOURENT_OPEN_HOUR', '08:00');                    // TODO: jam operasional
define('RYOKOURENT_CLOSE_HOUR', '20:00');                   // TODO: jam operasional

// --- Harga — TODO: daftar harga resmi per kelas motor -----------------------
define('RYOKOURENT_PRICE_DAY', 75000);
define('RYOKOURENT_PRICE_WEEK', 475000);
define('RYOKOURENT_PRICE_MONTH', 1750000);
define('RYOKOURENT_DEPOSIT', 100000);                       // TODO: perlu deposit?

// --- Aturan booking — TODO: konfirmasi --------------------------------------
define('RYOKOURENT_MIN_DAYS', 1);
define('RYOKOURENT_MAX_DAYS', 30);
define('RYOKOURENT_BUFFER_HOURS', 1);
define('RYOKOURENT_DEFAULT_BOOKING_STATUS', 'pending');

// --- Target WordPress (hanya FASE 4) ----------------------------------------
// WP_HOME=https://ryokourent.example.com
// WP_SITEURL=https://ryokourent.example.com

/**
 * Aturan proyek yang terkait konfigurasi:
 * - Jangan simpan kredensial di repository (aturan #14).
 * - Jangan simpan foto/dokumen identitas pelanggan di tahap awal (#15).
 * - Jangan tampilkan jumlah unit fisik kepada publik (#16).
 * - Belum ada pembayaran online sebelum booking inti stabil (#17).
 * - Semua nilai yang belum pasti ditandai TODO (#19).
 */
