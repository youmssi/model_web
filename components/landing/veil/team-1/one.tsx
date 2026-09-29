import type { getLandingPages } from "@/lib/landing-pages"

type AdoptionCopy = ReturnType<typeof getLandingPages>["adoption"]

export default function FrameworkParticipants({ copy }: { copy: AdoptionCopy }) {
  return (
    <section className="mt-14">
      <div className="max-w-2xl">
        <p className="text-xs font-medium tracking-[0.12em] text-muted-foreground uppercase">MRVIN100 · Open participation</p>
        <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-balance">{copy.rolesTitle}</h2>
      </div>
      <div className="mt-7 grid border-t border-border sm:grid-cols-2 sm:gap-x-10">
        {copy.actors.map((actor, index) => (
          <article key={actor.title} className="grid grid-cols-[2.5rem_1fr] gap-3 border-b border-border py-5">
            <span className="font-mono text-xs text-muted-foreground tabular-nums">0{index + 1}</span>
            <div>
              <h3 className="text-sm font-semibold">{actor.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{actor.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
