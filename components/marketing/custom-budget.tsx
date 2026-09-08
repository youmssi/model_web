import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Dictionary } from "@/lib/i18n/dictionaries"
import { contactEmail } from "@/lib/i18n/config"

interface CustomBudgetProps {
  custom: Dictionary["pricingPage"]["custom"]
}

export function CustomBudget({ custom }: CustomBudgetProps) {
  return (
    <Card>
      <CardContent className="grid gap-8 p-6 md:grid-cols-2 md:p-8">
        <div className="flex flex-col items-start gap-4">
          <h3 className="text-xl font-semibold tracking-tight">{custom.title}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {custom.subtitle}
          </p>
          <Button
            className="h-9 text-sm"
            render={
              <a
                href={`mailto:${contactEmail}?subject=${encodeURIComponent(
                  "Custom project"
                )}`}
              />
            }
          >
            {custom.cta}
            <ArrowRight />
          </Button>
          <p className="border-l-2 border-gold pl-3 text-sm text-muted-foreground">
            {custom.note}
          </p>
        </div>

        <ol className="flex flex-col justify-center gap-5">
          {custom.steps.map((step, index) => (
            <li key={step} className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-xs font-medium text-primary"
              >
                {index + 1}
              </span>
              <p className="text-sm leading-relaxed">{step}</p>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  )
}
