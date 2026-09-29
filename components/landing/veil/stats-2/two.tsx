import type { Dictionary } from "@/lib/i18n/dictionaries"

interface StatsProps {
  copy: Dictionary["home"]["evidence"]
}

export default function Stats({ copy }: StatsProps) {
  return (
    <section className="py-16 sm:py-20" aria-labelledby="evidence-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-5 md:grid-cols-[0.8fr_1.2fr] md:items-end">
          <div>
            <p className="text-xs font-medium tracking-[0.12em] text-muted-foreground uppercase">{copy.eyebrow}</p>
            <h2 id="evidence-heading" className="mt-3 max-w-xl font-serif text-3xl font-medium tracking-tight text-balance sm:text-4xl">{copy.title}</h2>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground md:justify-self-end">{copy.description}</p>
        </div>
        <div className="mt-9 grid border-y border-border md:grid-cols-3 md:divide-x md:divide-border">
          {copy.items.map((item) => (
            <article key={item.title} className="border-b border-border py-6 last:border-b-0 md:border-b-0 md:px-6 md:first:pl-0 md:last:pr-0">
              <p className="text-xs text-muted-foreground">{item.qualifier}</p>
              <p className="mt-3 font-serif text-4xl font-medium tracking-tight tabular-nums sm:text-5xl">{item.value}</p>
              <h3 className="mt-4 text-sm font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p>
              <a href={item.href} target="_blank" rel="noreferrer" className="mt-4 inline-flex text-xs font-medium underline decoration-border underline-offset-4 hover:text-foreground">
                {item.source}<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </article>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap justify-between gap-3 text-xs text-muted-foreground">
          <span>{copy.directTitle} · {copy.directText}</span>
          <span>{copy.enabledTitle} · {copy.enabledText}</span>
        </div>
        <p className="mt-4 max-w-4xl text-xs leading-5 text-muted-foreground">{copy.methodNote}</p>
      </div>
    </section>
  )
}
