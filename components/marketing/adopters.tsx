import { LogoLoop } from "@/components/LogoLoop"
import type { Dictionary } from "@/lib/i18n/dictionaries"

interface AdoptersProps {
  adopters: Dictionary["home"]["adopters"]
}

export function Adopters({ adopters }: AdoptersProps) {
  const logos = [
    "Afriland First Bank",
    "PKFOKAM Research Center",
    "ADAF Cameroon",
    "Yaakyi LTD",
    "Webinflu",
  ].map((name) => ({
    node: (
      <span className="whitespace-nowrap text-sm font-semibold tracking-tight text-muted-foreground">
        {name}
      </span>
    ),
    title: name,
    ariaLabel: name,
  }))

  const developerLevels = [
    { level: "Junior", focus: "Startups, MVPs, maintenance" },
    { level: "Middle", focus: "Product development, feature teams" },
    { level: "Senior", focus: "Enterprise systems, complex integrations" },
  ]

  return (
    <section className="border-y border-border/60 bg-muted/30">
      <div className="mx-auto w-full max-w-6xl px-4 py-16">
        <div className="mb-10 flex flex-col items-center gap-1 text-center">
          <h2 className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">
            {adopters.label}
          </h2>
          <p className="max-w-xl text-sm text-muted-foreground/80">{adopters.subtext}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-3 rounded-xl border bg-card p-6">
            <h3 className="text-sm font-semibold">{adopters.orgsLabel}</h3>
            <div className="[mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
              <LogoLoop
                logos={logos}
                speed={60}
                gap={64}
                logoHeight={20}
                pauseOnHover
                ariaLabel={adopters.ariaLabel}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 rounded-xl border bg-card p-6">
            <h3 className="text-sm font-semibold">{adopters.devsLabel}</h3>
            <ul className="space-y-3">
              {developerLevels.map((entry) => (
                <li
                  key={entry.level}
                  className="flex items-baseline justify-between gap-4 text-sm"
                >
                  <span className="font-medium">{entry.level}</span>
                  <span className="text-right text-muted-foreground">{entry.focus}</span>
                </li>
              ))}
            </ul>
            <p className="mt-auto border-t border-border/60 pt-3 text-sm font-medium text-primary">
              {adopters.devShareNote}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}