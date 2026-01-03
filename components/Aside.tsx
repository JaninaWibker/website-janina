import type { PropsWithChildren } from 'react'

// TODO: this is a super rough "temporary" implementation that sort of works
// TODO: I tried both react contexts and filtering over children, but both were really hacky or did not work well with SSR
// TODO: I also tried using a content prop instead of a AsideContent component, but turns out there is no MDX parsing (only JSX parsing)
// TODO: for props in MDX files, so that solution wouldn't have worked either

// TODO: text-[14px] actually looks fine, not sure why that works so well even though it isn't integer scaling
const AsideRoot = ({ children }: PropsWithChildren) => <div className="relative w-full">{children}</div>
const AsideTrigger = ({ children }: PropsWithChildren) => <div className="w-full">{children}</div>
const AsideContent = ({ children }: PropsWithChildren) => (
  <div className="absolute right-0 top-0 h-full">
    <div className="absolute -right-44 w-36 text-[14px]">{children}</div>
  </div>
)

const Aside = {
  Root: AsideRoot,
  Trigger: AsideTrigger,
  Content: AsideContent
}

export { Aside, AsideRoot, AsideTrigger, AsideContent }
