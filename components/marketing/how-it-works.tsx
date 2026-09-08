import DriftWall from "@/components/DriftWall"
import SpotlightCard from "@/components/SpotlightCard"
import { SectionHeading } from "@/components/marketing/section-heading"
import type { Dictionary } from "@/lib/i18n/dictionaries"

interface HowItWorksProps {
  how: Dictionary["home"]["how"]
}

const palette = ["#0e3a2a", "#13593d", "#0b2f22", "#17734c", "#0a261c"]

function tileImage(index: number): string {
  const from = palette[index % palette.length]
  const to = palette[(index + 2) % palette.length]
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${from}"/>
      <stop offset="1" stop-color="${to}"/>
    </linearGradient>
    <radialGradient id="h" cx="0.3" cy="0.25" r="0.9">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.22"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="600" height="400" fill="url(#g)"/>
  <path d="M0 ${120 + (index % 5) * 36} Q150 20 300 ${150 + (index % 3) * 28} T600 ${90 + (index % 4) * 44} L600 400 L0 400 Z" fill="#000000" opacity="0.16"/>
  <rect width="600" height="400" fill="url(#h)"/>
</svg>`
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

const wallItems = Array.from({ length: 16 }, (_, i) => ({
  image: tileImage(i),
  title: `MRVIN100 · ${String(i + 1).padStart(2, "0")}`,
}))

export function HowItWorks({ how }: HowItWorksProps) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:py-24">
      <SectionHeading label={how.label} title={how.title} subtitle={how.subtitle} />

      <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <SpotlightCard
          className="flex h-full flex-col justify-center gap-7 rounded-2xl p-7 sm:p-9"
          spotlightColor="rgba(16, 160, 111, 0.14)"
        >
          {how.steps.map((step, index) => (
            <div key={step.title} className="flex flex-col gap-2">
              <span aria-hidden="true" className="font-mono text-xs font-medium text-gold">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-base font-semibold">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{step.text}</p>
            </div>
          ))}
        </SpotlightCard>

        <div
          aria-hidden="true"
          className="relative min-h-[380px] overflow-hidden rounded-3xl bg-[#070a09] lg:min-h-0"
        >
          <DriftWall
            items={wallItems}
            columns={4}
            tileWidth={200}
            tileHeight={132}
            gap={18}
            tilt={10}
            turn={-12}
            perspective={1400}
            depth={90}
            speed={34}
            direction="up"
            variance={0.4}
            parallax={0.3}
            fade={0.55}
            dim={0.7}
            overlayColor="#000000"
            className="opacity-90"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070a09]/70 via-transparent to-transparent" />
        </div>
      </div>
    </section>
  )
}
