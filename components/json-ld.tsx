/**
 * Renders JSON-LD structured data. Follows the Next.js JSON-LD guide:
 * scrub "<" to prevent XSS through the payload.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  )
}
