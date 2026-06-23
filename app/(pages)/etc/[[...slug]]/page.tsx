import { notFound } from 'next/navigation'
import { findAllEtc } from '@/utils/posts/posts'
import { PostPage, IndexPage } from './post'

type Params = Promise<{ slug: string[] }>

// disallow all dynamic parameters which aren't returned from generateStaticParams
export const dynamicParams = false

const computeStaticPostData = async () => {
  const posts = await findAllEtc()
  const postsByKey = Object.fromEntries(posts.map((post) => [post.slug, post]))
  return { posts, postsByKey }
}

const staticPostData = computeStaticPostData()

export const generateStaticParams = async () => {
  const { posts } = await staticPostData
  const slugs = posts.map(({ slug }) => ({ slug: slug.split('/') }))

  return [...slugs, { slug: undefined }]
}

// Temporarily disable rendering of this whole sub-tree, until there is enough content to justify enabling it
const Page = () => notFound()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PageDeactivated = async ({ params }: { params: Params }) => {
  const { slug } = await params
  const { posts, postsByKey } = await staticPostData

  if (!slug || slug.length === 0) {
    return <IndexPage all={posts} />
  }

  const post = postsByKey[decodeURI(slug.join('/'))]

  if (!post) {
    return notFound()
  }

  return <PostPage post={post} all={posts} />
}

export default Page
