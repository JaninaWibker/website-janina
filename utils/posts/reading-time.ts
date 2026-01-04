import { z } from 'zod'
import { Temporal, toTemporalInstant } from '@js-temporal/polyfill'

// @ts-expect-error polyfill code adding methods which aren't available yet correctly results in a type error
Date.prototype.toTemporalInstant = toTemporalInstant

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
  .transform((rt) => {
    const duration = Temporal.Duration.from(rt.duration)
    const roundedDuration = duration.round({ smallestUnit: 'minute' })
    // @ts-expect-error DurationFormat is missing from type definitions (https://github.com/microsoft/TypeScript/issues/60608)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const text = new Intl.DurationFormat('en', { style: 'short' }).format(roundedDuration) as string
    return { ...rt, text }
  })

export type ReadingTime = z.infer<typeof readingTimeSchema>
