import PostList from '@/components/PostList'
import { getAllPosts } from '@/utils/posts'

export default async function Home() {
  const posts = await getAllPosts()

  return (
    <main className="min-h-screen p-8 pt-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">我的技术博客</h1>
        <PostList posts={posts} />
      </div>
    </main>
  )
}
