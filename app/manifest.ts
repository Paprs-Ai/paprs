import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Paprs — Spanish Bureaucracy Navigator",
    short_name: "Paprs",
    description:
      "Navigate Spanish bureaucracy with confidence. Step-by-step guidance for NIE, TIE, empadronamiento, autónomo taxes, and residency.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/apple-icon.svg",
        sizes: "180x180",
        type: "image/svg+xml",
      },
    ],
  };
}
