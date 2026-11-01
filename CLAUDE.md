# CLAUDE.md — panduan untuk Claude Code di repo ini

Studio motion editing berbasis **Remotion** untuk video **portrait 1080×1920
@25fps** dari **footage 4K**, dengan style milik pengguna (konten edukasi
trading). Pengguna berbahasa Indonesia; balas dalam Bahasa Indonesia.

**Sebelum mengerjakan apa pun, baca `style/STYLE.md`.**

## Struktur

```
src/style/        tokens.ts (SATU-SATUNYA sumber style), fonts.ts
src/components/
  zoom/           ReframedVideo (footage 4K → 9:16), ZoomLayer, useZoom (base/punch/push/keyframe)
  cuts/           transitions.tsx (cut, dip, panDown, panUp, slideLeft, fade)
  motion/text/    StackText — semua teks bertumpuk (box, strike, flicker, type, words)
  motion/graphic/ GraphicBg/Shade, PhoneMockup, AccountCard/TradeRows, IconPop, DrawPath
  motion/broll/   ImageBroll (foto + gerak kamera + vignette)
  captions/       WordCaptions (opsional)
src/scenes/       scene grafis siap pakai (phoneAccount, icon, placeholder, blank) + registry
src/schema/       edit.ts — tipe Edit (klip video/image/graphic + overlay)
src/compositions/ EditTimeline (render Edit), styleboard.ts (rekonstruksi referensi)
src/projects/     <slug>/edit.ts — SATU FILE PER VIDEO
style/            STYLE.md, references/ (video referensi, screenshot, brand kit)
public/           footage/<slug>/, proxies/, assets/, brand/, music/, sfx/
```

## Aturan kerja

1. **Edit video = edit `src/projects/<slug>/edit.ts`.** Komponen hanya diubah bila
   butuh kemampuan baru, dan perubahan itu harus berlaku umum.
2. **Style hanya dari `tokens.ts`.** Jangan hardcode warna/ukuran/durasi. Ubah token
   → perbarui `style/STYLE.md` → cek StyleBoard.
3. **Ikuti pola referensi**:
   - Talking head: jump cut selang-seling lebar/rapat (otomatis lewat `alternateFraming`),
     punch-in saat cut ke rapat (otomatis lewat `autoPunch`).
   - Teks kunci = overlay `text` dengan `lines` bertumpuk berbobot campur, muncul tepat
     saat kata diucapkan. Satu aksen per frame (kotak/coret merah ATAU kuning).
   - Scene grafis: latar `GraphicBg`, `push: true`, transisi `dip`/`panDown` antar grafis.
4. **Semua waktu di `edit.ts` dalam detik** (klip, overlay, delay baris, props scene);
   caption dalam milidetik. Posisi teks dalam px kanvas 1080×1920.
   Gunakan `clipStarts(edit)` untuk tahu detik mulai tiap klip di timeline.
5. Sebelum mengisi klip: `npm run probe <slug>`. Default sumber = 4K vertikal 2160×3840;
   landscape isi `sourceWidth: 3840, sourceHeight: 2160`.
6. Setelah perubahan: `npm run typecheck`, lalu render still di titik penting dan lihat
   gambarnya (`npx remotion still <id> out/cek.png --frame=<n>`).
7. Scene grafis baru → buat di `src/scenes/`, daftarkan di `src/scenes/index.ts`,
   props waktunya dalam detik.
8. Jangan commit footage, proxy, `out/`, atau video referensi.

## Perintah

```bash
npm install
npm run studio                      # preview (cp .env.example .env untuk proxy)
npm run probe [slug]
npm run proxies [slug]
npm run extract-ref                 # pecah video referensi baru jadi frame/contact sheet
npm run new-project <slug>
npm run typecheck
npx remotion still StyleBoard out/sb.png --frame=300
npm run render:draft -- <slug> out/<slug>-draft.mp4
npm run render:final -- <slug> out/<slug>.mp4   # selalu footage 4K asli (.env.render)
```

## Cheat sheet overlay teks

```ts
{ type: "text", at: 11.4, dur: 2.5, x: 310, y: 445, lines: [
  { text: "Fokusmu", size: "l", weight: "heavy", in: "flicker", box: true },
  { text: "Bukan",   size: "m", weight: "light", indent: 150, delay: 0.7 },
  { text: "Duit",    size: "xl", weight: "black", indent: 170, strike: true, delay: 1.1 },
]}
// markup: "{Paham} Karakteristik" = kuning, "Jadi lebih **mengerti**" = black
// in: "fade" (default) | "flicker" | "type" | "words" | "none"
```
