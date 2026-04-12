import { ArrowRight as ArrowRightIcon } from '@/components/arrow-right'
import { cn } from '@/utils/common'
import { formatDate } from '@/utils/format'
import type { BlogPost } from '@/utils/posts/blog-posts'

export const PostPreview = ({ post }: { post: BlogPost }) => (
  <a href={`/blog/${post.slug}`} className="no-underline">
    <div key={post.slug} className="group flex h-full flex-col justify-between gap-4">
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <div className="text-shadow shrink-0 text-secondary-11 text-shadow-x-2 text-shadow-y-2 text-shadow-color-secondary-9/50">
            {formatDate(post.date)}
          </div>
          <div className="my-auto h-0.5 grow bg-secondary-6"></div>
          <div className="text-shadow shrink-0 text-secondary-11 text-shadow-x-2 text-shadow-y-2 text-shadow-color-secondary-9/50">
            {post.readingTime.text} read
          </div>
        </div>
        <div className="text-shadow line-clamp-2 text-[24px] leading-[initial] text-shadow-x-2 text-shadow-y-2 text-shadow-color-secondary-7/50">
          {post.title}
        </div>
        <div className="line-clamp-3 text-secondary-11">{post.description}</div>
      </div>
      <div
        className={cn(
          'flex items-center justify-end gap-1 leading-[initial]',
          'text-shadow underline-offset-[3px] text-shadow-x-2 text-shadow-y-2 text-shadow-color-secondary-9/50 group-hover:text-shadow-x-1 group-hover:text-shadow-y-1',
          'group-hover:text-secondary-11 group-hover:underline'
        )}
      >
        Read <ArrowRightIcon viewBox="0 0 24 24" className="inline size-5 [&>*]:fill-current" />
      </div>
    </div>
  </a>
)
