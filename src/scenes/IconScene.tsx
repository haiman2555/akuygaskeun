import React from "react";
import { AbsoluteFill } from "remotion";
import { GraphicBg } from "../components/motion/graphic/GraphicBg";
import { IconPop } from "../components/motion/graphic/IconPop";
import { DrawPath } from "../components/motion/graphic/DrawPath";

/** Lampu bawaan (placeholder). Ganti dengan aset Anda lewat `src`. */
export const BulbIcon: React.FC = () => (
  <svg viewBox="0 0 200 200" width="100%" height="100%">
    <g stroke="#F9C846" strokeWidth="9" strokeLinecap="round">
      <line x1="100" y1="8" x2="100" y2="30" />
      <line x1="34" y1="38" x2="50" y2="54" />
      <line x1="166" y1="38" x2="150" y2="54" />
      <line x1="12" y1="98" x2="34" y2="98" />
      <line x1="166" y1="98" x2="188" y2="98" />
    </g>
    <path d="M100 42 C64 42 46 68 46 94 C46 116 60 128 70 140 L130 140 C140 128 154 116 154 94 C154 68 136 42 100 42 Z" fill="#F9C846" />
    <path d="M86 140 L80 100 L92 108 L100 96 L108 108 L120 100 L114 140" stroke="#FDE7A8" strokeWidth="5" fill="none" />
    <rect x="72" y="142" width="56" height="12" rx="4" fill="#35506B" />
    <rect x="76" y="157" width="48" height="12" rx="4" fill="#35506B" />
    <rect x="86" y="172" width="28" height="10" rx="5" fill="#35506B" />
  </svg>
);

/** Ikon "bingung" bawaan (placeholder ikon otak "!?"). */
export const ThinkIcon: React.FC = () => (
  <svg viewBox="0 0 200 200" width="100%" height="100%">
    <path d="M20 200 C20 150 40 128 70 122 L130 122 C160 128 180 150 180 200 Z" fill="white" />
    <circle cx="100" cy="84" r="52" fill="white" stroke="#111" strokeWidth="5" />
    <path d="M78 84 c0-16 10-24 22-24 s22 8 22 24 -10 22-22 22 -22-6-22-22 M100 60 v46" stroke="#E80000" strokeWidth="5" fill="none" strokeLinecap="round" />
    <path d="M38 118 C26 96 34 70 50 62" stroke="white" strokeWidth="14" fill="none" strokeLinecap="round" />
    <text x="128" y="36" fill="white" fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="54" transform="rotate(12 150 20)">!?</text>
  </svg>
);

export type IconSceneProps = {
  /** Path aset di public/ (mis. "assets/icons/brain.png"). Kosong = ikon bawaan `builtin`. */
  src?: string;
  builtin?: "bulb" | "think";
  x?: number;
  y?: number;
  size?: number;
  from?: "bottom" | "top" | "left" | "right" | "scale";
  /** Garis putus-putus penghubung vertikal di atas/bawah ikon. */
  line?: "above" | "below" | "both" | "none";
};

/** Scene satu ilustrasi di latar abu (ikon otak / lampu di Montage_Editing). */
export const IconScene: React.FC<IconSceneProps> = ({ src, builtin = "bulb", x = 540, y = 1100, size = 560, from = "bottom", line = "none" }) => {
  const top = y - size / 2;
  const bottom = y + size / 2;
  return (
    <GraphicBg>
      <AbsoluteFill>
        {line === "above" || line === "both" ? (
          <DrawPath d={`M ${x} 0 L ${x} ${top - 20}`} color="white" width={6} frames={1} persist />
        ) : null}
        {line === "below" || line === "both" ? (
          <DrawPath d={`M ${x} ${bottom + 20} L ${x} 1920`} color="white" width={6} frames={1} persist />
        ) : null}
        <IconPop x={x} y={y} size={size} src={src} from={from}>
          {src ? null : builtin === "think" ? <ThinkIcon /> : <BulbIcon />}
        </IconPop>
      </AbsoluteFill>
    </GraphicBg>
  );
};
