// src/app/page.tsx
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { TradePanel } from '@/components/TradePanel'
import { EpochTimer } from '@/components/EpochTimer'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-red-950/20 to-black">
      {/* Header */}
      <header className="border-b border-red-900/30 backdrop-blur-xl bg-black/70 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-10">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              GasMarket
            </h1>
            <nav className="hidden md:flex gap-8 text-gray-300">
              <a href="#" className="hover:text-red-400 transition">Trade</a>
              <a href="#" className="hover:text-red-400 transition">Vote</a>
              <a href="#" className="hover:text-red-400 transition">Lock</a>
            </nav>
          </div>
          <ConnectButton />
        </div>
      </header>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-12 text-center">
        <h2 className="text-6xl md:text-7xl font-bold mb-6">
          Trade the Future<br />of Ethereum Gas
        </h2>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Long or short next epoch gas price. Earn yield with veGAS. True price discovery.
        </p>
      </div>

      {/* Epoch Timer */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <EpochTimer />
      </div>

      {/* Trade Panel */}
      <div className="max-w-7xl mx-auto px-6 pb-32">
        <TradePanel />
      </div>
    </main>
  )
}