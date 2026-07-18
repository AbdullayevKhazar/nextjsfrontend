import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Debt Book",

    short_name: "DebtBook",

    description: "Simple Debt Tracker",

    start_url: "/",

    display: "standalone",

    orientation: "portrait",

    background_color: "#FAFAFA",

    theme_color: "#2563EB",

    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
