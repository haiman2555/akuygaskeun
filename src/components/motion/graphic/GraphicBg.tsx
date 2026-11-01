import React from "react";
import { AbsoluteFill } from "remotion";
import { colors } from "../../../style/tokens";

/** Latar scene grafis: abu di atas -> hitam di bawah (Montage_Editing). */
export const GraphicBg: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill
    style={{
      background: `linear-gradient(180deg, ${colors.graphicBgTop} 0%, ${colors.graphicBgMid} 55%, ${colors.graphicBgBottom} 100%)`,
    }}
  >
    {children}
  </AbsoluteFill>
);

/** Bayangan gelap dari atas/bawah, untuk teks judul di atas footage (Masukan_Ini). */
export const Shade: React.FC<{ side?: "top" | "bottom"; height?: number; strength?: number }> = ({
  side = "top",
  height = 760,
  strength = 0.85,
}) => (
  <AbsoluteFill style={{ pointerEvents: "none" }}>
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        [side]: 0,
        height,
        background: `linear-gradient(${side === "top" ? "180deg" : "0deg"}, rgba(0,0,0,${strength}) 0%, rgba(0,0,0,${strength * 0.6}) 45%, rgba(0,0,0,0) 100%)`,
      }}
    />
  </AbsoluteFill>
);
