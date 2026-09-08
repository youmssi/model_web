import { CountUp } from "@/components/CountUp"
import type { Dictionary } from "@/lib/i18n/dictionaries"

interface StatsProps {
  stats: Dictionary["home"]["stats"]
}

export function Stats({ stats }: StatsProps) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:py-24">
      <h2 className="sr-only">{stats.label}</h2>
      <dl className="grid grid-cols-2 gap-x-6 gap-y-10 text-center lg:grid-cols-4">
        {stats.items.map((item) => (
          <div key={item.label} className="flex flex-col items-center gap-2">
            <dd className="text-4xl font-semibold tracking-tight sm:text-5xl">
              <CountUp to={item.value} duration={2} separator=" " />
              <span className="text-gold">{item.suffix}</span>
            </dd>
            <dt className="max-w-48 text-sm text-muted-foreground">
              {item.label}
            </dt>
          </div>
        ))}
      </dl>
    </section>
  )
}
