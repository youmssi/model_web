import Link from "next/link"

// 404 within [lang]: no params access, so keep it bilingual.
export default function NotFound() {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-4 py-28 text-center">
      <p className="font-mono text-sm text-gold">404</p>
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        Page introuvable — Page not found
      </h1>
      <p className="max-w-md text-sm text-muted-foreground">
        Cette page n&apos;existe pas ou a été déplacé. — This page does not
        exist or has been moved.
      </p>
      <div className="flex gap-3">
        <Link
          href="/fr"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
        >
          Accueil
        </Link>
        <Link
          href="/en"
          className="rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
        >
          Home
        </Link>
      </div>
    </section>
  )
}
