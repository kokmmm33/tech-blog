import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: '技术博客',
  description: '分享技术知识和经验',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
