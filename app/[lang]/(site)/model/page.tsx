import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { AnimatedContent } from "@/components/AnimatedContent"
import { getDocList } from "@/lib/docs"
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
    path: "model",
    title: dict.docs.title,
    description: dict.docs.subtitle,
  })
}

export default async function ModelIndexPage({ params }: PageProps) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const dict = getDictionary(lang)
  const docs = getDocList(lang)

  return (
    <div className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
      <header className="mx-auto max-w-3xl pb-10">
        <span className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
          {dict.docs.label}
        </span>
        <h1 className="mt-4 font-serif text-4xl font-medium tracking-tight text-balance sm:text-5xl">
          {dict.docs.title}
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-pretty text-muted-foreground sm:text-base">
          {dict.docs.subtitle}
        </p>
      </header>

      <nav
        aria-label={dict.docs.sidebarTitle}
        className="mx-auto flex max-w-4xl flex-col gap-0 border-y border-border"
      >
        {docs.map((doc, index) => (
          <AnimatedContent key={doc.slug} delay={index * 0.05} distance={16}>
            <Link
              href={localePath(lang, `model/${doc.slug}`)}
              className="group block border-b border-border px-1 py-5 transition-colors outline-none last:border-b-0 hover:bg-muted/40 focus-visible:ring-2 focus-visible:ring-ring/40 sm:px-4"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-base font-semibold tracking-tight transition-colors group-hover:underline group-hover:underline-offset-4">
                  <span className="mr-3 text-sm text-muted-foreground/70 tabular-nums">
                    {String(doc.order).padStart(2, "0")}
                  </span>
                  {doc.title}
                </h2>
              </div>
              {doc.description ? (
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {doc.description}
                </p>
              ) : null}
            </Link>
          </AnimatedContent>
        ))}
      </nav>
    </div>
  )
}
