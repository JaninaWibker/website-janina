import mdx from '@next/mdx'
import type { NextConfig } from 'next'
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

const withMdx = mdx({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [remarkMath, remarkMdxAnnotations, remarkFrontmatter, remarkMdxFrontmatter],
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

const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  reactStrictMode: true,
  images: { unoptimized: true },
  devIndicators: false,
  transpilePackages: ['pixelarticons']
} satisfies NextConfig

export default withMdx(nextConfig)
