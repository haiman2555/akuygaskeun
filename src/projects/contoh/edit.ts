import type { Edit } from "../../schema/edit";

/**
 * Project contoh. Taruh footage di public/footage/contoh/ lalu sesuaikan
 * nama file, titik in/out, dan reframe di bawah.
 */
export const edit: Edit = {
  id: "contoh",
  progressBar: true,
  captionStyle: "highlight",
  clips: [
    {
      src: "footage/contoh/A001.mp4",
      in: 2.0,
      out: 6.5,
      // Footage landscape 4K: geser fokus dari kiri ke subjek di kanan + punch-in
      reframe: [
        { t: 0, x: 0.35, zoom: 1 },
        { t: 3.5, x: 0.6, zoom: 1.15 },
      ],
      transitionOut: "zoomPunch",
    },
    {
      src: "footage/contoh/A002.mp4",
      in: 10.0,
      out: 14.0,
      autoDrift: true,
      transitionOut: "whip",
    },
    {
      src: "footage/contoh/A003.mp4",
      // footage vertikal 4K
      sourceWidth: 2160,
      sourceHeight: 3840,
      in: 0,
      out: 5,
    },
  ],
  overlays: [
    { type: "title", at: 0.2, dur: 2.6, text: "Judul Video Anda", subtitle: "subjudul singkat", accentWords: ["video"] },
    { type: "lowerThird", at: 4.5, dur: 3, name: "Nama Narasumber", role: "Keterangan" },
    // { type: "sfx", at: 4.2, src: "sfx/whoosh.mp3", volume: 0.6 },
    // { type: "logo", at: 0, dur: 13, src: "brand/logo.png" },
  ],
  captions: [
    { text: "Ini", startMs: 8000, endMs: 8250 },
    { text: "contoh", startMs: 8250, endMs: 8600 },
    { text: "caption", startMs: 8600, endMs: 9000 },
    { text: "per", startMs: 9100, endMs: 9300 },
    { text: "kata", startMs: 9300, endMs: 9700 },
  ],
  // music: { src: "music/track.mp3", volume: 0.2 },
};
