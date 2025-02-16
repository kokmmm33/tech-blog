'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: '首页' },
    { href: '/categories', label: '分类' },
    { href: '/tags', label: '标签' },
  ]

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium
                    ${
                      pathname === item.href
                        ? 'border-blue-500 text-gray-900 dark:text-white'
                        : 'border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700'
                    }
                  `}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 移动端导航 */}
      <div className="sm:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-3 py-2 rounded-md text-base font-medium
                ${
                  pathname === item.href
                    ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-100'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }
              `}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
