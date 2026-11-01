import type { CSSProperties } from "react";
import { colors, fonts, textTreatment, type } from "../style/tokens";

type TypeKey = keyof typeof type;

/** Gaya CSS teks dari token, dipakai semua komponen teks. */
export const textStyle = (key: TypeKey, font: "heading" | "body" = "heading"): CSSProperties => {
  const t = type[key];
  return {
    fontFamily: fonts[font],
    fontSize: t.size,
    fontWeight: t.weight,
    lineHeight: t.lineHeight,
    letterSpacing: t.letterSpacing,
    textTransform: t.uppercase ? "uppercase" : "none",
    color: colors.text,
    textShadow: textTreatment.shadow,
    WebkitTextStroke:
      textTreatment.strokeWidth > 0
        ? `${textTreatment.strokeWidth}px ${textTreatment.strokeColor}`
        : undefined,
    paintOrder: "stroke fill",
  };
};
