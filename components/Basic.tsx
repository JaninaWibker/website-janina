import Link from 'next/link'
import type { UrlObject } from 'url'
import { ExternalLink as ExternalLinkIcon } from 'pixelarticons/fonts/react'
import type { NativeProps } from '@/utils/types'
import { cn } from '@/utils/common'

export const Underline = () => (
  <div className="mb-7 ml-1.5 flex h-1 w-[180px]">
    <span className="h-1 w-9 bg-trans-blue"></span>
    <span className="h-1 w-9 bg-trans-pink"></span>
    <span className="h-1 w-9 bg-trans-white"></span>
    <span className="h-1 w-9 bg-trans-pink"></span>
    <span className="h-1 w-9 bg-trans-blue"></span>
  </div>
)

export const Heading1 = ({ className, underlined, ...props }: NativeProps<'h1'> & { underlined?: boolean }) => (
  <>
    <h1
      className={cn('text-xl leading-[initial] text-secondary-9 before:mr-3 before:content-["*"]', className)}
      {...props}
    />
    {underlined && <Underline />}
  </>
)

export const FancyLink = ({ className, ...props }: NativeProps<'a', 'href'> & { href: string | UrlObject }) => (
  <Link
    className={cn(
      'relative',
      'text-secondary-9 text-shadow-color-secondary-7/50',
      'text-shadow text-shadow-x-2 text-shadow-y-2',
      'hover:left-[1px] hover:top-[1px] hover:text-shadow-x-1 hover:text-shadow-y-1',
      className
    )}
    {...props}
  />
)

export const Divider = ({ className, ...props }: NativeProps<'div', 'children'>) => (
  <span
    className={cn(
      'text-shadow select-none text-primary-11 text-shadow-x-2 text-shadow-y-2 text-shadow-color-primary-9/50',
      className
    )}
    {...props}
  >
    |
  </span>
)

export const StyledLink = ({
  className,
  children,
  externalIcon = false,
  ...props
}: NativeProps<'a'> & { externalIcon?: boolean }) => (
  <a className={cn('inline-flex items-center gap-0.5 text-primary-9 hover:underline', className)} {...props}>
    <span>{children}</span>
    {externalIcon && <ExternalLinkIcon viewBox="0 0 24 24" className="mb-1 size-4 [&>*]:fill-current" />}
  </a>
)
