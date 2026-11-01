import React from "react";
import { AbsoluteFill, Easing, OffthreadVideo, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { footage } from "../../lib/media";

/**
 * Satu titik reframe. Semua nilai relatif terhadap footage sumber:
 * - x, y: titik fokus 0..1 (0.5 = tengah). Untuk footage landscape 4K,
 *   x menentukan bagian mana yang masuk ke frame 9:16.
 * - zoom: 1 = pas menutup frame (cover). >1 = punch-in.
 */
export type ReframeKey = { at: number; x?: number; y?: number; zoom?: number };

export type ReframedVideoProps = {
  /** Path relatif ke public/, mis. "footage/contoh/A001.mp4" */
  src: string;
  /** Resolusi file asli. Default 4K UHD landscape. */
  sourceWidth?: number;
  sourceHeight?: number;
  /** Mulai dari detik/frame ke-berapa di file sumber (frame). */
  trimStart?: number;
  playbackRate?: number;
  volume?: number;
  muted?: boolean;
  /** Keyframe reframe, frame relatif terhadap awal klip. */
  keys?: ReframeKey[];
  /** Ken Burns halus otomatis bila tidak ada keys (zoom 1 -> 1.06). */
  autoDrift?: boolean;
};

const ease = Easing.bezier(0.45, 0, 0.2, 1);

const sample = (keys: ReframeKey[], frame: number, prop: "x" | "y" | "zoom", fallback: number) => {
  const pts = keys.filter((k) => k[prop] !== undefined).sort((a, b) => a.at - b.at);
  if (pts.length === 0) return fallback;
  if (pts.length === 1) return pts[0][prop] as number;
  return interpolate(
    frame,
    pts.map((p) => p.at),
    pts.map((p) => p[prop] as number),
    { easing: ease, extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
};

export const ReframedVideo: React.FC<ReframedVideoProps> = ({
  src,
  sourceWidth = 3840,
  sourceHeight = 2160,
  trimStart = 0,
  playbackRate = 1,
  volume = 1,
  muted = false,
  keys = [],
  autoDrift = false,
}) => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();

  const driftZoom = autoDrift && keys.length === 0
    ? interpolate(frame, [0, durationInFrames], [1, 1.06])
    : 1;

  const x = sample(keys, frame, "x", 0.5);
  const y = sample(keys, frame, "y", 0.5);
  const zoom = Math.max(1, sample(keys, frame, "zoom", 1)) * driftZoom;

  // Skala "cover" agar sumber menutupi seluruh kanvas 1080x1920.
  const cover = Math.max(width / sourceWidth, height / sourceHeight);
  const w = sourceWidth * cover * zoom;
  const h = sourceHeight * cover * zoom;

  // Titik fokus diletakkan di tengah kanvas, lalu dijepit agar tidak ada tepi kosong.
  const left = Math.min(0, Math.max(width - w, width / 2 - x * w));
  const top = Math.min(0, Math.max(height - h, height / 2 - y * h));

  return (
    <AbsoluteFill style={{ backgroundColor: "black", overflow: "hidden" }}>
      <OffthreadVideo
        src={footage(src)}
        startFrom={trimStart}
        playbackRate={playbackRate}
        volume={muted ? 0 : volume}
        muted={muted}
        style={{ position: "absolute", left, top, width: w, height: h, maxWidth: "none" }}
      />
    </AbsoluteFill>
  );
};
