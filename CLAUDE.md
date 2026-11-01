# CLAUDE.md — panduan untuk Claude Code di repo ini

Repo ini adalah studio motion editing berbasis **Remotion** untuk video
**portrait 1080x1920 @30fps** dari **footage 4K**. Pengguna berbicara
Bahasa Indonesia; balas dalam Bahasa Indonesia.

## Peta repo

| Path | Isi |
|---|---|
| `src/style/tokens.ts` | **Sumber tunggal style**: warna, font, ukuran teks, spring, durasi, varian default. |
| `src/style/fonts.ts` | Pemuatan font (Google Fonts + font brand lokal di `public/brand/fonts/`). |
| `style/STYLE.md` | Deskripsi style dalam kata-kata + aturan penempatan. Selalu sinkron dengan `tokens.ts`. |
| `style/references/` | Video referensi, screenshot penempatan, brand kit, file project dari pengguna. |
| `src/lib/safe-zones.ts` | Safe zone UI TikTok/Reels/Shorts dan slot posisi (`titleTop`, `center`, `captionCenter`, `lowerThird`). |
| `src/components/` | Komponen motion: `footage/ReframedVideo`, `text/AnimatedTitle`, `text/WordCaptions`, `overlay/LowerThird`, `overlay/ProgressBar`, `overlay/LogoBug`, `transitions/presets`. |
| `src/schema/edit.ts` | Tipe `Edit` — deskripsi satu video (klip, overlay, caption, musik). |
| `src/projects/<slug>/edit.ts` | **Satu file per video.** Di sinilah pekerjaan editing sehari-hari terjadi. |
| `src/projects/index.ts` | Registrasi project → otomatis jadi komposisi dengan id = slug. |
| `public/footage/<slug>/` | Footage asli 4K (tidak di-commit). |
| `public/proxies/<slug>/` | Proxy hasil `npm run proxies` (tidak di-commit). |
| `public/music`, `public/sfx`, `public/brand` | Audio & aset brand. |

## Aturan kerja

1. **Edit video = edit `src/projects/<slug>/edit.ts`.** Jangan menyalin/memodifikasi
   komponen hanya untuk satu video. Jika butuh perilaku baru, tambahkan prop/varian
   di komponen lalu pakai dari `edit.ts`.
2. **Style hanya dari `tokens.ts`.** Jangan menulis warna, font, atau ukuran secara
   hardcode di komponen atau project. Kalau pengguna minta "ubah style", ubah tokens
   lalu perbarui `style/STYLE.md`.
3. **Semua teks & grafis di dalam safe zone** (`src/lib/safe-zones.ts`). Gunakan slot
   yang ada; tambahkan slot baru di sana bila screenshot penempatan pengguna meminta.
4. **Waktu di `edit.ts` dalam detik**, caption dalam milidetik relatif ke timeline hasil edit.
5. Sebelum mengisi `in/out` dan `sourceWidth/sourceHeight`, jalankan `npm run probe <slug>`.
   Footage vertikal 4K = `2160x3840`; landscape 4K = `3840x2160` (default).
   Perhatikan kolom ROTASI: footage HP dengan rotasi 90/-90 berarti orientasi tertukar.
6. Setelah perubahan kode, jalankan `npm run typecheck`. Untuk cek visual tanpa render
   penuh: `npx remotion still <id> out/cek.png --frame=<n>` lalu buka gambarnya.
7. Jangan commit footage, proxy, atau `out/`.

## Perintah

```bash
npm install
npm run studio                       # preview interaktif (pakai .env dengan REMOTION_USE_PROXY=1)
npm run probe [slug]                 # info resolusi/fps/durasi footage
npm run proxies [slug]               # buat proxy 1080p untuk preview lancar
npm run extract-ref                  # pecah video referensi style jadi frame & contact sheet
npm run new-project <slug>           # buat project baru
npm run typecheck
npx remotion still StylePreview out/style.png --frame=30
npm run render:draft -- <slug> out/<slug>-draft.mp4
npm run render:final -- <slug> out/<slug>.mp4
```

`render:final` memuat `.env.render` (`REMOTION_USE_PROXY=0`) sehingga selalu memakai
footage 4K asli, walau `.env` untuk Studio mengaktifkan proxy.

## Alur kerja menurunkan style dari referensi (`/extract-style`)

1. `npm run extract-ref`, lalu lihat `style/references/_extracted/*/sheet.jpg`,
   `scenes/*.jpg`, dan `frames/*.jpg` (4 fps → hitung frame untuk durasi animasi).
2. Lihat `style/references/screenshots/` untuk posisi elemen; ukur posisi Y relatif 1920.
3. Baca brand kit (`style/references/brand-kit/`): warna hex, font, logo.
4. Tulis temuan ke `style/STYLE.md`, lalu terjemahkan ke `tokens.ts`, `safe-zones.ts`
   (slot), dan bila perlu varian baru di komponen.
5. Render `StylePreview` sebagai still di beberapa frame dan bandingkan dengan referensi.
   Ulangi sampai mirip.

## Alur kerja satu video (`/new-edit`)

1. `npm run new-project <slug>`; pengguna menaruh footage di `public/footage/<slug>/`.
2. `npm run probe <slug>` → isi klip (in/out, resolusi).
3. Susun klip, reframe, transisi, overlay, caption, musik di `edit.ts`.
4. `npm run typecheck`, cek still di titik penting (awal tiap klip, tiap overlay).
5. Render draft, minta feedback, lalu render final.
