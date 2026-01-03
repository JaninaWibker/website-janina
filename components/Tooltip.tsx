'use client'

import type { ReactNode, ComponentProps, PropsWithChildren } from 'react'
import { Tooltip as TooltipBaseUi } from '@base-ui/react/tooltip'
import { cn } from '@/utils/common'

const ArrowSvg = (props: ComponentProps<'svg'>) => (
  <svg width="14" height="8" viewBox="0 0 14 8" fill="none" {...props}>
    <path d="M12 2V4H10V6H8V8H6V6H4V4H2V2H0V0H14V2H12Z" className="fill-secondary-4 dark:fill-secondary-3" />
    <path
      d="M6 6H8V4H10V6H8V8H6V6H4V4H6V6ZM2 2V4H4V2H2ZM2 2V0H0V2H2ZM12 2V4H10V2H12ZM12 2V0H14V2H12Z"
      className="fill-secondary-8 dark:fill-secondary-7"
    />
  </svg>
)

const TooltipPopup = ({ className, ...props }: ComponentProps<typeof TooltipBaseUi.Popup> & { className?: string }) => (
  <TooltipBaseUi.Popup
    className={cn(
      'flex flex-col px-2 py-1 leading-[initial]',
      'border-2 border-secondary-8 bg-secondary-4 dark:border-secondary-7 dark:bg-secondary-3',
      className
    )}
    {...props}
  />
)

const TooltipArrow = ({ className, ...props }: ComponentProps<typeof TooltipBaseUi.Arrow> & { className?: string }) => (
  <TooltipBaseUi.Arrow
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

const TooltipRoot = TooltipBaseUi.Root
const TooltipTrigger = TooltipBaseUi.Trigger
const TooltipPortal = TooltipBaseUi.Portal
const TooltipPositioner = TooltipBaseUi.Positioner
const TooltipProvider = TooltipBaseUi.Provider

const TooltipPrimitive = {
  Root: TooltipRoot,
  Trigger: TooltipTrigger,
  Popup: TooltipPopup,
  Arrow: TooltipArrow,
  Portal: TooltipPortal,
  Positioner: TooltipPositioner,
  Provider: TooltipProvider
}

type PassthroughProps = Pick<ComponentProps<typeof TooltipBaseUi.Positioner>, 'side' | 'align'>

type BaseTooltipProps = PropsWithChildren<
  {
    content: ReactNode
    className?: string
    arrow?: boolean
    disableHoverableContent?: boolean
    visible?: boolean
  } & PassthroughProps
>

const Tooltip = ({
  children,
  content,
  arrow = false,
  side,
  disableHoverableContent = false,
  visible = true,
  className
}: BaseTooltipProps) =>
  visible ? (
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal className={disableHoverableContent ? 'pointer-events-none' : undefined}>
        <TooltipPrimitive.Positioner side={side} sideOffset={8} alignOffset={0} arrowPadding={8} collisionPadding={2}>
          <TooltipPrimitive.Popup className={className}>
            {arrow && (
              <TooltipPrimitive.Arrow>
                <ArrowSvg />
              </TooltipPrimitive.Arrow>
            )}
            {content}
            <TooltipPrimitive.Arrow />
          </TooltipPrimitive.Popup>
        </TooltipPrimitive.Positioner>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  ) : (
    children
  )

export { Tooltip, TooltipProvider, TooltipPrimitive }
