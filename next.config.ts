import mdx from '@next/mdx'
import type { NextConfig } from 'next'

const withMdx = mdx({
  extension: /\.mdx?$/,
  options: {}
})

const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  reactStrictMode: true,
  images: { unoptimized: true },
  devIndicators: false,
  transpilePackages: ['pixelarticons']
} satisfies NextConfig

export default withMdx(nextConfig)
