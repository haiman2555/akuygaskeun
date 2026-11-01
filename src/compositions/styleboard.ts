/**
 * StyleBoard — rekonstruksi adegan-adegan dari video referensi memakai
 * komponen repo (tanpa footage; talking-head diganti scene "placeholder").
 * Dipakai untuk mengecek style: render still lalu bandingkan dengan
 * style/references/videos/*.mp4. Juga contoh lengkap cara menulis edit.ts.
 */
import { clipStarts, type Clip, type Edit, type Overlay } from "../schema/edit";

const clips: Clip[] = [
  // ---- Montage_Editing 0:00–0:08 : HP + kartu saldo
  {
    kind: "graphic",
    scene: "phoneAccount",
    dur: 3.2,
    push: true,
    props: {
      width: 540,
      cards: [
        { label: "Standard Account", value: 10 },
        { label: "Cent Account", value: 1000, at: 2.2 },
      ],
    },
  },
  {
    kind: "graphic",
    scene: "phoneAccount",
    dur: 1.8,
    punch: true,
    push: true,
    transition: "dip",
    props: {
      width: 900,
      cards: [{ label: "Cent Account", value: 999, rollFrom: 1000, rollAt: 0.15 }],
      rows: [{ symbol: "XAUUSD", note: "sell 1 lot", value: "-1.00" }],
      rowsAt: 0.1,
    },
  },
  {
    kind: "graphic",
    scene: "phoneAccount",
    dur: 3.0,
    push: 0.01,
    props: {
      x: 355,
      width: 430,
      cards: [{ label: "Cent Account", value: 997 }],
      rows: [
        { symbol: "XAUUSD", note: "sell 1 lot", value: "-1.00" },
        { symbol: "XAUUSD", note: "sell 1 lot", value: "-1.00" },
        { symbol: "XAUUSD", note: "sell 1 lot", value: "-1.00" },
      ],
    },
  },
  // ---- Montage_Editing 0:08–0:14 : talking head, jump cut lebar -> rapat
  { kind: "graphic", scene: "placeholder", dur: 2.0, props: { label: "A-roll · wide" } },
  { kind: "graphic", scene: "placeholder", dur: 2.6, punch: true, zoom: [{ t: 0, zoom: 1.3 }], props: { label: "A-roll · tight (punch-in)" } },
  // ---- Montage_Editing 0:14–0:18 : ikon -> pan turun -> lampu
  { kind: "graphic", scene: "icon", dur: 2.2, transition: "panDown", props: { builtin: "think", y: 1380, size: 900 } },
  { kind: "graphic", scene: "icon", dur: 2.4, props: { builtin: "bulb", y: 1000, size: 560, line: "below", from: "top" } },
  // ---- Masukan_Ini : judul step, punch-in, teks kunci, anotasi
  { kind: "graphic", scene: "placeholder", dur: 1.6, shade: "top", props: { label: "A-roll · wide", tone: "dark" } },
  { kind: "graphic", scene: "placeholder", dur: 3.8, punch: true, zoom: [{ t: 0, zoom: 1.35 }], props: { label: "A-roll · tight", tone: "dark" } },
];

const tmp: Edit = { id: "tmp", clips };
const S = clipStarts(tmp);
const at = (clip: number, offset = 0) => +(S[clip] + offset).toFixed(2);

const overlays: Overlay[] = [
  // bullet + kutipan di samping HP
  {
    type: "text",
    at: at(2, 0.2),
    dur: 2.8,
    x: 645,
    y: 745,
    lines: [
      { text: "= Saldo Normal x 100", size: "xs", weight: "bold" },
      { text: "= Saldo Akun Cent", size: "xs", weight: "bold" },
    ],
  },
  {
    type: "text",
    at: at(2, 0.8),
    dur: 2.2,
    x: 655,
    y: 880,
    lines: [
      { text: "“Resiko **100x lebih**", size: "sm", weight: "regular", in: "words" },
      { text: "**rendah** daripada", size: "sm", weight: "regular", in: "words", delay: 0.3 },
      { text: "akun standar”", size: "sm", weight: "regular", in: "words", delay: 0.55 },
    ],
  },
  // Fokusmu / Bukan / Duit
  {
    type: "text",
    at: at(4, 0.1),
    dur: 2.5,
    x: 310,
    y: 445,
    lines: [
      { text: "Fokusmu", size: "l", weight: "heavy", in: "flicker", box: true },
      { text: "Bukan", size: "m", weight: "light", indent: 150, delay: 0.7 },
      { text: "Duit", size: "xl", weight: "black", indent: 170, strike: true, delay: 1.1 },
    ],
  },
  // Jadi lebih mengerti
  {
    type: "text",
    at: at(6, 0.5),
    dur: 1.9,
    x: 540,
    y: 470,
    align: "center",
    lines: [
      { text: "Jadi lebih **mengerti**", size: "m", weight: "regular", in: "words" },
      { text: "tentang ilmu market", size: "sm", weight: "bold", in: "words", delay: 0.4 },
    ],
  },
  // Step #2
  {
    type: "text",
    at: at(7),
    dur: 1.6,
    x: 125,
    y: 165,
    lines: [
      { text: "Step #2", size: "title", weight: "regular", serif: true, in: "none" },
      { text: "{Paham} Karakteristik", size: "m", weight: "heavy", in: "none" },
      { text: "XAUUSD", size: "m", weight: "heavy", in: "none" },
    ],
  },
  // XAUUSD butuh ruang gerak
  {
    type: "text",
    at: at(8),
    dur: 3.8,
    x: 530,
    y: 640,
    lines: [
      { text: "XAUUSD", size: "ml", weight: "heavy" },
      { text: "butuh", size: "l", weight: "black", delay: 0 },
      { text: "ruang gerak", size: "s", weight: "heavy", delay: 0 },
    ],
  },
  { type: "path", at: at(8, 0.9), dur: 2.9, d: "M 905 830 C 975 905, 975 1040, 790 1105", color: "red", dashed: true },
  {
    type: "text",
    at: at(8, 1.6),
    dur: 2.2,
    x: 105,
    y: 1130,
    lines: [
      { text: "Paling kecil", size: "l", weight: "bold", in: "type" },
      { text: "SL (-70 Pips)", size: "ml", weight: "bold", in: "type", delay: 0.6 },
    ],
  },
];

export const styleboard: Edit = { id: "StyleBoard", clips, overlays };

/** Frame (25 fps) yang mewakili tiap adegan — untuk render still pembanding. */
export const STYLEBOARD_CHECKPOINTS = {
  phoneSmall: Math.round((S[0] + 1.0) * 25),
  cardSwap: Math.round((S[0] + 2.3) * 25),
  punchBlur: Math.round(S[1] * 25),
  phoneZoom: Math.round((S[1] + 1.0) * 25),
  bullets: Math.round((S[2] + 2.5) * 25),
  fokusFlicker: Math.round((S[4] + 0.2) * 25),
  fokusDuit: Math.round((S[4] + 2.0) * 25),
  iconIn: Math.round((S[5] + 0.15) * 25),
  pan: Math.round((S[6] + 0.2) * 25),
  dip: Math.round((S[2] + 0.12) * 25),
  bulb: Math.round((S[6] + 1.6) * 25),
  step: Math.round((S[7] + 0.8) * 25),
  palingType: Math.round((S[8] + 1.9) * 25),
  palingDone: Math.round((S[8] + 3.2) * 25),
};
