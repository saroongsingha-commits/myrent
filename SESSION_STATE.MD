# SESSION_STATE.MD — Ringkasan Sesi Pekerjaan

> File ini melacak **status pengerjaan sesi**, task aktif, dependensi yang
> terpenuhi, dan rencana task selanjutnya untuk proyek **Ryokourent App**.
> Semua perubahan penting proyek akan didokumentasikan di `CHANGELOG.MD`.

## 1. Status Sesi Kali Ini

- **Sesi:** 2026-10-04 (arahan: compliance penilaian vs `BLUEPRINT.md` + `AI_RULES.md`,
  pilihan opsi, rename repo).
- **Status:** Selesai mengumpulkan instruksi awal. Tunggu pengerjaan opsi yang dipilih.

## 2. Daftar Task (Berstatus)

| ID | Task | Status |
|---|---|---|
| TASK-020 | Buat role operator (selain `admin`) | Menunggu opsi |
| TASK-021 | Capability & pembatasan akses operator | Menunggu opsi |
| TASK-024 | Pengaturan harga + nomor WhatsApp via UI admin | Menunggu opsi |
| TASK-025 | FAQ + lokasi (jam operasional, alamat, peta) | Menunggu opsi |
| TASK-018 | Live preview draf pesan WA + format §8 | Menunggu opsi |
| TASK-005 (katalog) | Ganti 11 unit generik dengan 7 unit blueprint + tab | Menunggu opsi |
| TASK-006 (katalog) | Filter kategori sesuai blueprint (BeAT Series / Scoopy&Vario / Trail) | Menunggu opsi |
| TASK-031–040 | Halaman detail, search, booking, dashboard, admin, ulasan, copy | Sudah selesai v1.1 |
| CHANGELOG.MD | Dokumentasi perubahan penting | Baru dibuat |
| SESSION_STATE.MD | Dokumen tracking sesi ini | Baru dibuat |
| AI_RULES_VARIANT.md | Terjemahan setara aturan AI_RULES ke padanan Convex/React | Bersangkutan |

## 3. Dependensi yang Telah Terpenuhi

| Dependensi | Status | Catatan |
|---|---|---|
| `BLUEPRINT.md` + `AI_RULES.md` tersedia lokal & GitHub | ✅ | Identik, dicek raw.githubusercontent |
| Docs FASE 0 (`PROJECT_OVERVIEW`, `ARCHITECTURE`, `DATA_MODEL`, `TASKS`, `DECISIONS`, `TESTING`) | ✅ | Ada di repo lokal |
| Botol OH (07.00–23.00, 2 pool, katalog 7 unit, form 10 field, status ID) | ❌ | Dipilih opsi → akan dikerjakan |
| AI_RULES-varif (Convex equivalent) | ❌ | Akan dibuat `AI_RULES_VARIANT.md` jika dipilih |
| Git/GitHub CLI | ❌ | Diblokir environment; push via Vly/GitHub UI manusia |
| Pengujian browser (TC-002…TC-024, TC-B01 concurrency) | ❌ | Perlu browser, belum dijalankan |
| Rename repo ke `saroongsingha-commits/ryokourent-app` | ❌ | Diminta; butuh akses GitHub, env ini memblokir CLI |

## 4. Rencana Task Selanjutnya (Berdasarkan Opsi 2 + B + Rename)

Dengan **Opsi 2** (hanya ambil yang murah/berdampak), **B** (siapkan bundle arsip
untuk push manual), dan rename repo:

1. **Rename repo** `saroongsingha-commits/myrent` → `saroongsingha-commits/ryokourent-app`
   (butuh akses GitHub; lakukan via Vly/GitHub UI atau operator yang berwenang).
2. **Buat `AI_RULES_VARIANT.md`** — terjemahan setara 10 aturan WP menjadi padanan
   Convex/React (server-side authz, ConvexError, escape output, test per fitur).
3. **Eksekusi opsi 2 per-item**:
   - Ganti `site.ts`: jam 07.00–23.00, 2 pool + map URL (venue info only).
   - Ganti `motors.ts` + filter: 7 unit blueprint + kategori sesuai blueprint.
   - Booking form: tambah field alamat KTP, domisili, medsos, kontak darurat, lokasi
     pengambilan + live preview §8 + tombol kirim WA.
   - Copy: headline, peringatan Wajib Bromo, larangan matik ke lautan pasir, aturan
     luar kota.
   - Landing: tambah konsultan rute + floating mobile bar (≤15%) + tombol Admin di
     footer; cara sewa tetap 3 langkah.
4. **PR/commit**: buat arsip release (`release-2026-10-04.tar.gz`) + push ke GitHub
   (manual, karena CLI diblokir).
5. **Update `CHANGELOG.MD`** + `SESSION_STATE.MD` setelah setiap batch selesai.

## 5. Catatan Risiko

- Rename repo GitHub: target URL `github.com/saroongsingha-commits/ryokourent-app`
  (belum diverifikasi; butuh akses).
- Git CLI blokirengsel, jadi commit/push bergantung pada interface Vly/GitHub UI.
- Pengujian browser (TC-002…TC-024) tetap MENUNGGU sampai ada sesi browser.
