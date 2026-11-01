#!/usr/bin/env bash
# Membuat project baru dari template.
# Pemakaian: bash scripts/new-project.sh nama-project
set -euo pipefail
cd "$(dirname "$0")/.."
slug="${1:?Beri nama project, mis: bash scripts/new-project.sh promo-kopi}"
if [[ ! "$slug" =~ ^[a-z0-9-]+$ ]]; then echo "Nama hanya huruf kecil, angka, dan '-'"; exit 1; fi
dir="src/projects/$slug"
[[ -e "$dir" ]] && { echo "$dir sudah ada"; exit 1; }

mkdir -p "$dir" "public/footage/$slug" && touch "public/footage/$slug/.gitkeep"
var=$(sed -E 's/-([a-z0-9])/\U\1/g' <<<"$slug")
cat > "$dir/edit.ts" <<EOF
import type { Edit } from "../../schema/edit";

export const edit: Edit = {
  id: "$slug",
  progressBar: false,
  clips: [
    // { src: "footage/$slug/NAMA_FILE.mp4", in: 0, out: 4 },
  ],
  overlays: [],
  captions: [],
};
EOF

# daftarkan di src/projects/index.ts
sed -i "/^export const PROJECTS/i import { edit as $var } from \"./$slug/edit\";" src/projects/index.ts
sed -i -E "s/^export const PROJECTS: Edit\[\] = \[(.*)\];/export const PROJECTS: Edit[] = [\1, $var];/" src/projects/index.ts
echo "Project dibuat: $dir (footage -> public/footage/$slug/)"
