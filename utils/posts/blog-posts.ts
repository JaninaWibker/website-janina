import { glob } from 'fast-glob'
import { z } from 'zod'
import path from 'node:path'
import type { MDXContent } from 'mdx/types'
import { type ReadingTime, readingTimeSchema } from './reading-time'
import { type TableOfContents, tableOfContentsSchema } from './table-of-contents'

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
  readingTime: ReadingTime
  tableOfContents: TableOfContents
  content: MDXContent
}

const mdxImportSchema = z.object({
  default: z.unknown(),
  frontmatter: baseBlogSchema,
  readingTime: readingTimeSchema,
  tableOfContents: tableOfContentsSchema
})

export const dynamicImportAndTransformPost = async (unsanitizedFilename: string): Promise<BlogPost> => {
  const filename = path.normalize(unsanitizedFilename)
  if (filename.includes('..')) {
    throw new Error('Invalid filename, directory traversal detected')
  }

  const slug = filename.replace(/(\/page)?\.mdx$/, '')
  const maybeMdxImport = (await import(`@/blog/posts/${filename}`)) as unknown

  const mdxImport = mdxImportSchema.parse(maybeMdxImport)
  const { default: content, frontmatter: post, readingTime, tableOfContents } = mdxImport

  return {
    slug,
    readingTime,
    tableOfContents,
    content: content as MDXContent,
    ...post
  }
}

export const findAll = async () => {
  const filenamePosts = await glob('*/page.mdx', { cwd: './blog/posts' })

  const posts = await Promise.all(filenamePosts.map(dynamicImportAndTransformPost))
  return posts.sort((a, b) => +b.date - +a.date)
}
