# motion-studio

Studio motion editing untuk video **portrait 1080×1920** dari **footage 4K**,
dibangun di atas [Remotion](https://www.remotion.dev) dan disiapkan untuk
dikendalikan lewat **Claude Code**.

- Satu file style (`src/style/tokens.ts`) mengatur seluruh look.
- Satu file per video (`src/projects/<slug>/edit.ts`) berisi klip, reframe, transisi, teks, caption, dan audio.
- Reframe 4K → 9:16 dengan titik fokus & punch-in ber-keyframe.
- Caption per kata, judul animasi, lower third, progress bar, logo, transisi (zoom punch, whip, slide, wipe, fade).
- Safe zone TikTok / Reels / Shorts bawaan.
- Proxy workflow agar preview footage 4K tetap lancar.

## Kebutuhan

- Node.js 18+ dan npm
- FFmpeg & ffprobe di PATH (untuk proxy, probe, ekstraksi referensi)
- Claude Code

## Mulai

```bash
git clone <repo-ini> && cd motion-studio
npm install
cp .env.example .env          # preview pakai proxy
npm run studio                # buka StylePreview untuk melihat style
```

## Pakai dengan Claude Code

Buka folder repo dengan `claude`. `CLAUDE.md` menjelaskan aturan repo, dan tersedia perintah:

| Perintah | Fungsi |
|---|---|
| `/extract-style` | Membaca `style/references/` (video, screenshot, brand kit, file project) dan menerjemahkannya ke `tokens.ts` + `STYLE.md`. |
| `/new-edit <slug> <brief>` | Menyusun video baru dari footage di `public/footage/<slug>/`. |
| `/captions <slug> <transkrip>` | Mengubah transkrip/SRT jadi caption per kata. |
| `/render <slug> draft\|final` | Render dan verifikasi hasil. |

Contoh: *"/new-edit promo-kopi video 30 detik, hook di 2 detik pertama, lower third untuk barista di klip 3"*.

## Alur singkat

1. Taruh materi style di `style/references/` → jalankan `/extract-style`.
2. `npm run new-project nama-video`, taruh footage di `public/footage/nama-video/`.
3. `npm run proxies nama-video` (opsional, untuk preview).
4. `/new-edit nama-video <brief>` → cek di Studio → revisi.
5. `npm run render:final -- nama-video out/nama-video.mp4`.

## Struktur

```
src/
  style/        tokens.ts (style), fonts.ts
  lib/          safe-zones, timing, media (proxy), text-style
  components/   footage/ text/ overlay/ transitions/
  schema/       edit.ts (tipe Edit)
  compositions/ EditTimeline (render project), StylePreview
  projects/     <slug>/edit.ts + index.ts
public/         footage/ proxies/ brand/ music/ sfx/
style/          STYLE.md, references/
scripts/        make-proxies, probe, extract-reference, new-project
.claude/commands/
```
