import { NextResponse } from 'next/server'
import { Post } from '@/types/post'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// 获取 posts 目录的路径
const postsDirectory = path.join(process.cwd(), 'posts')

// 创建 Markdown 文件内容
function createFileContent(post: Post) {
  return `---
title: '${post.title}'
date: '${post.date}'
description: '${post.description}'
category: '${post.category}'
tags: ${JSON.stringify(post.tags)}
---

${post.content}
`
}

// 从文件系统读取所有文章
function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const posts = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const id = fileName.replace(/\.md$/, '')
      return getPostById(id)
    })
    .filter((post): post is Post => post !== undefined)
    .sort((a, b) => (a.date > b.date ? -1 : 1))

  return posts
}

// 从文件系统读取单篇文章
function getPostById(id: string): Post | undefined {
  try {
    const fullPath = path.join(postsDirectory, `${id}.md`)
    if (!fs.existsSync(fullPath)) {
      return undefined
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    // 确保 tags 是数组
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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  try {
    if (id) {
      const post = getPostById(id)
      if (!post) {
        return NextResponse.json({ error: '文章不存在' }, { status: 404 })
      }
      return NextResponse.json(post)
    }

    const posts = getAllPosts()
    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json(
      { error: '获取文章失败' },
      { status: 500 }
    )
  }
} 