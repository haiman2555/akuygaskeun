import React from "react";
import { AbsoluteFill } from "remotion";
import { fonts } from "../style/tokens";

/**
 * Pengganti footage talking-head di StyleBoard (tanpa file video):
 * latar studio hangat + siluet orang. Supaya posisi teks bisa dinilai.
 */
export const Placeholder: React.FC<{ label?: string; tone?: "warm" | "dark" }> = ({ label = "A-roll", tone = "warm" }) => (
  <AbsoluteFill
    style={{
      background:
        tone === "warm"
          ? "linear-gradient(180deg, #B08E55 0%, #8C6B3A 48%, #D9D4CC 50%, #BDB6AC 100%)"
          : "linear-gradient(180deg, #0c0c0c 0%, #2a1a0a 35%, #6b4421 60%, #3a2412 100%)",
    }}
  >
    <svg viewBox="0 0 1080 1920" width="100%" height="100%">
      <ellipse cx="420" cy="720" rx="200" ry="240" fill="#1d1a18" />
      <path d="M40 1920 C40 1300 200 1060 420 1060 C640 1060 800 1300 800 1920 Z" fill="#141210" />
      <rect x="560" y="980" width="320" height="90" rx="45" fill="#0a0a0a" transform="rotate(18 720 1025)" />
    </svg>
    <div style={{ position: "absolute", bottom: 40, right: 40, fontFamily: fonts.sans, fontSize: 30, color: "rgba(255,255,255,0.6)" }}>
      {label}
    </div>
  </AbsoluteFill>
);
