import mdx from '@next/mdx'
import {
  rehypeParseCodeBlocks,
  rehypeShiki,
  rehypeHighlight,
  rehypeMdxAnnotations,
  recmaNextjsStaticProps,
  recmaMdxAnnotations,
  remarkMdxAnnotations
} from '@_janina/mdx'
import remarkMath from 'remark-math'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import remarkGfm from 'remark-gfm'

import rehypeKatex from 'rehype-katex'
import rehypeToc from '@stefanprobst/rehype-extract-toc'
import rehypeTocMdx from '@stefanprobst/rehype-extract-toc/mdx'
import rehypeSlug from 'rehype-slug'

import { remarkReadingTime, remarkMdxReadingTime } from '@/utils/mdx/remark-reading-time'

export const withMdx = mdx({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [
      [remarkGfm, { singleTilde: false }],
      remarkMath,
      remarkMdxAnnotations,
      remarkFrontmatter,
      remarkMdxFrontmatter,
      remarkReadingTime,
      remarkMdxReadingTime
    ],
    rehypePlugins: [
      rehypeMdxAnnotations,
      rehypeParseCodeBlocks,
      () => rehypeShiki('rose-pine-moon'),
      rehypeHighlight,
      rehypeSlug,
      rehypeKatex,
      rehypeToc,
      rehypeTocMdx
    ],
    recmaPlugins: [recmaMdxAnnotations, recmaNextjsStaticProps]
  }
})
