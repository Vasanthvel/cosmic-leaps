import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: siteConfig.baseUrl,

      lastModified: now,

      changeFrequency: "weekly",

      priority: 1,
    },
  ];
}