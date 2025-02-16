/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/tech-blog' : '',
  // 指定输出目录
  distDir: 'docs',
  // 添加 ESLint 配置
  eslint: {
    // 在生产构建时忽略 ESLint 错误
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig 