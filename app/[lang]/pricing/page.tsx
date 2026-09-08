import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { PackagesGrid } from "@/components/marketing/packages-grid"
import { RatesTable } from "@/components/marketing/rates-table"
import { CustomBudget } from "@/components/marketing/custom-budget"
import { SectionHeading } from "@/components/marketing/section-heading"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { isLocale } from "@/lib/i18n/config"
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
    path: "pricing",
    title: dict.pricingPage.title,
    description: dict.pricingPage.subtitle,
  })
}

export default async function PricingPage({ params }: PageProps) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const dict = getDictionary(lang)

  return (
    <>
      <section className="mx-auto w-full max-w-6xl px-4 pb-16 pt-16 sm:pt-20">
        <SectionHeading
          as="h1"
          title={dict.pricingPage.title}
          subtitle={dict.pricingPage.subtitle}
        />
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-20">
        <div className="flex flex-col gap-4">
          <SectionHeading
            align="left"
            label={dict.pricingPage.rates.label}
            title={dict.pricingPage.rates.title}
            subtitle={dict.pricingPage.rates.subtitle}
          />
          <RatesTable rates={dict.pricingPage.rates} />
        </div>
      </section>

      <section className="border-y border-border/60 bg-muted/30">
        <div className="mx-auto w-full max-w-6xl px-4 py-20">
          <SectionHeading
            label={dict.pricingPage.packages.label}
            title={dict.pricingPage.packages.title}
            subtitle={dict.pricingPage.packages.subtitle}
          />
          <div className="mt-12">
            <PackagesGrid packages={dict.pricingPage.packages} />
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-20">
        <CustomBudget custom={dict.pricingPage.custom} />
      </section>
    </>
  )
}
