import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight } from "lucide-react"

import countryData from "@/data/africa-countries.json"
import { Button } from "@/components/ui/button"
import { getLandingPages } from "@/lib/landing-pages"
import { pageMetadata } from "@/lib/seo"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { contactEmail, isLocale, localePath } from "@/lib/i18n/config"

interface PageProps {
  params: Promise<{ lang: string; country: string }>
}

const countries = countryData.countries

export function generateStaticParams() {
  return countries.map(({ code }) => ({ country: code.toLowerCase() }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, country: countryCode } = await params
  if (!isLocale(lang)) notFound()
  const country = countries.find(({ code }) => code.toLowerCase() === countryCode.toLowerCase())
  if (!country) notFound()
  const name = new Intl.DisplayNames([lang], { type: "region" }).of(country.code) ?? country.name
  return pageMetadata({ locale: lang, path: `africa/${country.code.toLowerCase()}`, title: `${name} · ${country.code}`, description: getLandingPages(lang).country.description })
}

export default async function CountryProfilePage({ params }: PageProps) {
  const { lang, country: countryCode } = await params
  if (!isLocale(lang)) notFound()
  const country = countries.find(({ code }) => code.toLowerCase() === countryCode.toLowerCase())
  if (!country) notFound()

  const dictionary = getDictionary(lang)
  const copy = getLandingPages(lang).country
  const name = new Intl.DisplayNames([lang], { type: "region" }).of(country.code) ?? country.name
  const regionName = dictionary.home.atlas.regions[country.region as keyof typeof dictionary.home.atlas.regions]
  const subject = encodeURIComponent(`${copy.eyebrow}: ${name} (${country.code})`)

  return (
    <article className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
      <Link href={localePath(lang, "africa")} className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
        <ArrowLeft aria-hidden="true" className="size-4" />{copy.overview}
      </Link>
      <header className="mt-10 max-w-3xl">
        <p className="text-xs font-medium tracking-[0.13em] text-muted-foreground uppercase">{copy.eyebrow}</p>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <span className="font-mono text-2xl font-medium tracking-wide">{country.code}</span>
          <h1 className="font-serif text-4xl font-medium tracking-tight text-balance sm:text-5xl">{name}</h1>
        </div>
        <p className="mt-5 text-sm leading-6 text-muted-foreground sm:text-base">{copy.description}</p>
      </header>

      <dl className="mt-10 grid gap-0 border-y border-border sm:grid-cols-2 sm:divide-x sm:divide-border">
        <div className="py-5 sm:pr-6">
          <dt className="text-xs text-muted-foreground">{copy.codeLabel}</dt>
          <dd className="mt-2 font-mono text-lg font-medium">{country.code}</dd>
        </div>
        <div className="border-t border-border py-5 sm:border-t-0 sm:pl-6">
          <dt className="text-xs text-muted-foreground">{copy.regionLabel}</dt>
          <dd className="mt-2 text-lg font-medium">{regionName}</dd>
        </div>
      </dl>

      <section className="mt-12">
        <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-border pb-4">
          <h2 className="font-serif text-2xl font-medium tracking-tight">{copy.workstreamsTitle}</h2>
          <span className="text-xs text-muted-foreground">{copy.status}</span>
        </div>
        <ol className="divide-y divide-border">
          {copy.workstreams.map((item, index) => (
            <li key={item} className="grid gap-2 py-4 sm:grid-cols-[3rem_1fr] sm:items-baseline">
              <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
              <span className="text-sm leading-6">{item}</span>
            </li>
          ))}
        </ol>
      </section>

      <p className="mt-7 max-w-3xl border-l border-border pl-4 text-sm leading-6 text-muted-foreground">{copy.note}</p>
      <Button nativeButton={false} variant="outline" className="mt-7 rounded-full" render={<a href={`mailto:${contactEmail}?subject=${subject}`} />}>
        {copy.cta}<ArrowUpRight aria-hidden="true" className="ml-1 size-4" />
      </Button>
    </article>
  )
}
