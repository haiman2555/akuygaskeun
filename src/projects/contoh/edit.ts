import type { Edit } from "../../schema/edit";

/**
 * Project contoh (talking head edukasi trading, gaya referensi).
 * Taruh footage di public/footage/contoh/, jalankan `npm run probe contoh`,
 * lalu sesuaikan nama file, in/out, dan posisi teks.
 *
 * Aturan jump cut: klip video tanpa `framing` otomatis selang-seling
 * lebar -> rapat -> lebar..., dan cut ke shot rapat otomatis punch-in.
 */
export const edit: Edit = {
  id: "contoh",
  clips: [
    // Hook: shot lebar + judul step di atas bayangan gelap
    { kind: "video", src: "footage/contoh/A001.mp4", in: 3.2, out: 4.8, shade: "top" },
    // Jump cut ke rapat (punch-in otomatis)
    { kind: "video", src: "footage/contoh/A001.mp4", in: 4.8, out: 10.2, focus: { x: 0.45, y: 0.35 } },
    // B-roll foto dengan gerak kamera pelan, lalu dip ke grafis
    { kind: "image", src: "assets/broll/papan.jpg", dur: 4.0, transition: "dip" },
    // Scene grafis HP
    {
      kind: "graphic",
      scene: "phoneAccount",
      dur: 3.0,
      push: true,
      props: { width: 420, cards: [{ label: "Cent Account", value: 1000 }] },
    },
    // Kembali ke talking head (lebar), lalu rapat lagi
    { kind: "video", src: "footage/contoh/A001.mp4", in: 14.0, out: 17.5 },
    { kind: "video", src: "footage/contoh/A001.mp4", in: 17.5, out: 21.0 },
  ],
  overlays: [
    {
      type: "text",
      at: 0,
      dur: 1.6,
      x: 125,
      y: 165,
      lines: [
        { text: "Step #2", size: "title", weight: "book", serif: true, in: "none" },
        { text: "{Paham} Karakteristik", size: "m", weight: "bold", in: "none" },
        { text: "XAUUSD", size: "m", weight: "bold", in: "none" },
      ],
    },
    {
      type: "text",
      at: 1.6,
      dur: 5.4,
      x: 530,
      y: 640,
      lines: [
        { text: "XAUUSD", size: "ml", weight: "bold" },
        { text: "butuh", size: "l", weight: "bold", delay: 0 },
        { text: "ruang gerak", size: "s", weight: "bold", delay: 0 },
      ],
    },
    {
      type: "text",
      at: 4.0,
      dur: 3.0,
      x: 105,
      y: 1130,
      lines: [
        { text: "Paling kecil", size: "l", weight: "bold", in: "type" },
        { text: "SL (-70 Pips)", size: "ml", weight: "bold", in: "type", delay: 0.6 },
      ],
    },
    // { type: "sfx", at: 7.0, src: "sfx/whoosh.mp3", volume: 0.5 },
  ],
  // music: { src: "music/track.mp3", volume: 0.15 },
};
