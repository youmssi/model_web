"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import africaMap from "@/data/africa-countries.json"
import { Input } from "@/components/ui/input"
import type { Dictionary } from "@/lib/i18n/dictionaries"
import { contactEmail, localePath, type Locale } from "@/lib/i18n/config"
import { cn } from "@/lib/utils"

type AtlasCopy = Dictionary["home"]["atlas"]
type Region = keyof AtlasCopy["regions"]
type RegionFilter = Region | "all"

interface Country {
  code: string
  name: string
  region: Region
  path: string
  label: { x: number; y: number }
}

interface AfricaAtlasProps {
  locale: Locale
  copy: AtlasCopy
}

const countries = africaMap.countries as Country[]
const regions: Region[] = ["north", "west", "central", "east", "south"]

export function AfricaAtlas({ locale, copy }: AfricaAtlasProps) {
  const router = useRouter()
  const [region, setRegion] = useState<RegionFilter>("all")
  const [search, setSearch] = useState("")
  const displayNames = useMemo(
    () => new Intl.DisplayNames([locale], { type: "region" }),
    [locale]
  )

  const localizedCountries = useMemo(
    () =>
      countries
        .map((country) => ({
          ...country,
          displayName: displayNames.of(country.code) ?? country.name,
        }))
        .sort((left, right) =>
          left.displayName.localeCompare(right.displayName, locale)
        ),
    [displayNames, locale]
  )

  const selectedCountry = localizedCountries.find((country) => country.code === "CM")!

  const visibleCountries = localizedCountries.filter((country) => {
    const matchesRegion = region === "all" || country.region === region
    const query = search.trim().toLocaleLowerCase(locale)
    const matchesSearch =
      !query ||
      country.displayName.toLocaleLowerCase(locale).includes(query) ||
      country.code.toLocaleLowerCase(locale).includes(query)
    return matchesRegion && matchesSearch
  })

  const openCountry = (code: string) => {
    router.push(localePath(locale, `africa/${code.toLowerCase()}`))
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_24px_80px_-48px_rgba(0,0,0,0.12)]">
      <div className="grid lg:grid-cols-[minmax(0,1.45fr)_minmax(19rem,0.75fr)]">
        <div className="min-w-0 border-b border-border/70 p-5 sm:p-7 lg:border-r lg:border-b-0">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <label htmlFor="country-search" className="text-sm font-semibold">
              {copy.searchLabel}
            </label>
            <span className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
              {copy.coverage}
            </span>
          </div>
          <Input
            id="country-search"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={copy.searchPlaceholder}
            className="mt-3 h-11 rounded-xl bg-background"
          />

          <div className="mt-5">
            <p className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              {copy.regionLabel}
            </p>
            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label={copy.regionLabel}
            >
              <button
                type="button"
                aria-pressed={region === "all"}
                onClick={() => setRegion("all")}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                  region === "all"
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground hover:text-foreground"
                )}
              >
                {copy.allRegions}
              </button>
              {regions.map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={region === item}
                  onClick={() => setRegion(item)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                    region === item
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-muted-foreground hover:text-foreground"
                  )}
                >
                  {copy.regions[item]}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 overflow-hidden rounded-xl bg-[radial-gradient(ellipse_at_50%_42%,rgba(0,0,0,0.04),transparent_68%)] px-1 py-2 sm:px-3">
            <svg
              viewBox={africaMap.viewBox}
              role="group"
              aria-label={copy.mapLabel}
              className="mx-auto block h-auto w-full max-w-[40rem]"
              preserveAspectRatio="xMidYMid meet"
            >
              <title>{copy.mapLabel}</title>
              {localizedCountries.map((country) => {
                const isSelected = selectedCountry.code === country.code
                const isCameroon = country.code === "CM"
                const isDimmed = region !== "all" && country.region !== region

                return (
                  <path
                    key={country.code}
                    d={country.path}
                    role="link"
                    tabIndex={0}
                    aria-label={`${country.displayName} (${country.code})`}
                    onClick={() => openCountry(country.code)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault()
                        openCountry(country.code)
                      }
                    }}
                    className={cn(
                      "cursor-pointer transition-[fill,opacity,stroke] duration-200 focus:outline-none",
                      isSelected
                        ? "fill-primary stroke-primary"
                        : isCameroon
                          ? "fill-gold/70 stroke-background"
                          : "fill-primary/15 stroke-background hover:fill-primary/50",
                      isDimmed && !isSelected && "opacity-25"
                    )}
                    strokeWidth={0.85}
                    vectorEffect="non-scaling-stroke"
                  >
                    <title>{`${country.displayName} · ${country.code}`}</title>
                  </path>
                )
              })}
              <g aria-hidden="true" pointerEvents="none">
                <rect
                  x={selectedCountry.label.x - 7.5}
                  y={selectedCountry.label.y - 5.4}
                  width="15"
                  height="10.8"
                  rx="5.4"
                  className="fill-background stroke-primary"
                  strokeWidth="0.8"
                />
                <text
                  x={selectedCountry.label.x}
                  y={selectedCountry.label.y + 1.8}
                  textAnchor="middle"
                  className="fill-primary font-sans text-[5.2px] font-bold"
                >
                  {selectedCountry.code}
                </text>
              </g>
            </svg>
          </div>

          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            {copy.boundaryNote}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-x-1 text-xs text-muted-foreground">
            <span>{copy.sourceAttribution}</span>
            <a
              href={africaMap.source.url}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary"
            >
              {africaMap.source.license}
            </a>
          </div>
        </div>

        <aside className="flex min-w-0 flex-col p-5 sm:p-7" aria-live="polite">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              {copy.selectedCountry}
            </p>
            <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-foreground">
              {selectedCountry.code === "CM"
                ? copy.initialBadge
                : copy.preparingBadge}
            </span>
          </div>

          <div className="mt-5 flex items-center gap-4">
            <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-primary text-2xl font-semibold tracking-tight text-primary-foreground">
              {selectedCountry.code}
            </div>
            <div className="min-w-0">
              <h3 className="text-2xl font-semibold tracking-tight text-balance">
                {selectedCountry.displayName}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {copy.regions[selectedCountry.region]}
              </p>
            </div>
          </div>

          <div className="mt-7 rounded-2xl border border-primary/15 bg-primary/[0.035] p-4 sm:p-5">
            <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              {copy.profileTitle}
            </p>
            <h4 className="font-semibold tracking-tight">
              {copy.profileStatusTitle}
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {selectedCountry.code === "CM"
                ? copy.initialProfileText
                : copy.preparingProfileText}
            </p>
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-semibold">{copy.topicsTitle}</h4>
            <ul className="mt-3 space-y-2.5">
              {copy.topics.map((topic) => (
                <li
                  key={topic}
                  className="flex items-start gap-2.5 text-sm text-muted-foreground"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold"
                  />
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
          </div>

          <a
            href={`mailto:${contactEmail}?subject=${encodeURIComponent(
              `${copy.contributionCta}: ${selectedCountry.displayName} (${selectedCountry.code})`
            )}`}
            className="mt-7 inline-flex min-h-11 items-center justify-center rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            {copy.contributionCta}
          </a>
          <button
            type="button"
            onClick={() => openCountry(selectedCountry.code)}
            className="mt-3 inline-flex min-h-11 items-center text-sm font-medium underline decoration-border underline-offset-4 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            {copy.viewProfile} · {selectedCountry.code}
          </button>
        </aside>
      </div>

      <div className="border-t border-border/70 px-5 py-5 sm:px-7">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-sm font-semibold">{copy.countryListLabel}</h3>
          <span className="text-xs text-muted-foreground" aria-live="polite">
            {visibleCountries.length} / {countries.length}
          </span>
        </div>
        <div className="mt-3 flex max-h-56 flex-wrap gap-2 overflow-y-auto pr-1">
          {visibleCountries.length ? (
            visibleCountries.map((country) => (
              <button
                key={country.code}
                type="button"
                onClick={() => openCountry(country.code)}
                className={cn(
                  "inline-flex min-h-9 items-center gap-2 rounded-lg border px-2.5 py-1.5 text-left text-xs transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                  selectedCountry.code === country.code
                    ? "border-primary bg-primary/8 text-primary"
                    : "border-border bg-background text-muted-foreground hover:border-primary/30 hover:text-foreground"
                )}
              >
                <span className="font-mono font-semibold tracking-wide">
                  {country.code}
                </span>
                <span>{country.displayName}</span>
              </button>
            ))
          ) : (
            <p className="py-2 text-sm text-muted-foreground">
              {copy.noResults}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
