import type { Dictionary } from "@/lib/i18n/dictionaries"

interface LogoCloudProps {
  copy: Dictionary["home"]["logoCloud"]
}

export default function LogoCloud({ copy }: LogoCloudProps) {
  return (
    <section aria-label={copy.title} className="border-b border-border/70">
      <div className="mx-auto grid max-w-7xl gap-5 px-5 py-7 sm:px-8 lg:grid-cols-[0.55fr_1.45fr] lg:items-center lg:px-10">
        <p className="text-xs font-medium tracking-[0.12em] text-muted-foreground uppercase">{copy.title}</p>
        <ul className="flex flex-wrap items-center gap-x-0 gap-y-2 text-sm">
          {copy.actors.map((actor, index) => (
            <li key={actor} className="flex items-center">
              {index > 0 && <span aria-hidden="true" className="mx-3 h-4 w-px bg-border" />}
              <span className="font-medium tracking-tight">{actor}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
