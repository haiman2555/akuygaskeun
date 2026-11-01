import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SAFE, SLOTS, type Slot } from "../../lib/safe-zones";
import { textStyle } from "../../lib/text-style";
import { colors, defaults, springs, timing } from "../../style/tokens";

export type TitleAnim = "pop" | "slideUp" | "fade" | "typewriter";

export type AnimatedTitleProps = {
  text: string;
  subtitle?: string;
  anim?: TitleAnim;
  slot?: Slot;
  align?: "left" | "center";
  /** Kata yang diberi warna aksen (cocok tanpa peduli huruf besar/kecil). */
  accentWords?: string[];
};

export const AnimatedTitle: React.FC<AnimatedTitleProps> = ({
  text,
  subtitle,
  anim = defaults.titleIn,
  slot = "titleTop",
  align = "center",
  accentWords = [],
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const exit = interpolate(
    frame,
    [durationInFrames - timing.textOut, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const words = text.split(" ");
  const accent = new Set(accentWords.map((w) => w.toLowerCase()));

  const renderWord = (word: string, i: number) => {
    const delay = i * timing.wordStagger;
    const p = spring({ frame: frame - delay, fps, config: springs.snappy });
    let style: React.CSSProperties = {};
    if (anim === "pop") {
      style = { transform: `scale(${interpolate(p, [0, 1], [0.4, 1])})`, opacity: p };
    } else if (anim === "slideUp") {
      style = { transform: `translateY(${interpolate(p, [0, 1], [60, 0])}px)`, opacity: p };
    } else if (anim === "fade") {
      style = { opacity: interpolate(frame - delay, [0, timing.textIn], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) };
    }
    const clean = word.replace(/[^\p{L}\p{N}]/gu, "").toLowerCase();
    return (
      <span
        key={i}
        style={{
          display: "inline-block",
          marginRight: "0.25em",
          color: accent.has(clean) ? colors.primary : colors.text,
          ...style,
        }}
      >
        {word}
      </span>
    );
  };

  const typed =
    anim === "typewriter"
      ? text.slice(0, Math.floor(interpolate(frame, [0, text.length * 1.2], [0, text.length], { extrapolateRight: "clamp" })))
      : null;

  const subP = spring({ frame: frame - words.length * timing.wordStagger - 4, fps, config: springs.smooth });

  return (
    <AbsoluteFill style={{ opacity: exit }}>
      <div
        style={{
          position: "absolute",
          top: SLOTS[slot],
          left: SAFE.left,
          right: align === "center" ? SAFE.left : SAFE.right,
          transform: "translateY(-50%)",
          textAlign: align,
        }}
      >
        <div style={textStyle("title")}>{typed ?? words.map(renderWord)}</div>
        {subtitle ? (
          <div
            style={{
              ...textStyle("subtitle", "body"),
              marginTop: 18,
              opacity: subP,
              transform: `translateY(${interpolate(subP, [0, 1], [24, 0])}px)`,
            }}
          >
            {subtitle}
          </div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};
