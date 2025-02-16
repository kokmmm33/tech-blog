/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/tech-blog' : '',
  // 禁用 revalidate，使页面完全静态
  experimental: {
    staticPageGenerationTimeout: 300,
  },
}

module.exports = nextConfig 