/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/tech-blog' : '',
  // 指定输出目录
  distDir: 'docs',
}

module.exports = nextConfig 