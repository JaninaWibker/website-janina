import { valueToEstree } from 'estree-util-value-to-estree'
import type { Plugin } from 'unified'

export type Node = Parameters<Exclude<ReturnType<Plugin>, void | undefined>>[0]

export const mutateTreeAddExport = (tree: Node, name: string, value: unknown) => {
  // @ts-expect-error typing mdx things is super annoying and sort-of just not worth it
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  tree.children.unshift({
    type: 'mdxjsEsm',
    data: {
      estree: {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [],
            declaration: {
              type: 'VariableDeclaration',
              kind: 'const',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  id: { type: 'Identifier', name },
                  init: valueToEstree(value)
                }
              ]
            }
          }
        ]
      }
    }
  })
}
