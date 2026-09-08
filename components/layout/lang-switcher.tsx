"use client"

import { Languages } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { localePath, locales, type Locale } from "@/lib/i18n/config"

interface LangSwitcherProps {
  locale: Locale
  label: string
}

/** Swap the locale prefix of the current path, e.g. /fr/pricing -> /en/pricing. */
function swapLocale(pathname: string, next: Locale): string {
  const segments = pathname.split("/")
  segments[1] = next
  return segments.join("/") || localePath(next)
}

export function LangSwitcher({ locale, label }: LangSwitcherProps) {
  const pathname = usePathname() || localePath(locale)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={label}
        className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors outline-none hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40"
      >
        <Languages className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-32">
        {locales.map((l) => (
          <DropdownMenuItem
            key={l}
            variant={l === locale ? "default" : "default"}
            className={l === locale ? "bg-accent text-accent-foreground" : ""}
            render={<Link href={swapLocale(pathname, l)} />}
          >
            {l === "fr" ? "Français" : "English"}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
