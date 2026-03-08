import type { PropsWithChildren } from 'react'

// TODO: this is a super rough "temporary" implementation that sort of works
// TODO: I tried both react contexts and filtering over children, but both were really hacky or did not work well with SSR
// TODO: I also tried using a content prop instead of a AsideContent component, but turns out there is no MDX parsing (only JSX parsing)
// TODO: for props in MDX files, so that solution wouldn't have worked either

// TODO: text-[14px] actually looks fine, not sure why that works so well even though it isn't integer scaling
const AsideRoot = ({ children }: PropsWithChildren) => <div className="relative w-full">{children}</div>
const AsideTrigger = ({ children }: PropsWithChildren) => <div className="w-full">{children}</div>
const AsideContent = ({ children }: PropsWithChildren) => (
  <div className="relative right-0 top-0 h-full lg:absolute">
    <div className="my-2 border-b border-t border-secondary-6 px-2 py-1 text-[14px] lg:absolute lg:-right-44 lg:m-0 lg:w-36 lg:border-none lg:p-0">
      {children}
    </div>
  </div>
)

const Aside = {
  Root: AsideRoot,
  Trigger: AsideTrigger,
  Content: AsideContent
}

export { Aside, AsideRoot, AsideTrigger, AsideContent }
