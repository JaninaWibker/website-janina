import { Heading1 } from '@/components/Basic'
import { findAll } from '@/utils/blog-posts'

const allPostsPromise = findAll()

const Home = async () => {
  const posts = await allPostsPromise

  console.log('posts', posts)

  return (
    <main>
      <Heading1 underlined>things i wrote</Heading1>
      blog
    </main>
  )
}

export default Home
