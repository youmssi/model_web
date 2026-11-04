import Link from "next/link"
import { ArrowUpRight, Mail } from "lucide-react"

import { Logo } from "@/components/layout/logo"
import type { Dictionary } from "@/lib/i18n/dictionaries"
import { localePath, type Locale } from "@/lib/i18n/config"

interface FooterProps {
  locale: Locale
  copy: Dictionary["footer"]
  nav: Dictionary["nav"]
}

function SocialMark({ network }: { network: "linkedin" | "instagram" | "facebook" | "discord" }) {
  if (network === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-current">
        <path d="M5.2 3.5a2.1 2.1 0 1 0 0 4.2 2.1 2.1 0 0 0 0-4.2ZM3.5 9h3.4v11.5H3.5V9Zm5.5 0h3.3v1.6h.1a3.6 3.6 0 0 1 3.2-1.8c3.4 0 4 2.2 4 5v6.7h-3.4v-5.9c0-1.4 0-3.2-1.9-3.2s-2.1 1.5-2.1 3.1v6H9V9Z" />
      </svg>
    )
  }

  if (network === "instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-none stroke-current" strokeWidth="1.8">
        <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.7" cy="6.5" r="1" className="fill-current stroke-none" />
      </svg>
    )
  }

  if (network === "facebook") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-current">
        <path d="M13.5 21v-7.6h2.55l.4-3h-2.95V8.4c0-.87.24-1.46 1.5-1.46H16.5V4.26A14 14 0 0 0 14.6 4.1c-2.07 0-3.5 1.26-3.5 3.58v2.72H8.75v3h2.35V21Z" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-current">
      <path d="M20.3 4.5c-1.5-.7-3.2-1.2-4.9-1.5-.2.4-.4.9-.6 1.2-1.8-.3-3.7-.3-5.5 0-.2-.4-.4-.8-.6-1.2-1.7.3-3.4.8-4.9 1.5C.5 9.1-.3 13.6.1 18c1.9 1.4 3.8 2.3 6 2.9.5-.6.9-1.3 1.2-2-.6-.2-1.3-.6-1.9-.9.1-.1.3-.2.4-.3 3.9 1.8 8.2 1.8 12.1 0 .1.1.2.2.4.3-.6.3-1.2.6-1.9.9.3.7.7 1.3 1.2 2 2.2-.6 4.1-1.6 6-2.9.5-5.1-.8-9.5-3.5-13.4ZM8 15.3c-1.2 0-2.2-1.1-2.2-2.4 0-1.3 1-2.4 2.2-2.4s2.2 1.1 2.2 2.4c0 1.3-1 2.4-2.2 2.4Zm8 0c-1.2 0-2.2-1.1-2.2-2.4 0-1.3 1-2.4 2.2-2.4s2.2 1.1 2.2 2.4c0 1.3-1 2.4-2.2 2.4Z" />
    </svg>
  )
}

export default function Footer({ locale, copy, nav }: FooterProps) {
  const groups = [
    {
      title: nav.framework,
      links: [
        { href: "model", label: nav.model },
        { href: "compare", label: nav.compare },
        { href: "simulator", label: nav.simulator },
      ],
    },
    {
      title: nav.adoption,
      links: [
        { href: "africa", label: nav.countryMap },
        { href: "adoption", label: nav.adoption },
        { href: "contact", label: nav.contact },
      ],
    },
  ]

  return (
    <footer className="relative isolate overflow-hidden border-t border-border/70 bg-muted/20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-0 h-64 bg-[radial-gradient(ellipse_at_top,var(--primary)_0%,transparent_68%)] opacity-[0.045]" />
      <div className="relative z-10 mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-14 lg:px-10">
        <div className="grid gap-10 border-b border-border/70 pb-10 md:grid-cols-[1.25fr_0.7fr_0.7fr_1.15fr] md:gap-8">
          <div className="max-w-md">
            <Logo href={localePath(locale)} />
            <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">{copy.tagline}</p>
            <div className="mt-5 flex items-center gap-2" role="group" aria-label={copy.socialLabel}>
              <a
                href="https://linkedin.com/company/mrvin100"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex size-9 items-center justify-center rounded-full border border-border/70 bg-background/70 text-muted-foreground transition-colors hover:border-border hover:text-foreground"
              >
                <SocialMark network="linkedin" />
              </a>
              <span aria-hidden="true" className="inline-flex size-9 items-center justify-center rounded-full border border-border/70 bg-background/70 text-muted-foreground"><SocialMark network="instagram" /></span>
              <a
                href="https://facebook.com/mrvin100.de"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex size-9 items-center justify-center rounded-full border border-border/70 bg-background/70 text-muted-foreground transition-colors hover:border-border hover:text-foreground"
              >
                <SocialMark network="facebook" />
              </a>
              <a
                href="https://discord.gg/JeJV9M6n"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={copy.communityLabel}
                className="inline-flex size-9 items-center justify-center rounded-full border border-border/70 bg-background/70 text-muted-foreground transition-colors hover:border-border hover:text-foreground"
              >
                <SocialMark network="discord" />
              </a>
            </div>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">{copy.socialNote}</p>
          </div>
          {groups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="text-sm font-semibold">{group.title}</h2>
              <ul className="mt-3 space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={localePath(locale, link.href)} className="text-sm text-muted-foreground transition-colors hover:text-foreground">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div>
            <h2 className="text-sm font-semibold">{copy.contactTitle}</h2>
            <a
              href={`mailto:${copy.email}`}
              className="group mt-3 flex items-center gap-3 rounded-2xl border border-border/70 bg-background/75 p-3.5 shadow-sm transition-colors hover:border-border hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
            >
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-foreground text-background">
                <Mail aria-hidden="true" className="size-[18px]" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[11px] font-medium tracking-wide text-muted-foreground uppercase">{copy.emailLabel}</span>
                <span className="mt-1 block truncate text-sm font-medium">{copy.email}</span>
              </span>
              <ArrowUpRight aria-hidden="true" className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <p className="mt-2.5 text-xs leading-5 text-muted-foreground">{copy.emailNote}</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>{copy.rights}</p>
          <p>{copy.locations}</p>
        </div>
      </div>
    </footer>
  )
}
