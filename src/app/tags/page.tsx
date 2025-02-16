import Link from 'next/link'
import { getAllTags } from '@/utils/posts'

export const revalidate = 60 // 每分钟重新验证一次

export default async function Tags() {
  const tags = await getAllTags()

  return (
    <main className="min-h-screen p-8 pt-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">标签云</h1>

        <div className="flex flex-wrap gap-4">
          {tags.map((tag) => (
            <Link
              key={tag.name}
              href={`/tags/${encodeURIComponent(tag.name)}`}
              className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow hover:bg-gray-50 dark:hover:bg-gray-700">
              <span className="font-medium">{tag.name}</span>
              <span className="ml-2 text-sm text-gray-500">({tag.count})</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
