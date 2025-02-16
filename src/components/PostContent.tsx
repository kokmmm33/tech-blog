'use client'

import { Post } from '@/types/post'
import TagsAndCategory from './TagsAndCategory'
import MarkdownPreview from './MarkdownPreview'

interface Props {
  post: Post
}

export default function PostContent({ post }: Props) {
  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
          <time>{post.date}</time>
          <TagsAndCategory category={post.category} tags={post.tags} />
        </div>
      </header>

      <div className="prose dark:prose-invert max-w-none">
        <MarkdownPreview content={post.content} />
      </div>
    </article>
  )
}
