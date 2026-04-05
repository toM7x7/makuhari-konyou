import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "幕張 × 青木昆陽 MVP",
    short_name: "幕張昆陽",
    description: "幕張向け WebAR / 画像生成アプリの MVP 開発ベース。",
    start_url: "/",
    display: "standalone",
    background_color: "#fcfaf7",
    theme_color: "#182237",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
