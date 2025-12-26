import { valueToEstree } from 'estree-util-value-to-estree'
import getReadingTime from 'reading-time'
import { toString } from 'mdast-util-to-string'
import type { Plugin } from 'unified'

type ReadingTime = {
  /**
   * Time in seconds
   */
  time: number
  duration: {
    hours: number
    minutes: number
    seconds: number
  }
  words: number
}

export const remarkReadingTime: Plugin = () => (tree, file) => {
  const { time: ms, words } = getReadingTime(toString(tree), { wordsPerMinute: 120 })

  const duration = {
    hours: Math.floor(ms / 3600000),
    minutes: Math.floor((ms % 3600000) / 60000),
    seconds: Math.floor((ms % 60000) / 1000)
  }

  const readingTime = {
    time: ms / 1000,
    duration,
    words
  } satisfies ReadingTime

  file.data.readingTime = readingTime
}

export const remarkMdxReadingTime: Plugin = () => (tree, file) => {
  const readingTime = file.data.readingTime as ReadingTime | undefined

  if (!readingTime) return

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
                  id: { type: 'Identifier', name: 'readingTime' },
                  init: valueToEstree(readingTime)
                }
              ]
            }
          }
        ]
      }
    }
  })
}
