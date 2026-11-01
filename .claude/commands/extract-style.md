---
description: Turunkan style animasi dari materi di style/references ke tokens.ts dan STYLE.md
---

Tugas: buat style repo ini semirip mungkin dengan referensi pengguna. $ARGUMENTS

1. Inventaris `style/references/` (videos, screenshots, brand-kit, project-files, notes.md).
2. Jalankan `npm run extract-ref`. Lihat `_extracted/*/sheet.jpg`, gambar di `scenes/`,
   dan urutan `frames/` (4 fps; 1 gambar = 7,5 frame @30fps) untuk mengukur durasi
   animasi masuk/keluar, stagger kata, dan jenis transisi.
3. Dari screenshot, ukur posisi Y tiap elemen dalam skala 1080x1920 dan rata kiri/tengah.
4. Dari brand kit: warna hex, font (salin file font ke `public/brand/fonts/` dan
   daftarkan di `LOCAL_FONTS` di `src/style/fonts.ts`, atau pakai Google Font yang sama),
   logo ke `public/brand/`.
5. Dari file project (.aep/.prproj/.mogrt), ambil nilai yang terbaca (durasi, posisi,
   ukuran font, warna) sebagai acuan.
6. Tulis hasil di `style/STYLE.md`, lalu terapkan ke `src/style/tokens.ts`,
   slot di `src/lib/safe-zones.ts`, dan tambah varian komponen bila style tidak bisa
   dicapai lewat token saja.
7. `npm run typecheck`, lalu render still `StylePreview` di frame 15, 60, 200, 260
   dan bandingkan berdampingan dengan referensi. Iterasi sampai mirip.
8. Ringkas ke pengguna: apa yang ditiru, apa yang masih berbeda dan butuh keputusannya.
