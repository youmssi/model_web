import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight } from "lucide-react"

import { Hero } from "@/components/marketing/hero"
import { TrustedBy } from "@/components/marketing/trusted-by"
import { HowItWorks } from "@/components/marketing/how-it-works"
import { Pillars } from "@/components/marketing/pillars"
import { Stats } from "@/components/marketing/stats"
import { PackagesGrid } from "@/components/marketing/packages-grid"
import { CtaSection } from "@/components/marketing/cta-section"
import { SectionHeading } from "@/components/marketing/section-heading"
import { Button } from "@/components/ui/button"
import { JsonLd } from "@/components/json-ld"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { isLocale, localePath, siteUrl } from "@/lib/i18n/config"
import { pageMetadata } from "@/lib/seo"

interface PageProps {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const dict = getDictionary(lang)
  return pageMetadata({
    locale: lang,
    path: "",
    // Absolute title: the home page must not get the "%s | MRVIN100" template.
    title: dict.meta.title,
    description: dict.meta.description,
  })
}

export default async function HomePage({ params }: PageProps) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const dict = getDictionary(lang)

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MRVIN100",
    url: siteUrl,
    email: "mrvin100mail@gmail.com",
    description: dict.meta.description,
    location: ["Berlin", "Yaoundé", "Conakry"],
  }

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: dict.meta.siteName,
    url: siteUrl,
    inLanguage: lang,
  }

  return (
    <>
      <JsonLd data={organizationJsonLd} />
      <JsonLd data={websiteJsonLd} />

      <Hero locale={lang} hero={dict.home.hero} />
      <TrustedBy trusted={dict.home.trusted} />
      <HowItWorks how={dict.home.how} />
      <Pillars pillars={dict.home.pillars} />
      <Stats stats={dict.home.stats} />

      <section className="border-y border-border/60 bg-muted/30">
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:py-24">
          <SectionHeading
            label={dict.home.pricingPreview.label}
            title={dict.home.pricingPreview.title}
            subtitle={dict.home.pricingPreview.subtitle}
          />
          <div className="mt-12">
            <PackagesGrid packages={dict.pricingPage.packages} />
          </div>
          <div className="mt-10 flex justify-center">
            <Button
              variant="outline"
              className="h-10 px-5 text-sm"
              render={<Link href={localePath(lang, "pricing")} />}
            >
              {dict.home.pricingPreview.cta}
              <ArrowRight />
            </Button>
          </div>
        </div>
      </section>

      <div className="pt-20 sm:pt-24">
        <CtaSection locale={lang} cta={dict.home.cta} />
      </div>
    </>
  )
}
