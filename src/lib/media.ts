import { staticFile } from "remotion";

/**
 * Proxy workflow untuk footage 4K.
 *
 * - Footage asli disimpan di public/footage/<project>/...
 * - `npm run proxies` membuat versi ringan di public/proxies/<project>/...
 * - Saat REMOTION_USE_PROXY=1 (mis. di file .env untuk Studio), komponen
 *   memakai proxy agar preview lancar. Render final selalu tanpa variabel ini
 *   sehingga memakai file 4K asli.
 */
export const USE_PROXY = process.env.REMOTION_USE_PROXY === "1";

/** path relatif ke public/, contoh "footage/contoh/A001.mp4" */
export const footage = (path: string): string => {
  if (USE_PROXY && path.startsWith("footage/")) {
    const proxied = path.replace(/^footage\//, "proxies/").replace(/\.[^.]+$/, ".mp4");
    return staticFile(proxied);
  }
  return staticFile(path);
};
