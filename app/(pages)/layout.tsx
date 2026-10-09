import type { ReactNode } from 'react'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { HR } from '@/components/native-replacements'
import { Buttons } from '@/components/Buttons'

const PageLayout = ({ children }: { children: ReactNode }) => (
  <>
    <Header />
    <div className="mx-auto max-w-[780px] px-4 pt-4">
      {children}
      <HR className="my-4" />
      <Buttons />
      <Footer />
    </div>
  </>
)

export default PageLayout
