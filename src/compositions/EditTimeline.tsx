import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useVideoConfig } from "remotion";
import { TransitionSeries } from "@remotion/transitions";
import { ReframedVideo } from "../components/zoom/ReframedVideo";
import { ZoomLayer } from "../components/zoom/ZoomLayer";
import { getTransition } from "../components/cuts/transitions";
import { StackText } from "../components/motion/text/StackText";
import { DrawPath } from "../components/motion/graphic/DrawPath";
import { IconPop } from "../components/motion/graphic/IconPop";
import { Shade } from "../components/motion/graphic/GraphicBg";
import { ImageBroll } from "../components/motion/broll/ImageBroll";
import { WordCaptions } from "../components/captions/WordCaptions";
import { SCENES } from "../scenes";
import { clipFrames, clipTransitionFrames, type Clip, type Edit } from "../schema/edit";
import { zoom as Z } from "../style/tokens";
import "../style/fonts";

/** Skala dasar & punch tiap klip setelah aturan jump cut lebar/rapat diterapkan. */
const resolveFraming = (edit: Edit) => {
  const alternate = edit.alternateFraming ?? true;
  const autoPunch = edit.autoPunch ?? true;
  let videoRun = 0; // indeks dalam rangkaian klip video berturut-turut
  return edit.clips.map((c, i) => {
    if (c.kind !== "video") {
      videoRun = 0;
      return { base: 1, punch: c.punch ?? false };
    }
    const framing = c.framing ?? (alternate ? (videoRun % 2 === 0 ? "wide" : "tight") : "wide");
    const base = framing === "wide" ? 1 : framing === "tight" ? Z.tight : framing;
    const prev = edit.clips[i - 1];
    const jumpCut = prev?.kind === "video" && (prev.transition ?? "cut") === "cut";
    videoRun++;
    return { base, punch: c.punch ?? (autoPunch && jumpCut && base > 1) };
  });
};

const ClipView: React.FC<{ clip: Clip; base: number; punch: boolean }> = ({ clip, base, punch }) => {
  const { fps } = useVideoConfig();
  const keys = (clip.zoom ?? []).map((k) => ({ at: Math.round(k.t * fps), x: k.x, y: k.y, zoom: k.zoom }));
  let body: React.ReactNode;
  if (clip.kind === "video") {
    body = (
      <ReframedVideo
        src={clip.src}
        sourceWidth={clip.sourceWidth}
        sourceHeight={clip.sourceHeight}
        trimStart={Math.round(clip.in * fps)}
        playbackRate={clip.speed ?? 1}
        volume={clip.volume ?? 1}
        focusX={clip.focus?.x}
        focusY={clip.focus?.y}
        base={base}
        punch={punch}
        push={clip.push}
        keys={keys}
      />
    );
  } else {
    const Scene = clip.kind === "graphic" ? SCENES[clip.scene] : null;
    body = (
      <ZoomLayer base={base} punch={punch} push={clip.push} keys={keys}>
        {clip.kind === "image" ? (
          <ImageBroll src={clip.src} vignette={clip.vignette} rotate={clip.rotate} background={clip.background} />
        ) : Scene ? (
          <Scene {...((clip.props ?? {}) as any)} />
        ) : null}
      </ZoomLayer>
    );
  }
  return (
    <AbsoluteFill>
      {body}
      {clip.shade ? <Shade side={clip.shade} /> : null}
    </AbsoluteFill>
  );
};

export const EditTimeline: React.FC<{ edit: Edit }> = ({ edit }) => {
  const { fps } = useVideoConfig();
  const f = (s: number) => Math.round(s * fps);
  const framing = resolveFraming(edit);

  const series: React.ReactNode[] = [];
  edit.clips.forEach((clip, i) => {
    series.push(
      <TransitionSeries.Sequence key={`c${i}`} durationInFrames={clipFrames(clip, fps)}>
        <ClipView clip={clip} base={framing[i].base} punch={framing[i].punch} />
      </TransitionSeries.Sequence>
    );
    if (i < edit.clips.length - 1) {
      const t = getTransition(clip.transition ?? "cut", clipTransitionFrames(clip));
      if (t) series.push(<TransitionSeries.Transition key={`t${i}`} presentation={t.presentation} timing={t.timing} />);
    }
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <TransitionSeries>{series}</TransitionSeries>

      {(edit.overlays ?? []).map((o, i) => {
        if (o.type === "sfx") {
          return (
            <Sequence key={`o${i}`} from={f(o.at)} layout="none">
              <Audio src={staticFile(o.src)} volume={o.volume ?? 1} />
            </Sequence>
          );
        }
        let node: React.ReactNode = null;
        if (o.type === "text") {
          node = (
            <StackText
              x={o.x}
              y={o.y}
              align={o.align}
              lines={o.lines.map((l) => ({ ...l, delay: l.delay !== undefined ? f(l.delay) : undefined }))}
            />
          );
        } else if (o.type === "path") {
          node = <DrawPath d={o.d} color={o.color} dashed={o.dashed} width={o.width} />;
        } else if (o.type === "icon") {
          node = <IconPop x={o.x} y={o.y} size={o.size} src={o.src} from={o.from} />;
        } else if (o.type === "shade") {
          node = <Shade side={o.side} />;
        }
        return (
          <Sequence key={`o${i}`} from={f(o.at)} durationInFrames={Math.max(1, f(o.dur))}>
            {node}
          </Sequence>
        );
      })}

      {edit.captions?.length ? <WordCaptions words={edit.captions} /> : null}

      {edit.music ? (
        <Audio src={staticFile(edit.music.src)} volume={edit.music.volume ?? 0.2} startFrom={f(edit.music.startAt ?? 0)} />
      ) : null}
    </AbsoluteFill>
  );
};
