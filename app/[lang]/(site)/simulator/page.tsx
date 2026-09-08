import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { SectionHeading } from "@/components/marketing/section-heading"
import { Simulator } from "@/components/simulator/simulator"
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
    path: "simulator",
    title: dict.simulatorPage.title,
    description: dict.simulatorPage.subtitle,
  })
}

export default async function SimulatorPage({ params }: PageProps) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const dict = getDictionary(lang)

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-24 pt-16 sm:pt-20">
      <SectionHeading
        as="h1"
        title={dict.simulatorPage.title}
        subtitle={dict.simulatorPage.subtitle}
      />
      <div className="mt-12">
        <Simulator t={dict.simulatorPage} />
      </div>
    </section>
  )
}