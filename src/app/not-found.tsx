import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen p-8 pt-20">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">404 - 页面未找到</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          抱歉，您访问的页面不存在。
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          返回首页
        </Link>
      </div>
    </main>
  )
}
