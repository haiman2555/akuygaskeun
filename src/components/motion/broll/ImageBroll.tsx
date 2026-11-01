import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { easeInOut } from "../../../lib/motion";
import { zoom } from "../../../style/tokens";

/**
 * Foto/ilustrasi B-roll dengan gerak kamera pelan + rotasi + vignette
 * (papan gabus & sticky note di Masukan_Ini).
 */
export const ImageBroll: React.FC<{
  src: string;
  /** Total kenaikan skala sepanjang klip. */
  push?: number;
  /** Rotasi awal -> 0 (derajat). */
  rotate?: number;
  /** Geser fokus (0..1) dari -> ke. */
  fromY?: number;
  toY?: number;
  vignette?: boolean;
  background?: string;
}> = ({ src, push = zoom.brollPush, rotate = zoom.brollRotate, fromY = 0.5, toY = 0.5, vignette = true, background = "#3a0000" }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const t = interpolate(frame, [0, durationInFrames], [0, 1], { easing: easeInOut, extrapolateRight: "clamp" });
  const scale = 1.06 + push * t;
  const rot = rotate * (1 - t);
  const oy = fromY + (toY - fromY) * t;
  return (
    <AbsoluteFill style={{ background, overflow: "hidden" }}>
      <AbsoluteFill style={{ transform: `rotate(${rot}deg) scale(${scale})`, transformOrigin: `50% ${oy * 100}%` }}>
        <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </AbsoluteFill>
      {vignette ? (
        <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.65) 100%)" }} />
      ) : null}
    </AbsoluteFill>
  );
};
