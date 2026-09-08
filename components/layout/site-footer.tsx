import Link from "next/link"

import { Logo } from "@/components/layout/logo"
import type { Dictionary } from "@/lib/i18n/dictionaries"
import { contactEmail, localePath, type Locale } from "@/lib/i18n/config"

interface SiteFooterProps {
  locale: Locale
  footer: Dictionary["footer"]
  nav: Dictionary["nav"]
}

export function SiteFooter({ locale, footer, nav }: SiteFooterProps) {
  const links = [
    { href: localePath(locale), label: nav.home },
    { href: localePath(locale, "model"), label: nav.model },
    { href: localePath(locale, "simulator"), label: nav.simulator },
    { href: localePath(locale, "use-cases"), label: nav.useCases },
    { href: localePath(locale, "faq"), label: nav.faq },
    { href: localePath(locale, "join"), label: nav.join },
  ]

  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto w-full max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr]">
          <div className="max-w-sm space-y-4">
            <Logo href={localePath(locale)} />
            <p className="text-sm leading-relaxed text-muted-foreground">
              {footer.tagline}
            </p>
            <p className="text-sm font-medium">{footer.locations}</p>
          </div>

          <nav aria-label="Footer">
            <h2 className="mb-3 text-sm font-semibold">{footer.navTitle}</h2>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mb-3 text-sm font-semibold">{footer.contactTitle}</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href={`mailto:${footer.email}`}
                  className="transition-colors hover:text-foreground"
                >
                  {footer.email}
                </a>
              </li>
              <li>{footer.phones}</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border/60 pt-6">
          <p className="text-xs text-muted-foreground">{footer.rights}</p>
        </div>
      </div>
    </footer>
  )
}
