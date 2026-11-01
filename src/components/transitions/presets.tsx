import React, { useMemo } from "react";
import { AbsoluteFill, interpolate } from "remotion";
import {
  linearTiming,
  springTiming,
  type TransitionPresentation,
  type TransitionPresentationComponentProps,
  type TransitionTiming,
} from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { springs, timing } from "../../style/tokens";

export type TransitionName = "cut" | "fade" | "slideLeft" | "slideUp" | "wipe" | "zoomPunch" | "whip";

/* ---------- Custom: zoom punch (klip keluar zoom-in + blur, klip masuk dari zoom besar) ---------- */
type EmptyProps = Record<string, never>;

const ZoomPunch: React.FC<TransitionPresentationComponentProps<EmptyProps>> = ({
  children,
  presentationDirection,
  presentationProgress,
}) => {
  const style = useMemo<React.CSSProperties>(() => {
    if (presentationDirection === "exiting") {
      return {
        transform: `scale(${interpolate(presentationProgress, [0, 1], [1, 1.6])})`,
        filter: `blur(${interpolate(presentationProgress, [0, 1], [0, 18])}px)`,
        opacity: interpolate(presentationProgress, [0.5, 1], [1, 0], { extrapolateLeft: "clamp" }),
      };
    }
    return {
      transform: `scale(${interpolate(presentationProgress, [0, 1], [1.5, 1])})`,
      filter: `blur(${interpolate(presentationProgress, [0, 1], [14, 0])}px)`,
    };
  }, [presentationDirection, presentationProgress]);
  return <AbsoluteFill style={style}>{children}</AbsoluteFill>;
};

export const zoomPunch = (): TransitionPresentation<EmptyProps> => ({ component: ZoomPunch, props: {} });

/* ---------- Custom: whip pan (geser cepat + motion blur horizontal) ---------- */
const Whip: React.FC<TransitionPresentationComponentProps<EmptyProps>> = ({
  children,
  presentationDirection,
  presentationProgress,
}) => {
  const exiting = presentationDirection === "exiting";
  const x = exiting
    ? interpolate(presentationProgress, [0, 1], [0, -100])
    : interpolate(presentationProgress, [0, 1], [100, 0]);
  const blur = interpolate(Math.sin(presentationProgress * Math.PI), [0, 1], [0, 30]);
  return (
    <AbsoluteFill style={{ transform: `translateX(${x}%)`, filter: `blur(${blur}px)` }}>{children}</AbsoluteFill>
  );
};

export const whip = (): TransitionPresentation<EmptyProps> => ({ component: Whip, props: {} });

/* ---------- Registry: nama -> presentation + timing ---------- */
export const getTransition = (
  name: TransitionName,
  durationInFrames: number = timing.transition
): { presentation: TransitionPresentation<any>; timing: TransitionTiming } | null => {
  const lin = linearTiming({ durationInFrames });
  const spr = springTiming({ config: springs.smooth, durationInFrames });
  switch (name) {
    case "cut":
      return null;
    case "fade":
      return { presentation: fade(), timing: lin };
    case "slideLeft":
      return { presentation: slide({ direction: "from-right" }), timing: spr };
    case "slideUp":
      return { presentation: slide({ direction: "from-bottom" }), timing: spr };
    case "wipe":
      return { presentation: wipe({ direction: "from-left" }), timing: lin };
    case "zoomPunch":
      return { presentation: zoomPunch(), timing: lin };
    case "whip":
      return { presentation: whip(), timing: lin };
  }
};
