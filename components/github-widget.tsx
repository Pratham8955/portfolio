'use client'

import { motion } from 'framer-motion'
import { Activity, ArrowUpRight } from 'lucide-react'
import { PORTFOLIO_DATA } from '@/data/portfolio'
import { GithubIcon } from './icons'
import { useAppStore } from '@/lib/store'

export function GithubWidget() {
  const { setCursor, resetCursor } = useAppStore()

  return (
    <motion.a
      href={PORTFOLIO_DATA.personal.github}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setCursor('github')}
      onMouseLeave={resetCursor}
      className="block w-full rounded-2xl border border-white/[0.08] hover:border-blue-500/40 bg-[#090b14]/90 p-6 shadow-xl transition-all duration-300 group"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-white/5 group-hover:bg-blue-600/20 text-white transition-colors">
            <GithubIcon size={18} />
          </div>
          <div>
            <span className="font-mono text-xs text-slate-400 block">GITHUB PROFILE</span>
            <span className="font-black text-base text-white tracking-tight">@Pratham8955</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-500/30">
          <Activity size={11} className="animate-pulse" />
          <span>ACTIVE</span>
        </div>
      </div>

      <div className="space-y-3 pt-3 border-t border-white/[0.06] font-mono text-xs text-slate-300">
        <div className="flex justify-between items-center">
          <span className="text-slate-500">Repositories</span>
          <span className="font-bold text-white">17+ Repositories</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-500">Primary Ecosystem</span>
          <span className="text-blue-400">TypeScript • Java • Node.js</span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-blue-400 font-bold group-hover:translate-x-1 transition-transform">
        <span>VIEW REPOSITORIES</span>
        <ArrowUpRight size={14} />
      </div>
    </motion.a>
  )
}
