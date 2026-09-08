"use client"

import { Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

import { LangSwitcher } from "@/components/layout/lang-switcher"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { Button } from "@/components/ui/button"
import type { Dictionary } from "@/lib/i18n/dictionaries"
import { contactEmail, localePath, type Locale } from "@/lib/i18n/config"
import { cn } from "@/lib/utils"

interface DuskHeaderProps {
  locale: Locale
  nav: Dictionary["nav"]
}

export function DuskHeader({ locale, nav }: DuskHeaderProps) {
  const pathname = usePathname() || localePath(locale)
  const [open, setOpen] = useState(false)

  const links = [
    { href: localePath(locale), label: nav.home, exact: true },
    { href: localePath(locale, "model"), label: nav.model, exact: false },
    { href: localePath(locale, "simulator"), label: nav.simulator, exact: false },
    { href: localePath(locale, "use-cases"), label: nav.useCases, exact: false },
    { href: localePath(locale, "faq"), label: nav.faq, exact: false },
    { href: localePath(locale, "join"), label: nav.join, exact: false },
  ]

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header className="fixed top-0 z-50 w-full">
      <nav
        data-state={open ? "active" : undefined}
        aria-label="Main"
        className="w-full px-2 max-lg:data-[state=active]:bg-background max-lg:data-[state=active]:bottom-0"
      >
        <div className="mx-auto mt-2 max-w-6xl rounded-2xl border border-border/60 bg-background/80 px-3 backdrop-blur-xl transition-all duration-300">
          <div className="flex flex-wrap items-center justify-between gap-3 py-2">
            <div className="flex w-full items-center justify-between lg:w-auto">
              <Link
                href={localePath(locale)}
                aria-label={nav.home}
                className="rounded-lg font-heading text-base font-semibold tracking-tight outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
              >
                MRVIN100&nbsp;Model
              </Link>

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? nav.closeMenu : nav.openMenu}
                aria-expanded={open}
                className="relative z-20 inline-flex size-9 cursor-pointer items-center justify-center rounded-lg outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring/40 lg:hidden"
              >
                {open ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>

            <div className="hidden lg:block">
              <ul className="flex items-center gap-1 text-sm">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={isActive(link.href, link.exact) ? "page" : undefined}
                      className={cn(
                        "rounded-lg px-3 py-1.5 text-muted-foreground transition-colors outline-none hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40",
                        isActive(link.href, link.exact) && "bg-muted/70 text-foreground"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="hidden items-center gap-1 lg:flex">
              <LangSwitcher locale={locale} label={nav.language} />
              <ThemeToggle label={nav.theme} />
              <Button
                className="ml-1 h-8 rounded-full px-4 text-sm"
                render={
                  <a
                    href={`mailto:${contactEmail}?subject=${encodeURIComponent(
                      "Discovery call"
                    )}`}
                  />
                }
              >
                {nav.bookCall}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        data-state={open ? "open" : "closed"}
        className={cn(
          "invisible fixed inset-x-0 top-0 bottom-0 z-40 max-h-full translate-y-0 bg-background/98 px-2 pt-20 backdrop-blur-xl transition-opacity duration-200 lg:hidden",
          open ? "visible opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <div className="mx-auto max-w-6xl rounded-2xl border border-border/60 px-2 py-3">
          <nav className="flex flex-col" aria-label="Mobile">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted",
                  isActive(link.href, link.exact) && "bg-muted/70"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 flex items-center gap-2 border-t border-border/60 px-3 pt-4">
            <LangSwitcher locale={locale} label={nav.language} />
            <ThemeToggle label={nav.theme} />
            <Button
              className="ml-auto h-8 rounded-full px-4 text-sm"
              render={
                <a
                  href={`mailto:${contactEmail}?subject=${encodeURIComponent(
                    "Discovery call"
                  )}`}
                />
              }
            >
              {nav.bookCall}
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
