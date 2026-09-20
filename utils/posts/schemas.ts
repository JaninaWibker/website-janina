import { z } from 'zod'
import { readingTimeSchema, type ReadingTime } from './reading-time'
import { tableOfContentsSchema, type TableOfContents } from './table-of-contents'
import type { MDXContent } from 'mdx/types'

const baseEtcPostSchema = z.object({
  title: z.string(),
  ordering: z.coerce.number(),
  hidden: z.boolean().optional().default(false)
})

const baseBlogPostSchema = z.object({
  title: z.string(),
  description: z.string(),
  /**
   * Initial publish date with timezone information
   * Later updates aren't really a concern right now, but might be added in the future
   *
   * Minute, second and millisecond information is automatically stripped to preserve privacy
   */
  date: z.iso.datetime({ offset: true }).transform((str) => {
    const date = new Date(str)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)
    return date
  }),
  keywords: z
    .array(z.string())
    .optional()
    .transform((arr) => arr ?? []),
  /**
   * Hide a blog post from being listed and viewed normally
   *
   * Idea behind this is that "demo-post-123" which is useful for development and testing can be hidden
   * from normal view, but won't get out-of-sync with other changes and is still tracked in the repo
   */
  hidden: z.boolean().optional().default(false)
})

type BaseBlogPost = z.infer<typeof baseBlogPostSchema>
type BaseEtcPost = z.infer<typeof baseEtcPostSchema>

export const mdxImportBlogSchema = z.object({
  default: z.unknown(),
  frontmatter: baseBlogPostSchema,
  readingTime: readingTimeSchema,
  tableOfContents: tableOfContentsSchema
})

export const mdxImportEtcSchema = z.object({
  default: z.unknown(),
  frontmatter: baseEtcPostSchema
})

export type BlogPost = BaseBlogPost & {
  slug: string
  readingTime: ReadingTime
  tableOfContents: TableOfContents
  content: MDXContent
}

export type EtcPost = BaseEtcPost & {
  slug: string
  content: MDXContent
}
