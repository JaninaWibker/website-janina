import type { Metadata } from 'next'
import { findAll } from '@/utils/posts/blog-posts'
import { notFound } from 'next/navigation'
import { formatDate } from '@/utils/format'
import { H1 } from '@/components/native-replacements'

type Params = Promise<{ slug: string }>

// disallow all dynamic parameters which aren't returned from generateStaticParams
export const dynamicParams = false

const computeStaticBlogData = async () => {
  const posts = await findAll()

  const postsByKey = Object.fromEntries(posts.map((post) => [post.slug, post]))

  const metadata = Object.fromEntries(
    posts.map((post) => {
      const title = `${post.title} - janina's blog`
      const description = post.description
      const metadata = {
        title,
        description,
        openGraph: { title, description, type: 'article' }
      } satisfies Metadata
      return [post.slug, metadata]
    })
  )

  return { posts, postsByKey, metadata }
}

const staticBlogData = computeStaticBlogData()

export const generateStaticParams = async () => {
  const { posts } = await staticBlogData
  return posts.map(({ slug }) => ({ slug }))
}

export const generateMetadata = async ({ params }: { params: Params }) => {
  const { slug } = await params
  const { postsByKey, metadata: allMetadata } = await staticBlogData

  const post = postsByKey[slug]
  const metadata = allMetadata[slug]

  if (!metadata) return {}
  if (!post) return {}

  return metadata satisfies Metadata
}

const PostPage = async ({ params }: { params: Params }) => {
  const { slug } = await params

  const { postsByKey } = await staticBlogData
  const post = postsByKey[slug]

  if (!post) {
    return notFound()
  }


  return (
    <main>
      <header className="flex flex-col gap-4 px-8 pb-8">
        <div className="flex gap-2">
          <div className="text-shadow shrink-0 text-secondary-9 text-shadow-x-2 text-shadow-y-2 text-shadow-color-secondary-7/50">
            posted · {formatDate(post.date)}
          </div>
          <div className="my-auto h-0.5 grow bg-secondary-6"></div>
          <div className="text-shadow shrink-0 text-secondary-9 text-shadow-x-2 text-shadow-y-2 text-shadow-color-secondary-7/50">
            reading time · {post.readingTime.text}
          </div>
        </div>
        <H1>{post.title}</H1>
      </header>

      <article className="px-8">{post.content({})}</article>
    </main>
  )
}

export default PostPage
