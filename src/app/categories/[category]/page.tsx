import { getPostsByCategory, getAllCategories } from '@/utils/posts'
import PostList from '@/components/PostList'

export const revalidate = 60 // 每分钟重新验证一次

// 生成所有可能的分类路径
export async function generateStaticParams() {
  const categories = await getAllCategories()
  return categories.map((category) => ({
    category: category.name,
  }))
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  const decodedCategory = decodeURIComponent(category)
  const posts = await getPostsByCategory(decodedCategory)

  return (
    <main className="min-h-screen p-8 pt-20">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{decodedCategory}</h1>
          <p className="text-gray-600 dark:text-gray-300">
            共 {posts.length} 篇文章
          </p>
        </div>

        <PostList posts={posts} />
      </div>
    </main>
  )
}
