import type { Metadata } from "next"

import { localeAlternates, localePath, siteUrl, type Locale } from "@/lib/i18n/config"

interface PageMetaOptions {
  locale: Locale
  /** Page path without the locale prefix, e.g. "simulator". */
  path: string
  title: string
  description: string
}

/**
 * Consistent SEO metadata for every page: canonical URL, hreflang alternates,
 * Open Graph and Twitter cards.
 */
export function pageMetadata({ locale, path, title, description }: PageMetaOptions): Metadata {
  const url = siteUrl + localePath(locale, path)
  const ogLocale = locale === "fr" ? "fr_FR" : "en_US"

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: localeAlternates(path),
    },
    openGraph: {
      url,
      siteName: "MRVIN100",
      type: "website",
      locale: ogLocale,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}
