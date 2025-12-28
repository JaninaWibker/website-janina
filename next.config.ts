import type { NextConfig } from 'next'
import { withMdx } from './mdx'

const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  reactStrictMode: true,
  images: { unoptimized: true },
  devIndicators: false,
  transpilePackages: ['pixelarticons']
} satisfies NextConfig

export default withMdx(nextConfig)
