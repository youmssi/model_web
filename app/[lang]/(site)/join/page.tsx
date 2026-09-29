import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Building2, Check, Globe2 } from "lucide-react"

import { AnimatedContent } from "@/components/AnimatedContent"
import { ContactBand } from "@/components/marketing/contact-band"
import { SectionHeading } from "@/components/marketing/section-heading"
import { Button } from "@/components/ui/button"
import { JsonLd } from "@/components/json-ld"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { isLocale, localePath } from "@/lib/i18n/config"
import { pageMetadata } from "@/lib/seo"

interface PageProps {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const dict = getDictionary(lang)
  return pageMetadata({
    locale: lang,
    path: "join",
    title: dict.joinPage.title,
    description: dict.joinPage.subtitle,
  })
}

export default async function JoinPage({ params }: PageProps) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const dict = getDictionary(lang)

  const audiences = [
    { icon: Building2, data: dict.joinPage.companies },
    { icon: Globe2, data: dict.joinPage.countries },
  ]

  const joinJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: dict.joinPage.process.title,
    step: dict.joinPage.process.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      text: step,
    })),
  }

  return (
    <>
      <JsonLd data={joinJsonLd} />

      <section className="mx-auto w-full max-w-6xl px-4 pt-16 pb-16 sm:pt-20">
        <SectionHeading
          as="h1"
          title={dict.joinPage.title}
          subtitle={dict.joinPage.subtitle}
        />
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-20">
        <div className="grid gap-4 md:grid-cols-2">
          {audiences.map((audience, index) => (
            <AnimatedContent
              key={audience.data.title}
              distance={14}
              duration={0.45}
              delay={index * 0.1}
              className="h-full"
            >
              <article className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-6 sm:p-8">
                <span className="flex size-10 items-center justify-center rounded-md bg-muted text-foreground">
                  <audience.icon className="size-5" />
                </span>
                <h2 className="text-lg font-semibold tracking-tight">
                  {audience.data.title}
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {audience.data.description}
                </p>
                <ul className="mt-auto space-y-2.5 pt-2">
                  {audience.data.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-sm text-muted-foreground"
                    >
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </AnimatedContent>
          ))}
        </div>
      </section>

      <section className="border-y border-border/60 bg-muted/30">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-20 md:grid-cols-2">
          <div className="flex flex-col gap-6">
            <SectionHeading
              align="left"
              title={dict.joinPage.criteria.title}
              subtitle={dict.joinPage.criteria.subtitle}
            />
            <ul className="space-y-3">
              {dict.joinPage.criteria.items.map((item, index) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-lg border bg-card p-4 text-sm"
                >
                  <span
                    aria-hidden="true"
                    className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-xs font-medium text-primary"
                  >
                    {index + 1}
                  </span>
                  <span className="leading-relaxed text-muted-foreground">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <SectionHeading align="left" title={dict.joinPage.process.title} />
            <ol className="space-y-5">
              {dict.joinPage.process.steps.map((step, index) => (
                <li key={step} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="flex size-6 shrink-0 items-center justify-center rounded-full bg-gold/15 font-mono text-xs font-medium text-gold-foreground dark:text-gold"
                  >
                    {index + 1}
                  </span>
                  <p className="text-sm leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-20">
        <ContactBand
          title={dict.joinPage.contact.title}
          text={dict.joinPage.contact.text}
          placeholder={dict.joinPage.contact.placeholder}
          buttonText={dict.joinPage.contact.button}
          subject={dict.joinPage.contact.subject}
        />
        <div className="mt-8 flex justify-center">
          <Button
            variant="outline"
            className="h-10 px-5 text-sm"
            render={<Link href={localePath(lang, "model")} />}
          >
            {dict.joinPage.cta.secondary}
          </Button>
        </div>
      </section>
    </>
  )
}
