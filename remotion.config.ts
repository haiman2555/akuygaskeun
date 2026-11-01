import { Config } from "@remotion/cli/config";

// Output default: portrait 1080x1920, H.264 kualitas tinggi.
Config.setVideoImageFormat("jpeg");
Config.setJpegQuality(95);
Config.setCodec("h264");
Config.setCrf(18);
Config.setPixelFormat("yuv420p");
Config.setOverwriteOutput(true);

// Footage 4K berat untuk didekode. Batasi paralelisme agar RAM tidak habis
// dan beri waktu lebih untuk mengekstrak frame dari file besar.
Config.setConcurrency(4);
Config.setDelayRenderTimeoutInMilliseconds(120000);
Config.setOffthreadVideoCacheSizeInBytes(2 * 1024 * 1024 * 1024);
