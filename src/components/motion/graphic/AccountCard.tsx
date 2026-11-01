import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { easeOut } from "../../../lib/motion";
import { colors, fonts, motion, weights } from "../../../style/tokens";

/** Angka yang bergulir dari `from` ke `to` mulai frame `at`. */
export const useRoll = (from: number, to: number, at: number, frames = motion.numberRollFrames) => {
  const frame = useCurrentFrame();
  return Math.round(
    interpolate(frame, [at, at + frames], [from, to], { easing: easeOut, extrapolateLeft: "clamp", extrapolateRight: "clamp" })
  );
};

const PersonIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx="50" cy="30" r="22" fill="white" />
    <path d="M8 98 C8 66 26 56 50 56 C74 56 92 66 92 98 Z" fill="white" />
  </svg>
);

/**
 * Kartu saldo bergradasi merah ("Cent Account / Balance: $999").
 * `value` atau pasangan `rollFrom` -> `value` dengan `rollAt` (frame).
 */
export const AccountCard: React.FC<{
  width: number;
  label: string;
  value: number;
  rollFrom?: number;
  rollAt?: number;
  prefix?: string;
}> = ({ width, label, value, rollFrom, rollAt = 0, prefix = "$" }) => {
  const shown = useRoll(rollFrom ?? value, value, rollAt);
  const u = width / 100;
  return (
    <div
      style={{
        width,
        height: width * 0.44,
        borderRadius: u * 3,
        background: `linear-gradient(120deg, ${colors.cardFrom} 0%, #8a0000 45%, ${colors.cardTo} 100%)`,
        boxShadow: "0 10px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)",
        display: "flex",
        alignItems: "center",
        gap: u * 7,
        padding: `0 ${u * 7}px`,
        boxSizing: "border-box",
        fontFamily: fonts.sans,
        color: colors.white,
      }}
    >
      <PersonIcon size={u * 30} />
      <div style={{ lineHeight: 1.1 }}>
        <div style={{ fontSize: u * 5.4, fontWeight: weights.regular }}>{label}</div>
        <div style={{ fontSize: u * 7.2, fontWeight: weights.bold }}>Balance:</div>
        <div style={{ fontSize: u * 11, fontWeight: weights.heavy }}>
          {prefix}
          {shown}
        </div>
      </div>
    </div>
  );
};

/** Baris posisi trading ("XAUUSD  sell 1 lot  -1.00") yang muncul berurutan. */
export const TradeRows: React.FC<{
  width: number;
  rows: { symbol: string; note?: string; value: string }[];
  at?: number;
}> = ({ width, rows, at = 0 }) => {
  const frame = useCurrentFrame();
  const u = width / 100;
  return (
    <div style={{ width, fontFamily: fonts.sans, display: "flex", flexDirection: "column", gap: u * 4 }}>
      {rows.map((r, i) => {
        const p = interpolate(frame, [at + i * 3, at + i * 3 + 5], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "baseline",
              borderBottom: `${Math.max(2, u * 0.6)}px solid ${colors.white}`,
              paddingBottom: u * 0.8,
              opacity: p,
              transform: `translateX(${(1 - p) * -20}px)`,
            }}
          >
            <span style={{ color: colors.white, fontSize: u * 7, fontWeight: weights.regular }}>{r.symbol}</span>
            <span style={{ color: colors.redBright, fontSize: u * 4, fontWeight: weights.bold, marginLeft: u * 2, flex: 1 }}>
              {r.note ?? ""}
            </span>
            <span style={{ color: colors.redBright, fontSize: u * 7, fontWeight: weights.regular }}>{r.value}</span>
          </div>
        );
      })}
    </div>
  );
};
