import type { ClassValue } from 'clsx'
import type { MDXComponents } from 'mdx/types'
import type { JSX } from 'react'
import { cn } from '@/utils/common'
import type { NativeProps } from '@/utils/types'
import { Link } from '@/components/Basic'

export const nativeReplacement = <Tag extends keyof JSX.IntrinsicElements>(
  tag: Tag,
  name: string,
  { className, ...initialProps }: NativeProps<Tag, 'className'> & { className?: ClassValue }
) => {
  const NativeComponent = tag
  const GeneratedComponent: React.FC<NativeProps<Tag> & { 'data-unstyled'?: boolean }> = ({
    className: innerClassName,
    'data-unstyled': dataUnstyled = false,
    ...props
  }) => (
    // @ts-expect-error idk how to type this correctly
    <NativeComponent className={cn(!dataUnstyled && className, innerClassName)} {...initialProps} {...props} />
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

// I think styling the pre tag makes more sense, but styling code blocks is still a bit far away on the roadmap

export const Figure = ({ className, ...props }: NativeProps<'figure'>) => {
  const isCodeblock = 'data-rehype-pretty-code-figure' in props

  return <figure className={cn(isCodeblock && 'my-4 -ml-2', className)} {...props} />
}
export const FigureCaption = ({ className, ...props }: NativeProps<'figure'>) => {
  const isCodeblockTitle = 'data-rehype-pretty-code-title' in props
  const isCodeblockCaption = 'data-rehype-pretty-code-caption' in props

  return (
    <figcaption
      className={cn(
        isCodeblockTitle &&
          'isolate -mb-0.5 w-fit border-2 border-secondary-7 bg-secondary-1 px-2 text-sm text-secondary-11',
        isCodeblockCaption && 'py-2 text-center',
        className
      )}
      {...props}
    />
  )
}

export const Pre = ({ className, children, ...props }: NativeProps<'pre'>) => (
  <pre
    className={cn(
      'group/codeblock ui-codeblock overflow-x-auto border-b-2 border-t-2 border-secondary-7 bg-secondary-1 focus:outline-none',
      className
    )}
    {...props}
  >
    <div className="flex">
      <div className="sticky left-0 w-0.5 shrink-0 bg-secondary-7" />
      {children}
      <div className="sticky right-0 w-0.5 shrink-0 bg-secondary-7" />
    </div>
  </pre>
)

export const Code = nativeReplacement('code', 'Code', { className: 'grow font-sans mx-2 m-1' })

export const Mark = ({ className, ...props }: NativeProps<'mark'>) => {
  const isHighlightedChars = 'data-highlighted-chars' in props && 'data-chars-id' in props
  const highlightId = isHighlightedChars ? (props['data-chars-id'] as string) : undefined

  const isValidHighlightedChars = highlightId && ['red', 'green', 'yellow', 'mauve', 'fuchsia'].includes(highlightId)

  return (
    <mark
      className={cn(
        isValidHighlightedChars && 'text-shadow -mx-0.5 -my-px px-0.5 py-px text-shadow-x-1 text-shadow-y-1',
        highlightId === 'red' && 'bg-negative-7 text-shadow-color-negative-9/50',
        highlightId === 'green' && 'bg-positive-7 text-shadow-color-positive-9/50',
        highlightId === 'yellow' && 'bg-neutral-8 text-shadow-color-neutral-9/50',
        highlightId === 'mauve' && 'bg-primary-7 text-shadow-color-primary-9/50',
        highlightId === 'fuchsia' && 'bg-secondary-7 text-shadow-color-secondary-9/50',
        className
      )}
      {...props}
    />
  )
}

export const Input = ({ className, type, ...props }: NativeProps<'input'>) => {
  if (type === 'checkbox' && props.disabled) {
    return (
      <span role="checkbox" aria-checked={props.checked} aria-disabled className="select-none">
        {props.checked ? '[x]' : '[ ]'}
      </span>
    )
  } else {
    const all = { className, type, ...props }
    // TODO: is there even anything that would generate this output? it doesn't get triggered
    // TODO: by using `<input />` manually in mdx, only markdown being turned into jsx
    return <input {...all} />
  }
}

export { Link }

export const H1 = nativeReplacement('h1', 'H1', {
  className:
    'text-xl leading-[initial] mt-8 mb-4 text-shadow text-shadow-x-3 text-shadow-y-3 text-shadow-color-secondary-7/50'
})

export const H2 = nativeReplacement('h2', 'H2', {
  className:
    'text-lg leading-[initial] mt-6 mb-3 text-shadow text-shadow-x-2 text-shadow-y-2 text-shadow-color-secondary-7/50'
})

export const H3 = nativeReplacement('h3', 'H3', {
  className: 'text-lg leading-[initial] mt-4 mb-2'
})

export const H4 = nativeReplacement('h4', 'H4', {
  className: 'leading-[initial] mt-3 mb-1'
})

export const H5 = nativeReplacement('h5', 'H5', {
  className: 'leading-[initial] mt-3 mb-1'
})

export const HR = nativeReplacement('hr', 'HR', {
  className: 'mt-2 mb-2.5 border-none h-px bg-secondary-6'
})

export const Blockquote = nativeReplacement('blockquote', 'Blockquote', {
  className: cn(
    'my-4 -ml-2 border-2 border-secondary-7 bg-secondary-1 p-1',
    '[&>p]:-ml-1.5 [&>p]:-mr-1 [&>p]:border-l-2 [&>p]:border-secondary-9 [&>p]:bg-secondary-3 [&>p]:pl-1.5 [&>p]:pr-1'
  )
})

// commented out components which are still TODO, as undefined is disallowed by MDXComponents
export const components = {
  strong: Strong,
  em: Em,
  s: Strikethrough,
  a: Link,
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
  figure: Figure,
  figcaption: FigureCaption,
  pre: Pre,
  code: Code,
  mark: Mark,
  input: Input,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  hr: HR,
  blockquote: Blockquote,
} satisfies MDXComponents
