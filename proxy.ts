import { NextResponse, type NextRequest } from "next/server"

import { defaultLocale, locales } from "@/lib/i18n/config"

/**
 * Pick the best locale from the Accept-Language header,
 * falling back to the site default (French).
 */
function getLocale(request: NextRequest): string {
  const header = request.headers.get("accept-language")
  if (!header) return defaultLocale

  const preferred = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=")
      return { tag: tag.trim().toLowerCase(), q: q ? Number.parseFloat(q) : 1 }
    })
    .sort((a, b) => b.q - a.q)

  for (const { tag } of preferred) {
    const match = locales.find((locale) => tag === locale || tag.startsWith(`${locale}-`))
    if (match) return match
  }

  return defaultLocale
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip if the pathname already starts with a supported locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
  if (pathnameHasLocale) return

  // Redirect e.g. /pricing -> /fr/pricing based on browser preference
  request.nextUrl.pathname = `/${getLocale(request)}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
}
