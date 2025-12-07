// src/components/EpochTimer.tsx
'use client'
import { useEffect, useState } from 'react'

export function EpochTimer() {
  const [timeLeft, setTimeLeft] = useState('')

  useEffect(() => {
    const update = () => {
      const now = Date.now()
      const thursday = new Date(Date.UTC(2025, 0, 2)) // 2025-01-02 是周四
      thursday.setUTCFullYear(new Date().getUTCFullYear())
      thursday.setUTCMonth(new Date().getUTCMonth())
      thursday.setUTCDate(new Date().getUTCDate() + ((4 - new Date().getUTCDay() + 7) % 7 || 7))
      thursday.setUTCHours(0, 0, 0, 0)
      
      const next = thursday.getTime()
      const diff = next - now

      if (diff <= 0) {
        setTimeLeft('0d 0h 0m 0s')
        return
      }

      const d = Math.floor(diff / 86400000)
      const h = Math.floor((diff % 86400000) / 3600000)
      const m = Math.floor((diff % 3600000) / 60000)
      const s = Math.floor((diff % 60000) / 1000)

      setTimeLeft(`${d}d ${h}h ${m}m ${s}s`)
    }

    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="bg-red-900/20 border border-red-800/50 rounded-2xl p-8 text-center">
      <div className="text-red-400 text-sm uppercase tracking-wider mb-2">Next Epoch (Thu 00:00 UTC)</div>
      <div className="text-5xl font-bold font-mono text-red-400">{timeLeft}</div>
      <div className="text-gray-500 mt-2">Weekly Settlement • Real Delivery</div>
    </div>
  )
}