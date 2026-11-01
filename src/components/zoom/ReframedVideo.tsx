import React from "react";
import { AbsoluteFill, OffthreadVideo, useVideoConfig } from "remotion";
import { footage } from "../../lib/media";
import { useZoom, type ZoomOptions } from "./useZoom";

export type ReframedVideoProps = ZoomOptions & {
  /** Path relatif ke public/, mis. "footage/contoh/A001.mp4" */
  src: string;
  /** Resolusi file asli. Default 4K vertikal (2160x3840). */
  sourceWidth?: number;
  sourceHeight?: number;
  /** Frame awal di file sumber. */
  trimStart?: number;
  playbackRate?: number;
  volume?: number;
  /** Titik fokus default bila tidak ada keyframe (0..1). */
  focusX?: number;
  focusY?: number;
};

/**
 * Footage 4K -> kanvas 1080x1920.
 * Skala "cover" lalu dikali zoom (base/punch/push/keyframe). Titik fokus
 * diletakkan di tengah kanvas dan dijepit agar tidak ada tepi kosong.
 */
export const ReframedVideo: React.FC<ReframedVideoProps> = ({
  src,
  sourceWidth = 2160,
  sourceHeight = 3840,
  trimStart = 0,
  playbackRate = 1,
  volume = 1,
  focusX = 0.5,
  focusY = 0.4,
  ...zoomOpts
}) => {
  const { width, height } = useVideoConfig();
  const keys = zoomOpts.keys ?? [];
  const z = useZoom({
    ...zoomOpts,
    keys: keys.length ? keys : [{ at: 0, x: focusX, y: focusY }],
  });

  const cover = Math.max(width / sourceWidth, height / sourceHeight);
  const w = sourceWidth * cover * z.scale;
  const h = sourceHeight * cover * z.scale;
  const left = Math.min(0, Math.max(width - w, width / 2 - z.x * w));
  const top = Math.min(0, Math.max(height - h, height / 2 - z.y * h));

  return (
    <AbsoluteFill style={{ backgroundColor: "black", overflow: "hidden" }}>
      <OffthreadVideo
        src={footage(src)}
        startFrom={trimStart}
        playbackRate={playbackRate}
        volume={volume}
        style={{
          position: "absolute",
          left,
          top,
          width: w,
          height: h,
          maxWidth: "none",
          filter: z.blur > 0.1 ? `blur(${z.blur}px)` : undefined,
        }}
      />
    </AbsoluteFill>
  );
};
