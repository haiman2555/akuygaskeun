# Style Guide

> Diturunkan dari `style/references/videos/Montage_Editing.mp4` dan
> `Masukan_Ini.mp4` (2160×3820, 25 fps). Semua nilai tercermin di
> `src/style/tokens.ts`. StyleBoard (`src/compositions/styleboard.ts`)
> merekonstruksi adegan-adegannya untuk pembanding.

## 1. Karakter umum
- Konten edukasi trading, talking head + scene motion graphic.
- Tempo cepat: shot 1,6–5 detik, teks kunci muncul tepat saat kata diucapkan.
- Bersih, kontras tinggi: teks putih bayangan lembut, satu aksen per frame (merah ATAU kuning).

## 2. Warna
| Peran | Hex | Dipakai di |
|---|---|---|
| Merah kotak | `#C91216` | kotak highlight "Fokusmu" |
| Merah terang | `#E80000` | garis coret, anotasi putus-putus, nilai minus |
| Kuning | `#FDFE0C` | kata aksen ("Paham") |
| Putih | `#FFFFFF` | semua teks utama |
| Latar grafis | `#666666` → `#2B2B2B` → `#030303` | gradien vertikal scene grafis |
| Kartu saldo | `#2F0000` → `#DA0001` | gradien diagonal |

## 3. Tipografi
- **Campton Book** dan **Campton Bold** — hanya dua bobot ini (`weight: "book" | "bold"`).
- **Tracking −14** (1/1000 em, seperti di After Effects/Premiere) = `letter-spacing: -0.014em`, berlaku untuk semua teks Campton.
- File font: `public/brand/fonts/Campton-Book.otf` & `Campton-Bold.otf` (dimuat otomatis). Bila belum ada, pengganti sementara: **Outfit**.
- Serif untuk judul step ("Step #2") dengan glow putih — pengganti: Noto Serif.
- Pola khas: **tumpukan teks dengan bobot & ukuran campur**, leading rapat (0,92).

| Token | px @1080w | Contoh |
|---|---|---|
| `xs` | 36 | "= Saldo Normal x 100" |
| `sm` | 44 | kutipan "Resiko 100x lebih rendah…" |
| `s` | 56 | "ruang gerak" |
| `m` | 78 | "Bukan", "Jadi lebih mengerti" |
| `ml` | 96 | "XAUUSD", "SL (-70 Pips)" |
| `l` | 120 | "Fokusmu", "butuh", "Paling kecil" |
| `xl` | 200 | "Duit" |
| `title` | 140 | "Step #2" (serif) |

## 4. Penempatan (kanvas 1080×1920)
| Elemen | x | y | Rata |
|---|---|---|---|
| Judul step | 125 | 165 | kiri, di atas bayangan gelap atas |
| Teks kunci di samping kepala | 310–530 | 445–640 | kiri, mulai dari sisi kanan wajah |
| Teks bawah (poin) | 105 | 1130 | kiri, di dada subjek |
| Bullet di samping HP | 645 | 745 | kiri |
| Teks di atas ikon | 540 | 470 | tengah |

## 5. Zoom
- **Jump cut lebar ↔ rapat**: shot rapat ±1,35× (`zoom.tight`).
- **Punch-in** saat cut ke shot rapat: frame pertama 1,15× lebih besar + blur 14 px, turun dalam 5 frame.
- **Slow push** di scene grafis: +2,5% per detik.
- **B-roll foto**: push 8% + rotasi 2,5° → 0, vignette.

## 6. Cut & transisi
| Nama | Durasi | Dipakai |
|---|---|---|
| `cut` | 0 | default antar shot talking head (+ punch-in) |
| `dip` | 6 fr | antar scene grafis (HP besar → HP + bullet) |
| `panDown` | 10 fr | ikon → ikon, dengan garis putus-putus penghubung |
| `slideLeft` | 6 fr | ganti isi (kartu Standard → Cent) |

## 7. Animasi teks & grafis (frame @25 fps)
| Gaya | Detail |
|---|---|
| `fade` (default) | 4 fr fade + blur 12 px + naik 14 px, jeda antar baris 5 fr |
| `flicker` | kedip 6 fr, lalu kotak merah wipe dari kiri 7 fr (mulai +8 fr) |
| `strike` | garis coret merah tergambar 6 fr (mulai +10 fr) |
| `type` | ketik per huruf, 20 huruf/detik |
| `words` | per kata, jeda 4 fr, fade + blur |
| Ikon | terbang dari bawah, rotasi −18° → 0, blur, memantul, ±18 fr |
| Anotasi | garis merah putus-putus tergambar 10 fr |
| Angka | bergulir 8 fr ($1000 → $999) |

## 8. Belum ada di referensi / perlu konfirmasi
- File font Campton Book & Bold → `public/brand/fonts/` (belum ada di repo).
- Aset ikon asli (otak "!?", lampu, papan gabus) → `public/assets/`.
- SFX (whoosh, pop) & musik: belum terdengar dianalisis.
- Caption per kata: tidak dipakai di referensi; komponen tetap tersedia.
