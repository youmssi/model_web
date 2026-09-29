import "server-only"

import fs from "node:fs"
import path from "node:path"

import type { ComponentType } from "react"

import matter from "gray-matter"

import type { Locale } from "@/lib/i18n/config"

import En01TheVision from "@/content/docs/en/01-the-vision.mdx"
import En02HowItWorks from "@/content/docs/en/02-how-it-works.mdx"
import En03DeveloperPact from "@/content/docs/en/03-the-developer-pact.mdx"
import En04Actors from "@/content/docs/en/04-actors-and-responsibilities.mdx"
import En05Framework from "@/content/docs/en/05-the-economic-framework.mdx"
import En06Quality from "@/content/docs/en/06-quality-and-accountable-delivery.mdx"
import En07Governance from "@/content/docs/en/07-governance-and-transparency.mdx"
import En08Zones from "@/content/docs/en/08-market-zones-and-standards.mdx"
import En09Join from "@/content/docs/en/09-join-the-model.mdx"
import Fr01TheVision from "@/content/docs/fr/01-the-vision.mdx"
import Fr02HowItWorks from "@/content/docs/fr/02-how-it-works.mdx"
import Fr03DeveloperPact from "@/content/docs/fr/03-the-developer-pact.mdx"
import Fr04Actors from "@/content/docs/fr/04-actors-and-responsibilities.mdx"
import Fr05Framework from "@/content/docs/fr/05-the-economic-framework.mdx"
import Fr06Quality from "@/content/docs/fr/06-quality-and-accountable-delivery.mdx"
import Fr07Governance from "@/content/docs/fr/07-governance-and-transparency.mdx"
import Fr08Zones from "@/content/docs/fr/08-market-zones-and-standards.mdx"
import Fr09Join from "@/content/docs/fr/09-join-the-model.mdx"

const CONTENT_DIR = path.join(process.cwd(), "content", "docs")

export interface DocMeta {
  slug: string
  title: string
  description: string
  order: number
}

/**
 * Static registry of compiled MDX chapters, keyed by locale and slug.
 * Static imports keep the bundler happy and the set of chapters explicit.
 */
const docRegistry: Record<Locale, Record<string, ComponentType>> = {
  en: {
    "01-the-vision": En01TheVision,
    "02-how-it-works": En02HowItWorks,
    "03-the-developer-pact": En03DeveloperPact,
    "04-actors-and-responsibilities": En04Actors,
    "05-the-economic-framework": En05Framework,
    "06-quality-and-accountable-delivery": En06Quality,
    "07-governance-and-transparency": En07Governance,
    "08-market-zones-and-standards": En08Zones,
    "09-join-the-model": En09Join,
  },
  fr: {
    "01-the-vision": Fr01TheVision,
    "02-how-it-works": Fr02HowItWorks,
    "03-the-developer-pact": Fr03DeveloperPact,
    "04-actors-and-responsibilities": Fr04Actors,
    "05-the-economic-framework": Fr05Framework,
    "06-quality-and-accountable-delivery": Fr06Quality,
    "07-governance-and-transparency": Fr07Governance,
    "08-market-zones-and-standards": Fr08Zones,
    "09-join-the-model": Fr09Join,
  },
}

/** The compiled MDX component for a chapter, or undefined if it doesn't exist. */
export function loadDoc(locale: Locale, slug: string): ComponentType | undefined {
  return docRegistry[locale]?.[slug]
}

export function getDocSlugs(locale: Locale): string[] {
  const dir = path.join(CONTENT_DIR, locale)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""))
}

/** Ordered chapter list for the current locale, from MDX frontmatter. */
export function getDocList(locale: Locale): DocMeta[] {
  return getDocSlugs(locale)
    .map((slug) => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, locale, `${slug}.mdx`), "utf8")
      const { data } = matter(raw)
      return {
        slug,
        title: typeof data.title === "string" ? data.title : slug,
        description: typeof data.description === "string" ? data.description : "",
        order: typeof data.order === "number" ? data.order : 99,
      } satisfies DocMeta
    })
    .sort((a, b) => a.order - b.order)
}

/** Frontmatter metadata for a single chapter. */
export function getDocMeta(locale: Locale, slug: string): DocMeta | undefined {
  return getDocList(locale).find((doc) => doc.slug === slug)
}

/** Neighbouring chapters for prev/next navigation. */
export function getDocNeighbours(locale: Locale, slug: string) {
  const docs = getDocList(locale)
  const index = docs.findIndex((doc) => doc.slug === slug)
  return {
    prev: index > 0 ? docs[index - 1] : undefined,
    next: index >= 0 && index < docs.length - 1 ? docs[index + 1] : undefined,
  }
}
