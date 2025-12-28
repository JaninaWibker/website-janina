import { Heading1 } from '@/components/Basic'
import { findAll } from '@/utils/posts/blog-posts'

const allPostsPromise = findAll()

const Home = async () => {
  const posts = await allPostsPromise

  console.log('posts', posts)

  return (
    <main>
      <Heading1 underlined>things i wrote</Heading1>
    </main>
  )
}

export default Home
