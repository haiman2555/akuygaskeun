/**
 * Transisi antar klip sesuai referensi.
 *
 * - "cut"       : hard cut (default). Untuk efek punch-in di shot berikutnya,
 *                 set `punch: true` pada klip itu, bukan di sini.
 * - "dip"       : dip to black singkat (scene grafis -> scene grafis).
 * - "panDown"   : kamera "turun" — isi lama turun keluar, isi baru masuk dari atas
 *                 dengan motion blur (otak -> lampu di Montage_Editing).
 * - "panUp"     : kebalikannya.
 * - "slideLeft" : geser horizontal dengan blur (kartu Standard -> Cent).
 * - "fade"      : crossfade biasa.
 */
import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import {
  linearTiming,
  type TransitionPresentation,
  type TransitionPresentationComponentProps,
  type TransitionTiming,
} from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { easeInOut } from "../../lib/motion";
import { cuts } from "../../style/tokens";

export type TransitionName = "cut" | "dip" | "panDown" | "panUp" | "slideLeft" | "fade";

type NoProps = Record<string, never>;
type P = TransitionPresentationComponentProps<NoProps>;

const Dip: React.FC<P> = ({ children, presentationDirection, presentationProgress: p }) => {
  const opacity =
    presentationDirection === "exiting"
      ? interpolate(p, [0, 0.5], [1, 0], { extrapolateRight: "clamp" })
      : interpolate(p, [0.5, 1], [0, 1], { extrapolateLeft: "clamp" });
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};

const makeMove = (axis: "X" | "Y", dir: 1 | -1): React.FC<P> => {
  const Move: React.FC<P> = ({ children, presentationDirection, presentationProgress }) => {
    const p = easeInOut(presentationProgress);
    const exiting = presentationDirection === "exiting";
    const offset = exiting ? interpolate(p, [0, 1], [0, 100 * dir]) : interpolate(p, [0, 1], [-100 * dir, 0]);
    const blur = Math.sin(presentationProgress * Math.PI) * cuts.panBlur;
    // motion blur searah gerak: blur + sedikit stretch pada sumbu gerak
    const stretch = 1 + Math.sin(presentationProgress * Math.PI) * 0.06;
    return (
      <AbsoluteFill
        style={{
          transform: `translate${axis}(${offset}%) scale${axis}(${stretch})`,
          filter: blur > 0.5 ? `blur(${blur}px)` : undefined,
        }}
      >
        {children}
      </AbsoluteFill>
    );
  };
  return Move;
};

const PanDown = makeMove("Y", 1);
const PanUp = makeMove("Y", -1);
const SlideLeft = makeMove("X", -1);

const pres = (component: React.FC<P>): TransitionPresentation<NoProps> => ({ component, props: {} });

export const transitionFrames = (name: TransitionName): number => {
  switch (name) {
    case "cut":
      return 0;
    case "dip":
      return cuts.dipFrames;
    case "panDown":
    case "panUp":
      return cuts.panFrames;
    case "slideLeft":
      return cuts.slideFrames;
    case "fade":
      return 8;
  }
};

export const getTransition = (
  name: TransitionName,
  frames: number = transitionFrames(name)
): { presentation: TransitionPresentation<any>; timing: TransitionTiming } | null => {
  if (name === "cut" || frames <= 0) return null;
  const timing = linearTiming({ durationInFrames: frames });
  switch (name) {
    case "dip":
      return { presentation: pres(Dip), timing };
    case "panDown":
      return { presentation: pres(PanDown), timing };
    case "panUp":
      return { presentation: pres(PanUp), timing };
    case "slideLeft":
      return { presentation: pres(SlideLeft), timing };
    case "fade":
      return { presentation: fade(), timing };
  }
};
