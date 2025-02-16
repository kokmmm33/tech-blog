import Link from 'next/link'

interface Props {
  category: string
  tags?: string[]
}

export default function TagsAndCategory({ category, tags = [] }: Props) {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      <Link
        href={`/categories/${encodeURIComponent(category)}`}
        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600">
        {category}
      </Link>
      {tags.map((tag) => (
        <Link
          key={tag}
          href={`/tags/${encodeURIComponent(tag)}`}
          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600">
          {tag}
        </Link>
      ))}
    </div>
  )
}
