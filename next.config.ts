import type { NextConfig } from 'next'
import { withMdx } from './mdx'

const nextConfig = {
  output: 'standalone',
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  reactStrictMode: true,
  images: { unoptimized: true },
  devIndicators: false,
  serverExternalPackages: ['twoslash']
} satisfies NextConfig

export default withMdx(nextConfig)
