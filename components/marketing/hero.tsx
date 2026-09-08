import Link from "next/link"

import Noise from "@/components/Noise"
import { GradientText } from "@/components/GradientText"
import { Button } from "@/components/ui/button"
import { localePath, type Locale } from "@/lib/i18n/config"

interface HeroProps {
  locale: Locale
  hero: {
    badge: string
    titleLine1: string
    titleAccent: string
    subtitle: string
    primaryCta: string
    secondaryCta: string
  }
}

export function Hero({ locale, hero }: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Ambient glow, pure CSS, no runtime cost */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-40 mx-auto h-80 max-w-3xl rounded-full bg-primary/15 blur-3xl"
      />

      {/* Film-grain texture */}
      <Noise patternAlpha={7} patternRefreshInterval={3} />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-4 pb-20 pt-20 text-center sm:pt-28">
        <span className="animate-rise-in inline-flex items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-gold" />
          {hero.badge}
        </span>

        <h1 className="animate-rise-in animation-delay-100 mt-6 max-w-4xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
          {hero.titleLine1}{" "}
          <GradientText
            className="font-semibold"
            colors={["#10a06f", "#e8b84b", "#10a06f"]}
            animationSpeed={10}
          >
            {hero.titleAccent}
          </GradientText>
        </h1>

        <p className="animate-rise-in animation-delay-200 mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          {hero.subtitle}
        </p>

        <div className="animate-rise-in animation-delay-300 mt-8 flex flex-col gap-3 sm:flex-row">
          <Button
            className="h-10 px-5 text-sm"
            render={<Link href={localePath(locale, "join")} />}
          >
            {hero.primaryCta}
          </Button>
          <Button
            variant="outline"
            className="h-10 px-5 text-sm"
            render={<Link href={localePath(locale, "model")} />}
          >
            {hero.secondaryCta}
          </Button>
        </div>
      </div>
    </section>
  )
}
