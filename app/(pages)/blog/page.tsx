import { Heading1 } from '@/components/Basic'
import { PostPreview } from '@/components/PostPreview'
import { findAllBlog } from '@/utils/posts/posts'

const allPostsPromise = findAllBlog()

const Home = async () => {
  const posts = await allPostsPromise

  return (
    <main>
      <Heading1 underlined>things i wrote</Heading1>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-16">
        {posts.length === 0 && <div>no posts yet, come back later!</div>}
        {posts.map((post) => (
          <PostPreview key={post.slug} post={post} />
        ))}
      </div>
    </main>
  )
}

export default Home
