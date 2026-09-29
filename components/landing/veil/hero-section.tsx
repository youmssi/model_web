import Link from "next/link"
import { ArrowRight } from "lucide-react"

import countries from "@/data/africa-countries.json"
import { Button } from "@/components/ui/button"
import type { Dictionary } from "@/lib/i18n/dictionaries"
import { localePath, type Locale } from "@/lib/i18n/config"

interface HeroSectionProps {
  locale: Locale
  copy: Dictionary["home"]["hero"]
  atlas: Dictionary["home"]["atlas"]
}

export function HeroSection({ locale, copy, atlas }: HeroSectionProps) {
  const cameroon = countries.countries.find((country) => country.code === "CM")!
  const africaPath = localePath(locale, "africa")

  return (
    <section className="relative isolate overflow-hidden border-b border-border/70">
      <div aria-hidden="true" className="veil-field absolute inset-0 -z-10" />
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1fr_0.88fr] lg:gap-20 lg:px-10 lg:py-24">
        <div className="animate-rise-in max-w-2xl">
          <p className="mb-6 flex items-center gap-2 text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-foreground" />
            {copy.badge}
          </p>
          <h1 className="max-w-2xl font-serif text-5xl leading-[1.02] font-medium tracking-[-0.045em] text-balance sm:text-6xl lg:text-[4.5rem]">
            {copy.titleLine1} <span className="text-muted-foreground">{copy.titleAccent}</span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
            {copy.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button size="lg" className="h-11 rounded-full px-5" render={<Link href={africaPath} />}>
              {copy.primaryCta}
              <ArrowRight aria-hidden="true" className="ml-1 size-4" />
            </Button>
            <Button size="lg" variant="outline" className="h-11 rounded-full px-5" render={<Link href={localePath(locale, "model")} />}>
              {copy.secondaryCta}
            </Button>
          </div>
          <div className="mt-9 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
            {copy.trustItems.map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>

        <Link
          href={africaPath}
          aria-label={copy.primaryCta}
          className="group relative isolate mx-auto block w-full max-w-[35rem] rounded-[2.5rem] p-3 outline-none focus-visible:ring-2 focus-visible:ring-ring/50 sm:p-5"
        >
          <div aria-hidden="true" className="absolute inset-[8%] z-0 rounded-full bg-[radial-gradient(ellipse_at_center,var(--primary)_0%,transparent_68%)] opacity-[0.09] blur-3xl transition-opacity duration-700 group-hover:opacity-[0.15]" />
          <svg
            viewBox={countries.viewBox}
            role="img"
            aria-label={atlas.mapLabel}
            className="relative z-10 mx-auto block h-auto w-full max-w-[27rem] text-foreground/90 transition-transform duration-700 ease-out group-hover:scale-[1.025] [mask-image:radial-gradient(ellipse_at_center,black_56%,transparent_100%)]"
          >
            <title>{atlas.mapLabel}</title>
            {countries.countries.map((country) => (
              <path
                key={country.code}
                d={country.path}
                fill={country.code === "CM" ? "currentColor" : "var(--map-land)"}
                stroke="var(--background)"
                strokeWidth="1.05"
                vectorEffect="non-scaling-stroke"
              />
            ))}
            <g aria-hidden="true" pointerEvents="none">
              <rect x={cameroon.label.x - 7.5} y={cameroon.label.y - 5.4} width="15" height="10.8" rx="5.4" className="fill-background stroke-foreground" strokeWidth="0.8" />
              <text x={cameroon.label.x} y={cameroon.label.y + 1.8} textAnchor="middle" className="fill-foreground font-sans text-[5.2px] font-bold">CM</text>
            </g>
          </svg>
        </Link>
      </div>
    </section>
  )
}
