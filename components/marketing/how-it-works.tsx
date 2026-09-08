import { AnimatedContent } from "@/components/AnimatedContent"
import { SectionHeading } from "@/components/marketing/section-heading"
import { Card, CardContent } from "@/components/ui/card"
import type { Dictionary } from "@/lib/i18n/dictionaries"

interface HowItWorksProps {
  how: Dictionary["home"]["how"]
}

export function HowItWorks({ how }: HowItWorksProps) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:py-24">
      <SectionHeading label={how.label} title={how.title} subtitle={how.subtitle} />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {how.steps.map((step, index) => (
          <AnimatedContent
            key={step.title}
            distance={40}
            duration={0.6}
            delay={index * 0.1}
          >
            <Card className="h-full">
              <CardContent className="flex h-full flex-col gap-3">
                <span
                  aria-hidden="true"
                  className="font-mono text-sm font-medium text-gold"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-base font-semibold">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.text}
                </p>
              </CardContent>
            </Card>
          </AnimatedContent>
        ))}
      </div>
    </section>
  )
}
