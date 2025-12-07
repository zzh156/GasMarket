// src/components/TradePanel.tsx
'use client'

import { useState } from 'react'
import { useAccount, useChainId, useSwitchChain } from 'wagmi'
import { useGasPrice } from '@/hooks/useGasPrice'
import { mainnet, bsc, polygon, arbitrum, optimism, base } from 'wagmi/chains'

const CHAINS = [mainnet, bsc, polygon, arbitrum, optimism, base]

export function TradePanel() {
  const { address } = useAccount()
  const chainId = useChainId()
  const { switchChain } = useSwitchChain()
  const { data: gasPrice, isLoading } = useGasPrice()
  const [amount, setAmount] = useState('')
  const [targetPrice, setTargetPrice] = useState('')
  const [isLong, setIsLong] = useState(true)

  const current = gasPrice ? Number(gasPrice) : 0
  const target = targetPrice ? Number(targetPrice) : current * (isLong ? 1.5 : 0.5)

  return (
    <div className="bg-gradient-to-br from-gray-900 via-red-950/30 to-black rounded-3xl p-8 border border-red-800/40 shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-3xl font-bold">Next Epoch Gas Futures</h3>
        <select
          value={chainId}
          onChange={(e) => switchChain({ chainId: Number(e.target.value) })}
          className="bg-black/50 border border-gray-700 rounded-lg px-4 py-2"
        >
          {CHAINS.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      <div className="text-center mb-8">
        <div className="text-gray-400">Current Gas Price</div>
        <div className="text-6xl font-bold text-red-400">
          {isLoading ? '--' : current.toFixed(2)} <span className="text-2xl">Gwei</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <button onClick={() => setIsLong(true)} className={`py-8 rounded-2xl font-bold text-3xl transition-all ${isLong ? 'bg-green-600 shadow-xl shadow-green-600/50' : 'bg-gray-800'}`}>
          LONG ↑
        </button>
        <button onClick={() => setIsLong(false)} className={`py-8 rounded-2xl font-bold text-3xl transition-all ${!isLong ? 'bg-red-600 shadow-xl shadow-red-600/50' : 'bg-gray-800'}`}>
          SHORT ↓
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="text-gray-400">Target Price (Gwei)</label>
          <input
            type="number"
            value={targetPrice}
            onChange={(e) => setTargetPrice(e.target.value)}
            placeholder={target.toFixed(1)}
            className="w-full bg-black/50 border border-gray-700 rounded-xl px-6 py-4 text-xl mt-2"
          />
        </div>

        <div>
          <label className="text-gray-400">Amount (Native Token)</label>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ''))}
            placeholder="1.0"
            className="w-full bg-black/50 border border-gray-700 rounded-xl px-6 py-4 text-xl mt-2"
          />
        </div>

        <button
          disabled={!address || !amount || !targetPrice}
          className={`w-full py-6 rounded-2xl font-bold text-xl transition-all ${
            isLong
              ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
              : 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700'
          } shadow-2xl disabled:opacity-50`}
        >
          {address 
            ? (amount && targetPrice ? `${isLong ? 'LONG' : 'SHORT'} @ ${target} Gwei` : 'Enter Amount & Target')
            : 'Connect Wallet'
          }
        </button>

        <div className="text-center text-sm text-gray-400">
          Predicted {isLong ? 'Rise' : 'Fall'} → {target} Gwei 
          {' '}•{' '}Potential PNL: {(isLong ? target/current - 1 : current/target - 1).toFixed(2)}x
        </div>
      </div>
    </div>
  )
}