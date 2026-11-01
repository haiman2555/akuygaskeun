/**
 * StylePreview — menampilkan semua elemen motion TANPA footage, di atas
 * latar warna. Dipakai untuk menyetel style di src/style/tokens.ts dan
 * membandingkannya dengan video referensi.
 */
import React from "react";
import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import { TransitionSeries } from "@remotion/transitions";
import { AnimatedTitle } from "../components/text/AnimatedTitle";
import { WordCaptions, type CaptionWord } from "../components/text/WordCaptions";
import { LowerThird } from "../components/overlay/LowerThird";
import { ProgressBar } from "../components/overlay/ProgressBar";
import { getTransition, type TransitionName } from "../components/transitions/presets";
import { SAFE } from "../lib/safe-zones";
import "../style/fonts";

const Panel: React.FC<{ hue: number; label: string; showSafe?: boolean }> = ({ hue, label, showSafe = true }) => (
  <AbsoluteFill
    style={{
      background: `linear-gradient(160deg, hsl(${hue},45%,28%), hsl(${hue + 40},55%,12%))`,
      justifyContent: "flex-end",
      alignItems: "center",
    }}
  >
    {showSafe ? (
      <div
        style={{
          position: "absolute",
          top: SAFE.top,
          bottom: SAFE.bottom,
          left: SAFE.left,
          right: SAFE.right,
          border: "3px dashed rgba(255,255,255,0.25)",
        }}
      />
    ) : null}
    <div style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Inter", fontSize: 30, marginBottom: 80 }}>{label}</div>
  </AbsoluteFill>
);

const demoWords = (text: string, startMs: number, perWordMs = 320): CaptionWord[] =>
  text.split(" ").map((w, i) => ({ text: w, startMs: startMs + i * perWordMs, endMs: startMs + (i + 1) * perWordMs - 40 }));

const TRANSITIONS: TransitionName[] = ["zoomPunch", "whip", "slideUp", "wipe", "fade"];

// 5 panel x 100 frame - 4 transisi x 10 frame
export const STYLE_PREVIEW_FRAMES = 460;

export const StylePreview: React.FC = () => {
  const { fps } = useVideoConfig();
  const seg = fps * 3;

  const items: React.ReactNode[] = [];
  TRANSITIONS.forEach((name, i) => {
    items.push(
      <TransitionSeries.Sequence key={`p${i}`} durationInFrames={seg + 10}>
        <Panel hue={i * 55} label={`transisi berikut: ${name}`} />
      </TransitionSeries.Sequence>
    );
    const t = getTransition(name);
    if (t && i < TRANSITIONS.length - 1) {
      items.push(<TransitionSeries.Transition key={`t${i}`} presentation={t.presentation} timing={t.timing} />);
    }
  });

  return (
    <AbsoluteFill>
      <TransitionSeries>{items}</TransitionSeries>
      <Sequence from={0} durationInFrames={fps * 3}>
        <AnimatedTitle text="Judul Besar Disini" subtitle="Subjudul pendukung" accentWords={["besar"]} />
      </Sequence>
      <Sequence from={fps * 3} durationInFrames={fps * 3}>
        <AnimatedTitle text="Slide Up Title" anim="slideUp" slot="center" />
      </Sequence>
      <Sequence from={fps * 6} durationInFrames={fps * 4}>
        <LowerThird name="Nama Narasumber" role="Jabatan / keterangan" />
      </Sequence>
      <WordCaptions words={demoWords("ini contoh caption per kata yang menyala mengikuti suara", 6500)} />
      <ProgressBar />
    </AbsoluteFill>
  );
};
