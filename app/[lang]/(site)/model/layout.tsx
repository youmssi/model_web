import { notFound } from "next/navigation"

import { DocsSidebar } from "@/components/docs/docs-sidebar"
import { getDocList } from "@/lib/docs"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { isLocale } from "@/lib/i18n/config"

interface LayoutProps {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}

export default async function ModelLayout({ children, params }: LayoutProps) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const dict = getDictionary(lang)
  const docs = getDocList(lang)

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-8 pb-16 sm:pt-10">
      <div className="lg:grid lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-12">
        <DocsSidebar
          locale={lang}
          docs={docs}
          labels={{ sidebarTitle: dict.docs.sidebarTitle, browseAll: dict.docs.browseAll }}
        />
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  )
}
