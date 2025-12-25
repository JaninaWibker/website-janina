import { clsx } from 'clsx'
import { Underline, Divider, FancyLink } from '@/components/Basic'
import { interleave } from '@/utils/interleave'

// placeholder links for now, none of this really exists yet
const links = [
  { name: 'home', href: '/' },
  { name: 'blog', href: '/blog' },
  { name: 'projects', href: '/projects' },
  { name: 'about me', href: '/about' }
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
      <div className="flex items-center justify-center gap-1.5">
        {interleave(
          links.map(({ href, name }) => (
            <FancyLink href={href} key={href} className="text-primary-9 text-shadow-color-primary-7/50">
              {name}
            </FancyLink>
          )),
          <Divider className="text-secondary-6 text-shadow-color-secondary-4/50" />
        )}
      </div>
    </div>
  </div>
)

export default NotFound
