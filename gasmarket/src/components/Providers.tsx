// src/components/Providers.tsx
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider, createConfig, http } from 'wagmi'
import { 
  mainnet, sepolia, bsc, bscTestnet, polygon, polygonMumbai,
  arbitrum, arbitrumSepolia, optimism, optimismSepolia, base, baseSepolia
} from 'wagmi/chains'
import { RainbowKitProvider, connectorsForWallets } from '@rainbow-me/rainbowkit'
import {
  metaMaskWallet,
  walletConnectWallet,
  coinbaseWallet,
  injectedWallet,
} from '@rainbow-me/rainbowkit/wallets'

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [
        metaMaskWallet,
        walletConnectWallet,
        coinbaseWallet,
        injectedWallet,
      ],
    },
  ],
  {
    appName: 'GasMarket – Multi-Chain Gas Futures',
    projectId: 'c3f6d9f8d6f8e6e8f8g9h0j1k2l3m4n5',
  }
)

const config = createConfig({
  chains: [
    mainnet, bsc, polygon, arbitrum, optimism, base,
    sepolia, bscTestnet, polygonMumbai, arbitrumSepolia, optimismSepolia, baseSepolia
  ],
  connectors,
  transports: {
    [mainnet.id]: http(),
    [bsc.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http(),
    [optimism.id]: http(),
    [base.id]: http(),
    [sepolia.id]: http(),
    [bscTestnet.id]: http(),
    [polygonMumbai.id]: http(),
    [arbitrumSepolia.id]: http(),
    [optimismSepolia.id]: http(),
    [baseSepolia.id]: http(),
  },
})

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}