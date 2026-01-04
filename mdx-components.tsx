import type { MDXComponents } from 'mdx/types'
import { components as defaultComponents } from '@/components/native-replacements'
import { codeComponents } from './components/Code'

export const useMDXComponents = (components: MDXComponents): MDXComponents => ({
  ...defaultComponents,
  ...codeComponents,
  ...components
})
