import { ArrowRight, ArrowUpRight, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { getLandingPages } from "@/lib/landing-pages"
import { contactEmail } from "@/lib/i18n/config"

type ContactCopy = ReturnType<typeof getLandingPages>["contact"]

export default function ContactSection({ copy }: { copy: ContactCopy }) {
  const subject = encodeURIComponent(copy.subject)

  return (
    <section className="mt-10 grid gap-5 sm:grid-cols-[0.9fr_1.1fr]">
      <a
        href={`mailto:${contactEmail}?subject=${subject}`}
        className="group relative flex min-h-64 flex-col justify-between overflow-hidden rounded-3xl border border-border/70 bg-muted/35 p-6 transition-colors hover:bg-muted/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 sm:p-8"
      >
        <div aria-hidden="true" className="absolute -right-12 -top-16 size-52 rounded-full bg-[radial-gradient(circle,var(--primary)_0%,transparent_70%)] opacity-[0.08] blur-2xl transition-opacity group-hover:opacity-[0.14]" />
        <span className="relative inline-flex size-12 items-center justify-center rounded-2xl bg-foreground text-background shadow-sm">
          <Mail aria-hidden="true" className="size-5" />
        </span>
        <span className="relative mt-8">
          <span className="block text-xs font-medium tracking-[0.12em] text-muted-foreground uppercase">{copy.emailLabel}</span>
          <span className="mt-2 flex items-center justify-between gap-3">
            <span className="break-all text-base font-semibold tracking-tight sm:text-lg">{contactEmail}</span>
            <ArrowUpRight aria-hidden="true" className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </span>
      </a>

      <div className="relative flex min-h-64 flex-col items-start justify-center overflow-hidden rounded-3xl border border-border/70 bg-background p-6 sm:p-8">
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-32 bg-[linear-gradient(135deg,color-mix(in_oklab,var(--primary)_7%,transparent),transparent_70%)]" />
        <div className="relative">
          <p className="text-xs font-medium tracking-[0.12em] text-muted-foreground uppercase">MRVIN100 · {copy.emailLabel}</p>
          <h2 className="mt-3 font-serif text-2xl font-medium tracking-tight sm:text-3xl">{copy.nextTitle}</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">{copy.nextText}</p>
          <Button nativeButton={false} className="mt-6 rounded-full" render={<a href={`mailto:${contactEmail}?subject=${subject}`} />}>
            {copy.action}<ArrowRight aria-hidden="true" className="ml-1 size-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
