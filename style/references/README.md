# Referensi style

Taruh materi style Anda di sini:

| Folder | Isi |
|---|---|
| `videos/` | Video contoh hasil jadi dengan style Anda (mp4/mov). |
| `screenshots/` | Screenshot penempatan elemen (judul, caption, lower third, logo). Beri nama deskriptif, mis. `caption-posisi.png`. |
| `brand-kit/` | Logo (PNG transparan / SVG), palet warna, file font. Salin logo & font yang dipakai ke `public/brand/`. |
| `project-files/` | File project (.aep, .prproj, .mogrt, preset). Dipakai sebagai acuan nilai (durasi, easing, posisi), tidak dijalankan. |
| `notes.md` | Deskripsi style dalam kata-kata Anda sendiri. |

Video berukuran besar sebaiknya tidak di-commit (lihat `.gitignore`); simpan
klip pendek (≤ 30 detik) bila ingin ikut di repo.

Setelah menaruh file, jalankan di Claude Code: `/extract-style`.
