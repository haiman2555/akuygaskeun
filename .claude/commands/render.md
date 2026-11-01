---
description: Render draft atau final sebuah project
argument-hint: <slug> [draft|final]
---

$ARGUMENTS

1. `npm run typecheck`; perbaiki error dulu.
2. Draft: `npm run render:draft -- <slug> out/<slug>-draft.mp4` (boleh pakai proxy).
3. Final: `npm run render:final -- <slug> out/<slug>.mp4`. Script ini memuat
   `.env.render` (REMOTION_USE_PROXY=0) sehingga selalu memakai footage 4K asli.
4. Verifikasi hasil dengan `ffprobe`: 1080x1920, 30fps, durasi sesuai, ada audio.
5. Laporkan path file, durasi, dan ukuran.
