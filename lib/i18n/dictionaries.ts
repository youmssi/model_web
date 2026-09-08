import en from "@/dictionaries/en.json"
import fr from "@/dictionaries/fr.json"

import type { Locale } from "./config"

// The English dictionary defines the canonical shape; the French one is
// type-checked against it so a missing key fails the build.
export type Dictionary = typeof en

const dictionaries: Record<Locale, Dictionary> = { en, fr }

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}
