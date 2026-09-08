import { LogoLoop } from "@/components/LogoLoop"
import type { Dictionary } from "@/lib/i18n/dictionaries"

interface TrustedByProps {
  trusted: Dictionary["home"]["trusted"]
}

export function TrustedBy({ trusted }: TrustedByProps) {
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

  return (
    <section className="border-y border-border/60 bg-muted/30">
      <div className="mx-auto w-full max-w-6xl px-4 py-12">
        <div className="mb-8 flex flex-col items-center gap-1 text-center">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            {trusted.label}
          </h2>
          <p className="max-w-xl text-sm text-muted-foreground/80">
            {trusted.subtext}
          </p>
        </div>
        <div className="[mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <LogoLoop
            logos={logos}
            speed={60}
            gap={64}
            logoHeight={20}
            pauseOnHover
            ariaLabel={trusted.ariaLabel}
          />
        </div>
      </div>
    </section>
  )
}
