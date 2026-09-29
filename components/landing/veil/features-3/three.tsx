"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { Dictionary } from "@/lib/i18n/dictionaries"
import { localePath, type Locale } from "@/lib/i18n/config"

interface FeaturesProps {
  locale: Locale
  copy: Dictionary["home"]["framework"]
}

export default function Features({ locale, copy }: FeaturesProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const selected = copy.principles[selectedIndex]

  return (
    <section className="border-y border-border/70 bg-muted/25 py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24 lg:px-10">
        <div>
          <p className="text-xs font-medium tracking-[0.12em] text-muted-foreground uppercase">{copy.eyebrow}</p>
          <h2 className="mt-3 max-w-xl font-serif text-3xl font-medium tracking-tight text-balance sm:text-4xl">{copy.title}</h2>
          <p className="mt-4 max-w-lg text-sm leading-6 text-muted-foreground">{copy.description}</p>
          <Button nativeButton={false} variant="outline" size="sm" className="mt-6 rounded-full" render={<Link href={localePath(locale, "model")} />}>
            {copy.readMore}<ArrowUpRight aria-hidden="true" className="ml-1 size-4" />
          </Button>
        </div>

        <div className="grid gap-8 sm:grid-cols-[minmax(12rem,0.72fr)_minmax(0,1.28fr)] sm:gap-10">
          <div className="flex flex-col border-t border-border">
            {copy.principles.map((principle, index) => (
              <button key={principle.title} type="button" aria-pressed={selectedIndex === index} onClick={() => setSelectedIndex(index)} className="grid grid-cols-[2.25rem_1fr] items-baseline gap-2 border-b border-border py-3 text-left text-sm transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none">
                <span className="font-mono text-xs text-muted-foreground tabular-nums">0{index + 1}</span>
                <span className={selectedIndex === index ? "font-medium text-foreground" : "text-muted-foreground"}>{principle.title}</span>
              </button>
            ))}
          </div>

          <div className="flex min-h-64 flex-col justify-between border-l border-border pl-6 sm:pl-9">
            <div aria-live="polite">
              <p className="font-mono text-xs text-muted-foreground">MRVIN100 / 0{selectedIndex + 1}</p>
              <h3 className="mt-8 max-w-lg font-serif text-2xl font-medium tracking-tight text-balance sm:text-3xl">{selected.title}</h3>
              <p className="mt-4 max-w-lg text-sm leading-6 text-muted-foreground">{selected.text}</p>
            </div>
            <p className="mt-8 max-w-lg text-xs leading-5 text-muted-foreground">{copy.statusNote}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
