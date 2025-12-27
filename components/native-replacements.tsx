import type { ClassValue } from 'clsx'
import type { MDXComponents } from 'mdx/types'
import type { JSX } from 'react'
import { cn } from '@/utils/common'
import type { NativeProps } from '@/utils/types'
import { Link } from '@/components/Basic'

const nativeReplacement = <Tag extends keyof JSX.IntrinsicElements>(
  tag: Tag,
  name: string,
  { className, ...initialProps }: NativeProps<Tag, 'className'> & { className?: ClassValue }
) => {
  const NativeComponent = tag
  const GeneratedComponent: React.FC<NativeProps<Tag>> = ({ className: innerClassName, ...props }) => (
    // @ts-expect-error idk how to type this correctly
    <NativeComponent className={cn(className, innerClassName)} {...initialProps} {...props} />
  )

  GeneratedComponent.displayName = name
  return GeneratedComponent
}

export const Strong = nativeReplacement('strong', 'Strong', {
  className: [
    'font-normal text-secondary-11 text-shadow-color-secondary-9/50',
    'text-shadow text-shadow-x-2 text-shadow-y-2'
  ]
})
export const Em = nativeReplacement('em', 'Em', { className: '' })
export const Strikethrough = nativeReplacement('s', 'Strikethrough', { className: 'line-through' })
export const UnorderedList = nativeReplacement('ul', 'UnorderedList', {
  className: 'list-["-_"] list-outside pl-4'
})
export const OrderedList = nativeReplacement('ol', 'OrderedList', { className: 'list-decimal' })
export const ListItem = nativeReplacement('li', 'ListItem', { className: '' })
export { Link }

// commented out components which are still TODO, as undefined is disallowed by MDXComponents
export const components = {
  strong: Strong,
  em: Em,
  s: Strikethrough,
  a: Link,
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem
} satisfies MDXComponents
