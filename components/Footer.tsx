import { cn } from '@/utils/common'
import type { NativeProps } from '@/utils/types'
import { ExternalLink as ExternalLinkIcon } from 'pixelarticons/fonts/react'

const licenseUrl = 'https://creativecommons.org/licenses/by-sa/4.0/'
const repoUrl = 'https://github.com/JaninaWibker/website-janina'

const StyledLink = ({
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

export const Footer = () => (
  <div className="p-4 text-secondary-9">
    <hr className="border-secondary-7" />
    <span className="">
      {'© janina 2026, licensed under '}
      <StyledLink href={licenseUrl} externalIcon>
        CC BY-SA
      </StyledLink>
      {', '}
    </span>
    <span className="">
      <StyledLink href={repoUrl} externalIcon>
        source code
      </StyledLink>
      {' (website)'}
    </span>
  </div>
)
