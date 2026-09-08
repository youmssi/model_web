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
import { contactEmail, localePath, type Locale } from "@/lib/i18n/config"
import { cn } from "@/lib/utils"

interface SiteHeaderProps {
  locale: Locale
  nav: Dictionary["nav"]
}

export function SiteHeader({ locale, nav }: SiteHeaderProps) {
  const pathname = usePathname() || localePath(locale)

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
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-4 px-4">
        <Logo href={localePath(locale)} />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href, link.exact) ? "page" : undefined}
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
            className="ml-1 hidden sm:inline-flex"
            render={<a href={`mailto:${contactEmail}?subject=Discovery%20call`} />}
          >
            {nav.bookCall}
          </Button>
          <Sheet>
            <SheetTrigger
              aria-label={nav.openMenu}
              className="inline-flex size-8 items-center justify-center rounded-md text-foreground transition-colors outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring/40 md:hidden"
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
                  render={<a href={`mailto:${contactEmail}?subject=Discovery%20call`} />}
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
