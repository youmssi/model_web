import type { MDXComponents } from "mdx/types"
import Image, { type ImageProps } from "next/image"
import Link from "next/link"

// Global MDX component mappings: styled by the Tailwind typography plugin,
// with sensible behaviour for links and images.
const components: MDXComponents = {
  a: ({ href = "", children, ...props }) => {
    if (/^https?:\/\//.test(href)) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
          {children}
        </a>
      )
    }
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    )
  },
  img: (props) => (
    <Image
      sizes="100vw"
      style={{ width: "100%", height: "auto" }}
      {...(props as ImageProps)}
    />
  ),
}

export function useMDXComponents(): MDXComponents {
  return components
}
