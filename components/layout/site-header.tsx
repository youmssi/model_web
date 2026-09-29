"use client"

import { Menu } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { LangSwitcher } from "@/components/layout/lang-switcher"
import { Logo } from "@/components/layout/logo"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import type { Dictionary } from "@/lib/i18n/dictionaries"
import { localePath, type Locale } from "@/lib/i18n/config"
import { cn } from "@/lib/utils"

interface SiteHeaderProps {
  locale: Locale
  nav: Dictionary["nav"]
  links?: { href: string; label: string; exact?: boolean }[]
  ctaHref?: string
}

export function SiteHeader({
  locale,
  nav,
  links: customLinks,
  ctaHref,
}: SiteHeaderProps) {
  const pathname = usePathname() || localePath(locale)

  const routeLinks = [
    { href: localePath(locale), label: nav.home, exact: true },
    { href: localePath(locale, "africa"), label: nav.countryMap, exact: false },
    { href: localePath(locale, "model"), label: nav.model, exact: false },
    { href: localePath(locale, "compare"), label: nav.compare, exact: false },
    { href: localePath(locale, "adoption"), label: nav.adoption, exact: false },
  ]
  const links = customLinks ?? routeLinks

  const isActive = (href: string, exact = false) =>
    exact
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
        <Logo href={localePath(locale)} />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={
                isActive(link.href, link.exact) ? "page" : undefined
              }
              className={cn(
                "rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors outline-none hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40",
                isActive(link.href, link.exact) && "bg-muted/70 text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <LangSwitcher locale={locale} label={nav.language} />
          <ThemeToggle label={nav.theme} />
          <Button
            className="ml-1 hidden h-9 rounded-full px-4 text-sm sm:inline-flex"
            render={
              <a
                href={
                  ctaHref ?? localePath(locale, "contact")
                }
              />
            }
          >
            {nav.bookCall}
          </Button>
          <Sheet>
            <SheetTrigger
              aria-label={nav.openMenu}
              className="inline-flex size-8 items-center justify-center rounded-md text-foreground transition-colors outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring/40 lg:hidden"
            >
              <Menu className="size-4" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72 text-sm">
              <SheetTitle className="sr-only">{nav.openMenu}</SheetTitle>
              <nav className="flex flex-col gap-1 p-4" aria-label="Mobile">
                {links.map((link) => (
                  <SheetClose
                    key={link.href}
                    render={<Link href={link.href} />}
                    className="rounded-md px-3 py-2 text-foreground transition-colors hover:bg-muted"
                  >
                    {link.label}
                  </SheetClose>
                ))}
                <SheetClose
                  render={
                    <a
                      href={
                        ctaHref ?? localePath(locale, "contact")
                      }
                    />
                  }
                  className="mt-2 inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
                >
                  {nav.bookCall}
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
