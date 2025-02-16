'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import MarkdownPreview from '@/components/MarkdownPreview'
import { getAllCategories, getAllTags, getPostById } from '@/utils/posts'

export default function EditPost({
  params: { id }, // 直接解构，不使用 use
}: {
  params: { id: string }
}) {
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
  const [isDeleting, setIsDeleting] = useState(false)
  const [categories, setCategories] = useState<
    { name: string; count: number; description: string }[]
  >([])
  const [tags, setTags] = useState<{ name: string; count: number }[]>([])

  useEffect(() => {
    const loadData = async () => {
      try {
        // 获取文章数据
        const response = await fetch(`${baseUrl}/api/posts?id=${id}`)
        if (!response.ok) {
          throw new Error('文章不存在')
        }
        const post = await response.json()

        // 设置表单数据
        setFormData({
          title: post.title,
          description: post.description,
          category: post.category,
          tags: post.tags.join(', '),
          content: post.content,
        })

        // 获取分类和标签数据
        const [categoriesData, tagsData] = await Promise.all([
          getAllCategories(),
          getAllTags(),
        ])
        setCategories(categoriesData)
        setTags(tagsData)
      } catch (err) {
        console.error('加载数据失败:', err)
        setError('加载数据失败')
        router.push('/404')
      }
    }

    loadData()
  }, [id, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setError('')

    try {
      const tagArray = formData.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag)

      const updatedPost = {
        id,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        tags: tagArray,
        content: formData.content,
        date: new Date().toISOString().split('T')[0],
      }

      const response = await fetch(`${baseUrl}/api/posts`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPost),
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || '保存失败')
      }

      router.push(`/posts/${id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : '保存文章时出错')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('确定要删除这篇文章吗？此操作不可恢复。')) {
      return
    }

    setIsDeleting(true)
    setError('')

    try {
      const response = await fetch(`${baseUrl}/api/posts?id=${id}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || '删除失败')
      }

      router.push('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : '删除文章时出错')
      setIsDeleting(false)
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
          <h1 className="text-4xl font-bold">编辑文章</h1>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setIsPreview(!isPreview)}
              className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600">
              {isPreview ? '编辑' : '预览'}
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className="px-4 py-2 rounded-lg bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed">
              {isDeleting ? '删除中...' : '删除'}
            </button>
          </div>
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
            {/* 表单字段与创建页面相同 */}
            {/* ... */}

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                disabled={isSaving || isDeleting}>
                取消
              </button>
              <button
                type="submit"
                disabled={isSaving || isDeleting}
                className="px-6 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed">
                {isSaving ? '保存中...' : '保存'}
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  )
}
