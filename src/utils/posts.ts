import { Post } from '@/types/post'

// 导入所有文章数据
const posts: Post[] = [
  {
    id: '1',
    title: '使用 Next.js 搭建个人博客',
    description: '本文介绍如何使用 Next.js 搭建一个静态博客网站',
    date: '2024-01-01',
    category: '技术',
    tags: ['Next.js', 'React', 'TypeScript'],
    content: `# 使用 Next.js 搭建个人博客

本文将介绍如何使用 Next.js 搭建一个静态博客网站。

## 技术栈

- Next.js
- React
- TypeScript
- Tailwind CSS

## 特性

1. 静态生成
2. Markdown 支持
3. 分类和标签
4. 响应式设计

## 部署

使用 GitHub Pages 部署...`,
  },
  {
    id: '1-copy',
    title: '在 Next.js 中使用 Markdown',
    description: '介绍如何在 Next.js 项目中处理 Markdown 内容',
    date: '2024-01-02',
    category: '技术',
    tags: ['Markdown', 'Next.js'],
    content: `# 在 Next.js 中使用 Markdown

本文将介绍如何在 Next.js 项目中处理 Markdown 内容。

## 使用的库

- react-markdown
- remark-gfm

## 功能

1. 基本 Markdown 语法
2. GitHub 风格的 Markdown
3. 代码高亮
4. 表格支持

## 示例

\`\`\`typescript
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function MarkdownPreview({ content }: { content: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]}>
      {content}
    </ReactMarkdown>
  )
}
\`\`\``,
  },
]

// 获取所有文章
export async function getAllPosts(): Promise<Post[]> {
  return posts.sort((a, b) => (a.date > b.date ? -1 : 1))
}

// 获取单篇文章
export async function getPostById(id: string): Promise<Post | undefined> {
  return posts.find(post => post.id.toLowerCase() === id.toLowerCase())
}

// 按分类获取文章
export async function getPostsByCategory(category: string): Promise<Post[]> {
  return posts.filter(post => post.category === category)
}

// 按标签获取文章
export async function getPostsByTag(tag: string): Promise<Post[]> {
  return posts.filter(post => post.tags.includes(tag))
}

// 获取所有分类
export async function getAllCategories() {
  const categories = new Set(posts.map(post => post.category))
  return Array.from(categories).map(category => ({
    name: category,
    count: posts.filter(post => post.category === category).length,
    description: `${category}相关的技术文章`,
  }))
}

// 获取所有标签
export async function getAllTags() {
  const tags = new Set(posts.flatMap(post => post.tags))
  return Array.from(tags).map(tag => ({
    name: tag,
    count: posts.filter(post => post.tags.includes(tag)).length,
  }))
} 