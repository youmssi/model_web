import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  label?: string
  title: string
  subtitle?: string
  align?: "left" | "center"
  /** Heading level: use "h1" once per page for the main page title. */
  as?: "h1" | "h2"
  className?: string
}

export function SectionHeading({
  label,
  title,
  subtitle,
  align = "center",
  as = "h2",
  className,
}: SectionHeadingProps) {
  const TitleTag = as
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {label ? (
        <span className="inline-flex w-fit items-center rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
          {label}
        </span>
      ) : null}
      <TitleTag className="font-serif text-3xl font-medium tracking-tight text-balance sm:text-4xl">
        {title}
      </TitleTag>
      {subtitle ? (
        <p className="max-w-2xl text-sm leading-relaxed text-pretty text-muted-foreground sm:text-base">
          {subtitle}
        </p>
      ) : null}
    </div>
  )
}
