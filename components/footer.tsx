'use client'

import { useEffect, useState } from 'react'
import { ArrowUp, Code2, Globe } from 'lucide-react'
import { PORTFOLIO_DATA } from '@/data/portfolio'
import { Magnetic } from './magnetic'
import { useAppStore } from '@/lib/store'

export function Footer() {
  const { setCursor, resetCursor } = useAppStore()
  const [currentTime, setCurrentTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }
      setCurrentTime(new Intl.DateTimeFormat('en-US', options).format(new Date()))
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative w-full py-12 px-4 sm:px-8 md:px-12 lg:px-16 bg-[#040404] border-t border-white/[0.08] text-slate-400 font-mono text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Signature */}
        <div className="flex items-center gap-3">
          <span className="w-6 h-6 rounded-full bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-[10px] font-bold text-blue-300">
            {PORTFOLIO_DATA.personal.monogram}
          </span>
          <span>
            DESIGNED &amp; ENGINEERED BY <strong className="text-white font-bold">{PORTFOLIO_DATA.personal.name}</strong>
          </span>
        </div>

        {/* Center Local Time Telemetry */}
        <div className="flex items-center gap-2 text-[11px] text-slate-500">
          <Globe size={13} className="text-blue-400" />
          <span>SURAT, IN (IST):</span>
          <span className="text-emerald-400 font-semibold">{currentTime || '01:45 PM'}</span>
        </div>

        {/* Right Back to Top Button */}
        <Magnetic>
          <button
            onClick={scrollToTop}
            onMouseEnter={() => setCursor('button', 'TOP')}
            onMouseLeave={resetCursor}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors"
          >
            <span>BACK TO TOP</span>
            <ArrowUp size={13} />
          </button>
        </Magnetic>
      </div>
    </footer>
  )
}
