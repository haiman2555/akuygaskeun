#!/usr/bin/env bash
# Membuat proxy ringan (lebar/tinggi max 1080, H.264, GOP pendek) dari footage 4K
# supaya preview di Remotion Studio lancar.
#   public/footage/<project>/X.mov  ->  public/proxies/<project>/X.mp4
# Pemakaian: npm run proxies [nama-project]
set -euo pipefail
cd "$(dirname "$0")/.."

SRC_ROOT="public/footage"
DST_ROOT="public/proxies"
TARGET="${1:-}"

shopt -s nullglob nocaseglob
for dir in "$SRC_ROOT"/*/; do
  project="$(basename "$dir")"
  [[ -n "$TARGET" && "$project" != "$TARGET" ]] && continue
  mkdir -p "$DST_ROOT/$project"
  for f in "$dir"*.{mp4,mov,mxf,mkv,m4v}; do
    name="$(basename "${f%.*}")"
    out="$DST_ROOT/$project/$name.mp4"
    if [[ -f "$out" && "$out" -nt "$f" ]]; then
      echo "lewati (sudah ada): $out"; continue
    fi
    echo "proxy: $f -> $out"
    ffmpeg -hide_banner -loglevel error -y -i "$f" \
      -vf "scale='if(gt(iw,ih),-2,1080)':'if(gt(iw,ih),1080,-2)',format=yuv420p" \
      -c:v libx264 -preset veryfast -crf 23 -g 15 \
      -c:a aac -b:a 128k -movflags +faststart "$out"
  done
done
echo "Selesai. Aktifkan di Studio dengan REMOTION_USE_PROXY=1 (lihat .env.example)."
