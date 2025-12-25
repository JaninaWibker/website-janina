import type { ReactNode } from 'react'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

const PageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <div className="mx-auto max-w-[820px]">
        {children}
        <Footer />
      </div>
    </>
  )
}

export default PageLayout
