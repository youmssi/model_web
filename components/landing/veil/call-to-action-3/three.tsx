import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { Dictionary } from "@/lib/i18n/dictionaries"
import { localePath, type Locale } from "@/lib/i18n/config"

interface CallToActionProps {
  locale: Locale
  copy: Dictionary["home"]["cta"]
}

export default function CallToAction({ locale, copy }: CallToActionProps) {
  return (
    <section className="border-y border-border/70 bg-muted/25 py-16 sm:py-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-7 px-5 sm:px-8 md:flex-row md:items-end md:justify-between lg:px-10">
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-[0.12em] text-muted-foreground uppercase">MRVIN100 · Open framework</p>
          <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-balance sm:text-4xl">{copy.title}</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">{copy.text}</p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <Button size="lg" className="rounded-full" render={<Link href={localePath(locale, "adoption")} />}>
            {copy.primary}<ArrowRight aria-hidden="true" className="ml-1 size-4" />
          </Button>
          <Button size="lg" variant="outline" className="rounded-full" render={<Link href={localePath(locale, "africa")} />}>
            {copy.secondary}
          </Button>
        </div>
      </div>
    </section>
  )
}
