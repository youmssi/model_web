import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { isLocale } from "@/lib/i18n/config"

interface SiteLayoutProps {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}

export default async function SiteLayout({ children, params }: SiteLayoutProps) {
  const { lang } = await params
  if (!isLocale(lang)) return null
  const dict = getDictionary(lang)

  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader locale={lang} nav={dict.nav} />
      <main className="flex-1">{children}</main>
      <SiteFooter locale={lang} footer={dict.footer} nav={dict.nav} />
    </div>
  )
}
