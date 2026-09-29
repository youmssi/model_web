import { SiteHeader } from "@/components/layout/site-header"
import type { Dictionary } from "@/lib/i18n/dictionaries"
import { localePath, type Locale } from "@/lib/i18n/config"

interface DuskHeaderProps {
  locale: Locale
  nav: Dictionary["nav"]
}

export function DuskHeader({ locale, nav }: DuskHeaderProps) {
  return (
    <SiteHeader
      locale={locale}
      nav={nav}
      links={[
        { href: localePath(locale, "africa"), label: nav.countryMap },
        { href: localePath(locale, "model"), label: nav.model },
        { href: localePath(locale, "compare"), label: nav.compare },
        { href: localePath(locale, "adoption"), label: nav.adoption },
      ]}
      ctaHref={localePath(locale, "contact")}
    />
  )
}
