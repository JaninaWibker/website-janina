import Link from 'next/link'
import type { UrlObject } from 'url'
import { cn } from '@/utils/common'
import type { NativeProps } from '@/utils/types'

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
