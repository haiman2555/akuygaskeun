/**
 * StackText — teks bertumpuk khas referensi, satu komponen untuk semua kasus:
 *
 *   "Fokusmu" (kotak merah, kedip) / "Bukan" (light) / "Duit" (black, dicoret)
 *   "XAUUSD" / "butuh" / "ruang gerak"
 *   "Paling kecil" / "SL (-70 Pips)"           (ketik per huruf)
 *   "Step #2" (serif glow) / "{Paham} Karakteristik" / "XAUUSD"
 *   "Jadi lebih **mengerti**" / "tentang ilmu market"   (muncul per kata)
 *
 * Markup: {kata} = kuning, **kata** = Bold (di baris Book).
 */
import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeOut, flicker, progress } from "../../../lib/motion";
import { parseMarkup, textStyle, type ColorKey, type WeightKey } from "../../../lib/text-style";
import { colors, motion, sizes, text as T, weights, type SizeKey } from "../../../style/tokens";

export type LineIn = "fade" | "flicker" | "type" | "words" | "none";

export type TextLine = {
  text: string;
  size?: SizeKey;
  weight?: WeightKey;
  color?: ColorKey;
  serif?: boolean;
  /** Animasi masuk baris ini. Default "fade" (fade + blur + naik sedikit). */
  in?: LineIn;
  /** Kotak merah yang wipe dari kiri di belakang teks. */
  box?: boolean;
  /** Garis coret merah yang tergambar kiri -> kanan. */
  strike?: boolean;
  /** Mulai (frame, relatif awal overlay). Default: index × motion.lineStagger. */
  delay?: number;
  /** Geser horizontal baris (px). */
  indent?: number;
};

export type StackTextProps = {
  lines: TextLine[];
  /** Posisi jangkar dalam px kanvas 1080x1920. */
  x: number;
  y: number;
  align?: "left" | "center" | "right";
  /** Jarak antar baris tambahan (px). */
  gap?: number;
  stagger?: number;
};

type Unit = { text: string; color?: string; weight?: number };

const unitsOf = (line: TextLine, mode: "chars" | "words"): Unit[] => {
  const units: Unit[] = [];
  parseMarkup(line.text).forEach((span) => {
    const style = {
      color: span.accent ? colors.yellow : undefined,
      weight: span.strong ? weights.bold : undefined,
    };
    const parts = mode === "chars" ? Array.from(span.text) : span.text.split(/(\s+)/).filter(Boolean);
    parts.forEach((p) => units.push({ text: p, ...style }));
  });
  return units;
};

const Line: React.FC<{ line: TextLine; start: number; frame: number; fps: number }> = ({ line, start, frame, fps }) => {
  const size = line.size ?? "m";
  const base = textStyle(size, line.weight ?? "bold", { serif: line.serif, color: line.color });
  const mode = line.in ?? "fade";

  // ---- animasi tingkat baris
  let opacity = 1;
  let blur = 0;
  let dy = 0;
  if (mode === "fade") {
    const p = progress(frame, start, motion.lineIn);
    opacity = p;
    blur = (1 - p) * motion.lineBlur;
    dy = (1 - p) * 14;
  } else if (mode === "flicker") {
    opacity = flicker(frame, start, motion.flickerFrames);
  } else if (mode === "none") {
    opacity = frame >= start ? 1 : 0;
  }

  // ---- isi: per huruf / per kata / span biasa
  let content: React.ReactNode;
  if (mode === "type" || mode === "words") {
    const units = unitsOf(line, mode === "type" ? "chars" : "words");
    const perUnit = mode === "type" ? fps / motion.typeCharsPerSecond : motion.wordStagger;
    content = units.map((u, i) => {
      const s = start + i * perUnit;
      const p = mode === "type" ? interpolate(frame, [s, s + perUnit * 1.5], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : progress(frame, s, motion.lineIn);
      return (
        <span
          key={i}
          style={{
            color: u.color,
            fontWeight: u.weight,
            opacity: p,
            filter: mode === "words" && p < 1 ? `blur(${(1 - p) * motion.lineBlur}px)` : undefined,
          }}
        >
          {u.text}
        </span>
      );
    });
  } else {
    content = parseMarkup(line.text).map((s, i) => (
      <span key={i} style={{ color: s.accent ? colors.yellow : undefined, fontWeight: s.strong ? weights.bold : undefined }}>
        {s.text}
      </span>
    ));
  }

  // ---- kotak merah & coretan
  const boxP = line.box ? progress(frame, start + motion.boxWipeDelay, motion.boxWipeFrames) : 0;
  const strikeP = line.strike ? progress(frame, start + motion.strikeDelay, motion.strikeFrames) : 0;
  const fs = sizes[size];

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        marginLeft: line.indent ?? 0,
        padding: line.box ? `${T.boxPadY * fs}px ${T.boxPadX * fs}px` : 0,
      }}
    >
      {line.box ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: colors.red,
            transform: `scaleX(${boxP})`,
            transformOrigin: "left center",
            boxShadow: `0 0 24px ${colors.red}88`,
          }}
        />
      ) : null}
      <div
        style={{
          ...base,
          position: "relative",
          opacity,
          filter: blur > 0.2 ? `blur(${blur}px)` : undefined,
          transform: `translateY(${dy}px)`,
        }}
      >
        {content}
      </div>
      {line.strike ? (
        <div
          style={{
            position: "absolute",
            left: -0.08 * fs,
            right: -0.02 * fs,
            top: "54%",
            height: Math.max(4, T.strikeThickness * fs),
            background: colors.redBright,
            transform: `scaleX(${strikeP})`,
            transformOrigin: "left center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.35)",
          }}
        />
      ) : null}
    </div>
  );
};

export const StackText: React.FC<StackTextProps> = ({ lines, x, y, align = "left", gap = 6, stagger = motion.lineStagger }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const out = fadeOut(frame, durationInFrames, motion.textOut);

  const pos: React.CSSProperties =
    align === "left"
      ? { left: x }
      : align === "right"
        ? { right: 1080 - x }
        : { left: x, transform: "translateX(-50%)" };

  return (
    <AbsoluteFill style={{ opacity: out }}>
      <div
        style={{
          position: "absolute",
          top: y,
          ...pos,
          display: "flex",
          flexDirection: "column",
          alignItems: align === "left" ? "flex-start" : align === "right" ? "flex-end" : "center",
          gap,
        }}
      >
        {lines.map((line, i) => (
          <Line key={i} line={line} start={line.delay ?? i * stagger} frame={frame} fps={fps} />
        ))}
      </div>
    </AbsoluteFill>
  );
};
