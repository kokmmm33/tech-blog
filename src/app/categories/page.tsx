import Link from 'next/link'
import { getAllCategories } from '@/utils/posts'

export const revalidate = 60 // 每分钟重新验证一次

export default async function Categories() {
  const categories = await getAllCategories()

  return (
    <main className="min-h-screen p-8 pt-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">文章分类</h1>

        <div className="grid gap-6">
          {categories.map((category) => (
            <div
              key={category.name}
              className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
              <Link
                href={`/categories/${encodeURIComponent(category.name)}`}
                className="text-2xl font-semibold hover:text-blue-500">
                {category.name}
              </Link>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {category.description}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {category.count} 篇文章
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
