declare module 'tailwindcss/lib/util/flattenColorPalette' {
  const flattenColorPalette: (colors: unknown) => Record<string, string>
  export default flattenColorPalette
}

declare module '*.mdx' {
  import type { MDXContent } from 'mdx/types'
  declare let content: MDXContent
  export default content
}
