import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { GraphicBg } from "../components/motion/graphic/GraphicBg";
import { PhoneMockup } from "../components/motion/graphic/PhoneMockup";
import { AccountCard, TradeRows } from "../components/motion/graphic/AccountCard";
import { easeInOut } from "../lib/motion";
import { cuts } from "../style/tokens";

export type PhoneAccountProps = {
  /** Posisi pusat & lebar HP (px kanvas). Default di tengah. */
  x?: number;
  y?: number;
  width?: number;
  /**
   * Kartu berurutan. Kartu ke-2 dst. geser masuk dari kanan pada detik `at`.
   * `rollFrom` + `rollAt` (detik) = angka bergulir ke `value`.
   */
  cards: { label: string; value: number; rollFrom?: number; rollAt?: number; at?: number }[];
  rows?: { symbol: string; note?: string; value: string }[];
  /** Detik munculnya baris trading. */
  rowsAt?: number;
};

/** HP dengan kartu saldo (+ baris trading) — scene Montage_Editing 0–8 dtk. */
export const PhoneAccount: React.FC<PhoneAccountProps> = ({ x = 540, y = 960, width = 460, cards, rows, rowsAt = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = (s?: number) => Math.round((s ?? 0) * fps);
  const screenW = width * 0.84;
  const cardW = screenW * 0.86;

  let active = 0;
  cards.forEach((c, i) => {
    if (i > 0 && frame >= f(c.at)) active = i;
  });
  const swapAt = f(cards[active].at);
  const swapP =
    active > 0
      ? interpolate(frame, [swapAt, swapAt + cuts.slideFrames], [0, 1], { easing: easeInOut, extrapolateLeft: "clamp", extrapolateRight: "clamp" })
      : 1;
  const blur = Math.sin(swapP * Math.PI) * 10;

  const cardStyle = (offset: number): React.CSSProperties => ({
    position: "absolute",
    top: screenW * 0.25,
    left: (screenW - cardW) / 2,
    transform: `translateX(${offset * screenW}px)`,
    filter: blur > 0.5 ? `blur(${blur}px)` : undefined,
  });

  const cur = cards[active];
  const prev = active > 0 ? cards[active - 1] : null;

  return (
    <GraphicBg>
      <AbsoluteFill>
        <PhoneMockup x={x} y={y} width={width}>
          {prev && swapP < 1 ? (
            <div style={cardStyle(-swapP)}>
              <AccountCard width={cardW} label={prev.label} value={prev.value} />
            </div>
          ) : null}
          <div style={cardStyle(1 - swapP)}>
            <AccountCard
              width={cardW}
              label={cur.label}
              value={cur.value}
              rollFrom={cur.rollFrom}
              rollAt={cur.rollFrom !== undefined ? f(cur.rollAt) : 0}
            />
          </div>
          {rows?.length ? (
            <div style={{ position: "absolute", top: screenW * 0.25 + cardW * 0.44 + screenW * 0.1, left: (screenW - cardW) / 2 }}>
              <TradeRows width={cardW} rows={rows} at={f(rowsAt)} />
            </div>
          ) : null}
        </PhoneMockup>
      </AbsoluteFill>
    </GraphicBg>
  );
};
