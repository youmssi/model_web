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
        "inline-flex items-center gap-2.5 rounded-md font-heading text-base font-semibold tracking-tight outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
        className
      )}
    >
      <svg
        viewBox="0 0 40 44"
        aria-hidden="true"
        className="size-8 shrink-0 text-foreground"
      >
        <path
          d="M18.8 1.8 15 3.1l-2.1 2.2-3.6.6-1.6 2.4-3.3.9-1.5 3.2 1.4 3.4-.8 3.7 2.3 3.2.2 4.2 2.5 2.1.4 4 2.6 2.7 1.1 4.1 3.1 2.6 2.8-1.4 2.2-3.9 1.3-4.3 2.4-3.5 1.2-4.2 2.5-3.3 1-4.1 2.8-2.9-.6-2.8 2.2-2.4-1.6-2.5-3.1-.4-2.5-2.1-3.1.5-2.1-1.8-3.4.1-2.1 1.1Z"
          fill="currentColor"
        />
        <path d="m31.8 29.1 1.8 2.6-.6 3.1-1.4 3.1-.8-3.3.5-2.7z" fill="currentColor" />
        <text x="17.2" y="24" textAnchor="middle" fontSize="6.2" fontFamily="ui-sans-serif, system-ui" fontWeight="700" letterSpacing="-.55" fill="var(--background)">100</text>
      </svg>
      <span className="font-sans text-[0.94rem] font-medium tracking-[0.055em]">MRVIN100</span>
    </Link>
  )
}
