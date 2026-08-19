'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Compass, Code2, Network, CheckCircle2, Rocket, Terminal } from 'lucide-react'
import { PORTFOLIO_DATA } from '@/data/portfolio'
import { useAppStore } from '@/lib/store'

export function HowIBuild() {
  const shouldReduceMotion = useReducedMotion()
  const { setCursor, resetCursor } = useAppStore()
  const [activeStageIndex, setActiveStageIndex] = useState(0)

  const stages = PORTFOLIO_DATA.howIBuild
  const currentStage = stages[activeStageIndex]

  const stageIcons = [Compass, Code2, Network, CheckCircle2, Rocket]

  return (
    <section id="how-i-build" className="relative w-full py-28 px-4 sm:px-8 md:px-12 lg:px-16 bg-[#050505] overflow-hidden border-t border-white/[0.08]">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute bottom-0 left-1/4 w-[600px] h-[600px] rounded-full bg-blue-600/5 blur-[160px] -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-blue-400 font-semibold mb-3">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span>ENGINEERING PIPELINE</span>
            </div>
            <h2 className="font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tighter text-white">
              HOW I BUILD.
            </h2>
          </div>
          <p className="text-slate-400 text-sm sm:text-base max-w-md leading-relaxed font-sans">
            A disciplined, systematic approach to designing resilient backend systems, type-safe APIs, and responsive digital products.
          </p>
        </div>

        {/* 5-Stage Interactive Tabs & Architecture System Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Stage Selector (Left 5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {stages.map((stage, idx) => {
              const Icon = stageIcons[idx] || Code2
              const isActive = activeStageIndex === idx

              return (
                <motion.div
                  key={stage.number}
                  onClick={() => setActiveStageIndex(idx)}
                  onMouseEnter={() => setCursor('button', 'STAGE')}
                  onMouseLeave={resetCursor}
                  whileHover={shouldReduceMotion ? {} : { x: 6 }}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-[#0f1324] border-blue-500/60 shadow-[0_0_25px_rgba(59,130,246,0.2)]'
                      : 'bg-[#0a0c16]/70 hover:bg-[#0f1324]/50 border-white/[0.08] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`p-2.5 rounded-xl border transition-colors ${
                          isActive
                            ? 'bg-blue-600 text-white border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                            : 'bg-white/5 text-slate-400 border-white/10'
                        }`}
                      >
                        <Icon size={18} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-blue-400">
                            {stage.number}
                          </span>
                          <h3 className="font-black text-base sm:text-lg text-white uppercase tracking-tight">
                            {stage.title}
                          </h3>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                          {stage.tagline}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`w-2 h-2 rounded-full transition-colors ${
                        isActive ? 'bg-blue-400 shadow-[0_0_8px_#3b82f6]' : 'bg-slate-700'
                      }`}
                    />
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Active Stage Deep-Dive Visual Terminal (Right 7 Cols) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStage.number}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl border border-white/15 bg-[#090b14]/90 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden"
              >
                {/* Header Badge */}
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5 mb-6">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs text-blue-400 bg-blue-950/60 px-2.5 py-1 rounded-full border border-blue-500/30 font-bold">
                        STAGE {currentStage.number}
                      </span>
                      <h3 className="font-black text-xl sm:text-2xl text-white uppercase tracking-tight">
                        {currentStage.title} — {currentStage.tagline}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-sans">
                  {currentStage.description}
                </p>

                {/* Core Rules / Details */}
                <div className="mb-6">
                  <h4 className="font-mono text-xs uppercase tracking-widest text-slate-400 font-bold mb-3">
                    CORE ENGINEERING CRITERIA:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {currentStage.details.map((detail, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs font-medium text-slate-200"
                      >
                        <CheckCircle2 size={14} className="text-blue-400 shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live Code Snippet Terminal */}
                <div className="rounded-xl border border-white/10 bg-black/60 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.04] border-b border-white/10 font-mono text-xs text-slate-400">
                    <div className="flex items-center gap-2">
                      <Terminal size={14} className="text-blue-400" />
                      <span>snippet.{currentStage.title.toLowerCase()}.ts</span>
                    </div>
                  </div>
                  <pre className="p-4 overflow-x-auto text-xs sm:text-sm font-mono text-cyan-300 leading-relaxed custom-scrollbar">
                    <code>{currentStage.codeSnippet}</code>
                  </pre>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
