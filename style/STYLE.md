# Style Guide

> Status: **PLACEHOLDER** — belum diisi dari style asli.
> Isi dokumen ini dari video referensi, screenshot penempatan, brand kit,
> dan deskripsi Anda (Claude Code bisa melakukannya lewat `/extract-style`).
> Setiap nilai di sini harus tercermin di `src/style/tokens.ts`.

## 1. Karakter umum
- Energi / tempo: _(mis. cepat & punchy, potongan tiap 1–2 detik)_
- Kesan: _(mis. bersih, bold, playful, sinematik)_

## 2. Warna
| Peran | Hex | Catatan |
|---|---|---|
| Aksen utama | `#FFD400` | highlight kata, bar lower third |
| Aksen kedua | `#FF3D6E` | |
| Teks | `#FFFFFF` | |
| Latar kotak | `rgba(10,10,10,0.72)` | |

## 3. Tipografi
| Elemen | Font | Weight | Ukuran (px @1080w) | Huruf besar? |
|---|---|---|---|---|
| Judul | Montserrat | 900 | 112 | ya |
| Subjudul | Inter | 700 | 56 | tidak |
| Caption | Montserrat | 900 | 76 | ya |
| Lower third nama | Montserrat | 800 | 54 | tidak |

Outline / shadow teks: _(mis. tanpa outline, shadow lembut)_

## 4. Penempatan (dari screenshot)
| Elemen | Posisi Y (px dari atas) | Rata | Catatan |
|---|---|---|---|
| Judul | 380 | tengah | |
| Caption bicara | 1180 | tengah | 3 kata per halaman |
| Lower third | di atas 1440 | kiri | |
| Logo | kiri atas | | |

## 5. Gerak
- Judul masuk: _(pop / slideUp / fade / typewriter)_, durasi ~12 frame, stagger per kata 3 frame
- Caption: _(highlight kotak kuning pada kata aktif / box / plain)_
- Transisi default: _(zoomPunch / whip / slide / fade / cut)_, ~10 frame
- Reframe: _(punch-in pada kalimat penting? Ken Burns halus?)_

## 6. Audio
- SFX transisi: _(whoosh? pop?)_
- Musik: volume relatif _(mis. 20–25%)_ di bawah suara

## 7. Larangan / catatan
- _(mis. jangan pakai lebih dari 2 warna aksen dalam satu frame)_
