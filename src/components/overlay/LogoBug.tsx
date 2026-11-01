import React from "react";
import { AbsoluteFill, Img, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { SAFE } from "../../lib/safe-zones";
import { springs } from "../../style/tokens";

/** Logo kecil di pojok. File di public/brand/, mis. "brand/logo.png". */
export const LogoBug: React.FC<{ src: string; size?: number; corner?: "tl" | "tr" }> = ({
  src,
  size = 120,
  corner = "tl",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame, fps, config: springs.smooth });
  return (
    <AbsoluteFill>
      <Img
        src={staticFile(src)}
        style={{
          position: "absolute",
          top: SAFE.top - 40,
          [corner === "tl" ? "left" : "right"]: corner === "tl" ? SAFE.left : SAFE.right,
          width: size,
          opacity: p * 0.9,
          transform: `scale(${0.8 + p * 0.2})`,
        }}
      />
    </AbsoluteFill>
  );
};
