"use client"

import { useMemo, useState } from "react"
import type { Dictionary } from "@/lib/i18n/dictionaries"
import type { Locale } from "@/lib/i18n/config"
import { Input } from "@/components/ui/input"

type Currency = "XAF" | "EUR"

interface SimulatorProps {
  locale: Locale
  t: Dictionary["simulatorPage"]
}

const bars = [
  { key: "engineers", color: "bg-primary" },
  { key: "delivery", color: "bg-foreground/55" },
  { key: "localCosts", color: "bg-foreground/25" },
] as const

export function Simulator({ locale, t }: SimulatorProps) {
  const [currency, setCurrency] = useState<Currency>("XAF")
  const [budget, setBudget] = useState(2_500_000)
  const [engineers, setEngineers] = useState(1_300_000)
  const [delivery, setDelivery] = useState(500_000)
  const [localCosts, setLocalCosts] = useState(300_000)

  const parts = useMemo(() => [
    { key: "engineers", label: t.engineersLabel, value: engineers, color: bars[0].color },
    { key: "delivery", label: t.deliveryLabel, value: delivery, color: bars[1].color },
    { key: "localCosts", label: t.localCostsLabel, value: localCosts, color: bars[2].color },
  ], [delivery, engineers, localCosts, t])

  const allocated = parts.reduce((total, part) => total + part.value, 0)
  const remainder = budget - allocated
  const overBudget = remainder < 0
  const numberFormat = useMemo(() => new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-US", { maximumFractionDigits: 0 }), [locale])
  const format = (amount: number) => `${numberFormat.format(amount)} ${currency}`
  const inputs = [
    { id: "budget", label: t.budgetLabel, value: budget, onChange: setBudget },
    { id: "engineers", label: t.engineersLabel, value: engineers, onChange: setEngineers },
    { id: "delivery", label: t.deliveryLabel, value: delivery, onChange: setDelivery },
    { id: "local-costs", label: t.localCostsLabel, value: localCosts, onChange: setLocalCosts },
  ]

  return (
    <section className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">{t.inputsTitle}</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{t.inputsNote}</p>

        <div className="mt-6">
          <span className="text-sm font-medium">{t.currencyLabel}</span>
          <div className="mt-2 flex gap-2" role="group" aria-label={t.currencyLabel}>
            {(["XAF", "EUR"] as const).map((unit) => (
              <button key={unit} type="button" aria-pressed={currency === unit} onClick={() => setCurrency(unit)} className="min-h-10 rounded-full border border-border px-4 text-sm transition-colors aria-pressed:bg-primary aria-pressed:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none">{unit}</button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-x-5 gap-y-5 sm:grid-cols-2">
          {inputs.map((field) => (
            <label key={field.id} htmlFor={field.id} className="grid gap-2 text-sm font-medium">
              {field.label}
              <Input id={field.id} type="number" inputMode="decimal" min="0" step={currency === "XAF" ? 10000 : 100} value={field.value} onChange={(event) => field.onChange(Math.max(0, Number(event.target.value) || 0))} className="h-11 tabular-nums" />
            </label>
          ))}
        </div>
        <p className="mt-5 border-l border-border pl-4 text-xs leading-5 text-muted-foreground">{t.sourceNote}</p>
      </div>

      <div className="border-y border-border py-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-medium tracking-[0.12em] text-muted-foreground uppercase">{t.resultEyebrow}</p>
            <h2 className="mt-2 font-serif text-3xl font-medium tracking-tight">{format(budget)}</h2>
          </div>
          <p aria-live="polite" className={overBudget ? "text-sm font-medium text-foreground" : "text-sm text-muted-foreground"}>
            {overBudget ? `${t.overBudget}: ${format(Math.abs(remainder))}` : `${t.remaining}: ${format(remainder)}`}
          </p>
        </div>

        <div className="mt-8 flex h-3 w-full overflow-hidden bg-muted" role="img" aria-label={t.allocationLabel}>
          {parts.map((part) => budget > 0 && <span key={part.key} className={part.color} style={{ width: `${Math.min(100, (part.value / budget) * 100)}%` }} />)}
          {!overBudget && budget > 0 && <span className="flex-1 bg-muted" />}
        </div>

        <ul className="mt-6 divide-y divide-border">
          {parts.map((part) => (
            <li key={part.key} className="flex items-center justify-between gap-4 py-3 text-sm">
              <span className="flex items-center gap-2 text-muted-foreground"><span aria-hidden="true" className={`size-2.5 ${part.color}`} />{part.label}</span>
              <span className="text-right font-medium tabular-nums">{format(part.value)} <span className="text-xs text-muted-foreground">{budget ? `${((part.value / budget) * 100).toFixed(1)}%` : "—"}</span></span>
            </li>
          ))}
          <li className="flex items-center justify-between gap-4 py-3 text-sm">
            <span className="text-muted-foreground">{t.remaining}</span>
            <span className="font-medium tabular-nums">{format(remainder)}</span>
          </li>
        </ul>
        <p className="mt-5 text-xs leading-5 text-muted-foreground">{t.disclaimer}</p>
      </div>
    </section>
  )
}
