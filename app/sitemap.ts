import type { MetadataRoute } from "next"

import { localePath, locales, siteUrl } from "@/lib/i18n/config"
import { getDocList } from "@/lib/docs"

// Doc slugs are identical across locales by design.
const docSlugs = getDocList("en").map((doc) => doc.slug)

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "pricing", "faq", "join", "model"]

  const entries: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    for (const path of staticPaths) {
      entries.push({
        url: siteUrl + localePath(locale, path),
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.8,
      })
    }
    for (const slug of docSlugs) {
      entries.push({
        url: siteUrl + localePath(locale, `model/${slug}`),
        changeFrequency: "monthly",
        priority: 0.7,
      })
    }
  }

  return entries
}
