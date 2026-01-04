'use client'

import type { ComponentProps } from 'react'
import { Popover as PopoverBaseUi } from '@base-ui/react/popover'
import { cn } from '@/utils/common'
import { ArrowSvg } from './Tooltip'

// TODO: fumadocs-twoslash has special handling for `onPointerEnter`, etc. such that things open on hover, but I could just use a tooltip for that?

const PopoverPopup = ({ className, ...props }: ComponentProps<typeof PopoverBaseUi.Popup> & { className?: string }) => (
  <PopoverBaseUi.Popup
    className={cn(
      'flex flex-col px-2 py-1 leading-[initial]',
      'border-2 border-secondary-8 bg-secondary-4 dark:border-secondary-7 dark:bg-secondary-3',
      className
    )}
    {...props}
  />
)

const PopoverArrow = ({ className, ...props }: ComponentProps<typeof PopoverBaseUi.Arrow> & { className?: string }) => (
  <PopoverBaseUi.Arrow
    className={cn(
      `
      flex
      data-[side=bottom]:top-[-6px] data-[side=bottom]:translate-x-[-8px] data-[side=bottom]:rotate-180
      data-[side=left]:right-[-9px] data-[side=left]:translate-y-[-3px] data-[side=left]:-rotate-90
      data-[side=right]:left-[-9px] data-[side=right]:translate-y-[-3px] data-[side=right]:rotate-90
      data-[side=top]:bottom-[-6px] data-[side=top]:translate-x-[-8px] data-[side=top]:rotate-0
    `,
      className
    )}
    {...props}
  />
)

const PopoverPositioner = (props: ComponentProps<typeof PopoverBaseUi.Positioner>) => (
  <PopoverBaseUi.Positioner sideOffset={8} alignOffset={0} arrowPadding={8} collisionPadding={2} {...props} />
)

const PopoverTitle = ({ className, ...props }: ComponentProps<typeof PopoverBaseUi.Title> & { className?: string }) => (
  <PopoverBaseUi.Title className={cn('', className)} {...props} />
)

const PopoverDescription = ({
  className,
  ...props
}: ComponentProps<typeof PopoverBaseUi.Description> & { className?: string }) => (
  <PopoverBaseUi.Description className={cn('', className)} {...props} />
)

const PopoverContent = ({
  children,
  className,
  ...props
}: ComponentProps<typeof PopoverBaseUi.Positioner> & { className?: string }) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Positioner {...props}>
      <PopoverPrimitive.Popup className={cn('max-w-96', className)}>
        <PopoverPrimitive.Arrow>
          <ArrowSvg />
        </PopoverPrimitive.Arrow>
        {children}
      </PopoverPrimitive.Popup>
    </PopoverPrimitive.Positioner>
  </PopoverPrimitive.Portal>
)

const PopoverRoot = PopoverBaseUi.Root
const PopoverTrigger = PopoverBaseUi.Trigger
const PopoverPortal = PopoverBaseUi.Portal

const PopoverPrimitive = {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Popup: PopoverPopup,
  Arrow: PopoverArrow,
  Portal: PopoverPortal,
  Positioner: PopoverPositioner,
  Title: PopoverTitle,
  Description: PopoverDescription,
  Content: PopoverContent
}

export { ArrowSvg, PopoverPrimitive, PopoverRoot, PopoverTrigger, PopoverContent }
