import { Fragment } from 'react'
import Link from 'next/link'
import { clsx } from 'clsx'
import { Underline } from '@/components/Underline'

// placeholder links for now, none of this really exists yet
const links = [
  { href: '/', text: 'home' },
  { href: '/blog', text: 'blog' },
  { href: '/projects', text: 'projects' },
  { href: '/about', text: 'about me' }
]

const NotFound = () => (
  <div className="mx-auto mt-16 w-[380px]">
    <div
      className={clsx(
        'mx-[21px] mb-4 h-[197px] w-[338px]',
        'bg-[url(/images/bongo-cat-white.png)]',
        'dark:bg-[url(/images/bongo-cat-black.png)]'
      )}
      style={{
        imageRendering: 'pixelated'
      }}
    />

    <div className="mx-auto w-fit">
      <h1 className="w-fit before:mr-3 before:content-['*'] after:ml-3 after:content-['*']">404 - Not Found</h1>
      <Underline />
    </div>

    <div className="text-center">
      <span>the URL seems to be incorrect :/</span>
      <br />
      <br />

      <span>maybe you wanted to go here?</span>
      <br />
      {links.map(({ href, text }, i) => (
        <Fragment key={href}>
          <Link
            href={href}
            key={href}
            className="text-primary-9 no-underline"
            style={{
              textShadow: '1px 1px var(--mauve-5)'
            }}
          >
            {text}
          </Link>
          {i < links.length - 1 && <span className="mx-1.5 select-none text-secondary-6">|</span>}
        </Fragment>
      ))}
    </div>
  </div>
)

export default NotFound
