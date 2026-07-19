import { formatDate } from '@/utils/format'
import { Article, H1 } from '@/components/native-replacements'
import type { BlogPost } from '@/utils/posts/schemas'

export const Post = ({ post }: { post: BlogPost }) => (
  <main>
    <header className="flex flex-col gap-4 px-4 pb-8 md:px-8">
      <div className="flex gap-2">
        <div className="text-shadow shrink-0 text-secondary-9 text-shadow-x-2 text-shadow-y-2 text-shadow-color-secondary-7/50">
          posted · {formatDate(post.date)}
        </div>
        <div className="my-auto h-0.5 grow bg-secondary-6"></div>
        <div className="text-shadow shrink-0 text-secondary-9 text-shadow-x-2 text-shadow-y-2 text-shadow-color-secondary-7/50">
          reading time · {post.readingTime.text}
        </div>
      </div>
      <H1 className="mt-0">{post.title}</H1>
    </header>

    <Article className="px-4 md:px-8">{post.content({})}</Article>
  </main>
)
