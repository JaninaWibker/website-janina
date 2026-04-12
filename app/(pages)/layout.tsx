import type { ReactNode } from 'react'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

const PageLayout = ({ children }: { children: ReactNode }) => (
  <>
    <Header />
    <div className="mx-auto max-w-[780px] px-4 pt-4">
      {children}
      <Footer />
    </div>
  </>
)

export default PageLayout
