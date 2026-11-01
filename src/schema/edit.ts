/**
 * Format "edit" — deskripsi satu video yang ditulis per project di
 * src/projects/<slug>/edit.ts. Claude Code mengedit file ini, bukan komponen.
 *
 * Semua waktu dalam DETIK (lebih mudah dibaca/diucapkan), dikonversi ke
 * frame oleh EditTimeline.
 */
import type { CaptionWord } from "../components/text/WordCaptions";
import type { TitleAnim } from "../components/text/AnimatedTitle";
import type { TransitionName } from "../components/transitions/presets";
import type { Slot } from "../lib/safe-zones";
import { FORMAT, timing } from "../style/tokens";

export type Clip = {
  /** Path relatif ke public/, mis. "footage/contoh/A001.mp4" */
  src: string;
  /** Titik masuk & keluar di file sumber (detik). */
  in: number;
  out: number;
  /** Resolusi sumber; default 3840x2160. Footage vertikal 4K: 2160x3840. */
  sourceWidth?: number;
  sourceHeight?: number;
  /** Reframe keyframe; `t` dalam detik relatif awal klip. */
  reframe?: { t: number; x?: number; y?: number; zoom?: number }[];
  autoDrift?: boolean;
  speed?: number;
  volume?: number;
  /** Transisi ke klip berikutnya. Default dari tokens. */
  transitionOut?: TransitionName;
  transitionFrames?: number;
};

export type Overlay =
  | { type: "title"; at: number; dur: number; text: string; subtitle?: string; anim?: TitleAnim; slot?: Slot; accentWords?: string[] }
  | { type: "lowerThird"; at: number; dur: number; name: string; role?: string; variant?: "bar" | "box" }
  | { type: "logo"; at: number; dur: number; src: string; corner?: "tl" | "tr" }
  | { type: "sfx"; at: number; src: string; volume?: number };

export type Edit = {
  id: string;
  clips: Clip[];
  overlays?: Overlay[];
  /** Caption per kata, waktu dalam ms relatif awal video (timeline hasil edit). */
  captions?: CaptionWord[];
  captionStyle?: "highlight" | "box" | "plain";
  music?: { src: string; volume?: number; startAt?: number };
  progressBar?: boolean;
};

export const clipFrames = (c: Clip, fps: number = FORMAT.fps) =>
  Math.max(1, Math.round(((c.out - c.in) / (c.speed ?? 1)) * fps));

export const transitionFramesOf = (c: Clip, defaultName: TransitionName): number => {
  const name = c.transitionOut ?? defaultName;
  return name === "cut" ? 0 : c.transitionFrames ?? timing.transition;
};

/** Total durasi timeline (frame) setelah dikurangi overlap transisi. */
export const editDuration = (edit: Edit, defaultTransition: TransitionName, fps: number = FORMAT.fps) => {
  let total = 0;
  edit.clips.forEach((c, i) => {
    total += clipFrames(c, fps);
    if (i < edit.clips.length - 1) total -= transitionFramesOf(c, defaultTransition);
  });
  return Math.max(1, total);
};
