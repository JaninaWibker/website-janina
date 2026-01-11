import type { NextConfig } from 'next'
import { withMdx } from './mdx.ts'

const nextConfig = {
  output: 'standalone',
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  reactStrictMode: true,
  images: { unoptimized: true },
  devIndicators: false,
  transpilePackages: ['pixelarticons', '@_janina/remark-reading-time', '@_janina/twoslash'],
  serverExternalPackages: ['twoslash']
} satisfies NextConfig

export default withMdx(nextConfig)
