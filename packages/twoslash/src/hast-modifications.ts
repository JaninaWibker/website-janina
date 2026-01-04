import { type RendererRichOptions } from '@shikijs/twoslash'
import type { ElementContent } from 'hast'

type RichHastExtensions = Required<Exclude<RendererRichOptions['hast'], undefined>>

export const hoverToken: RichHastExtensions['hoverToken'] = {
  tagName: 'Popover'
}

export const queryToken: RichHastExtensions['queryToken'] = {
  tagName: 'QueryToken'
}

export const hoverPopup: RichHastExtensions['hoverPopup'] = {
  tagName: 'PopoverContent'
}

// TODO: is already a component, so can move over classnames?
export const hoverCompose: RichHastExtensions['hoverCompose'] = ({ popup, token }) =>
  [
    popup,
    {
      type: 'element',
      tagName: 'PopoverTrigger',
      properties: {
        class:
          // TODO: data-popup-open doesn't seem to work
          'group-hover/codeblock:underline decoration-primary-8 underline-offset-[4px] decoration-dashed data-[popup-open]:underline data-[popup-open]:decoration-primary-11',
        style: 'text-shadow:inherit'
      },
      children: [token]
    }
  ] as const

export const popupDocs: RichHastExtensions['popupDocs'] = {
  class: 'text-sm !leading-[20px] !mt-2'
}

export const popupDocsTags: RichHastExtensions['popupDocsTags'] = {
  class: 'text-sm !leading-[20px] !mt-2'
}

export const nodesHighlight: RichHastExtensions['nodesHighlight'] = {
  class: '-mx-0.5 -my-px px-0.5 py-px text-shadow-x-1 text-shadow-y-1 bg-secondary-7 text-shadow-color-secondary-9/50'
}

export const popupTypes: RichHastExtensions['popupTypes'] = {
  tagName: 'div',
  class: 'twoslash shiki ui-codeblock',
  children: (v: ElementContent[]) => {
    if (v.length === 1 && v[0]!.type === 'element' && v[0]!.tagName === 'code') {
      return v
    }

    return [
      {
        type: 'element',
        tagName: 'code',
        properties: {
          class: 'text-sm ![&>.line]:pl-0',
          style: 'overflow-wrap: anywhere'
        },
        children: v
      }
    ]
  }
}

export const hast = {
  hoverToken,
  queryToken,
  hoverPopup,
  hoverCompose,
  popupDocs,
  popupTypes,
  popupDocsTags,
  nodesHighlight
}
