import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { AfricaAtlas } from "@/components/landing/africa-atlas"
import { pageMetadata } from "@/lib/seo"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { isLocale } from "@/lib/i18n/config"

interface PageProps {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const atlas = getDictionary(lang).home.atlas
  return pageMetadata({ locale: lang, path: "africa", title: atlas.title, description: atlas.description })
}

export default async function AfricaOverviewPage({ params }: PageProps) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const dictionary = getDictionary(lang)
  const atlas = dictionary.home.atlas
  const copy = lang === "en"
    ? { title: "A continental view built from country evidence", intro: "Explore African countries using two-letter identifiers. Country pages show what is known, what is still missing, and where local evidence is needed.", note: "Regional summaries will be calculated only when underlying country data is sufficiently complete and comparable." }
    : { title: "Une vue continentale fondée sur les données nationales", intro: "Explorez les pays africains à l’aide de leurs identifiants à deux lettres. Chaque profil indique les informations disponibles, les données manquantes et les besoins de preuves locales.", note: "Les synthèses régionales seront calculées uniquement lorsque les données nationales seront suffisamment complètes et comparables." }

  return (
    <div className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
      <header className="mb-9 max-w-3xl">
        <p className="text-xs font-medium tracking-[0.13em] text-muted-foreground uppercase">{atlas.eyebrow}</p>
        <h1 className="mt-3 font-serif text-4xl font-medium tracking-tight text-balance sm:text-5xl">{copy.title}</h1>
        <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base">{copy.intro}</p>
        <p className="mt-4 border-l border-border pl-4 text-sm leading-6 text-muted-foreground">{copy.note}</p>
      </header>
      <AfricaAtlas locale={lang} copy={atlas} />
    </div>
  )
}
