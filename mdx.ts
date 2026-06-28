import mdx from '@next/mdx'
import remarkMath from 'remark-math'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import remarkGfm from 'remark-gfm'
import { remarkReadingTime, remarkMdxReadingTime } from '@_janina/remark-reading-time'

import rehypeKatex from 'rehype-katex'
import rehypeToc from '@stefanprobst/rehype-extract-toc'
import rehypeTocMdx from '@stefanprobst/rehype-extract-toc/mdx'
import rehypeSlug from 'rehype-slug'
import { rehypePrettyCode } from 'rehype-pretty-code'
import { transformerTwoslash } from '@_janina/twoslash'
import { transformerNotationDiff, transformerNotationFocus } from '@shikijs/transformers'

const rehypePrettyCodeOptions = {
  keepBackground: false,
  theme: {
    light: 'rose-pine-dawn',
    dark: 'rose-pine-moon'
  },
  transformers: [
    transformerNotationDiff({ matchAlgorithm: 'v3' }),
    transformerNotationFocus(),
    transformerTwoslash({
      explicitTrigger: true
    })
  ]
} satisfies Parameters<typeof rehypePrettyCode>[0]

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
    rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions], rehypeSlug, rehypeKatex, rehypeToc, rehypeTocMdx],
    recmaPlugins: []
  }
})
