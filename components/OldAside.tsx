import { createContext, useContext, useEffect, useState, Children, type PropsWithChildren, type ReactNode } from 'react'

const AsideContext = createContext<[ReactNode, (node: ReactNode) => void] | undefined>(undefined)

const Aside1Root = ({ children }: PropsWithChildren) => {
  const [node, setNode] = useState<ReactNode>(null)
  return <AsideContext.Provider value={[node, setNode] as const}>{children}</AsideContext.Provider>
}

const Aside1Trigger = ({ children }: PropsWithChildren) => {
  const context = useContext(AsideContext)
  if (context === undefined) {
    throw new Error('AsideTrigger must be used within an Aside component')
  }
  const [node] = context
  return <Aside trigger={children} content={node} />
}

const Aside1Content = ({ children }: PropsWithChildren) => {
  const context = useContext(AsideContext)
  if (context === undefined) {
    throw new Error('AsideContent must be used within an Aside component')
  }
  const [, setNode] = context
  useEffect(() => {
    setNode(children)
  }, [setNode, children])

  return undefined
}

const Aside1 = {
  Root: Aside1Root,
  Trigger: Aside1Trigger,
  Content: Aside1Content
}

export { Aside1, Aside1Root, Aside1Trigger, Aside1Content }

const Aside2Root = ({ children }: PropsWithChildren) => {
  const trigger = Children.toArray(children).find(
    // @ts-expect-error debug
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    (child) => typeof child === 'object' && 'type' in child && child.type._payload.value[2] === 'Aside2Trigger'
  )
  const content = Children.toArray(children).find(
    // @ts-expect-error debug
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    (child) => typeof child === 'object' && 'type' in child && child.type._payload.value[2] === 'Aside2Content'
  )

  // console.log(Children.toArray(children))

  return <Aside trigger={trigger} content={content} />
}

const Aside2Trigger = ({ children }: PropsWithChildren) => children
const Aside2Content = ({ children }: PropsWithChildren) => children

Aside2Trigger.displayName = 'AsideTrigger'
Aside2Content.displayName = 'AsideContent'

const Aside2 = {
  Root: Aside2Root,
  Trigger: Aside2Trigger,
  Content: Aside2Content
}

export { Aside2, Aside2Root, Aside2Trigger, Aside2Content }

const Aside = ({ trigger, content }: { trigger: ReactNode; content: ReactNode }) => {
  return (
    <div className="relative w-full">
      <div className="w-full">{trigger}</div>
      <div className="absolute right-0 top-0 h-full">
        <div className="absolute right-[-100px] w-[100px]">{content}</div>
      </div>
    </div>
  )
}
