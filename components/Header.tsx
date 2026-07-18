'use client'

import { clsx } from 'clsx'
import { useTheme } from 'next-themes'
import { usePathname } from 'next/navigation'
import { interleave } from '@/utils/interleave'
import { FancyLink, Divider } from './Basic'

// TODO: fix resizing things when titleOverride is used with differing lengths
const baseTitle = "janina's site"
const items = [
  { name: 'website', href: '/' },
  { name: 'blog', href: '/blog', titleOverride: "janina's blog" },
  { name: 'projects', href: '/projects' }
]

const base = 'absolute size-[96px] sm:size-[128px] max-w-none'
const backdrop = 'bg-primary-9'
const displacement = 'left-[6px] top-[6px]'

export const Header = () => {
  const { theme, setTheme } = useTheme()
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')

  const pathname = usePathname()
  const active = items.find((item) => item.href === pathname || (item.href !== '/' && pathname.startsWith(item.href)))!
  const title = active.titleOverride ?? baseTitle

  return (
    <div className="w-full pb-8 pt-16">
      <header className="mx-auto flex w-fit gap-3 px-3 sm:gap-5 sm:px-4">
        <div className="relative size-[102px] shrink-0 sm:size-[134px]" style={{ imageRendering: 'pixelated' }}>
          <div className={clsx(base, backdrop, displacement)}></div>
          <img className={clsx(base, displacement, 'opacity-25')} aria-hidden="true" src="/images/pp_smol.png" />
          <div className={clsx(base, backdrop)}></div>
          <img
            className={clsx(base, 'opacity-80')}
            role="button"
            alt="profile picture - click or press space/enter to toggle theme"
            src="/images/pp_smol.png"
            tabIndex={0}
            onClick={() => toggleTheme()}
            onKeyDown={(e) => (e.key === ' ' || e.key === 'Enter') && toggleTheme()}
          />
        </div>
        <div className="flex flex-col gap-1 py-3 sm:gap-2">
          <div className="flex w-fit items-center">
            <h1
              className={clsx(
                'text-shadow leading-[initial] text-secondary-9 text-shadow-color-secondary-7/50',
                'sm:text-2xl sm:text-shadow-x-4 sm:text-shadow-y-4',
                'text-[36px] text-shadow-x-3 text-shadow-y-3'
              )}
            >
              {title}
            </h1>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 sm:gap-x-2.5">
            {interleave(
              items.map((item) => (
                <FancyLink key={item.href} href={item.href}>
                  {item.name}
                </FancyLink>
              )),
              <Divider key="divider" />
            )}
          </div>
        </div>
      </header>
    </div>
  )
}
