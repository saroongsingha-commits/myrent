# AI_WORKFLOW — Ryokourent

Status dokumen: FASE 0

## 1. Pembagian peran

### 1.1 AI utama (implementasi)

Mengerjakan task dengan ruang lingkup jelas dan dependensi sudah siap:

- TASK-002, TASK-003, TASK-004, TASK-005, TASK-006 (struktur + data motor)
- TASK-007 (katalog), TASK-031 (landing), TASK-032 (theme Terminal)
- TASK-011–TASK-015 (form, validasi, durasi, harga — FASE 2)
- TASK-019 (penyimpanan booking), TASK-023 (ubah status)
- TASK-025 (FAQ/lokasi), TASK-026 (responsive)

Aturan: satu task = satu jawaban berformat (Task / Tujuan / File dibuat /
File diubah / Implementasi / Pengujian / Risiko / Status). Tidak menandai
`COMPLETED` tanpa langkah pengujian.

### 1.2 Reviewer (AI reviewer / second pass)

Review kode, jangan menulis fitur baru:

- TASK-017 (anti double booking) — review logika overlap + atomisitas.
- TASK-021, TASK-027 (authorization & security audit).
- TASK-012, TASK-015 (sanitasi & validasi input).
- Setiap PR yang menyentuh `src/convex/**` (mutasi data).
- Review akhir FASE 3 sebelum masuk FASE 4.

Reviewer menolak bila: output belum di-escape, nonce/capability (atau cek role
server-side) hilang, ada kredensial, ada angka unit fisik di UI publik.

### 1.3 AI dokumentasi / UI

- TASK-025 copy FAQ & lokasi, TASK-029 dokumentasi admin, TASK-030 deployment.
- TASK-032 (visual polish, animasi Framer Motion, responsivitas).
- Penulisan `CHANGELOG.md`, README, commit message.
- Boleh mengubah gaya; **tidak boleh** mengubah logika booking/pricing.

### 1.4 Kapan review manual (wajib manusia)

1. Setelah TASK-017 dinyatakan lulus uji konkurensi.
2. Setelah TASK-021/TASK-027 (keamanan & hak akses) selesai.
3. Sebelum setiap merge ke `main`.
4. Sebelum pengumuman production (checklist FASE 4).
5. Setiap kali ada permintaan fitur baru di luar blueprint (dampak dulu, baru ID task).

### 1.5 Kapan AI tidak boleh melanjutkan sendiri

- Struktur folder/plugin berubah dari blueprint → jelaskan + minta persetujuan.
- Task aktif gagal pengujian → perbaiki dulu, jangan lompat task.
- Konteks percakapan terlalu panjang → tulis `SESSION_STATE.md` lalu lanjut.
- Ada error yang ditempel user → analisis penyebab → patch terkecil → uji.

## 2. Aturan branch Git

```
main                 # stabil, siap/rilis; proteksi, hanya via merge PR
develop              # integrasi harian; turunan dari main
feature/cpt-motor
feature/cpt-booking
feature/booking-form
feature/pricing
feature/availability
feature/whatsapp
feature/admin-dashboard
feature/landing-page        # v1
feature/terminal-theme      # v1
fix/nama-masalah
docs/fase-0-planning
```

Alur:

1. `git checkout develop && git pull`
2. `git checkout -b feature/<nama>` (satu task, satu branch)
3. Kerjakan task → jalankan pengujian task
4. Commit Conventional Commits (lihat §3)
5. Buka PR ke `develop` → reviewer (§1.2) → merge
6. PR `develop` → `main` hanya saat rilis / akhir fase, dengan checklist

Dilarang: commit langsung ke `main`, merge tanpa pengujian, menghapus kode lama
tanpa alasan + persetujuan, menaruh kredensial di branch mana pun.

## 3. Contoh commit message

```
chore: initialize plugin structure
feat: add motor custom post type
feat: add motor catalog listing
feat: add booking form
fix: prevent overlapping bookings
test: add booking availability tests
docs: update installation guide
style: apply light terminal theme to landing
```

Format: `<type>: <jarak-singkat-penjelasan>`; type: feat, fix, docs, style,
test, chore, refactor, perf. Bahasa Inggris singkat, tanpa emoji di subjek.

## 4. Checklist sebelum merge (PR)

- [ ] Hanya file yang berkaitan dengan task aktif yang berubah
- [ ] `bun tsc -b --noEmit` lulus
- [ ] Langkah pengujian task dijalankan dan hasil dicatat di `TESTING.md`
- [ ] Input disanitasi, output di-escape, aksi sensitif punya cek otorisasi
- [ ] Tidak ada kredensial/berkas rahasia ikut ter-commit
- [ ] Tidak ada angka unit fisik yang tampil ke publik
- [ ] TODO untuk data bisnis yang belum pasti tetap ditandai
- [ ] Commit message sesuai format §3
- [ ] Tidak ada perubahan pada file auth (`src/convex/auth*`) tanpa alasan jelas

## 5. Checklist sebelum production (ringkas; detail di `docs/DEPLOYMENT.md`)

- [ ] Seluruh skenario `TESTING.md` statusnya LULUS
- [ ] Review manual §1.4 poin 1–4 selesai
- [ ] Backup & rollback plan tersedia
- [ ] SSL aktif, variabel rahasia di environment (bukan di repo)
- [ ] Konfigurasi bisnis asli (harga, nomor WA, lokasi) menggantikan placeholder TODO
