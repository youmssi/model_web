import type { Metadata } from "next"
import { notFound } from "next/navigation"

import CallToAction from "@/components/dusk/blocks/call-to-action-1"
import Content from "@/components/dusk/blocks/content-3"
import FeaturesFive from "@/components/dusk/blocks/features-5"
import FeaturesSix from "@/components/dusk/blocks/features-6"
import Footer from "@/components/dusk/blocks/footer-1"
import HeroSection from "@/components/dusk/blocks/hero-section-3"
import Pricing from "@/components/dusk/blocks/pricing-1"
import Stats from "@/components/dusk/blocks/stats-1"
import Team from "@/components/dusk/blocks/team-1"
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
    path: "dusk",
    title: "Dusk landing · MRVIN100",
    description: dict.meta.description,
  })
}

export default async function DuskLandingPage({ params }: PageProps) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()

  return (
    <div className="dusk-root dark min-h-svh bg-background text-foreground">
      <HeroSection />
      <FeaturesFive />
      <FeaturesSix />
      <Content />
      <Stats />
      <Team />
      <Pricing />
      <CallToAction />
      <Footer />
    </div>
  )
}
