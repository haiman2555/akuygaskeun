import React, { useMemo } from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SAFE, SLOTS, type Slot } from "../../lib/safe-zones";
import { textStyle } from "../../lib/text-style";
import { colors, defaults, layout, springs } from "../../style/tokens";

/** Satu kata dengan waktu (ms) relatif terhadap awal komposisi/sequence. */
export type CaptionWord = { text: string; startMs: number; endMs: number };

export type WordCaptionsProps = {
  words: CaptionWord[];
  style?: "highlight" | "box" | "plain";
  wordsPerPage?: number;
  slot?: Slot;
  /** Jeda (ms) yang memaksa halaman baru walau belum penuh. */
  pauseBreakMs?: number;
};

type Page = { words: CaptionWord[]; startMs: number; endMs: number };

const paginate = (words: CaptionWord[], perPage: number, pauseBreakMs: number): Page[] => {
  const pages: Page[] = [];
  let cur: CaptionWord[] = [];
  words.forEach((w, i) => {
    const prev = words[i - 1];
    const gap = prev ? w.startMs - prev.endMs : 0;
    if (cur.length >= perPage || (cur.length > 0 && gap > pauseBreakMs)) {
      pages.push({ words: cur, startMs: cur[0].startMs, endMs: cur[cur.length - 1].endMs });
      cur = [];
    }
    cur.push(w);
  });
  if (cur.length) pages.push({ words: cur, startMs: cur[0].startMs, endMs: cur[cur.length - 1].endMs });
  return pages;
};

export const WordCaptions: React.FC<WordCaptionsProps> = ({
  words,
  style = defaults.captionStyle,
  wordsPerPage = defaults.captionWordsPerPage,
  slot = "captionCenter",
  pauseBreakMs = 450,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const nowMs = (frame / fps) * 1000;

  const pages = useMemo(() => paginate(words, wordsPerPage, pauseBreakMs), [words, wordsPerPage, pauseBreakMs]);
  const page = pages.find((p, i) => {
    const nextStart = pages[i + 1]?.startMs ?? Infinity;
    return nowMs >= p.startMs && nowMs < Math.min(nextStart, p.endMs + 400);
  });
  if (!page) return null;

  const pageFrame = frame - Math.round((page.startMs / 1000) * fps);
  const enter = spring({ frame: pageFrame, fps, config: springs.snappy });

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          top: SLOTS[slot],
          left: SAFE.left,
          right: SAFE.left,
          transform: `translateY(-50%) scale(${interpolate(enter, [0, 1], [0.85, 1])})`,
          opacity: enter,
          textAlign: "center",
        }}
      >
        <div
          style={{
            ...textStyle("caption"),
            display: "inline-block",
            padding: style === "box" ? `${layout.padding * 0.5}px ${layout.padding}px` : 0,
            background: style === "box" ? colors.boxBg : "transparent",
            borderRadius: layout.radius,
          }}
        >
          {page.words.map((w, i) => {
            const active = nowMs >= w.startMs && nowMs < w.endMs + 60;
            const spoken = nowMs >= w.startMs;
            const isHighlight = style === "highlight" && active;
            return (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  margin: "0 0.12em",
                  padding: isHighlight ? "0 0.14em" : 0,
                  borderRadius: layout.radius * 0.5,
                  background: isHighlight ? colors.primary : "transparent",
                  color: isHighlight ? colors.textOnPrimary : colors.text,
                  opacity: style === "plain" && !spoken ? 0.45 : 1,
                  transform: active ? "scale(1.08)" : "scale(1)",
                }}
              >
                {w.text}
              </span>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
