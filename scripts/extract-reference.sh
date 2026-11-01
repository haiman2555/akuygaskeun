#!/usr/bin/env bash
# Memecah video referensi style menjadi gambar yang bisa "dilihat" Claude Code:
#   - frames/   : 1 frame tiap 0.25 detik selama N detik pertama (untuk timing animasi)
#   - scenes/   : frame di setiap pergantian shot (untuk gaya transisi & layout)
#   - sheet.jpg : contact sheet 6x5 untuk gambaran cepat
# Output: style/references/_extracted/<nama-video>/
# Pemakaian: npm run extract-ref [-- detik]   (default 20 detik)
set -euo pipefail
cd "$(dirname "$0")/.."
SECONDS_LIMIT="${1:-20}"
shopt -s nullglob nocaseglob
for f in style/references/videos/*.{mp4,mov,webm,mkv,m4v}; do
  name="$(basename "${f%.*}")"
  out="style/references/_extracted/$name"
  mkdir -p "$out/frames" "$out/scenes"
  echo "ekstrak: $f"
  ffmpeg -hide_banner -loglevel error -y -t "$SECONDS_LIMIT" -i "$f" \
    -vf "fps=4,scale=540:-2" -q:v 4 "$out/frames/f_%04d.jpg"
  ffmpeg -hide_banner -loglevel error -y -i "$f" \
    -vf "select='gt(scene,0.3)',scale=540:-2,showinfo" -vsync vfr -q:v 4 "$out/scenes/s_%03d.jpg" 2>"$out/scenes/log.txt" || true
  grep -o 'pts_time:[0-9.]*' "$out/scenes/log.txt" | cut -d: -f2 > "$out/scenes/times.txt" || true
  ffmpeg -hide_banner -loglevel error -y -i "$f" \
    -vf "fps=1,scale=270:-2,tile=6x5" -frames:v 1 -q:v 3 "$out/sheet.jpg"
done
echo "Selesai. Lihat style/references/_extracted/"
