import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { DuskLanding } from "@/components/landing/dusk-landing"
import { JsonLd } from "@/components/json-ld"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { isLocale, siteUrl } from "@/lib/i18n/config"
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

      <DuskLanding locale={lang} dict={dict} />
    </>
  )
}
