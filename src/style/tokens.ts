/**
 * STYLE TOKENS — satu-satunya sumber kebenaran untuk "look" animasi.
 *
 * Semua komponen membaca nilai dari sini. Untuk mengganti style seluruh
 * video, ubah file ini (dan style/STYLE.md), bukan komponen satu per satu.
 *
 * Nilai di bawah masih PLACEHOLDER. Ganti dengan style asli Anda
 * (lihat style/STYLE.md dan perintah /extract-style di Claude Code).
 */

export const FORMAT = {
  width: 1080,
  height: 1920,
  fps: 30,
} as const;

export const colors = {
  primary: "#FFD400", // warna aksen utama (highlight kata, garis, bar)
  secondary: "#FF3D6E",
  text: "#FFFFFF",
  textOnPrimary: "#111111",
  shadow: "rgba(0,0,0,0.55)",
  boxBg: "rgba(10,10,10,0.72)", // latar kotak lower third / caption box
} as const;

export const fonts = {
  // Nama family; dimuat di src/style/fonts.ts
  heading: "Montserrat",
  body: "Inter",
} as const;

export const type = {
  title: { size: 112, weight: 900, lineHeight: 1.0, letterSpacing: -2, uppercase: true },
  subtitle: { size: 56, weight: 700, lineHeight: 1.1, letterSpacing: 0, uppercase: false },
  caption: { size: 76, weight: 900, lineHeight: 1.05, letterSpacing: -1, uppercase: true },
  lowerThirdName: { size: 54, weight: 800, lineHeight: 1.0, letterSpacing: 0, uppercase: false },
  lowerThirdRole: { size: 36, weight: 500, lineHeight: 1.1, letterSpacing: 1, uppercase: true },
} as const;

/** Ketebalan stroke & bayangan teks agar tetap terbaca di atas footage. */
export const textTreatment = {
  strokeWidth: 0, // px, 0 = tanpa outline
  strokeColor: "#000000",
  shadow: "0 6px 24px rgba(0,0,0,0.55)",
} as const;

/** Durasi standar (dalam frame @30fps). */
export const timing = {
  textIn: 12,
  textOut: 8,
  transition: 10,
  lowerThirdHold: 90,
  wordStagger: 3, // jeda antar kata saat animasi masuk per kata
} as const;

/** Konfigurasi spring Remotion untuk karakter gerak. */
export const springs = {
  snappy: { damping: 14, stiffness: 180, mass: 0.6 },
  smooth: { damping: 200, stiffness: 100, mass: 1 },
  bouncy: { damping: 9, stiffness: 160, mass: 0.7 },
} as const;

/** Gaya default tiap elemen — pilih salah satu varian yang tersedia. */
export const defaults = {
  titleIn: "pop" as "pop" | "slideUp" | "fade" | "typewriter",
  captionStyle: "highlight" as "highlight" | "box" | "plain",
  captionWordsPerPage: 3,
  transition: "zoomPunch" as "cut" | "fade" | "slideLeft" | "slideUp" | "wipe" | "zoomPunch" | "whip",
  lowerThird: "bar" as "bar" | "box",
} as const;

/** Radius & spasi. */
export const layout = {
  radius: 18,
  padding: 28,
} as const;
