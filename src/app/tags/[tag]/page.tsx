import { getPostsByTag, getAllTags } from '@/utils/posts'
import PostList from '@/components/PostList'

export const revalidate = 60 // 每分钟重新验证一次

// 生成所有可能的标签路径
export async function generateStaticParams() {
  const tags = await getAllTags()
  return tags.map((tag) => ({
    tag: tag.name,
  }))
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>
}) {
  const resolvedParams = await params
  const decodedTag = decodeURIComponent(resolvedParams.tag)
  const posts = await getPostsByTag(decodedTag)

  return (
    <main className="min-h-screen p-8 pt-20">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">标签：{decodedTag}</h1>
          <p className="text-gray-600 dark:text-gray-300">
            共 {posts.length} 篇文章
          </p>
        </div>

        <PostList posts={posts} />
      </div>
    </main>
  )
}
