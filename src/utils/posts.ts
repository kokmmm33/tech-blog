import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Post } from '@/types/post'

const postsDirectory = path.join(process.cwd(), 'posts')

// 从文件名生成安全的 ID
function generateSafeId(fileName: string): string {
  return fileName
    .replace(/\.md$/, '') // 移除 .md 扩展名
    .replace(/\s+/g, '-') // 将空格替换为连字符
    .toLowerCase() // 转换为小写
}

// 从文件系统读取所有文章
export async function getAllPosts(): Promise<Post[]> {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const posts = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const id = generateSafeId(fileName)
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      const tags = Array.isArray(data.tags) ? data.tags :
        typeof data.tags === 'string' ? [data.tags] :
          []

      return {
        id,
        title: data.title || '',
        description: data.description || '',
        date: data.date || new Date().toISOString().split('T')[0],
        category: data.category || '未分类',
        tags: tags,
        content: content,
      }
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1))

  return posts
}

// 从文件系统读取单篇文章
export async function getPostById(id: string): Promise<Post | undefined> {
  try {
    // 查找匹配的文件
    const fileNames = fs.readdirSync(postsDirectory)
    const fileName = fileNames.find(
      name => generateSafeId(name) === id.toLowerCase()
    )

    if (!fileName) {
      return undefined
    }

    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    const tags = Array.isArray(data.tags) ? data.tags :
      typeof data.tags === 'string' ? [data.tags] :
        []

    return {
      id,
      title: data.title || '',
      description: data.description || '',
      date: data.date || new Date().toISOString().split('T')[0],
      category: data.category || '未分类',
      tags: tags,
      content: content,
    }
  } catch (error) {
    console.error(`Error reading post ${id}:`, error)
    return undefined
  }
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  const posts = await getAllPosts()
  return posts.filter(post => post.category === category)
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
  const posts = await getAllPosts()
  return posts.filter(post => post.tags.includes(tag))
}

export async function getAllCategories() {
  const posts = await getAllPosts()
  const categories = new Set(posts.map(post => post.category))
  return Array.from(categories).map(category => ({
    name: category,
    count: posts.filter(post => post.category === category).length,
    description: `${category}相关的技术文章`,
  }))
}

export async function getAllTags() {
  const posts = await getAllPosts()
  const tags = new Set(posts.flatMap(post => post.tags))
  return Array.from(tags).map(tag => ({
    name: tag,
    count: posts.filter(post => post.tags.includes(tag)).length,
  }))
} 