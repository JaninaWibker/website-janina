import type { Element, ElementContent } from 'hast'
import type { Code } from 'mdast'
import { fromMarkdown } from 'mdast-util-from-markdown'
import { gfmFromMarkdown } from 'mdast-util-gfm'
import { defaultHandlers, toHast } from 'mdast-util-to-hast'
import type { ShikiTransformerContextCommon } from 'shiki'

export function renderMarkdown(this: ShikiTransformerContextCommon, md: string): ElementContent[] {
  const mdast = fromMarkdown(
    md.replace(/{@link (?<link>[^}]*)}/g, '$1'), // replace jsdoc links
    { mdastExtensions: [gfmFromMarkdown()] }
  )

  return (
    toHast(mdast, {
      handlers: {
        code: (state, node: Code) => {
          if (node.lang) {
            return this.codeToHast(node.value, {
              ...this.options,
              transformers: [],
              meta: {
                __raw: node.meta ?? undefined
              },
              lang: node.lang
            }).children[0] as Element
          }

          return defaultHandlers.code(state, node)
        }
      }
    }) as Element
  ).children
}

export function renderMarkdownInline(
  this: ShikiTransformerContextCommon,
  md: string,
  context?: string
): ElementContent[] {
  const text = context === 'tag:param' ? md.replace(/^(?<link>[\w$-]+)/, '`$1` ') : md

  const children = renderMarkdown.call(this, text)
  if (children.length === 1 && children[0]!.type === 'element' && children[0]!.tagName === 'p')
    return children[0]!.children
  return children
}
