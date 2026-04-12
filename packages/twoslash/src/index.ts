import type { ShikiTransformer, ShikiTransformerContext } from 'shiki'
import {
  createTransformerFactory,
  rendererRich,
  type TransformerTwoslashIndexOptions,
  type TwoslashTypesCache
} from '@shikijs/twoslash'
import { createTwoslasher, type TwoslashInstance } from 'twoslash'
import { renderMarkdown, renderMarkdownInline } from './markdown'
import { hast } from './hast-modifications'
import type { ElementContent } from 'hast'

export type { TwoslashTypesCache }
export type TransformerTwoslashOptions = TransformerTwoslashIndexOptions

let cachedInstance: TwoslashInstance | undefined

const LazyInstance = (options: TransformerTwoslashOptions = {}) => {
  // lazy load Twoslash instance so it works on serverless platforms
  function lazyInstance(): TwoslashInstance {
    function get() {
      return (cachedInstance ??= createTwoslasher(options.twoslashOptions))
    }

    const wrapper: TwoslashInstance = (...args) => get()(...args)

    wrapper.getCacheMap = () => get().getCacheMap()
    return wrapper
  }

  return lazyInstance
}

// This is highly inspired by https://github.com/shikijs/shiki/blob/main/packages/vitepress-twoslash
export function transformerTwoslash(options: TransformerTwoslashOptions = {}): ShikiTransformer {
  const lazyInstance = LazyInstance(options)

  const renderer = rendererRich({
    queryRendering: 'line',
    renderMarkdown,
    renderMarkdownInline,
    ...options?.rendererRich,
    hast: {
      ...hast,
      ...options?.rendererRich?.hast
    }
  })

  renderer.nodeCompletion = function (this: ShikiTransformerContext, query, node) {
    return {
      type: 'element',
      tagName: 'Completion',
      // we put react component into things that are normally only DOM elements, therefore we need to do a few things wrt to passing props that are a bit uncommon
      // we need to serialize them to json because otherwise they get turned into `[object Object]` strings
      properties: { queryserialized: JSON.stringify(query), nodeserialized: JSON.stringify(node) }
    } satisfies Partial<ElementContent>
  }

  const fnLineQuery = renderer.lineQuery!
  renderer.lineQuery = function (this: ShikiTransformerContext, ...args) {
    const result = fnLineQuery.call(this, ...args)
    // this may break if Shiki updates, need more attention

    type AssumedType = [
      {
        children: [
          { value: string },
          {
            children: [unknown, ...ElementContent[]]
          }
        ]
      }
    ]

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const resultAssumedType = result as any as AssumedType

    const [, ...themedContent] = resultAssumedType[0].children[1].children
    const indentation = resultAssumedType[0].children[0].value.length

    return [
      {
        type: 'element',
        tagName: 'LineQuery',
        properties: {
          indentation
        },
        children: themedContent
      }
    ]
  }

  const transformer = createTransformerFactory(lazyInstance(), renderer)
  const finalOptions = {
    explicitTrigger: true,
    ...options,
    onTwoslashError: console.error,
    onShikiError: console.error
  }

  return transformer(finalOptions)
}
