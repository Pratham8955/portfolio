'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowRight, FileText } from 'lucide-react'
import { PORTFOLIO_DATA } from '@/data/portfolio'
import { SystemSculpture } from './system-sculpture'
import { Magnetic } from './magnetic'
import { useAppStore } from '@/lib/store'

const ROTATING_TITLES = [
  'FULL-STACK SOFTWARE DEVELOPER',
  'BACKEND ENGINEER',
  'JAVA DEVELOPER',
  '.NET CORE DEVELOPER',
]

export function Hero() {
  const shouldReduceMotion = useReducedMotion()
  const { setResumePreviewOpen, setCursor, resetCursor } = useAppStore()
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 })
  const [titleIndex, setTitleIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % ROTATING_TITLES.length)
    }, 2800)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (shouldReduceMotion) return

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      // Normalize from -1 to 1
      const x = (e.clientX / innerWidth) * 2 - 1
      const y = (e.clientY / innerHeight) * 2 - 1
      setMouseOffset({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [shouldReduceMotion])

  const scrollToWork = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] w-full flex flex-col justify-between pt-28 pb-12 px-4 sm:px-8 md:px-12 lg:px-16 overflow-hidden bg-[#050505]"
    >
      {/* Background Ambient Mesh Light */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  x: mouseOffset.x * -40,
                  y: mouseOffset.y * -40,
                }
          }
          transition={{ type: 'spring', stiffness: 50, damping: 20 }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-blue-600/10 blur-[140px]"
        />
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] rounded-full bg-indigo-600/10 blur-[130px]" />
      </div>

      {/* Top Eyebrow & Status */}
      <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 z-20">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-slate-400 font-semibold shrink-0">
            {PORTFOLIO_DATA.personal.name}
          </span>
          <span className="text-slate-600">/</span>
          <div className="h-5 overflow-hidden flex items-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={titleIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="font-mono text-xs uppercase tracking-wider text-blue-400 font-medium whitespace-nowrap"
              >
                {ROTATING_TITLES[titleIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 w-fit"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-mono text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
            {PORTFOLIO_DATA.personal.status}
          </span>
        </motion.div>
      </div>

      {/* Main Composition: Oversized Editorial Typography + 3D System Sculpture Layering */}
      <div className="relative w-full max-w-7xl mx-auto my-auto py-8 sm:py-12 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
        {/* Left Column: Huge Editorial Typography Statement */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={
              shouldReduceMotion
                ? {}
                : {
                    transform: `translate3d(${mouseOffset.x * -12}px, ${mouseOffset.y * -12}px, 0)`,
                  }
            }
          >
            <h1 className="font-black text-5xl sm:text-7xl md:text-8xl lg:text-[5.5rem] xl:text-[6.5rem] tracking-tighter uppercase leading-[0.88] text-white">
              <span className="block text-slate-400 hover:text-white transition-colors duration-300">
                BUILDING
              </span>
              <span className="block bg-gradient-to-r from-white via-slate-200 to-blue-400 bg-clip-text text-transparent">
                DIGITAL
              </span>
              <span className="block text-slate-400 hover:text-white transition-colors duration-300">
                SYSTEMS.
              </span>
            </h1>

            <p className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-slate-400 max-w-xl font-sans leading-relaxed">
              {PORTFOLIO_DATA.personal.subHeadline}
            </p>
          </motion.div>

          {/* Action CTAs: EXPLORE WORK + RESUME */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-3.5 sm:gap-4 mt-8 sm:mt-10"
          >
            <Magnetic>
              <button
                onClick={scrollToWork}
                onMouseEnter={() => setCursor('button', 'EXPLORE')}
                onMouseLeave={resetCursor}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs uppercase tracking-widest font-bold shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all duration-300 group"
              >
                <span>EXPLORE WORK</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Magnetic>

            <Magnetic>
              <button
                onClick={() => setResumePreviewOpen(true)}
                onMouseEnter={() => setCursor('button', 'RESUME')}
                onMouseLeave={resetCursor}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#10121d] hover:bg-[#181b2a] border border-white/10 hover:border-blue-500/40 text-slate-200 hover:text-white font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-300 shadow-lg"
              >
                <FileText size={15} className="text-blue-400" />
                <span>RESUME</span>
              </button>
            </Magnetic>
          </motion.div>
        </div>

        {/* Right Column: Central Interactive 3D Digital System Architecture Sculpture */}
        <div className="w-full lg:w-1/2 flex items-center justify-center relative">
          <SystemSculpture mouseXOffset={mouseOffset.x} mouseYOffset={mouseOffset.y} />
        </div>
      </div>

      {/* Bottom Row: Authenticated Metrics */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="w-full max-w-7xl mx-auto pt-6 border-t border-white/[0.08] flex items-center justify-between"
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 w-full">
          {PORTFOLIO_DATA.personal.stats.map((stat, i) => (
            <div key={i} className="flex flex-col">
              <span className="font-sans font-black text-2xl sm:text-3xl text-white tracking-tight">
                {stat.value}
              </span>
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-blue-400 font-semibold mt-0.5">
                {stat.label}
              </span>
              <span className="text-[11px] text-slate-500 hidden sm:block">
                {stat.subtext}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
