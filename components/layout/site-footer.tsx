import Footer from "@/components/landing/veil/footer-4/four"
import type { Dictionary } from "@/lib/i18n/dictionaries"
import type { Locale } from "@/lib/i18n/config"

interface SiteFooterProps {
  locale: Locale
  footer: Dictionary["footer"]
  nav: Dictionary["nav"]
}

export function SiteFooter({ locale, footer, nav }: SiteFooterProps) {
  return <Footer locale={locale} copy={footer} nav={nav} />
}
