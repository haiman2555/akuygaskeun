/**
 * Format "edit" — deskripsi satu video di src/projects/<slug>/edit.ts.
 * Claude Code mengedit file ini, bukan komponen.
 *
 * SEMUA WAKTU DALAM DETIK (klip, overlay, props scene, delay baris teks),
 * kecuali caption (milidetik). Konversi ke frame dilakukan oleh EditTimeline.
 */
import type { CaptionWord } from "../components/captions/WordCaptions";
import type { TransitionName } from "../components/cuts/transitions";
import { transitionFrames } from "../components/cuts/transitions";
import type { TextLine } from "../components/motion/text/StackText";
import type { SceneName } from "../scenes";
import { FORMAT } from "../style/tokens";

/* ------------------------------------------------------------------ klip */

type ClipBase = {
  /** Transisi ke klip BERIKUTNYA. Default "cut". */
  transition?: TransitionName;
  /** Punch-in di awal klip ini (mulai lebih besar + blur, lalu turun). */
  punch?: boolean;
  /** Slow push sepanjang klip. true = default token, angka = skala per detik. */
  push?: boolean | number;
  /** Keyframe zoom/fokus; t dalam detik relatif awal klip. */
  zoom?: { t: number; x?: number; y?: number; zoom?: number }[];
  /** Bayangan gelap atas/bawah untuk teks judul. */
  shade?: "top" | "bottom";
};

export type VideoClip = ClipBase & {
  kind: "video";
  /** Path relatif ke public/, mis. "footage/contoh/A001.mp4" */
  src: string;
  in: number;
  out: number;
  /**
   * "wide" (1×) atau "tight" (zoom.tight, ±1.35×), atau angka skala.
   * Jika kosong dan edit.alternateFraming = true, otomatis selang-seling.
   */
  framing?: "wide" | "tight" | number;
  /** Titik fokus 0..1 pada footage (default x .5, y .4 = wajah). */
  focus?: { x: number; y: number };
  /** Resolusi sumber; default 4K vertikal 2160x3840. Landscape 4K: 3840x2160. */
  sourceWidth?: number;
  sourceHeight?: number;
  speed?: number;
  volume?: number;
};

export type ImageClip = ClipBase & {
  kind: "image";
  src: string;
  dur: number;
  vignette?: boolean;
  /** Rotasi awal kamera (derajat) yang pelan kembali ke 0. */
  rotate?: number;
  background?: string;
};

export type GraphicClip = ClipBase & {
  kind: "graphic";
  scene: SceneName;
  dur: number;
  props?: Record<string, unknown>;
};

export type Clip = VideoClip | ImageClip | GraphicClip;

/* ------------------------------------------------------------------ overlay */

export type Overlay =
  | {
      type: "text";
      at: number;
      dur: number;
      x: number;
      y: number;
      align?: "left" | "center" | "right";
      /** delay per baris dalam detik (opsional). */
      lines: (Omit<TextLine, "delay"> & { delay?: number })[];
    }
  | { type: "path"; at: number; dur: number; d: string; color?: "red" | "white"; dashed?: boolean; width?: number }
  | { type: "icon"; at: number; dur: number; x: number; y: number; size: number; src?: string; from?: "bottom" | "top" | "left" | "right" | "scale" }
  | { type: "shade"; at: number; dur: number; side?: "top" | "bottom" }
  | { type: "sfx"; at: number; src: string; volume?: number };

/* ------------------------------------------------------------------ edit */

export type Edit = {
  id: string;
  clips: Clip[];
  overlays?: Overlay[];
  /** Jump cut selang-seling lebar/rapat untuk klip video tanpa `framing`. Default true. */
  alternateFraming?: boolean;
  /** Punch-in otomatis saat cut dari video ke shot rapat. Default true. */
  autoPunch?: boolean;
  captions?: CaptionWord[];
  music?: { src: string; volume?: number; startAt?: number };
};

/* ------------------------------------------------------------------ helper */

export const clipFrames = (c: Clip, fps: number = FORMAT.fps) =>
  Math.max(1, Math.round((c.kind === "video" ? (c.out - c.in) / (c.speed ?? 1) : c.dur) * fps));

export const clipTransitionFrames = (c: Clip) => transitionFrames(c.transition ?? "cut");

/** Total durasi (frame) setelah dikurangi overlap transisi. */
export const editDuration = (edit: Edit, fps: number = FORMAT.fps) => {
  let total = 0;
  edit.clips.forEach((c, i) => {
    total += clipFrames(c, fps);
    if (i < edit.clips.length - 1) total -= clipTransitionFrames(c);
  });
  return Math.max(1, total);
};

/** Titik mulai (detik) tiap klip di timeline hasil edit — untuk menempatkan overlay/caption. */
export const clipStarts = (edit: Edit, fps: number = FORMAT.fps) => {
  const starts: number[] = [];
  let f = 0;
  edit.clips.forEach((c) => {
    starts.push(f / fps);
    f += clipFrames(c, fps) - clipTransitionFrames(c);
  });
  return starts;
};
