import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kalpit Agarwal Portfolio",
    short_name: "Kalpit",
    description: "Full Stack Developer portfolio with enterprise-ready projects.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0f1a",
    theme_color: "#0b0f1a",
    icons: [
      {
        src: "/file.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
