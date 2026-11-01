import type { CSSProperties } from "react";
import { colors, fonts, sizes, text, weights, type SizeKey } from "../style/tokens";

export type WeightKey = keyof typeof weights;
export type ColorKey = "white" | "yellow" | "red";

export const colorOf = (c: ColorKey = "white") =>
  c === "yellow" ? colors.yellow : c === "red" ? colors.redBright : colors.white;

/** Gaya dasar teks dari token. */
export const textStyle = (
  size: SizeKey,
  weight: WeightKey = "bold",
  opts: { serif?: boolean; color?: ColorKey } = {}
): CSSProperties => ({
  fontFamily: opts.serif ? fonts.serif : fonts.sans,
  fontSize: sizes[size],
  fontWeight: weights[weight],
  lineHeight: text.lineHeight,
  letterSpacing: opts.serif ? 0 : "-0.01em",
  color: colorOf(opts.color),
  textShadow: opts.serif ? `${text.glow}, ${text.shadow}` : text.shadow,
  whiteSpace: "pre",
});

/**
 * Markup inline di teks:
 *   {kata}    -> warna aksen kuning   ("{Paham} Karakteristik")
 *   **kata**  -> naik ke weight black  ("Jadi lebih **mengerti**")
 */
export type Span = { text: string; accent: boolean; strong: boolean };
export const parseMarkup = (s: string): Span[] => {
  const out: Span[] = [];
  const re = /(\{[^}]+\}|\*\*[^*]+\*\*)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(s))) {
    if (m.index > last) out.push({ text: s.slice(last, m.index), accent: false, strong: false });
    const tok = m[0];
    if (tok.startsWith("{")) out.push({ text: tok.slice(1, -1), accent: true, strong: false });
    else out.push({ text: tok.slice(2, -2), accent: false, strong: true });
    last = m.index + tok.length;
  }
  if (last < s.length) out.push({ text: s.slice(last), accent: false, strong: false });
  return out;
};
