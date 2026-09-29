export const locales = ["en", "fr"] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = "fr"

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

/** Base URL used for metadata, sitemap and canonical URLs. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://mrvin100.de"
)

export const contactEmail = "mrvin100mail@gmail.com"

/** Build a locale-prefixed path, e.g. localePath("fr", "join") -> "/fr/join". */
export function localePath(locale: Locale, path = ""): string {
  const clean = path.replace(/^\/+/, "")
  return clean ? `/${locale}/${clean}` : `/${locale}`
}

/** Map each locale to its hreflang alternate URL for a given page path. */
export function localeAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {}
  for (const locale of locales) {
    languages[locale] = localePath(locale, path)
  }
  languages["x-default"] = localePath(defaultLocale, path)
  return languages
}
