import type { Dictionary } from "@/lib/i18n/dictionaries"
import type { Locale } from "@/lib/i18n/config"
import { HeroSection } from "@/components/landing/veil/hero-section"
import LogoCloud from "@/components/landing/veil/logo-cloud-2/two"
import Features from "@/components/landing/veil/features-3/three"
import Stats from "@/components/landing/veil/stats-2/two"
import CallToAction from "@/components/landing/veil/call-to-action-3/three"
import { DuskHeader } from "@/components/landing/dusk-header"
import { SiteFooter } from "@/components/layout/site-footer"

interface DuskLandingProps {
  locale: Locale
  dict: Dictionary
}

export function DuskLanding({ locale, dict }: DuskLandingProps) {
  return (
    <>
      <DuskHeader locale={locale} nav={dict.nav} />
      <main>
        <HeroSection locale={locale} copy={dict.home.hero} atlas={dict.home.atlas} />
        <LogoCloud copy={dict.home.logoCloud} />
        <Stats copy={dict.home.evidence} />
        <Features locale={locale} copy={dict.home.framework} />
        <CallToAction locale={locale} copy={dict.home.cta} />
      </main>
      <SiteFooter locale={locale} footer={dict.footer} nav={dict.nav} />
    </>
  )
}
