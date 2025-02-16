'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import MarkdownPreview from '@/components/MarkdownPreview'
import { getAllCategories, getAllTags } from '@/utils/posts'

export default function NewPost() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    tags: '',
    content: '',
  })
  const [isPreview, setIsPreview] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const [categories, setCategories] = useState<
    { name: string; count: number; description: string }[]
  >([])
  const [tags, setTags] = useState<{ name: string; count: number }[]>([])

  useEffect(() => {
    const loadData = async () => {
      const [categoriesData, tagsData] = await Promise.all([
        getAllCategories(),
        getAllTags(),
      ])
      setCategories(categoriesData)
      setTags(tagsData)
    }
    loadData()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setError('')

    try {
      // 处理标签字符串为数组
      const tagArray = formData.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag)

      const newPost = {
        id: formData.title.toLowerCase().replace(/\s+/g, '-'),
        title: formData.title,
        description: formData.description,
        category: formData.category,
        tags: tagArray,
        content: formData.content,
        date: new Date().toISOString().split('T')[0],
      }

      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || '保存失败')
      }

      router.push(`/posts/${newPost.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : '保存文章时出错')
    } finally {
      setIsSaving(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <main className="min-h-screen p-8 pt-20">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">创建新文章</h1>
          <button
            type="button"
            onClick={() => setIsPreview(!isPreview)}
            className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600">
            {isPreview ? '编辑' : '预览'}
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg">
            {error}
          </div>
        )}

        {isPreview ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8">
            <h1 className="text-4xl font-bold mb-4">{formData.title}</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              {formData.description}
            </p>
            <MarkdownPreview content={formData.content} />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                标题
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                描述
              </label>
              <input
                type="text"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                分类
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                list="categories"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
              />
              <datalist id="categories">
                {categories.map((cat) => (
                  <option key={cat.name} value={cat.name} />
                ))}
              </datalist>
            </div>

            <div>
              <label
                htmlFor="tags"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                标签（用逗号分隔）
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="标签1, 标签2, 标签3"
                list="taglist"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
              />
              <datalist id="taglist">
                {tags.map((tag) => (
                  <option key={tag.name} value={tag.name} />
                ))}
              </datalist>
            </div>

            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                内容（支持 Markdown）
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                rows={15}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent font-mono"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                disabled={isSaving}>
                取消
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed">
                {isSaving ? '保存中...' : '发布'}
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  )
}
