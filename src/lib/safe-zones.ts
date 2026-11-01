/**
 * Safe zone untuk video vertikal (TikTok / Reels / Shorts) di kanvas 1080x1920.
 * Area di luar safe zone tertutup UI aplikasi (username, caption, tombol like).
 * Nilai ini konservatif; sesuaikan bila screenshot penempatan Anda berbeda.
 */
export const SAFE = {
  top: 220, // status bar + tab "Following/For You"
  bottom: 480, // caption, username, musik
  left: 60,
  right: 180, // kolom tombol like/comment/share
} as const;

/** Posisi Y (dari atas) untuk tiap slot penempatan yang dipakai komponen. */
export const SLOTS = {
  titleTop: 380,
  center: 960,
  captionCenter: 1180, // caption bicara: sedikit di bawah tengah
  lowerThird: 1920 - SAFE.bottom - 40, // tepat di atas area UI bawah
} as const;

export type Slot = keyof typeof SLOTS;
