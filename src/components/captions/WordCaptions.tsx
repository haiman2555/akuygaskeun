/**
 * Caption per kata (opsional — tidak ada di video referensi, yang memakai
 * teks kata kunci lewat StackText). Gaya disamakan: font sans bold putih
 * dengan bayangan lembut, kata yang sedang diucapkan berwarna kuning.
 */
import React, { useMemo } from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { progress } from "../../lib/motion";
import { textStyle } from "../../lib/text-style";
import { colors, motion } from "../../style/tokens";

export type CaptionWord = { text: string; startMs: number; endMs: number };

type Page = { words: CaptionWord[]; startMs: number; endMs: number };

const paginate = (words: CaptionWord[], perPage: number, pauseMs: number): Page[] => {
  const pages: Page[] = [];
  let cur: CaptionWord[] = [];
  words.forEach((w, i) => {
    const gap = i > 0 ? w.startMs - words[i - 1].endMs : 0;
    if (cur.length >= perPage || (cur.length > 0 && gap > pauseMs)) {
      pages.push({ words: cur, startMs: cur[0].startMs, endMs: cur[cur.length - 1].endMs });
      cur = [];
    }
    cur.push(w);
  });
  if (cur.length) pages.push({ words: cur, startMs: cur[0].startMs, endMs: cur[cur.length - 1].endMs });
  return pages;
};

export const WordCaptions: React.FC<{ words: CaptionWord[]; y?: number; wordsPerPage?: number }> = ({
  words,
  y = 1240,
  wordsPerPage = 3,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const nowMs = (frame / fps) * 1000;
  const pages = useMemo(() => paginate(words, wordsPerPage, 450), [words, wordsPerPage]);
  const page = pages.find((p, i) => nowMs >= p.startMs && nowMs < Math.min(pages[i + 1]?.startMs ?? Infinity, p.endMs + 400));
  if (!page) return null;
  const startF = Math.round((page.startMs / 1000) * fps);
  const p = progress(frame, startF, motion.lineIn);
  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          top: y,
          left: 60,
          right: 60,
          textAlign: "center",
          opacity: p,
          filter: p < 1 ? `blur(${(1 - p) * motion.lineBlur}px)` : undefined,
        }}
      >
        <span style={{ ...textStyle("m", "bold"), whiteSpace: "normal" }}>
          {page.words.map((w, i) => (
            <span key={i} style={{ color: nowMs >= w.startMs && nowMs < w.endMs + 60 ? colors.yellow : colors.white }}>
              {w.text}{" "}
            </span>
          ))}
        </span>
      </div>
    </AbsoluteFill>
  );
};
