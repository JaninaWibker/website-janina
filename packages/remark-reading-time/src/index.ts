import getReadingTime from 'reading-time'
import { toString } from 'mdast-util-to-string'
import type { Plugin } from 'unified'
// TODO: I hate that this has a .ts extension but nextjs is being weird about it
import { mutateTreeAddExport } from './add-export.ts'

type ReadingTime = {
  /**
   * Time in seconds
   */
  time: number
  duration: {
    hours: number
    minutes: number
    seconds: number
  }
  words: number
}

export const remarkReadingTime: Plugin = () => (tree, file) => {
  const { time: ms, words } = getReadingTime(toString(tree), { wordsPerMinute: 120 })

  const hours = Math.floor(ms / 3600000)
  const minutes = Math.floor((ms % 3600000) / 60000)
  const seconds = Math.floor((ms % 60000) / 1000)

  const duration = {
    hours,
    minutes,
    seconds
  }

  const readingTime = {
    time: ms / 1000,
    duration,
    words
  } satisfies ReadingTime

  file.data.readingTime = readingTime
}

export const remarkMdxReadingTime: Plugin = () => (tree, file) => {
  const readingTime = file.data.readingTime as ReadingTime | undefined
  if (!readingTime) return

  mutateTreeAddExport(tree, 'readingTime', readingTime)
}
