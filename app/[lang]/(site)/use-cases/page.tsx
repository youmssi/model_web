import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowRight,
  Briefcase,
  Building2,
  GraduationCap,
  Handshake,
  Landmark,
  Rocket,
} from "lucide-react"

import { AnimatedContent } from "@/components/AnimatedContent"
import { SectionHeading } from "@/components/marketing/section-heading"
import SpotlightCard from "@/components/SpotlightCard"
import { Button } from "@/components/ui/button"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { isLocale, localePath } from "@/lib/i18n/config"
import { pageMetadata } from "@/lib/seo"

interface PageProps {
  params: Promise<{ lang: string }>
}

const icons = [Rocket, Briefcase, Building2, Landmark, GraduationCap, Handshake]

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const dict = getDictionary(lang)
  return pageMetadata({
    locale: lang,
    path: "use-cases",
    title: dict.useCasesPage.title,
    description: dict.useCasesPage.subtitle,
  })
}

export default async function UseCasesPage({ params }: PageProps) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const dict = getDictionary(lang)

  return (
    <>
      <section className="mx-auto w-full max-w-6xl px-4 pb-16 pt-16 sm:pt-20">
        <SectionHeading
          as="h1"
          title={dict.useCasesPage.title}
          subtitle={dict.useCasesPage.subtitle}
        />
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-20">
        <div className="grid gap-4 md:grid-cols-2">
          {dict.useCasesPage.areas.map((area, index) => {
            const Icon = icons[index % icons.length]
            return (
              <AnimatedContent
                key={area.title}
                distance={40}
                duration={0.6}
                delay={(index % 2) * 0.1}
                className="h-full"
              >
                <SpotlightCard
                  className="flex h-full flex-col gap-4 rounded-2xl p-6 sm:p-8"
                  spotlightColor="rgba(16, 160, 111, 0.14)"
                >
                  <span className="flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <h2 className="text-lg font-semibold tracking-tight">{area.title}</h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {area.text}
                  </p>
                  <ul className="mt-auto space-y-2.5 pt-2">
                    {area.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2.5 text-sm text-muted-foreground"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold"
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </AnimatedContent>
            )
          })}
        </div>
      </section>

      <section className="border-t border-border/60 bg-muted/30">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-4 py-20 text-center">
          <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            {dict.useCasesPage.cta.title}
          </h2>
          <p className="max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
            {dict.useCasesPage.cta.text}
          </p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <Button
              className="h-10 px-5 text-sm"
              render={<Link href={localePath(lang, "simulator")} />}
            >
              {dict.useCasesPage.cta.primary}
              <ArrowRight />
            </Button>
            <Button
              variant="outline"
              className="h-10 px-5 text-sm"
              render={<Link href={localePath(lang, "join")} />}
            >
              {dict.useCasesPage.cta.secondary}
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
