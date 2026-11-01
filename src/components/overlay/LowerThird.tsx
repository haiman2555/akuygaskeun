import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SAFE, SLOTS } from "../../lib/safe-zones";
import { textStyle } from "../../lib/text-style";
import { colors, defaults, layout, springs, timing } from "../../style/tokens";

export type LowerThirdProps = {
  name: string;
  role?: string;
  variant?: "bar" | "box";
};

export const LowerThird: React.FC<LowerThirdProps> = ({ name, role, variant = defaults.lowerThird }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const inP = spring({ frame, fps, config: springs.snappy });
  const outP = spring({ frame: frame - (durationInFrames - timing.textOut), fps, config: springs.smooth });
  const p = inP - outP;

  const barScale = interpolate(p, [0, 1], [0, 1]);
  const textX = interpolate(p, [0, 1], [-40, 0]);

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: SAFE.left,
          top: SLOTS.lowerThird,
          transform: "translateY(-100%)",
          display: "flex",
          alignItems: "stretch",
          gap: 18,
          padding: variant === "box" ? `${layout.padding * 0.6}px ${layout.padding}px` : 0,
          background: variant === "box" ? colors.boxBg : "transparent",
          borderRadius: layout.radius,
          opacity: Math.min(1, p * 2),
        }}
      >
        <div
          style={{
            width: 10,
            borderRadius: 5,
            background: colors.primary,
            transform: `scaleY(${barScale})`,
            transformOrigin: "bottom",
          }}
        />
        <div style={{ transform: `translateX(${textX}px)`, opacity: p }}>
          <div style={textStyle("lowerThirdName")}>{name}</div>
          {role ? (
            <div style={{ ...textStyle("lowerThirdRole", "body"), color: colors.primary, marginTop: 8 }}>{role}</div>
          ) : null}
        </div>
      </div>
    </AbsoluteFill>
  );
};
