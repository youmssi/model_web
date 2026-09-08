import { Check } from "lucide-react"

import { AnimatedContent } from "@/components/AnimatedContent"
import { ElectricBorder } from "@/components/ElectricBorder"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { Dictionary } from "@/lib/i18n/dictionaries"
import { contactEmail } from "@/lib/i18n/config"

interface PackagesGridProps {
  packages: Dictionary["pricingPage"]["packages"]
}

export function PackagesGrid({ packages }: PackagesGridProps) {
  return (
    <div className="grid items-stretch gap-8 lg:grid-cols-3 lg:gap-6">
      {packages.items.map((item, index) => {
        const href = `mailto:${contactEmail}?subject=${encodeURIComponent(
          `${item.name} package`
        )}`

        const card = (
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-base">
                <span>{item.name}</span>
                {item.badge ? (
                  <Badge className="bg-gold text-gold-foreground">
                    {item.badge}
                  </Badge>
                ) : null}
              </CardTitle>
              <CardDescription className="text-sm">
                {item.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-6">
              <p className="flex flex-wrap items-baseline gap-2">
                <span className="text-3xl font-semibold tracking-tight">
                  {item.price}
                </span>
                <span className="text-xs text-muted-foreground">
                  {packages.period}
                </span>
              </p>
              <ul className="space-y-2.5">
                {item.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm text-muted-foreground"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="h-9 w-full text-sm"
                variant={item.badge ? "default" : "outline"}
                render={<a href={href} />}
              >
                {item.cta}
              </Button>
            </CardFooter>
          </Card>
        )

        return (
          <AnimatedContent
            key={item.name}
            distance={40}
            duration={0.6}
            delay={index * 0.1}
            className="h-full"
          >
            {item.badge ? (
              <ElectricBorder
                color="#d9a83e"
                borderRadius={16}
                speed={0.9}
                chaos={0.08}
                className="h-full"
              >
                {card}
              </ElectricBorder>
            ) : (
              card
            )}
          </AnimatedContent>
        )
      })}
    </div>
  )
}
