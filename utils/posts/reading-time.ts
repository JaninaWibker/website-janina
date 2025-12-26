import { z } from 'zod'

export const readingTimeSchema = z
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

export type ReadingTime = z.infer<typeof readingTimeSchema>
