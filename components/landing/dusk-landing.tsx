import Link from "next/link"

import { DuskHeader } from "@/components/landing/dusk-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { GradientText } from "@/components/GradientText"
import { Button } from "@/components/ui/button"
import {
  Building2,
  Clock4,
  Eye,
  Globe2,
  Handshake,
  Landmark,
  Rocket,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react"
import type { Dictionary } from "@/lib/i18n/dictionaries"
import { contactEmail, localePath, type Locale } from "@/lib/i18n/config"

interface DuskLandingProps {
  locale: Locale
  dict: Dictionary
}

const orgNames = [
  "Afriland First Bank",
  "PKFOKAM Research Center",
  "ADAF Cameroon",
  "Yaakyi LTD",
  "Webinflu",
]

const roleIcons = {
  continent: Landmark,
  companies: Building2,
  talent: UserRound,
  states: Globe2,
  universities: Handshake,
  agencies: Rocket,
}

export function DuskLanding({ locale, dict }: DuskLandingProps) {
  const hero = dict.home.hero
  const pillars = dict.home.pillars
  const how = dict.home.how
  const stats = dict.home.stats
  const adopters = dict.home.adopters
  const areas = dict.useCasesPage.areas
  const joinCompanies = dict.joinPage.companies
  const joinCountries = dict.joinPage.countries
  const criteria = dict.joinPage.criteria
  const homeCta = dict.home.cta

  const roleKeys = Object.keys(roleIcons) as Array<keyof typeof roleIcons>

  return (
    <>
      <DuskHeader locale={locale} nav={dict.nav} />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-36 pb-16 md:pt-44">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-4xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-gold" />
                {hero.badge}
              </span>
              <h1 className="mt-8 text-balance text-5xl font-medium tracking-tight md:text-6xl lg:text-7xl">
                <span className="text-muted-foreground">{hero.titleLine1} </span>
                <GradientText colors={["#10a06f", "#e8b84b", "#10a06f"]}>
                  {hero.titleAccent}
                </GradientText>
              </h1>
              <p className="mx-auto mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
                {hero.subtitle}
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                <Button
                  size="lg"
                  className="h-11 rounded-full px-6 text-sm"
                  render={<Link href={localePath(locale, "join")} />}
                >
                  {hero.primaryCta}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-11 rounded-full px-6 text-sm"
                  render={<Link href={localePath(locale, "model")} />}
                >
                  {hero.secondaryCta}
                </Button>
              </div>
            </div>

            {/* Logo cloud */}
            <div className="mx-auto mt-20 max-w-5xl">
              <p className="text-center text-sm font-medium tracking-widest text-muted-foreground uppercase">
                {adopters.label}
              </p>
              <div className="mt-8 grid grid-cols-2 items-center justify-items-center gap-x-6 gap-y-4 text-sm font-semibold tracking-tight text-muted-foreground/80 sm:grid-cols-3 lg:grid-cols-5">
                {orgNames.map((name) => (
                  <span key={name} className="text-center">
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pillars / "the model guarantees" */}
        <section className="border-y border-border/60 bg-muted/30">
          <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
                {pillars.label}
              </p>
              <h2 className="mt-4 text-balance text-4xl font-medium tracking-tight md:text-5xl">
                <span className="text-muted-foreground">{pillars.title} </span>
                <span className="text-foreground">{pillars.subtitle}</span>
              </h2>
            </div>

            <div className="mt-16 grid gap-5 md:grid-cols-3">
              {pillars.items.map((item, index) => {
                const Icon = [ShieldCheck, Eye, Clock4][index % 3]
                return (
                  <div
                    key={item.title}
                    className="group flex flex-col gap-5 rounded-2xl border border-border/60 bg-card p-8 transition-colors hover:border-border"
                  >
                    <span className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="text-xl font-medium tracking-tight">{item.title}</h3>
                    <p className="text-muted-foreground text-pretty leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* How it works / workflow */}
        <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-20">
            <div className="lg:sticky lg:top-28">
              <p className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
                {how.label}
              </p>
              <h2 className="mt-4 text-balance text-4xl font-medium tracking-tight md:text-5xl">
                {how.title}
              </h2>
              <p className="mt-6 text-muted-foreground text-lg">{how.subtitle}</p>
            </div>

            <div className="flex flex-col">
              {how.steps.map((step, index) => (
                <div
                  key={step.title}
                  className="flex gap-6 border-t border-border/60 py-8 first:border-t-0"
                >
                  <span className="font-mono text-sm text-gold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-lg font-medium tracking-tight">{step.title}</h3>
                    <p className="mt-2 max-w-xl text-muted-foreground leading-relaxed">
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-y border-border/60 bg-muted/30">
          <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
            <h2 className="sr-only">{stats.label}</h2>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-10 text-center lg:grid-cols-4">
              {stats.items.map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-2">
                  <dd className="text-5xl font-medium tracking-tight md:text-6xl">
                    {item.prefix}
                    {item.value}
                    <span className="text-gold">{item.suffix}</span>
                  </dd>
                  <dt className="max-w-48 text-sm text-muted-foreground">{item.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Content / areas */}
        <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="max-w-4xl">
            <p className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
              {dict.home.useCasesPreview.label}
            </p>
            <h2 className="mt-4 text-balance text-4xl font-medium tracking-tight md:text-5xl">
              <span className="text-muted-foreground">{dict.home.useCasesPreview.title}</span>
            </h2>
            <p className="mt-6 max-w-2xl text-muted-foreground text-lg">
              {dict.home.useCasesPreview.subtitle}
            </p>
          </div>

          <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {areas.slice(0, 6).map((area, index) => {
              const Icon = roleIcons[roleKeys[index % roleKeys.length]]
              return (
                <div key={area.title} className="flex flex-col gap-3">
                  <span className="text-primary">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="text-lg font-medium tracking-tight">{area.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{area.text}</p>
                  <ul className="mt-2 space-y-2">
                    {area.points.slice(0, 3).map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2.5 text-sm text-muted-foreground"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>

          <div className="mt-14 flex flex-wrap gap-3">
            <Button
              size="lg"
              variant="outline"
              className="h-11 rounded-full px-6 text-sm"
              render={<Link href={localePath(locale, "use-cases")} />}
            >
              {dict.useCasesPage.cta.secondary}
              <Sparkles />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-11 rounded-full px-6 text-sm"
              render={<Link href={localePath(locale, "simulator")} />}
            >
              {dict.useCasesPage.cta.primary}
            </Button>
          </div>
        </section>

        {/* Membership / join paths */}
        <section className="border-y border-border/60 bg-muted/30">
          <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
                {dict.joinPage.title}
              </p>
              <h2 className="mt-4 text-balance text-4xl font-medium tracking-tight md:text-5xl">
                <span className="text-muted-foreground">{dict.joinPage.subtitle} </span>
              </h2>
            </div>

            <div className="mt-16 grid gap-5 lg:grid-cols-2">
              {[
                { icon: Building2, data: joinCompanies },
                { icon: Globe2, data: joinCountries },
              ].map(({ icon: Icon, data }) => (
                <div
                  key={data.title}
                  className="flex flex-col gap-6 rounded-2xl border border-border/60 bg-card p-8"
                >
                  <span className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-medium tracking-tight">{data.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {data.description}
                    </p>
                  </div>
                  <ul className="space-y-2.5">
                    {data.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2.5 text-sm text-muted-foreground"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-14 rounded-2xl border border-border/60 bg-card p-8 md:p-10">
              <h3 className="text-lg font-medium tracking-tight">{criteria.title}</h3>
              <p className="mt-2 text-muted-foreground">{criteria.subtitle}</p>
              <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {criteria.items.map((item, index) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-relaxed"
                  >
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-xs font-medium text-primary">
                      {index + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
            <h2 className="text-balance text-4xl font-medium tracking-tight md:text-5xl">
              {homeCta.title}
            </h2>
            <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
              {homeCta.text}
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <Button
                size="lg"
                className="h-11 rounded-full px-6 text-sm"
                render={
                  <a
                    href={`mailto:${contactEmail}?subject=${encodeURIComponent(
                      "Join the MRVIN100 model"
                    )}`}
                  />
                }
              >
                {homeCta.primary}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-11 rounded-full px-6 text-sm"
                render={<Link href={localePath(locale, "model")} />}
              >
                {homeCta.secondary}
              </Button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter locale={locale} footer={dict.footer} nav={dict.nav} />
    </>
  )
}
