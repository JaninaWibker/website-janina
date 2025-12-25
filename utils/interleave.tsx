import { Fragment, type ReactNode } from 'react'

export const interleave = (items: ReactNode[], separator: ReactNode): ReactNode[] =>
  items.flatMap((item, index) =>
    index < items.length - 1
      ? [<Fragment key={'item-' + index}>{item}</Fragment>, <Fragment key={'separator-' + index}>{separator}</Fragment>]
      : [<Fragment key={'item-' + index}>{item}</Fragment>]
  )
