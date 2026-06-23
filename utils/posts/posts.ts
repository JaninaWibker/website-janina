import { glob } from 'fast-glob'
import path from 'node:path'
import type { MDXContent } from 'mdx/types'
import { mdxImportBlogSchema, mdxImportEtcSchema, type BlogPost, type EtcPost } from './schemas'

const validate = (unsanitizedFilename: string) => {
  const filename = path.normalize(unsanitizedFilename)
  if (filename.includes('..')) {
    throw new Error('Invalid filename, directory traversal detected')
  }

  const slug = filename.replace(/(\/page)?\.mdx$/, '')

  return { filename, slug }
}

const dynamicImportAndTransformBlogPost = async (unsanitizedFilename: string): Promise<BlogPost> => {
  const { filename, slug } = validate(unsanitizedFilename)
  const maybeMdxImport = (await import(`@/posts/blog/${filename}`)) as unknown

  const mdxImport = mdxImportBlogSchema.parse(maybeMdxImport)
  const { default: content, frontmatter: post, readingTime, tableOfContents } = mdxImport

  return {
    slug,
    readingTime,
    tableOfContents,
    content: content as MDXContent,
    ...post
  }
}

const dynamicImportAndTransformEtcPost = async (unsanitizedFilename: string): Promise<EtcPost> => {
  const { filename, slug } = validate(unsanitizedFilename)
  const maybeMdxImport = (await import(`@/posts/etc/${filename}`)) as unknown

  const mdxImport = mdxImportEtcSchema.parse(maybeMdxImport)
  const { default: content, frontmatter: post } = mdxImport

  return {
    slug,
    content: content as MDXContent,
    ...post
  }
}

export const findAllBlog = async () => {
  // NOTE: this uses the format `/posts/blog/<slug>/page.mdx`
  const filenamePosts = await glob('*/page.mdx', { cwd: './posts/blog' })

  const posts = await Promise.all(filenamePosts.map(dynamicImportAndTransformBlogPost))
  return posts.filter(({ hidden }) => !hidden).toSorted((a, b) => +b.date - +a.date)
}

export const findAllEtc = async () => {
  // NOTE: this uses the format `/posts/etc/<folder>+/<slug>.mdx`, differing from the format used for blog posts
  const filenamePosts = await glob('*/*.mdx', { cwd: './posts/etc' })

  const posts = await Promise.all(filenamePosts.map(dynamicImportAndTransformEtcPost))

  // NOTE: ordering based first and foremost on folder name, then on specified ordering in the frontmatter of the post
  return posts
    .filter(({ hidden }) => !hidden)
    .toSorted((a, b) => {
      const ord = path.dirname(a.slug).localeCompare(path.dirname(b.slug))
      return ord === 0 ? a.ordering - b.ordering : ord
    })
}
