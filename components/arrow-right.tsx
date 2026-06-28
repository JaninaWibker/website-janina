import type { ComponentProps } from 'react'

// pixelarticons v2 changed the arrow to be "filled in". this is the old one, but properly wrapped in a react component
export const ArrowRightIcon = (props: ComponentProps<'svg'>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24" {...props}>
    <path d="M4 11v2h12v2h2v-2h2v-2h-2V9h-2v2H4zm10-4h2v2h-2V7zm0 0h-2V5h2v2zm0 10h2v-2h-2v2zm0 0h-2v2h2v-2z" />
  </svg>
)
