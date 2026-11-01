# motion-studio

Studio motion editing untuk video **portrait 1080×1920 @25fps** dari **footage 4K**,
dibangun di atas [Remotion](https://www.remotion.dev) dan disiapkan untuk
dikendalikan lewat **Claude Code**.

Style diturunkan dari video referensi pengguna (lihat `style/STYLE.md`) dan dibagi tiga:

- **zoom/** — jump cut lebar ↔ rapat otomatis, punch-in dengan blur, slow push, reframe 4K → 9:16.
- **cuts/** — hard cut, dip to black, pan vertikal, geser horizontal.
- **motion/** — teks bertumpuk (kotak merah + kedip, coret, ketik per huruf, per kata), mockup HP + kartu saldo + angka bergulir, ikon terbang, anotasi putus-putus, B-roll foto bergerak.

Satu file style (`src/style/tokens.ts`), satu file per video (`src/projects/<slug>/edit.ts`),
dan **StyleBoard** yang merekonstruksi adegan referensi untuk pembanding.

## Kebutuhan

- Node.js 18+ dan npm
- FFmpeg & ffprobe di PATH (untuk proxy, probe, ekstraksi referensi)
- Claude Code

## Mulai

```bash
git clone <repo-ini> && cd motion-studio
npm install
cp .env.example .env          # preview pakai proxy
npm run studio                # buka StyleBoard untuk melihat style
```

## Pakai dengan Claude Code

Buka folder repo dengan `claude`. `CLAUDE.md` menjelaskan aturan repo, dan tersedia perintah:

| Perintah | Fungsi |
|---|---|
| `/extract-style` | Membaca `style/references/` (video, screenshot, brand kit, file project) dan menerjemahkannya ke `tokens.ts` + `STYLE.md`. |
| `/new-edit <slug> <brief>` | Menyusun video baru dari footage di `public/footage/<slug>/`. |
| `/captions <slug> <transkrip>` | Mengubah transkrip/SRT jadi caption per kata. |
| `/render <slug> draft\|final` | Render dan verifikasi hasil. |

Contoh: *"/new-edit xauusd-step3 video 45 detik, hook di 2 detik pertama, teks kunci \"Risk kecil\" dicoret merah di klip 2, scene HP saldo di tengah"*.

## Alur singkat

1. Style sudah terpasang. Untuk menambah referensi baru, taruh di `style/references/` → `/extract-style`.
2. `npm run new-project nama-video`, taruh footage di `public/footage/nama-video/`.
3. `npm run proxies nama-video` (opsional, untuk preview).
4. `/new-edit nama-video <brief>` → cek di Studio → revisi.
5. `npm run render:final -- nama-video out/nama-video.mp4`.

## Struktur

```
src/
  style/        tokens.ts (style), fonts.ts
  lib/          motion, text-style, media (proxy), safe-zones, timing
  components/   zoom/ cuts/ motion/{text,graphic,broll}/ captions/
  scenes/       scene grafis siap pakai + registry
  schema/       edit.ts (tipe Edit)
  compositions/ EditTimeline, styleboard.ts
  projects/     <slug>/edit.ts + index.ts
public/         footage/ proxies/ assets/ brand/ music/ sfx/
style/          STYLE.md, references/
scripts/        make-proxies, probe, extract-reference, new-project
.claude/commands/
```
