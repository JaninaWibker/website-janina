import { cn } from '@/utils/common'
import type { NativeProps } from '@/utils/types'
import type { ClassValue } from 'clsx'
import type { MDXComponents } from 'mdx/types'
import type { JSX } from 'react'

const nativeReplacement = <Tag extends keyof JSX.IntrinsicElements>(
  tag: Tag,
  name: string,
  { className, ...initialProps }: NativeProps<Tag> & { className?: ClassValue }
) => {
  const NativeComponent = tag
  const GeneratedComponent: React.FC<NativeProps<Tag>> = ({ className: innerClassName, ...props }) => (
    // @ts-expect-error idk how to type this correctly
    <NativeComponent className={cn(className, innerClassName)} {...initialProps} {...props} />
  )

  GeneratedComponent.displayName = name
  return GeneratedComponent
}

export const Strong = nativeReplacement('strong', 'Strong', { className: '' })
export const Em = nativeReplacement('em', 'Em', { className: 'text-primary-11' })
export const Strikethrough = nativeReplacement('s', 'Strikethrough', { className: 'line-through' })
export const UnorderedList = nativeReplacement('ul', 'UnorderedList', { className: '' })
export const OrderedList = nativeReplacement('ol', 'OrderedList', { className: '' })
export const ListItem = nativeReplacement('li', 'ListItem', { className: '' })

// commented out components which are still TODO, as undefined is disallowed by MDXComponents
export const components = {
  strong: Strong,
  em: Em,
  s: Strikethrough,
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem
} satisfies MDXComponents
