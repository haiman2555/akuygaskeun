import { Easing, interpolate } from "remotion";

export const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
export const easeInOut = Easing.bezier(0.65, 0, 0.35, 1);
export const easeIn = Easing.bezier(0.7, 0, 0.84, 0);

/** 0..1 dari `start` selama `dur` frame, dijepit. */
export const progress = (frame: number, start: number, dur: number, easing = easeOut) =>
  interpolate(frame, [start, start + Math.max(1, dur)], [0, 1], {
    easing,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

/**
 * Kedip masuk seperti "Fokusmu" di referensi: opasitas bergantian
 * terang/redup selama `dur` frame, lalu tetap 1.
 */
export const flicker = (frame: number, start: number, dur: number) => {
  const f = frame - start;
  if (f < 0) return 0;
  if (f >= dur) return 1;
  const pattern = [0.35, 1, 0.3, 0.9, 0.45, 1];
  return pattern[Math.floor((f / dur) * pattern.length)];
};

/** Opasitas keluar di akhir overlay. */
export const fadeOut = (frame: number, total: number, dur: number) =>
  interpolate(frame, [total - dur, total], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
