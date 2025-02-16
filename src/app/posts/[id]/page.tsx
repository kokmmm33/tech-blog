import { getPostById, getAllPosts } from '@/utils/posts'
import PostContent from '@/components/PostContent'
import { notFound } from 'next/navigation'

export const revalidate = 60 // 每分钟重新验证一次

// 生成所有可能的文章路径
export async function generateStaticParams() {
  const posts = await getAllPosts()
  // 确保 ID 是安全的 URL 格式
  return posts.map((post) => ({
    id: encodeURIComponent(post.id),
  }))
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = await params
  const decodedId = decodeURIComponent(resolvedParams.id)
  const post = await getPostById(decodedId)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen p-8 pt-20">
      <div className="max-w-4xl mx-auto">
        <PostContent post={post} />
      </div>
    </main>
  )
}
