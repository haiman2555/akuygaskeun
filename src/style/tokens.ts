/**
 * STYLE TOKENS — diturunkan dari video referensi pengguna
 * (style/references/videos/Montage_Editing.mp4 & Masukan_Ini.mp4).
 * Detail pengukuran ada di style/STYLE.md.
 *
 * Semua komponen membaca nilai dari sini. Ubah di sini untuk mengubah style
 * semua video; jangan hardcode warna/ukuran/durasi di komponen atau project.
 */

export const FORMAT = {
  width: 1080,
  height: 1920,
  fps: 25, // referensi diekspor 25 fps
} as const;

/* ------------------------------------------------------------------ warna */
export const colors = {
  white: "#FFFFFF",
  red: "#C91216", // kotak highlight ("Fokusmu")
  redBright: "#E80000", // garis coret, anotasi putus-putus
  yellow: "#FDFE0C", // kata aksen ("Paham")
  black: "#030303",
  // latar scene grafis: abu atas -> hitam bawah
  graphicBgTop: "#666666",
  graphicBgMid: "#2B2B2B",
  graphicBgBottom: "#030303",
  // kartu saldo
  cardFrom: "#2F0000",
  cardTo: "#DA0001",
  phoneScreen: "#3A3A3A",
  textShadow: "rgba(0,0,0,0.55)",
} as const;

/* ------------------------------------------------------------------ font */
export const fonts = {
  // Campton (Book + Bold) dipakai bila filenya ada di public/brand/fonts
  // (lihat fonts.ts); jika tidak, jatuh ke Outfit (Google Font paling mirip).
  sans: "Campton, Outfit, sans-serif",
  serif: "'Noto Serif', Georgia, serif", // judul "Step #2"
} as const;

/** Hanya dua bobot, sesuai style: Campton Book & Campton Bold. */
export const weights = {
  book: 400,
  bold: 700,
} as const;

/** Ukuran teks dalam px pada kanvas 1080 lebar (diukur dari referensi). */
export const sizes = {
  xs: 36, // "= Saldo Normal x 100"
  sm: 44, // kutipan "Resiko 100x lebih rendah..."
  s: 56, // "ruang gerak", "tentang ilmu market"
  m: 78, // "Bukan", "SL (-70 Pips)", "Paham Karakteristik"
  ml: 96, // "XAUUSD" (di atas "butuh"), "SL (-70 Pips)"
  l: 120, // "Fokusmu", "Paling kecil", "butuh"
  xl: 200, // "Duit"
  title: 140, // "Step #2" (serif)
} as const;
export type SizeKey = keyof typeof sizes;

export const text = {
  lineHeight: 0.92, // tumpukan teks rapat
  tracking: "-0.014em", // tracking -14 (satuan 1/1000 em, seperti di AE/Premiere)
  shadow: "0 4px 18px rgba(0,0,0,0.55)",
  glow: "0 0 22px rgba(255,255,255,0.45)", // serif title
  boxPadX: 0.28, // em, padding kotak merah
  boxPadY: 0.1,
  strikeThickness: 0.07, // em, tebal garis coret
} as const;

/* ------------------------------------------------------------------ zoom */
export const zoom = {
  tight: 1.35, // shot rapat vs lebar pada jump cut
  punchOvershoot: 1.15, // frame pertama setelah cut lebih besar sekian kali
  punchFrames: 5, // waktu turun ke ukuran akhir
  punchBlur: 14, // px blur di frame pertama punch
  pushPerSecond: 0.025, // slow push: +2.5% skala per detik
  brollPush: 0.08, // total push untuk B-roll foto
  brollRotate: 2.5, // derajat rotasi pelan B-roll
} as const;

/* ------------------------------------------------------------------ cuts */
export const cuts = {
  dipFrames: 6, // dip to black total (keluar + masuk)
  panFrames: 10, // pan vertikal antar scene grafis
  slideFrames: 6, // geser horizontal
  panBlur: 10,
} as const;

/* ------------------------------------------------------------------ motion (frame @25fps) */
export const motion = {
  lineIn: 4, // fade+blur per baris teks
  lineBlur: 12,
  lineStagger: 5, // jeda antar baris dalam satu tumpukan
  wordStagger: 4, // muncul per kata
  flickerFrames: 6, // kedip sebelum teks tegas
  boxWipeDelay: 8, // kotak merah mulai wipe setelah teks muncul
  boxWipeFrames: 7,
  strikeDelay: 10, // garis coret mulai setelah kata muncul
  strikeFrames: 6,
  typeCharsPerSecond: 20, // ketik per huruf
  textOut: 4, // fade keluar di akhir overlay
  iconFrames: 18, // ikon terbang masuk
  iconRotate: -18,
  pathDrawFrames: 10, // gambar garis anotasi
  numberRollFrames: 8,
} as const;

/** Konfigurasi spring Remotion. */
export const springs = {
  snappy: { damping: 15, stiffness: 190, mass: 0.6 },
  smooth: { damping: 200, stiffness: 110, mass: 1 },
  pop: { damping: 11, stiffness: 150, mass: 0.7 },
} as const;
