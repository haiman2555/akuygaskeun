import { FORMAT } from "../style/tokens";

/** Detik -> frame (dibulatkan). */
export const sec = (s: number, fps: number = FORMAT.fps) => Math.round(s * fps);

/** Milidetik -> frame. */
export const ms = (m: number, fps: number = FORMAT.fps) => Math.round((m / 1000) * fps);

/** Timecode "mm:ss.ff" atau "ss.ff" atau angka detik -> frame. */
export const tc = (value: string | number, fps: number = FORMAT.fps): number => {
  if (typeof value === "number") return sec(value, fps);
  const parts = value.split(":").map(Number);
  const seconds = parts.length === 2 ? parts[0] * 60 + parts[1] : parts[0];
  return sec(seconds, fps);
};
