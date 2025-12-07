// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactCompiler: true, // 你原来开启的，保留

  // 关键修复：适配 Next.js 16 的新字段名
  serverExternalPackages: ['pino', 'thread-stream', '@walletconnect'],

  // 关闭 Turbopack 的 webpack 冲突报错（最优雅方式）
  turbopack: {
    // 什么都不写就行，代表“我知道你在用 Turbopack，我不报错了”
  },

  // 可选但强烈推荐：彻底忽略所有 test 文件（双保险）
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(test|spec)\.(ts|tsx|js|jsx)$/,
      use: 'ignore-loader',
    })
    return config
  },
}

export default nextConfig