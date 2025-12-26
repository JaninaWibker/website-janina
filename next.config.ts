import type { NextConfig } from 'next'
import { withMdx } from './mdx'

const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  reactStrictMode: true,
  images: { unoptimized: true },
  devIndicators: false,
  transpilePackages: ['pixelarticons'],
  experimental: {
    mdxRs: false
  }
} satisfies NextConfig

export default withMdx(nextConfig)
