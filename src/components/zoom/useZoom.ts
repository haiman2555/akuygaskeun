import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { easeInOut, easeOut } from "../../lib/motion";
import { zoom as Z } from "../../style/tokens";

/** Keyframe zoom/fokus; `at` dalam frame relatif awal klip. x/y = titik fokus 0..1. */
export type ZoomKey = { at: number; x?: number; y?: number; zoom?: number };

export type ZoomOptions = {
  /** Skala dasar (1 = lebar, zoom.tight = rapat). */
  base?: number;
  /** Punch-in saat cut: mulai lebih besar + blur, turun ke base. */
  punch?: boolean;
  /** Slow push: kenaikan skala per detik. true = nilai default dari token. */
  push?: boolean | number;
  keys?: ZoomKey[];
};

const sample = (keys: ZoomKey[], frame: number, prop: "x" | "y" | "zoom", fallback: number) => {
  const pts = keys.filter((k) => k[prop] !== undefined).sort((a, b) => a.at - b.at);
  if (pts.length === 0) return fallback;
  if (pts.length === 1) return pts[0][prop] as number;
  return interpolate(
    frame,
    pts.map((p) => p.at),
    pts.map((p) => p[prop] as number),
    { easing: easeInOut, extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
};

/** Menggabungkan base × keyframe × push × punch menjadi satu skala + blur. */
export const useZoom = ({ base = 1, punch = false, push = false, keys = [] }: ZoomOptions) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pushRate = push === true ? Z.pushPerSecond : typeof push === "number" ? push : 0;
  const pushScale = 1 + pushRate * (frame / fps);

  const punchP = punch
    ? interpolate(frame, [0, Z.punchFrames], [0, 1], { easing: easeOut, extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 1;
  const punchScale = interpolate(punchP, [0, 1], [Z.punchOvershoot, 1]);
  const blur = punch ? interpolate(punchP, [0, 0.6], [Z.punchBlur, 0], { extrapolateRight: "clamp" }) : 0;

  const scale = base * sample(keys, frame, "zoom", 1) * pushScale * punchScale;
  return {
    scale,
    blur,
    x: sample(keys, frame, "x", 0.5),
    y: sample(keys, frame, "y", 0.5),
  };
};
