import { Heading1 } from '@/components/Basic'
import { HR } from '@/components/native-replacements'
import { Buttons } from '@/components/Buttons'
import IndexPageContent from './index.mdx'

const Home = () => {
  return (
    <main className="lowercase">
      <Heading1 underlined>who am i?</Heading1>
      {IndexPageContent({})}
      <HR className="my-4" />
      <Buttons />
    </main>
  )
}

export default Home
