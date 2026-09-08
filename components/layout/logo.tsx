import Link from "next/link"

import { cn } from "@/lib/utils"

interface LogoProps {
  href: string
  className?: string
}

export function Logo({ href, className }: LogoProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2 rounded-md font-heading text-base font-semibold tracking-tight outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
        className
      )}
    >
      <svg
        viewBox="0 0 64 64"
        aria-hidden="true"
        className="size-7 rounded-md bg-primary"
      >
        <path
          d="M14 46V18h7l11 16 11-16h7v28h-7V29l-11 16-11-16v17z"
          className="fill-gold"
        />
      </svg>
      <span>MRVIN100</span>
    </Link>
  )
}
