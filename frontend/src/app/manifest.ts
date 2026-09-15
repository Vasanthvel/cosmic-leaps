import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.siteName,

    short_name: siteConfig.siteName,

    description: siteConfig.description,

    start_url: "/",

    display: "standalone",

    background_color: siteConfig.backgroundColor,

    theme_color: siteConfig.themeColor,

    lang: siteConfig.language,

    icons: [
      {
        src: "/logo.png",
        sizes: "192x192",
        type: "image/png",
      },

      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
      },

      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}