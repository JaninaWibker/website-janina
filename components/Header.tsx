'use client'

import { usePathname } from 'next/navigation'
import { interleave } from '@/utils/interleave'
import { clsx } from 'clsx'
import { FancyLink, Divider } from './FancyLink'
import { useTheme } from 'next-themes'

// TODO: modify title on a few pages ("janina's blog", maybe "janina's projects"?)
const baseTitle = "janina's site"
const items = [
  { name: 'website', href: '/' },
  { name: 'blog', href: '/blog', titleOverride: "janina's blog" },
  { name: 'projects', href: '/projects' }
]

const base = 'absolute size-[128px]'
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
      <header className="mx-auto flex w-fit gap-5">
        <div className="relative size-[134px]" style={{ imageRendering: 'pixelated' }}>
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
        <div className="flex flex-col gap-2 py-3">
          <h1 className="text-shadow text-2xl leading-[initial] text-secondary-9 text-shadow-x-4 text-shadow-y-4 text-shadow-color-secondary-7/50">
            {title}
          </h1>
          <div className="flex items-center justify-center gap-2.5">
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
