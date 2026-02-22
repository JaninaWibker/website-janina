import NextLink from 'next/link'
import type { UrlObject } from 'url'
import { ExternalLink as ExternalLinkIcon } from 'pixelarticons/fonts/react'
import type { NativeProps } from '@/utils/types'
import { cn } from '@/utils/common'
import type { PropsWithChildren } from 'react'

export const Underline = () => (
  <div className="mb-7 ml-1.5 flex h-1 w-[180px]">
    <span className="h-1 w-9 bg-trans-blue"></span>
    <span className="h-1 w-9 bg-trans-pink"></span>
    <span className="h-1 w-9 bg-trans-white"></span>
    <span className="h-1 w-9 bg-trans-pink"></span>
    <span className="h-1 w-9 bg-trans-blue"></span>
  </div>
)

export const Wide = ({ className, children }: PropsWithChildren<{ className?: string }>) => (
  <div className={cn('-mx-8', className)}>{children}</div>
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

type LinkProps = NativeProps<'a', 'href'> & { href: string | UrlObject }

export const FancyLink = ({ className, ...props }: LinkProps) => (
  <NextLink
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

export const Link = ({ className, children, href, externalIcon, ...props }: LinkProps & { externalIcon?: boolean }) => {
  // an anchor tag can only receive string | undefined as href, but a (nextjs) Link component can receive UrlObject as well
  // as Link is only supposed to be used for internal links, we can safely assume that this means that having href be an
  // UrlObject means that the link is internal, as this would mean trying to pass this onwards to a Link anyways
  const isExternal = typeof href === 'string' ? URL.canParse(href) : false
  const showExternalIcon = isExternal && externalIcon !== false
  const computedClassName = cn(
    'inline-flex items-center gap-0.5 text-primary-9 underline-offset-[3px] hover:underline',
    className
  )

  if (isExternal) {
    return (
      <a className={computedClassName} href={href as string} {...props}>
        <span>{children}</span>
        {showExternalIcon && <ExternalLinkIcon viewBox="0 0 24 24" className="mb-1 size-4 [&>*]:fill-current" />}
      </a>
    )
  } else {
    return (
      <NextLink className={computedClassName} href={href} {...props}>
        <span>{children}</span>
      </NextLink>
    )
  }
}

export const WideImage = ({ alt, className, ...props }: NativeProps<'img'>) => (
  <Wide className="pb-8">
    <img className={cn('rounded-xl shadow-inner', className)} {...props} alt={alt} />
    <div className="py-2 text-center">{alt}</div>
  </Wide>
)
