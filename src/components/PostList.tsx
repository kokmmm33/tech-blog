import Link from 'next/link'
import { Post } from '@/types/post'
import TagsAndCategory from './TagsAndCategory'

interface Props {
  posts: Post[]
}

export default function PostList({ posts }: Props) {
  return (
    <div className="grid gap-6">
      {posts.map((post) => (
        <article
          key={post.id}
          className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-2">
            <Link href={`/posts/${post.id}`} className="hover:text-blue-500">
              {post.title}
            </Link>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {post.description}
          </p>
          <div className="flex justify-between items-center">
            <time className="text-sm text-gray-500">{post.date}</time>
            <TagsAndCategory category={post.category} tags={post.tags} />
          </div>
        </article>
      ))}
    </div>
  )
}
