---
description: Isi caption per kata untuk sebuah project dari transkrip atau file SRT/JSON
argument-hint: <slug> <path transkrip>
---

$ARGUMENTS

1. Baca transkrip yang diberikan (SRT, VTT, JSON word-level dari Whisper, atau teks biasa).
2. Ubah ke array `{ text, startMs, endMs }` per kata, waktu relatif ke **timeline hasil
   edit** (bukan file sumber): hitung offset tiap klip dari `in/out`, `speed`, dan
   overlap transisi di `edit.ts`.
3. Jika hanya ada waktu per kalimat, bagi rata durasi kalimat ke tiap kata sesuai
   panjang hurufnya.
4. Tulis ke field `captions` di `src/projects/<slug>/edit.ts`. Hapus kata pengisi
   ("eh", "emm") kecuali pengguna minta dipertahankan.
5. Render still di beberapa titik caption untuk memastikan tidak keluar safe zone.
