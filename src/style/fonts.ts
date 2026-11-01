/**
 * Pemuatan font.
 *
 * - Font Google: impor dari @remotion/google-fonts/<NamaFont>.
 * - Font brand sendiri (.ttf/.otf/.woff2): taruh di public/brand/fonts/
 *   lalu daftarkan di LOCAL_FONTS di bawah.
 */
import { continueRender, delayRender, staticFile } from "remotion";
import { loadFont as loadMontserrat } from "@remotion/google-fonts/Montserrat";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

loadMontserrat("normal", { weights: ["500", "700", "800", "900"], subsets: ["latin"] });
loadInter("normal", { weights: ["400", "500", "700", "900"], subsets: ["latin"] });

type LocalFont = { family: string; file: string; weight?: string; style?: string };

/** Contoh: { family: "BrandSans", file: "brand/fonts/BrandSans-Black.otf", weight: "900" } */
export const LOCAL_FONTS: LocalFont[] = [];

let localLoaded = false;
export const loadLocalFonts = () => {
  if (localLoaded || LOCAL_FONTS.length === 0 || typeof document === "undefined") return;
  localLoaded = true;
  const handle = delayRender("Memuat font lokal");
  Promise.all(
    LOCAL_FONTS.map((f) => {
      const face = new FontFace(f.family, `url(${staticFile(f.file)})`, {
        weight: f.weight ?? "normal",
        style: f.style ?? "normal",
      });
      return face.load().then((loaded) => {
        document.fonts.add(loaded);
      });
    })
  )
    .then(() => continueRender(handle))
    .catch((err) => {
      console.error("Gagal memuat font lokal", err);
      continueRender(handle);
    });
};

loadLocalFonts();
