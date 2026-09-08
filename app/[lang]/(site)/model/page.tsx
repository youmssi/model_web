import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { AnimatedContent } from "@/components/AnimatedContent"
import { GradientText } from "@/components/GradientText"
import { getDocList } from "@/lib/docs"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { isLocale, localePath } from "@/lib/i18n/config"
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
    <div className="mx-auto max-w-3xl">
      <header className="pb-10">
        <span className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-gold" />
          {dict.docs.label}
        </span>
        <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          <GradientText>{dict.docs.title}</GradientText>
        </h1>
        <p className="mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
          {dict.docs.subtitle}
        </p>
      </header>

      <nav aria-label={dict.docs.sidebarTitle} className="flex flex-col gap-4">
        {docs.map((doc, index) => (
          <AnimatedContent key={doc.slug} delay={index * 0.05} distance={16}>
            <Link
              href={localePath(lang, `model/${doc.slug}`)}
              className="group block rounded-xl border border-border/60 bg-card p-5 transition-colors outline-none hover:border-border hover:bg-muted/40 focus-visible:ring-2 focus-visible:ring-ring/40"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-base font-semibold tracking-tight transition-colors group-hover:text-primary">
                  <span className="mr-3 text-sm tabular-nums text-muted-foreground/70">
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
