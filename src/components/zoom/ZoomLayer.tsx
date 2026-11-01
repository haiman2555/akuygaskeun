import React from "react";
import { AbsoluteFill } from "remotion";
import { useZoom, type ZoomOptions } from "./useZoom";

/**
 * Menerapkan zoom yang sama dengan footage (punch / push / keyframe) ke
 * konten apa pun: scene grafis, gambar, teks. Titik pusat zoom = origin.
 */
export const ZoomLayer: React.FC<
  ZoomOptions & { origin?: { x: number; y: number }; children: React.ReactNode }
> = ({ origin = { x: 0.5, y: 0.5 }, children, ...opts }) => {
  const z = useZoom(opts);
  return (
    <AbsoluteFill
      style={{
        transform: `scale(${z.scale})`,
        transformOrigin: `${origin.x * 100}% ${origin.y * 100}%`,
        filter: z.blur > 0.1 ? `blur(${z.blur}px)` : undefined,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
