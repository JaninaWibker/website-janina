import { findAll, dynamicImportAndTransformPost } from '@/utils/blog-posts'

export const generateStaticParams = async () => findAll().then((posts) => posts.map(({ slug }) => ({ slug })))

// disallow all dynamic parameters which aren't returned from generateStaticParams
export const dynamicParams = false

const PostPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params
  const post = await dynamicImportAndTransformPost(`${slug}/page.mdx`)
  return <>{post.content({})}</>
}

export default PostPage
