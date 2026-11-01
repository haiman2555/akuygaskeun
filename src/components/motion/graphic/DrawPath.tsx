import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeOut, progress } from "../../../lib/motion";
import { colors, motion } from "../../../style/tokens";

/**
 * Garis SVG yang tergambar sepanjang jalurnya — anotasi merah putus-putus
 * (Masukan_Ini) atau garis penghubung putih vertikal (Montage_Editing).
 * `d` memakai koordinat kanvas 1080x1920.
 */
export const DrawPath: React.FC<{
  d: string;
  color?: "red" | "white";
  width?: number;
  dashed?: boolean;
  delay?: number;
  frames?: number;
  /** Jika true, garis tidak memudar di akhir overlay. */
  persist?: boolean;
}> = ({ d, color = "red", width = 7, dashed = true, delay = 0, frames = motion.pathDrawFrames, persist = false }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const p = progress(frame, delay, frames);
  const id = React.useMemo(() => `m${Math.random().toString(36).slice(2, 8)}`, []);
  const stroke = color === "red" ? colors.redBright : colors.white;
  return (
    <AbsoluteFill style={{ opacity: persist ? 1 : fadeOut(frame, durationInFrames, motion.textOut) }}>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{ overflow: "visible" }}>
        <defs>
          <mask id={id} maskUnits="userSpaceOnUse" x={-200} y={-200} width={1480} height={2320}>
            <path d={d} pathLength={1} stroke="white" strokeWidth={width * 3} fill="none" strokeDasharray="1 1" strokeDashoffset={1 - p} />
          </mask>
        </defs>
        <path
          d={d}
          stroke={stroke}
          strokeWidth={width}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={dashed ? `${width * 3} ${width * 2.4}` : undefined}
          mask={`url(#${id})`}
          style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.4))" }}
        />
      </svg>
    </AbsoluteFill>
  );
};
