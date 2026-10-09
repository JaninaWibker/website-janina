import { Heading1 } from '@/components/Basic'
import IndexPageContent from './index.mdx'

const Home = () => {
  return (
    <main className="lowercase">
      <Heading1 underlined>who am i?</Heading1>
      {IndexPageContent({})}
    </main>
  )
}

export default Home
