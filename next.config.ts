// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactCompiler: true, // 你原来开启的，保留

  // 关键修复：让 Next.js 完全忽略所有 test 文件和无用依赖
  webpack: (config) => {
    // 忽略所有 .test.ts / .test.js / .spec.ts 等测试文件
    config.module.rules.push({
      test: /\.(test|spec)\.(ts|tsx|js|jsx)$/,
      use: 'ignore-loader',
    })

    // 可选但强烈推荐：额外忽略 thread-stream、pino 等库的测试目录
    config.ignoreWarnings = [
      ...(config.ignoreWarnings || []),
      { module: /thread-stream\/test/ },
      { module: /pino\/lib\/transport/ },
    ]

    return config
  },

  // 更狠一招（可选）：告诉 Next.js 某些包永远只在服务端运行，SSR 不解析
  experimental: {
    serverComponentsExternalPackages: ['pino', 'thread-stream', '@walletconnect'],
  },
}

export default nextConfig