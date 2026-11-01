/**
 * Pemuatan font.
 *
 * Style asli memakai Gilroy (font komersial, tidak ada di Google Fonts).
 * - Jika Anda punya lisensinya: taruh file di public/brand/fonts/ dengan nama
 *   persis seperti di GILROY_FILES lalu ubah USE_GILROY menjadi true.
 * - Jika tidak: Outfit (Google Font) dipakai sebagai pengganti terdekat.
 */
import { continueRender, delayRender, staticFile } from "remotion";
import { loadFont as loadOutfit } from "@remotion/google-fonts/Outfit";
import { loadFont as loadNotoSerif } from "@remotion/google-fonts/NotoSerif";

loadOutfit("normal", { weights: ["300", "400", "700", "800", "900"], subsets: ["latin"] });
loadNotoSerif("normal", { weights: ["400"], subsets: ["latin"] });

export const USE_GILROY = false;

const GILROY_FILES: { file: string; weight: string }[] = [
  { file: "brand/fonts/Gilroy-Light.otf", weight: "300" },
  { file: "brand/fonts/Gilroy-Regular.otf", weight: "400" },
  { file: "brand/fonts/Gilroy-Bold.otf", weight: "700" },
  { file: "brand/fonts/Gilroy-ExtraBold.otf", weight: "800" },
  { file: "brand/fonts/Gilroy-Black.otf", weight: "900" },
];

let loaded = false;
const loadGilroy = () => {
  if (!USE_GILROY || loaded || typeof document === "undefined") return;
  loaded = true;
  const handle = delayRender("Memuat Gilroy");
  Promise.all(
    GILROY_FILES.map(({ file, weight }) =>
      new FontFace("Gilroy", `url(${staticFile(file)})`, { weight })
        .load()
        .then((f) => {
          document.fonts.add(f);
        })
    )
  )
    .catch((err) => console.error("Gilroy gagal dimuat, memakai Outfit", err))
    .finally(() => continueRender(handle));
};

loadGilroy();
