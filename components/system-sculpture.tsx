'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Layers, Server, Zap, Database, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react'

interface SystemSculptureProps {
  mouseXOffset?: number
  mouseYOffset?: number
}

export function SystemSculpture({ mouseXOffset = 0, mouseYOffset = 0 }: SystemSculptureProps) {
  const shouldReduceMotion = useReducedMotion()
  const [activeTier, setActiveTier] = useState<number | null>(null)

  const tiers = [
    {
      id: 0,
      title: 'CLIENT / FRONTEND INTERFACE',
      tech: 'Next.js 16 • React 19 • TypeScript',
      icon: Layers,
      color: 'from-blue-500/20 to-cyan-500/10',
      borderColor: 'border-cyan-500/40',
      glow: 'shadow-[0_0_25px_rgba(6,182,212,0.25)]',
      telemetry: 'SSR / App Router • 60 FPS • Reactive Stream',
      badge: 'LAYER 01',
      code: 'render(<SystemEngine state={active} />)',
    },
    {
      id: 1,
      title: 'API GATEWAY & AUTH ROUTER',
      tech: 'Node.js • Express • Spring Boot',
      icon: Server,
      color: 'from-blue-600/20 to-indigo-600/10',
      borderColor: 'border-blue-500/40',
      glow: 'shadow-[0_0_25px_rgba(59,130,246,0.25)]',
      telemetry: 'JWT Bearer • Rate Limiting • 50+ REST APIs',
      badge: 'LAYER 02',
      code: 'router.use(verifyJWT).post("/dispatch")',
    },
    {
      id: 2,
      title: 'SUB-MILLISECOND CACHE LAYER',
      tech: 'Redis In-Memory • Pub/Sub',
      icon: Zap,
      color: 'from-emerald-500/20 to-teal-500/10',
      borderColor: 'border-emerald-500/40',
      glow: 'shadow-[0_0_25px_rgba(16,185,129,0.3)]',
      telemetry: 'Hit Ratio 98.4% • Latency < 4ms • 30% Boost',
      badge: 'LAYER 03',
      code: 'await redis.setex(key, 3600, data)',
    },
    {
      id: 3,
      title: 'PERSISTENCE & DATA CLUSTER',
      tech: 'MongoDB • MySQL • SQL Server',
      icon: Database,
      color: 'from-purple-500/20 to-indigo-500/10',
      borderColor: 'border-purple-500/40',
      glow: 'shadow-[0_0_25px_rgba(168,85,247,0.25)]',
      telemetry: 'ACID Transactions • Aggregations • Relational',
      badge: 'LAYER 04',
      code: 'db.tasks.aggregate([{ $match: { id } }])',
    },
  ]

  return (
    <div className="relative w-full max-w-2xl mx-auto select-none pointer-events-auto">
      {/* Dynamic 3D Isometric Wrapper with Mouse Parallax */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                rotateX: 10 + mouseYOffset * 15,
                rotateY: -12 + mouseXOffset * 20,
                x: mouseXOffset * 25,
                y: mouseYOffset * 25,
              }
        }
        transition={{ type: 'spring', stiffness: 200, damping: 25, mass: 0.6 }}
        style={{ transformStyle: 'preserve-3d', perspective: 1200 }}
        className="relative flex flex-col gap-3 md:gap-4.5 p-4 sm:p-6"
      >
        {/* Connecting Data Bus Line */}
        <div className="absolute left-8 sm:left-12 top-10 bottom-10 w-[2px] bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500 opacity-40 -z-10" />

        {tiers.map((tier, idx) => {
          const Icon = tier.icon
          const isActive = activeTier === idx

          return (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.1, duration: 0.6 }}
              onMouseEnter={() => setActiveTier(idx)}
              onMouseLeave={() => setActiveTier(null)}
              className={`relative rounded-2xl border backdrop-blur-xl transition-all duration-300 p-4 sm:p-5 cursor-pointer bg-gradient-to-r ${tier.color} ${
                isActive
                  ? `${tier.borderColor} ${tier.glow} scale-[1.03] z-20 bg-[#0c0f1d]/90`
                  : 'border-white/10 hover:border-white/20 bg-[#090b14]/70 z-10'
              }`}
              style={{
                transform: `translateZ(${idx * 15}px)`,
              }}
            >
              {/* Header row */}
              <div className="flex items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`p-2 rounded-xl border transition-colors ${
                      isActive
                        ? 'bg-blue-500/20 text-cyan-300 border-cyan-500/50 shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                        : 'bg-white/5 text-slate-400 border-white/10'
                    }`}
                  >
                    <Icon size={18} />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-slate-400 font-semibold block">
                      {tier.badge}
                    </span>
                    <h4 className="font-sans font-bold text-xs sm:text-sm text-white tracking-tight">
                      {tier.title}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline-block font-mono text-[10px] text-cyan-400/90 bg-cyan-950/40 px-2 py-0.5 rounded-full border border-cyan-500/30">
                    {tier.tech}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]" />
                </div>
              </div>

              {/* Telemetry / Code Snippet preview */}
              <div className="mt-3 pt-2.5 border-t border-white/[0.07] flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-400">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <CheckCircle2 size={12} className="text-emerald-400" />
                  <span>{tier.telemetry}</span>
                </div>
                <div className="text-cyan-300/80 bg-black/40 px-2 py-0.5 rounded border border-white/5">
                  <code>{tier.code}</code>
                </div>
              </div>
            </motion.div>
          )
        })}

        {/* Global Pipeline Status Pill */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center justify-between px-4 py-2 rounded-xl bg-black/60 border border-white/10 font-mono text-[10px] text-slate-400"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck size={13} className="text-blue-400" />
            <span className="text-slate-300 font-medium">ARCHITECTURE PIPELINE: OPERATIONAL</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 font-bold">● LIVE 99.9%</span>
            <span className="text-slate-500">|</span>
            <span className="text-cyan-400">AVG LATENCY: 8ms</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
