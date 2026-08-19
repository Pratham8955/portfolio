'use client'

import { motion } from 'framer-motion'
import { Sparkles, Terminal, Activity, CheckCircle2, ShieldCheck, Flame } from 'lucide-react'
import { PORTFOLIO_DATA } from '@/data/portfolio'
import { GithubWidget } from './github-widget'

export function CurrentlyBuilding() {
  const buildingItems = PORTFOLIO_DATA.currentlyBuilding.items
  const philosophies = PORTFOLIO_DATA.philosophy

  return (
    <section className="relative w-full py-28 px-4 sm:px-8 md:px-12 lg:px-16 bg-[#050505] overflow-hidden border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>ACTIVE SYSTEM RADAR</span>
            </div>
            <h2 className="font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tighter text-white">
              CURRENTLY BUILDING.
            </h2>
          </div>
          <div className="font-mono text-xs text-slate-400">
            <span className="text-emerald-400 font-bold">● STATUS: ACTIVE R&D</span>
          </div>
        </div>

        {/* Current Focus Grid + GitHub Widget Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 items-start">
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {buildingItems.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-5 sm:p-6 rounded-2xl border border-white/[0.08] hover:border-emerald-500/40 bg-[#080b14]/80 backdrop-blur-md transition-all duration-300 flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-[10px] font-bold text-emerald-400 bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                      {item.tag.toUpperCase()}
                    </span>
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  </div>
                  <h3 className="font-black text-lg text-white tracking-tight uppercase mb-2">
                    {item.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="lg:col-span-4">
            <GithubWidget />
          </div>
        </div>

        {/* Developer Philosophy Row */}
        <div>
          <h3 className="font-mono text-xs uppercase tracking-widest text-blue-400 font-bold mb-8 flex items-center gap-2">
            <span>ENGINEERING PHILOSOPHY & PRINCIPLES:</span>
            <div className="h-px flex-1 bg-white/10" />
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {philosophies.map((item, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl border border-white/[0.07] bg-white/[0.02] flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs text-blue-400 font-bold block mb-2">
                    0{i + 1}
                  </span>
                  <h4 className="font-black text-base text-white uppercase tracking-tight mb-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
