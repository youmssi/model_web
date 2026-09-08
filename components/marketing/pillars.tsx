import { Clock4, Eye, ShieldCheck } from "lucide-react"

import { AnimatedContent } from "@/components/AnimatedContent"
import { SectionHeading } from "@/components/marketing/section-heading"
import { Card, CardContent } from "@/components/ui/card"
import type { Dictionary } from "@/lib/i18n/dictionaries"

interface PillarsProps {
  pillars: Dictionary["home"]["pillars"]
}

const icons = [Clock4, Eye, ShieldCheck]

export function Pillars({ pillars }: PillarsProps) {
  return (
    <section className="border-y border-border/60 bg-muted/30">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:py-24">
        <SectionHeading
          label={pillars.label}
          title={pillars.title}
          subtitle={pillars.subtitle}
        />

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {pillars.items.map((item, index) => {
            const Icon = icons[index % icons.length]
            return (
              <AnimatedContent
                key={item.title}
                distance={40}
                duration={0.6}
                delay={index * 0.1}
              >
                <Card className="h-full">
                  <CardContent className="flex h-full flex-col gap-3">
                    <span className="flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Icon className="size-4.5" />
                    </span>
                    <h3 className="text-base font-semibold">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {item.text}
                    </p>
                  </CardContent>
                </Card>
              </AnimatedContent>
            )
          })}
        </div>
      </div>
    </section>
  )
}
