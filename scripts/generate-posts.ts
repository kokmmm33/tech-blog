import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Post } from '../src/types/post'

const postsDirectory = path.join(process.cwd(), 'posts')
const outputFile = path.join(process.cwd(), 'src/data/posts.ts')

function generateSafeId(fileName: string): string {
  return fileName
    .replace(/\.md$/, '')
    .replace(/\s+/g, '-')
    .toLowerCase()
}

function generatePosts() {
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

  const fileContent = `
import { Post } from '@/types/post'

export const posts: Post[] = ${JSON.stringify(posts, null, 2)}
`

  fs.writeFileSync(outputFile, fileContent)
  console.log('Posts data generated successfully!')
}

generatePosts() 