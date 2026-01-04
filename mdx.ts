import mdx from '@next/mdx'
import remarkMath from 'remark-math'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import remarkGfm from 'remark-gfm'
import { remarkReadingTime, remarkMdxReadingTime } from '@_janina/remark-reading-time/transpile'

import rehypeKatex from 'rehype-katex'
import rehypeToc from '@stefanprobst/rehype-extract-toc'
import rehypeTocMdx from '@stefanprobst/rehype-extract-toc/mdx'
import rehypeSlug from 'rehype-slug'
import { rehypePrettyCode } from 'rehype-pretty-code'
import { transformerTwoslash } from 'fumadocs-twoslash'

export const withMdx = mdx({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [
      [remarkGfm, { singleTilde: false }],
      remarkMath,
      remarkFrontmatter,
      remarkMdxFrontmatter,
      remarkReadingTime,
      remarkMdxReadingTime
    ],
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          keepBackground: false,
          theme: {
            light: 'rose-pine-dawn',
            dark: 'rose-pine-moon'
          },
          transformers: [transformerTwoslash()]
        }
      ],
      rehypeSlug,
      rehypeKatex,
      rehypeToc,
      rehypeTocMdx
    ],
    recmaPlugins: []
  }
})
