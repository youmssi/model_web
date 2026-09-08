"use client"

import { useMemo, useState } from "react"
import { Building2, Landmark, User, UserCog, UserRound } from "lucide-react"

import { AnimatedContent } from "@/components/AnimatedContent"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

type Currency = "fcfa" | "eur"

type ViewKey = "company" | "developer" | "sdm" | "agent" | "state"

interface SimulatorProps {
  t: {
    inputsTitle: string
    currencyLabel: string
    valueLabel: string
    devShareLabel: string
    devShareHint: string
    sdmShareLabel: string
    sdmShareHint: string
    agentShareLabel: string
    agentShareHint: string
    splitTitle: string
    splitNote: string
    viewTitle: string
    viewSelectLabel: string
    views: string[]
    viewCopy: Record<
      ViewKey,
      { title: string; text: string }
    >
    disclaimer: string
  }
}

// Fixed shares of the published framework (percent).
const FIXED_SHARES = {
  developer: 40,
  marketing: 12,
  ceo: 3,
  infra: 5,
  reserves: 5,
}

interface ShareRow {
  key: string
  label: string
  percent: number
  color: string
}

const SEGMENT_COLORS = {
  developer: "#10a06f",
  sdm: "#e8b84b",
  marketing: "#3f8f6a",
  agent: "#d9a83e",
  ceo: "#1d6a54",
  infra: "#9fc3b4",
  reserves: "#7ba892",
  net: "#4c7d68",
}

const viewIcons: Record<ViewKey, React.ComponentType<{ className?: string }>> = {
  company: Building2,
  developer: User,
  sdm: UserCog,
  agent: UserRound,
  state: Landmark,
}

function formatAmount(value: number, currency: Currency) {
  return new Intl.NumberFormat(currency === "fcfa" ? "fr-FR" : "en-US", {
    maximumFractionDigits: currency === "fcfa" ? 0 : 0,
  }).format(value)
}

function DonutChart({ shares }: { shares: ShareRow[] }) {
  const radius = 80
  const stroke = 34
  const circumference = 2 * Math.PI * radius

  let offset = 0
  const segments = shares.map((share) => {
    const dash = (share.percent / 100) * circumference
    const seg = { ...share, dash, offset }
    offset += dash
    return seg
  })

  return (
    <div className="relative mx-auto w-full max-w-64">
      <svg viewBox="0 0 200 200" className="w-full -rotate-90" role="img" aria-label="Revenue split">
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="currentColor"
          className="text-muted"
          strokeWidth={stroke}
        />
        {segments.map((seg) => (
          <circle
            key={seg.key}
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke={seg.color}
            strokeWidth={stroke}
            strokeDasharray={`${seg.dash} ${circumference - seg.dash}`}
            strokeDashoffset={-seg.offset}
            strokeLinecap="butt"
          />
        ))}
      </svg>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-semibold tracking-tight">100%</span>
        <span className="text-xs text-muted-foreground">published split</span>
      </div>
    </div>
  )
}

export function Simulator({ t }: SimulatorProps) {
  const [currency, setCurrency] = useState<Currency>("fcfa")
  const [value, setValue] = useState(2_500_000)
  const [sdmShare, setSdmShare] = useState(10)
  const [agentShare, setAgentShare] = useState(5)
  const [view, setView] = useState<ViewKey>("company")

  const shares = useMemo<ShareRow[]>(() => {
    const net = Math.max(
      0,
      100 -
        (FIXED_SHARES.developer +
          FIXED_SHARES.marketing +
          FIXED_SHARES.ceo +
          FIXED_SHARES.infra +
          FIXED_SHARES.reserves +
          sdmShare +
          agentShare)
    )

    return [
      { key: "developer", label: t.devShareLabel, percent: FIXED_SHARES.developer, color: SEGMENT_COLORS.developer },
      { key: "sdm", label: t.sdmShareLabel, percent: sdmShare, color: SEGMENT_COLORS.sdm },
      { key: "marketing", label: "Marketing", percent: FIXED_SHARES.marketing, color: SEGMENT_COLORS.marketing },
      { key: "agent", label: t.agentShareLabel, percent: agentShare, color: SEGMENT_COLORS.agent },
      { key: "ceo", label: "Founder", percent: FIXED_SHARES.ceo, color: SEGMENT_COLORS.ceo },
      { key: "infra", label: "Infrastructure", percent: FIXED_SHARES.infra, color: SEGMENT_COLORS.infra },
      { key: "reserves", label: "Reserves", percent: FIXED_SHARES.reserves, color: SEGMENT_COLORS.reserves },
      { key: "net", label: "Reinvestment", percent: net, color: SEGMENT_COLORS.net },
    ]
  }, [sdmShare, agentShare, t])

  const amounts = useMemo(() => {
    const perShare = (percent: number) => (value * percent) / 100
    return {
      developer: perShare(FIXED_SHARES.developer),
      sdm: perShare(sdmShare),
      marketing: perShare(FIXED_SHARES.marketing),
      agent: perShare(agentShare),
      ceo: perShare(FIXED_SHARES.ceo),
      infra: perShare(FIXED_SHARES.infra),
      reserves: perShare(FIXED_SHARES.reserves),
      net: perShare(shares[shares.length - 1].percent),
    }
  }, [value, sdmShare, agentShare, shares])

  const activeView = t.viewCopy[view]
  const ActiveIcon = viewIcons[view]

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Inputs */}
      <Card>
        <CardContent className="flex flex-col gap-6 p-6 sm:p-8">
          <h2 className="text-lg font-semibold tracking-tight">{t.inputsTitle}</h2>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium">{t.currencyLabel}</span>
            <div className="inline-flex w-fit rounded-lg border bg-muted/40 p-1">
              {(["fcfa", "eur"] as const).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCurrency(c)}
                  className={cn(
                    "rounded-md px-4 py-1.5 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
                    currency === c
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {c === "fcfa" ? "FCFA" : "EUR"}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="contract-value" className="text-sm font-medium">
              {t.valueLabel}
            </label>
            <Input
              id="contract-value"
              type="number"
              min={0}
              step={currency === "fcfa" ? 100000 : 500}
              value={value}
              onChange={(event) => setValue(Math.max(0, Number(event.target.value) || 0))}
              className="h-10 text-base"
            />
            <p className="text-sm font-semibold tabular-nums text-primary">
              {formatAmount(value, currency)} {currency.toUpperCase()}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-sm font-medium">{t.devShareLabel}</span>
              <span className="text-sm font-semibold tabular-nums text-primary">
                40% · {formatAmount(amounts.developer, currency)} {currency.toUpperCase()}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">{t.devShareHint}</p>
            <Slider defaultValue={[40]} min={40} max={40} disabled aria-label={t.devShareLabel} />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between gap-4">
              <label htmlFor="sdm-share" className="text-sm font-medium">
                {t.sdmShareLabel}
              </label>
              <span className="text-sm font-semibold tabular-nums text-primary">
                {sdmShare}% · {formatAmount(amounts.sdm, currency)} {currency.toUpperCase()}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">{t.sdmShareHint}</p>
            <Slider
              id="sdm-share"
              value={[sdmShare]}
              min={8}
              max={12}
              step={1}
              onValueChange={(next) => setSdmShare(Array.isArray(next) ? next[0] : next)}
              aria-label={t.sdmShareLabel}
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between gap-4">
              <label htmlFor="agent-share" className="text-sm font-medium">
                {t.agentShareLabel}
              </label>
              <span className="text-sm font-semibold tabular-nums text-primary">
                {agentShare}% · {formatAmount(amounts.agent, currency)} {currency.toUpperCase()}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">{t.agentShareHint}</p>
            <Slider
              id="agent-share"
              value={[agentShare]}
              min={3}
              max={7}
              step={1}
              onValueChange={(next) => setAgentShare(Array.isArray(next) ? next[0] : next)}
              aria-label={t.agentShareLabel}
            />
          </div>
        </CardContent>
      </Card>

      {/* Split + actor view */}
      <div className="flex flex-col gap-6">
        <Card>
          <CardContent className="flex flex-col gap-6 p-6 sm:p-8">
            <h2 className="text-lg font-semibold tracking-tight">{t.splitTitle}</h2>
            <DonutChart shares={shares} />
            <ul className="space-y-2">
              {shares.map((share) => (
                <li key={share.key} className="flex items-center justify-between gap-3 text-sm">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <span
                      aria-hidden="true"
                      className="size-2.5 rounded-sm"
                      style={{ backgroundColor: share.color }}
                    />
                    {share.label}
                  </span>
                  <span className="tabular-nums font-medium">
                    {share.percent}% · {formatAmount(amounts[share.key as keyof typeof amounts], currency)}{" "}
                    {currency.toUpperCase()}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-xs leading-relaxed text-muted-foreground">{t.splitNote}</p>
          </CardContent>
        </Card>
      </div>

      {/* Actor views */}
      <Card className="lg:col-span-2">
        <CardContent className="flex flex-col gap-6 p-6 sm:p-8">
          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold tracking-tight">{t.viewTitle}</h2>
            <div
              className="flex flex-wrap gap-2"
              role="tablist"
              aria-label={t.viewSelectLabel}
            >
              {t.views.map((label, index) => {
                const key = (["company", "developer", "sdm", "agent", "state"] as const)[index]
                const Icon = viewIcons[key]
                return (
                  <Button
                    key={key}
                    type="button"
                    variant={view === key ? "default" : "outline"}
                    className="h-9 gap-2 text-sm"
                    onClick={() => setView(key)}
                    aria-selected={view === key}
                  >
                    <Icon className="size-4" />
                    {label}
                  </Button>
                )
              })}
            </div>
          </div>

          <AnimatedContent key={view} distance={16} duration={0.4}>
            <div className="flex flex-col gap-2 rounded-xl border bg-muted/30 p-5">
              <span className="flex items-center gap-2 font-medium">
                <ActiveIcon className="size-4 text-primary" />
                {activeView.title}
              </span>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {activeView.text}
              </p>
            </div>
          </AnimatedContent>

          <p className="text-xs leading-relaxed text-muted-foreground">{t.disclaimer}</p>
        </CardContent>
      </Card>
    </div>
  )
}
