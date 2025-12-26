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

const readingTimeSchema = z
  .object({
    time: z.number(),
    duration: z.object({
      hours: z.number(),
      minutes: z.number(),
      seconds: z.number()
    }),
    words: z.number()
  })
  .transform((rt) => ({
    ...rt,
    // @ts-expect-error DurationFormat is missing from type definitions (https://github.com/microsoft/TypeScript/issues/60608)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    text: new Intl.DurationFormat('en', { style: 'short' }).format(rt.duration) as string
  }))

type ReadingTime = z.infer<typeof readingTimeSchema>

export type BlogPost = BaseBlogPost & {
  slug: string
  readingTime: ReadingTime
  content: MDXContent
}

const mdxImportSchema = z.object({
  default: z.unknown(),
  frontmatter: z.looseObject({}),
  readingTime: readingTimeSchema
})

export const dynamicImportAndTransformPost = async (unsanitizedFilename: string): Promise<BlogPost> => {
  const filename = path.normalize(unsanitizedFilename)
  if (filename.includes('..')) {
    throw new Error('Invalid filename, directory traversal detected')
  }

  const slug = filename.replace(/(\/page)?\.mdx$/, '')
  const maybeMdxImport = (await import(`@/blog/posts/${filename}`)) as unknown

  const mdxImport = mdxImportSchema.parse(maybeMdxImport)
  const { default: content, frontmatter: maybePost, readingTime } = mdxImport

  console.log(maybeMdxImport)

  const post = baseBlogSchema.parse(maybePost)

  return {
    slug,
    readingTime,
    content: content as MDXContent,
    ...post
  }
}

export const findAll = async () => {
  const filenamePosts = await glob('*/page.mdx', { cwd: './blog/posts' })

  const posts = await Promise.all(filenamePosts.map(dynamicImportAndTransformPost))
  return posts.sort((a, b) => +b.date - +a.date)
}
