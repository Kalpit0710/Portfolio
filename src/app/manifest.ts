import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kalpit Agarwal Portfolio",
    short_name: "Kalpit",
    description:
      "Full Stack Developer at MAQ Software specializing in C# .NET, React, and Azure DevOps.",
    start_url: "/",
    display: "standalone",
    background_color: "#050505",
    theme_color: "#050505",
    icons: [
      {
        src: "/file.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
