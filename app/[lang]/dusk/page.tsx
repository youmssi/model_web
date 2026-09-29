import { notFound, redirect } from "next/navigation"

import { isLocale, localePath } from "@/lib/i18n/config"

export default async function LegacyDuskPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  redirect(localePath(lang))
}
