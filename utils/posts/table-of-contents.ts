import { z } from 'zod'

const tableOfContentsEntrySchema = z.object({
  value: z.string(),
  depth: z.number(),
  id: z.string().optional(),
  get children() {
    return z.array(tableOfContentsEntrySchema).optional()
  }
})

export const tableOfContentsSchema = z.array(tableOfContentsEntrySchema)

export type TableOfContentsEntry = z.infer<typeof tableOfContentsEntrySchema>
export type TableOfContents = z.infer<typeof tableOfContentsSchema>
