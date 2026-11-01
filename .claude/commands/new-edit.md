---
description: Mulai project video baru dari footage di public/footage/<slug>
argument-hint: <slug> [brief singkat]
---

Project: $ARGUMENTS

1. Jika `src/projects/<slug>` belum ada, jalankan `npm run new-project <slug>`.
2. Pastikan footage ada di `public/footage/<slug>/`; jika kosong, minta pengguna menaruhnya.
3. `npm run probe <slug>` untuk resolusi, fps, durasi, rotasi.
4. Bila footage 4K banyak, `npm run proxies <slug>` dan pastikan `.env` berisi
   `REMOTION_USE_PROXY=1` untuk preview.
5. Susun `src/projects/<slug>/edit.ts` sesuai brief dan `style/STYLE.md`:
   klip (in/out), reframe 9:16 dengan titik fokus pada subjek, transisi, judul,
   lower third, caption, musik/SFX. Gunakan hanya komponen & token yang ada.
6. Untuk menentukan titik fokus reframe, ambil frame sumber:
   `ffmpeg -ss <detik> -i <file> -frames:v 1 -vf scale=960:-2 out/fokus.jpg` lalu lihat.
7. `npm run typecheck` dan render still di awal tiap klip serta tiap overlay.
8. Laporkan susunan edit (tabel klip & waktu) dan tanyakan apakah lanjut render draft.
