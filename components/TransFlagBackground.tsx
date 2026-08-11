import type { PropsWithChildren } from 'react'

export const TransFlagBackground = ({ children }: PropsWithChildren) => (
  <span className="trans-gradient-stops bg-gradient-to-l dark:bg-clip-text dark:text-black/0">{children}</span>
)
