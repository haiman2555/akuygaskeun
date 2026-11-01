import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useVideoConfig } from "remotion";
import { TransitionSeries } from "@remotion/transitions";
import { ReframedVideo } from "../components/footage/ReframedVideo";
import { AnimatedTitle } from "../components/text/AnimatedTitle";
import { WordCaptions } from "../components/text/WordCaptions";
import { LowerThird } from "../components/overlay/LowerThird";
import { LogoBug } from "../components/overlay/LogoBug";
import { ProgressBar } from "../components/overlay/ProgressBar";
import { getTransition } from "../components/transitions/presets";
import { clipFrames, transitionFramesOf, type Edit } from "../schema/edit";
import { defaults } from "../style/tokens";
import "../style/fonts";

export const EditTimeline: React.FC<{ edit: Edit }> = ({ edit }) => {
  const { fps } = useVideoConfig();
  const f = (s: number) => Math.round(s * fps);

  const children: React.ReactNode[] = [];
  edit.clips.forEach((clip, i) => {
    children.push(
      <TransitionSeries.Sequence key={`clip-${i}`} durationInFrames={clipFrames(clip, fps)}>
        <ReframedVideo
          src={clip.src}
          sourceWidth={clip.sourceWidth}
          sourceHeight={clip.sourceHeight}
          trimStart={f(clip.in)}
          playbackRate={clip.speed ?? 1}
          volume={clip.volume ?? 1}
          autoDrift={clip.autoDrift}
          keys={(clip.reframe ?? []).map((k) => ({ at: f(k.t), x: k.x, y: k.y, zoom: k.zoom }))}
        />
      </TransitionSeries.Sequence>
    );
    if (i < edit.clips.length - 1) {
      const name = clip.transitionOut ?? defaults.transition;
      const t = getTransition(name, transitionFramesOf(clip, defaults.transition));
      if (t) {
        children.push(
          <TransitionSeries.Transition key={`tr-${i}`} presentation={t.presentation} timing={t.timing} />
        );
      }
    }
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <TransitionSeries>{children}</TransitionSeries>

      {(edit.overlays ?? []).map((o, i) => {
        if (o.type === "sfx") {
          return (
            <Sequence key={`ov-${i}`} from={f(o.at)} layout="none">
              <Audio src={staticFile(o.src)} volume={o.volume ?? 1} />
            </Sequence>
          );
        }
        return (
          <Sequence key={`ov-${i}`} from={f(o.at)} durationInFrames={f(o.dur)}>
            {o.type === "title" ? (
              <AnimatedTitle text={o.text} subtitle={o.subtitle} anim={o.anim} slot={o.slot} accentWords={o.accentWords} />
            ) : o.type === "lowerThird" ? (
              <LowerThird name={o.name} role={o.role} variant={o.variant} />
            ) : (
              <LogoBug src={o.src} corner={o.corner} />
            )}
          </Sequence>
        );
      })}

      {edit.captions?.length ? <WordCaptions words={edit.captions} style={edit.captionStyle} /> : null}

      {edit.music ? (
        <Audio src={staticFile(edit.music.src)} volume={edit.music.volume ?? 0.25} startFrom={f(edit.music.startAt ?? 0)} />
      ) : null}

      {edit.progressBar ? <ProgressBar /> : null}
    </AbsoluteFill>
  );
};
