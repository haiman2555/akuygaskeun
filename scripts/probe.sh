#!/usr/bin/env bash
# Ringkasan footage: resolusi, fps, durasi, codec, rotasi.
# Dipakai Claude Code untuk mengisi sourceWidth/sourceHeight & in/out di edit.ts.
# Pemakaian: npm run probe [nama-project]
set -euo pipefail
cd "$(dirname "$0")/.."
TARGET="${1:-}"
shopt -s nullglob nocaseglob
printf "%-45s %-11s %-7s %-9s %-6s %s\n" FILE RESOLUSI FPS DURASI CODEC ROTASI
for dir in public/footage/*/; do
  project="$(basename "$dir")"
  [[ -n "$TARGET" && "$project" != "$TARGET" ]] && continue
  for f in "$dir"*.{mp4,mov,mxf,mkv,m4v}; do
    info=$(ffprobe -v error -select_streams v:0 \
      -show_entries stream=width,height,r_frame_rate,codec_name:stream_side_data=rotation:format=duration \
      -of default=nw=1 "$f")
    w=$(grep -m1 '^width=' <<<"$info" | cut -d= -f2)
    h=$(grep -m1 '^height=' <<<"$info" | cut -d= -f2)
    fps=$(grep -m1 '^r_frame_rate=' <<<"$info" | cut -d= -f2 | awk -F/ '{ if ($2>0) printf "%.3f", $1/$2; else print $1 }')
    dur=$(grep -m1 '^duration=' <<<"$info" | cut -d= -f2 | awk '{printf "%.2fs", $1}')
    codec=$(grep -m1 '^codec_name=' <<<"$info" | cut -d= -f2)
    rot=$(grep -m1 '^rotation=' <<<"$info" | cut -d= -f2 || true)
    printf "%-45s %-11s %-7s %-9s %-6s %s\n" "${f#public/}" "${w}x${h}" "$fps" "$dur" "$codec" "${rot:-0}"
  done
done
