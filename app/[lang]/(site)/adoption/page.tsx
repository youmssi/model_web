import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight } from "lucide-react"

import Integrations from "@/components/landing/veil/integrations-1/one"
import FrameworkParticipants from "@/components/landing/veil/team-1/one"
import { Button } from "@/components/ui/button"
import { getLandingPages } from "@/lib/landing-pages"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { isLocale, localePath } from "@/lib/i18n/config"
import { pageMetadata } from "@/lib/seo"

interface PageProps { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const copy = getLandingPages(lang).adoption
  return pageMetadata({ locale: lang, path: "adoption", title: copy.title, description: copy.intro })
}

export default async function AdoptionPage({ params }: PageProps) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const copy = getLandingPages(lang).adoption
  const nav = getDictionary(lang).nav
  return (
    <article className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
      <header className="max-w-3xl">
        <p className="text-xs font-medium tracking-[0.13em] text-muted-foreground uppercase">{copy.eyebrow}</p>
        <h1 className="mt-3 font-serif text-4xl font-medium tracking-tight text-balance sm:text-5xl">{copy.title}</h1>
        <p className="mt-5 text-sm leading-6 text-muted-foreground sm:text-base">{copy.intro}</p>
      </header>

      <p className="mt-8 max-w-4xl border-l-2 border-foreground pl-4 text-sm leading-6">{copy.status}</p>

      <section className="mt-12 max-w-4xl">
        <h2 className="font-serif text-2xl font-medium tracking-tight">{copy.stepsTitle}</h2>
        <ol className="mt-5 divide-y divide-border border-y border-border">
          {copy.steps.map((step, index) => (
            <li key={step.title} className="grid gap-2 py-5 sm:grid-cols-[3rem_0.75fr_1.25fr] sm:items-baseline sm:gap-5">
              <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
              <h3 className="text-sm font-semibold">{step.title}</h3>
              <p className="text-sm leading-6 text-muted-foreground">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <Integrations copy={copy} />
      <FrameworkParticipants copy={copy} />

      <section className="mt-14 grid gap-5 border-y border-border py-8 sm:grid-cols-[1fr_auto] sm:items-end">
        <div className="max-w-3xl">
          <p className="text-xs font-medium tracking-[0.12em] text-muted-foreground uppercase">MRVIN100 · Playground</p>
          <h2 className="mt-3 font-serif text-2xl font-medium tracking-tight">{copy.economicsTitle}</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{copy.economicsText}</p>
        </div>
        <Button nativeButton={false} variant="outline" className="rounded-full" render={<Link href={localePath(lang, "simulator")} />}>
          {nav.simulator}<ArrowRight aria-hidden="true" className="ml-1 size-4" />
        </Button>
      </section>
    </article>
  )
}
