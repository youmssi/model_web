import type { getLandingPages } from "@/lib/landing-pages"

type AdoptionCopy = ReturnType<typeof getLandingPages>["adoption"]

export default function Integrations({ copy }: { copy: AdoptionCopy }) {
  return (
    <section className="mt-14 border-y border-border py-9">
      <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-center">
        <div>
          <p className="text-xs font-medium tracking-[0.12em] text-muted-foreground uppercase">MRVIN100 · Country annex</p>
          <h2 className="mt-3 font-serif text-2xl font-medium tracking-tight">{copy.adaptationTitle}</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{copy.adaptationText}</p>
        </div>
        <ol className="grid grid-cols-2 gap-x-5 gap-y-4 sm:grid-cols-4">
          {copy.dimensions.map((dimension, index) => (
            <li key={dimension} className="relative border-t border-border pt-3">
              <span className="font-mono text-[11px] text-muted-foreground">0{index + 1}</span>
              <p className="mt-2 text-sm font-medium leading-5">{dimension}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
