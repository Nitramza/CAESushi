import type { MetadataRoute } from "next";
import { siteData, siteUrl, withBasePath } from "@/data/siteData";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      images: [new URL(withBasePath(siteData.heroImage), `${siteUrl}/`).toString()],
    },
  ];
}