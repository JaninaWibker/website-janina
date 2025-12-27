import type { MDXComponents } from 'mdx/types'
import { components } from '@/components/native-replacements'

export const useMDXComponents = (defaultComponents: MDXComponents): MDXComponents => ({
  ...components,
  ...defaultComponents
})
