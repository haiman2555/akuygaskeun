import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { colors } from "../../style/tokens";

/** Progress bar tipis sepanjang video. Taruh di level komposisi teratas. */
export const ProgressBar: React.FC<{ position?: "top" | "bottom"; thickness?: number }> = ({
  position = "top",
  thickness = 10,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames, width } = useVideoConfig();
  const p = frame / Math.max(1, durationInFrames - 1);
  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          [position]: 0,
          left: 0,
          height: thickness,
          width: width * p,
          background: colors.primary,
        }}
      />
    </AbsoluteFill>
  );
};
