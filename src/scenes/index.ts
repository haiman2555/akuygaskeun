/**
 * Registry scene grafis. Klip `{ kind: "graphic", scene: "<nama>" }` di
 * edit.ts merender komponen dari sini dengan `props`-nya.
 * Tambahkan scene baru di folder ini lalu daftarkan di bawah.
 */
import type React from "react";
import { PhoneAccount } from "./PhoneAccount";
import { IconScene } from "./IconScene";
import { Placeholder } from "./Placeholder";
import { GraphicBg } from "../components/motion/graphic/GraphicBg";

export const SCENES = {
  phoneAccount: PhoneAccount,
  icon: IconScene,
  /** Pengganti footage di StyleBoard / saat footage belum ada. */
  placeholder: Placeholder,
  /** Latar abu kosong, untuk scene yang isinya hanya overlay teks. */
  blank: GraphicBg,
} satisfies Record<string, React.FC<any>>;

export type SceneName = keyof typeof SCENES;
