import { glob } from 'fast-glob'
import { z } from 'zod'
import path from 'node:path'
import type { MDXContent } from 'mdx/types'

const baseBlogSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.iso.datetime({ offset: true }).transform((str) => {
    const date = new Date(str)
    // remove minutes, seconds and milliseconds for privacy
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)
    return date
  }),
  keywords: z
    .array(z.string())
    .optional()
    .transform((arr) => arr ?? []),
  // TODO: strategies for handling images here?
  bannerImage: z.string().optional()
})

type BaseBlogPost = z.infer<typeof baseBlogSchema>

export type BlogPost = BaseBlogPost & {
  slug: string
  readingTimeMinutes?: number
  content: MDXContent
}

const mdxImportSchema = z.object({
  default: z.unknown(),
  frontmatter: z.looseObject({})
})

export const dynamicImportAndTransformPost = async (unsanitizedFilename: string): Promise<BlogPost> => {
  const filename = path.normalize(unsanitizedFilename)
  if (filename.includes('..')) {
    throw new Error('Invalid filename, directory traversal detected')
  }
  const slug = filename.replace(/(\/page)?\.mdx$/, '')

  // TODO: will this just pass through mdx plugins, or does this happen later?
  // TODO: if yes, can do reading time here too
  const maybeMdxImport = (await import(`@/blog/posts/${filename}`)) as unknown

  const mdxImport = mdxImportSchema.parse(maybeMdxImport)
  const { default: content, frontmatter: maybePost } = mdxImport

  const post = baseBlogSchema.parse(maybePost)

  const readingTimeMinutes = 0

  console.log('wondering if this is just rerun all the time')

  return {
    slug,
    readingTimeMinutes,
    // TODO: not sure if this is a correct type assertion here
    content: content as MDXContent,
    ...post
  }
}

export const findAll = async () => {
  const filenamePosts = await glob('*/page.mdx', { cwd: './blog/posts' })

  const posts = await Promise.all(filenamePosts.map(dynamicImportAndTransformPost))
  return posts.sort((a, b) => +b.date - +a.date)
}
