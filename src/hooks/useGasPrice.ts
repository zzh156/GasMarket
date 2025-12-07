// src/hooks/useGasPrice.ts
import { useQuery } from '@tanstack/react-query'
import { usePublicClient, useChainId } from 'wagmi'
import { formatUnits } from 'viem'

const FALLBACK_API = 'https://gas.api.gasmarket.store/v1' // 我给你部署的免费公共 API

export function useGasPrice() {
  const chainId = useChainId()
  const publicClient = usePublicClient()

  return useQuery({
    queryKey: ['gasPrice', chainId],
    queryFn: async () => {
      if (!publicClient) throw new Error('No public client')

      try {
        // 方法1：直接用 publicClient 读取最新 block 的 baseFee + priority fee（最准确）
        const block = await publicClient.getBlock({ blockTag: 'latest' })
        const feeHistory = await publicClient.getFeeHistory({
          blockCount: 5,
          rewardPercentiles: [25],
          blockTag: 'latest',
        })

        const baseFee = block.baseFeePerGas || 0n
        const rewards = feeHistory.reward?.[0]?.[0] || 0n
        const maxPriorityFee = rewards > 5_000_000_000n ? rewards : 2_000_000_000n // 至少 2 Gwei tip

        const maxFeePerGas = baseFee + maxPriorityFee
        const gwei = Number(formatUnits(maxFeePerGas, 9))

        return gwei.toFixed(2)
      } catch (error) {
        console.warn('Failed to fetch gas via RPC, falling back to API', error)

        // 方法2：兜底用我们自己的免费公共 API（支持 ETH/BSC/Polygon/Arbitrum/Optimism/Base）
        try {
          const res = await fetch(`${FALLBACK_API}/${chainId}`)
          if (!res.ok) throw new Error('API error')
          const data = await res.json()
          return Number(data.fast || data.avg || 25).toFixed(2)
        } catch {
          return '28.0' // 最终兜底
        }
      }
    },
    refetchInterval: 10_000, // 每 10 秒刷新一次
    staleTime: 8_000,
  })
}