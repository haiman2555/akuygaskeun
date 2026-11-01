/**
 * Pemuatan font.
 *
 * Style memakai Campton Book (400) dan Campton Bold (700) — font komersial,
 * tidak tersedia di Google Fonts. Taruh file Anda di public/brand/fonts/
 * dengan nama di CAMPTON_FILES (atau ubah daftar di bawah sesuai nama file).
 * Font dimuat otomatis; bila file belum ada, render tetap jalan dengan
 * Outfit (Google Font) sebagai pengganti sementara.
 */
import { continueRender, delayRender, staticFile } from "remotion";
import { loadFont as loadOutfit } from "@remotion/google-fonts/Outfit";
import { loadFont as loadNotoSerif } from "@remotion/google-fonts/NotoSerif";

loadOutfit("normal", { weights: ["400", "700"], subsets: ["latin"] });
loadNotoSerif("normal", { weights: ["400"], subsets: ["latin"] });

/** Kandidat per bobot; yang pertama berhasil dimuat yang dipakai. */
export const CAMPTON_FILES: { weight: "400" | "700"; files: string[] }[] = [
  {
    weight: "400",
    files: ["brand/fonts/Campton-Book.otf", "brand/fonts/CamptonBook.otf", "brand/fonts/Campton-Book.ttf", "brand/fonts/CamptonBook.ttf"],
  },
  {
    weight: "700",
    files: ["brand/fonts/Campton-Bold.otf", "brand/fonts/CamptonBold.otf", "brand/fonts/Campton-Bold.ttf", "brand/fonts/CamptonBold.ttf"],
  },
];

const loadFirst = async (weight: string, files: string[]) => {
  for (const file of files) {
    try {
      const face = await new FontFace("Campton", `url(${staticFile(file)})`, { weight }).load();
      document.fonts.add(face);
      return true;
    } catch {
      // coba nama file berikutnya
    }
  }
  console.warn(`Campton ${weight} tidak ditemukan di public/brand/fonts — memakai Outfit.`);
  return false;
};

let started = false;
const loadCampton = () => {
  if (started || typeof document === "undefined") return;
  started = true;
  const handle = delayRender("Memuat Campton");
  Promise.all(CAMPTON_FILES.map(({ weight, files }) => loadFirst(weight, files))).finally(() => continueRender(handle));
};

loadCampton();
