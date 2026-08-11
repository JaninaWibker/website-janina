import type { PropsWithChildren, ReactNode } from 'react'
import NextLink from 'next/link'
import { ArrowRightIcon } from '@/components/arrow-right'
import { Article, H1, HR, Strong } from '@/components/native-replacements'
import type { EtcPost } from '@/utils/posts/schemas'
import { Buttons } from '@/components/Buttons'
import { cn } from '@/utils/common'
import IndexPageContent from './index.mdx'

type Folder = {
  slug: string
  name: string
  sub: Folder[]
}

const folders = [
  { slug: 'brainy-bits', name: 'Brainy Bits', sub: [] },
  { slug: 'daily-bytes', name: 'Daily Bytes', sub: [] },
  { slug: 'infra', name: 'Infra, Tech', sub: [] }
] satisfies Folder[]

type ListProps = {
  all: EtcPost[]
  current: string[] | undefined
}

type WrapperProps = PropsWithChildren<{ header?: ReactNode } & ListProps>

const ListItem = ({ post, active }: { post: EtcPost; active: boolean }) => (
  <li>
    <NextLink
      href={`/etc/${post.slug}`}
      className={cn(
        'group my-1 inline-flex leading-4',
        'hover:text-secondary-4',
        'data-[active="true"]:text-secondary-9'
      )}
      data-active={active}
    >
      <div className="group-hover:bg-secondary-12 group-data-[active='true']:bg-secondary-12">
        {active ? (
          <ArrowRightIcon className="-mt-[1.5px] mr-1 inline size-4" />
        ) : (
          <div className="mr-1 inline-block size-4 pl-1">{'•'}</div>
        )}
      </div>
      <div>
        <span className="group-hover:bg-secondary-12 group-data-[active='true']:bg-secondary-12">{post.title}</span>
      </div>
    </NextLink>
  </li>
)

const List = ({ current, all }: ListProps) => {
  const foldersWithPosts = folders.map((folder) => ({
    ...folder,
    posts: all.filter((post) => post.slug.startsWith(folder.slug))
  }))

  return (
    <nav className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-x-8 gap-y-6 lowercase sm:gap-x-12 sm:gap-y-8">
      {foldersWithPosts.map(({ slug, name, posts }) => (
        <div key={slug} className="">
          <Strong>{name}</Strong>
          <ul>
            {posts.length === 0 && <li className="italic text-secondary-12">(empty)</li>}
            {posts.map((post) => (
              <ListItem key={post.slug} post={post} active={current?.join('/') === post.slug} />
            ))}
          </ul>
        </div>
      ))}
    </nav>
  )
}

const Wrapper = ({ children, header, ...listProps }: WrapperProps) => (
  <main>
    <header className="flex flex-col gap-4 px-4 pb-8 md:px-8">
      <List {...listProps} />

      {header && (
        <>
          <HR className="-mx-4 md:-mx-8" />
          <H1 className="mb-0 mt-0">{header}</H1>
        </>
      )}
    </header>

    <Article className="px-4 pb-4 md:px-8">{children}</Article>

    <HR className="my-4" />
    <Buttons />
  </main>
)

export const PostPage = ({ post, ...listProps }: { post: EtcPost } & Omit<ListProps, 'current'>) => (
  <Wrapper current={post.slug.split('/')} header={post.title} {...listProps}>
    {post.content({})}
  </Wrapper>
)

export const IndexPage = (listProps: Omit<ListProps, 'current'>) => (
  <Wrapper header="Etc" current={undefined} {...listProps}>
    {IndexPageContent({})}
  </Wrapper>
)
