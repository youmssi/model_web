import type { Metadata } from "next"
import { notFound } from "next/navigation"

import ContactSection from "@/components/landing/veil/contact-1/one"
import { getLandingPages } from "@/lib/landing-pages"
import { isLocale } from "@/lib/i18n/config"
import { pageMetadata } from "@/lib/seo"

interface PageProps { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const copy = getLandingPages(lang).contact
  return pageMetadata({ locale: lang, path: "contact", title: copy.seoTitle, description: copy.seoDescription })
}

export default async function ContactPage({ params }: PageProps) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const copy = getLandingPages(lang).contact
  return (
    <article className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
      <header className="max-w-3xl">
        <p className="text-xs font-medium tracking-[0.13em] text-muted-foreground uppercase">{copy.eyebrow}</p>
        <h1 className="mt-3 font-serif text-4xl font-medium tracking-tight text-balance sm:text-5xl">{copy.title}</h1>
        <p className="mt-5 text-sm leading-6 text-muted-foreground sm:text-base">{copy.intro}</p>
      </header>
      <ContactSection copy={copy} />
    </article>
  )
}
