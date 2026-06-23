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
    // if rounding results in 0 minutes, the information of which unit is supposed to be the smallest is lost, as all units are set to 0
    // because of this, DurationFormat#format can't know that we want "0 min" as the output and instead returns an empty string
    const text = new Intl.DurationFormat('en', { style: 'short' }).format(roundedDuration) || '0 min'
    return { ...rt, text }
  })

export type ReadingTime = z.infer<typeof readingTimeSchema>
