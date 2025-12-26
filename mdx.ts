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
import rehypeKatex from 'rehype-katex'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import { remarkReadingTime, remarkMdxReadingTime } from '@/utils/mdx/remark-reading-time'

export const withMdx = mdx({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [
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
      rehypeKatex
    ],
    recmaPlugins: [recmaMdxAnnotations, recmaNextjsStaticProps]
  }
})
