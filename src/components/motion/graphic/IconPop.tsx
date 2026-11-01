import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeOut } from "../../../lib/motion";
import { motion, springs } from "../../../style/tokens";

/**
 * Ikon / ilustrasi yang terbang masuk dengan rotasi + blur lalu memantul
 * (ikon otak "!?" di Montage_Editing). Pakai `src` (PNG/SVG di public/)
 * atau children (SVG inline).
 */
export const IconPop: React.FC<{
  x: number; // pusat
  y: number; // pusat
  size: number;
  src?: string;
  from?: "bottom" | "top" | "left" | "right" | "scale";
  delay?: number;
  /** Gerak mengambang pelan setelah masuk. */
  float?: boolean;
  children?: React.ReactNode;
}> = ({ x, y, size, src, from = "bottom", delay = 0, float = true, children }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: springs.pop, durationInFrames: motion.iconFrames });

  const dist = 900;
  const dx = from === "left" ? -dist : from === "right" ? dist : 0;
  const dy = from === "bottom" ? dist : from === "top" ? -dist : 0;
  const tx = interpolate(p, [0, 1], [dx, 0]);
  const ty = interpolate(p, [0, 1], [dy, 0]);
  const rot = from === "scale" ? 0 : interpolate(p, [0, 1], [motion.iconRotate, 0]);
  const sc = from === "scale" ? interpolate(p, [0, 1], [0.3, 1]) : 1;
  const blur = interpolate(Math.min(1, p), [0, 0.8], [16, 0], { extrapolateRight: "clamp" });
  const bob = float ? Math.sin(((frame - delay) / fps) * 2.2) * 6 : 0;
  const out = fadeOut(frame, durationInFrames, motion.textOut);

  return (
    <div
      style={{
        position: "absolute",
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        opacity: out,
        transform: `translate(${tx}px, ${ty + bob}px) rotate(${rot}deg) scale(${sc})`,
        filter: blur > 0.3 ? `blur(${blur}px)` : undefined,
      }}
    >
      {src ? <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "contain" }} /> : children}
    </div>
  );
};
