import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { SectionHeading } from "@/components/marketing/section-heading"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { JsonLd } from "@/components/json-ld"
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
    path: "faq",
    title: dict.faqPage.title,
    description: dict.faqPage.subtitle,
  })
}

export default async function FaqPage({ params }: PageProps) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const dict = getDictionary(lang)

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dict.faqPage.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  }

  return (
    <>
      <JsonLd data={faqJsonLd} />

      <section className="mx-auto w-full max-w-3xl px-4 pb-24 pt-16 sm:pt-20">
        <SectionHeading
          as="h1"
          title={dict.faqPage.title}
          subtitle={dict.faqPage.subtitle}
        />

        <Accordion className="mt-12 rounded-xl" multiple={false}>
          {dict.faqPage.items.map((item, index) => (
            <AccordionItem key={item.q} value={`faq-${index}`}>
              <AccordionTrigger className="px-4 py-4 text-sm sm:text-base">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="px-4 text-sm leading-relaxed text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </>
  )
}
