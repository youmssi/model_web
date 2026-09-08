import Link from "next/link"

import ElectricBorder from "@/components/ElectricBorder"
import { AnimatedContent } from "@/components/AnimatedContent"
import { Button } from "@/components/ui/button"
import { contactEmail, localePath, type Locale } from "@/lib/i18n/config"

interface CtaSectionProps {
  locale: Locale
  cta: {
    title: string
    text: string
    primary: string
    secondary: string
  }
}

export function CtaSection({ locale, cta }: CtaSectionProps) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-24">
      <AnimatedContent distance={40} duration={0.6}>
        <ElectricBorder
          color="#e8b84b"
          speed={1}
          chaos={0.08}
          borderRadius={20}
        >
          <div className="relative overflow-hidden rounded-[20px] bg-gradient-to-br from-primary/10 via-card to-gold/10 px-6 py-14 text-center sm:px-12">
            <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
              {cta.title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
              {cta.text}
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button
                className="h-10 px-5 text-sm"
                render={
                  <a
                    href={`mailto:${contactEmail}?subject=${encodeURIComponent(
                      "Join the MRVIN100 model"
                    )}`}
                  />
                }
              >
                {cta.primary}
              </Button>
              <Button
                variant="outline"
                className="h-10 px-5 text-sm"
                render={<Link href={localePath(locale, "model")} />}
              >
                {cta.secondary}
              </Button>
            </div>
          </div>
        </ElectricBorder>
      </AnimatedContent>
    </section>
  )
}
