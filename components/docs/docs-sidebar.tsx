"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import type { DocMeta } from "@/lib/docs"
import { localePath, type Locale } from "@/lib/i18n/config"
import { cn } from "@/lib/utils"

interface DocsSidebarProps {
  locale: Locale
  docs: DocMeta[]
  labels: { sidebarTitle: string; browseAll: string }
}

export function DocsSidebar({ locale, docs, labels }: DocsSidebarProps) {
  const pathname = usePathname()
  const overviewHref = localePath(locale, "model")

  const linkClassName = (active: boolean) =>
    cn(
      "flex items-baseline gap-2.5 rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors outline-none hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40",
      active && "bg-muted/70 font-medium text-foreground"
    )

  const chapterLinks = docs.map((doc) => {
    const href = localePath(locale, `model/${doc.slug}`)
    return (
      <Link
        key={doc.slug}
        href={href}
        aria-current={pathname === href ? "page" : undefined}
        className={linkClassName(pathname === href)}
      >
        <span className="w-5 shrink-0 text-xs text-muted-foreground/70 tabular-nums">
          {String(doc.order).padStart(2, "0")}
        </span>
        <span className="min-w-0 leading-snug">{doc.title}</span>
      </Link>
    )
  })

  return (
    <>
      {/* Desktop: persistent chapter list */}
      <aside className="hidden lg:block">
        <nav
          aria-label={labels.sidebarTitle}
          className="sticky top-20 flex flex-col gap-1"
        >
          <p className="mb-2 px-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            {labels.sidebarTitle}
          </p>
          <Link
            href={overviewHref}
            aria-current={pathname === overviewHref ? "page" : undefined}
            className={linkClassName(pathname === overviewHref)}
          >
            <span className="w-5 shrink-0" />
            {labels.browseAll}
          </Link>
          {chapterLinks}
        </nav>
      </aside>

      {/* Mobile: sheet trigger above the content */}
      <div className="mb-8 lg:hidden">
        <Sheet>
          <SheetTrigger className="flex w-full items-center gap-3 rounded-lg border border-border/60 bg-card px-4 py-2.5 text-sm font-medium transition-colors outline-none hover:bg-muted/60 focus-visible:ring-2 focus-visible:ring-ring/40">
            <span className="flex size-4 flex-col justify-center gap-[3px]">
              <span className="h-px w-full bg-foreground" />
              <span className="h-px w-full bg-foreground" />
              <span className="h-px w-full bg-foreground" />
            </span>
            {labels.browseAll}
          </SheetTrigger>
          <SheetContent side="left" className="w-72 overflow-y-auto text-sm">
            <SheetTitle className="px-4 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              {labels.sidebarTitle}
            </SheetTitle>
            <nav
              className="flex flex-col gap-1 p-4"
              aria-label={labels.sidebarTitle}
            >
              <SheetClose
                render={<Link href={overviewHref} />}
                className={linkClassName(pathname === overviewHref)}
              >
                {labels.browseAll}
              </SheetClose>
              {docs.map((doc) => {
                const href = localePath(locale, `model/${doc.slug}`)
                return (
                  <SheetClose
                    key={doc.slug}
                    render={<Link href={href} />}
                    className={linkClassName(pathname === href)}
                  >
                    <span className="w-5 shrink-0 text-xs text-muted-foreground/70 tabular-nums">
                      {String(doc.order).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 leading-snug">{doc.title}</span>
                  </SheetClose>
                )
              })}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
