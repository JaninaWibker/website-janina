/** @import { NextConfig } from 'next' */
import { withMdx } from './mdx.ts'

/**
 * @satisfies {NextConfig}
 */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  reactStrictMode: true,
  images: { unoptimized: true },
  devIndicators: false,
  transpilePackages: ['pixelarticons', '@_janina/remark-reading-time']
}

export default withMdx(nextConfig)
