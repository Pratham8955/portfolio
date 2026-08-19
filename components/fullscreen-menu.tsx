'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { X, ArrowUpRight, Mail, FileText } from 'lucide-react'
import { useAppStore } from '@/lib/store'
import { PORTFOLIO_DATA } from '@/data/portfolio'
import { GithubIcon, LinkedinIcon } from './icons'

export function FullscreenMenu() {
  const shouldReduceMotion = useReducedMotion()
  const { fullScreenMenuOpen, setFullScreenMenuOpen, setResumePreviewOpen, setCursor, resetCursor } = useAppStore()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && fullScreenMenuOpen) {
        setFullScreenMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [fullScreenMenuOpen, setFullScreenMenuOpen])

  useEffect(() => {
    if (fullScreenMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [fullScreenMenuOpen])

  const menuItems = [
    { number: '01', title: 'SELECTED WORK', href: '#projects', subtitle: 'Strata, Maham, GoWear, CampusWave' },
    { number: '02', title: 'WHO I AM', href: '#about', subtitle: 'Background, Philosophy & Focus' },
    { number: '03', title: 'HOW I BUILD', href: '#how-i-build', subtitle: '5-Stage Engineering Pipeline' },
    { number: '04', title: 'THE STACK', href: '#stack', subtitle: 'Java, Node.js, Next.js, Redis, MongoDB' },
    { number: '05', title: 'EXPERIENCE / JOURNEY', href: '#experience', subtitle: 'Elaunch Solutions, NJ India, MSc ICT' },
    { number: '06', title: "LET'S BUILD", href: '#contact', subtitle: 'Direct contact & project inquiries' },
  ]

  const handleNavigate = (href: string) => {
    setFullScreenMenuOpen(false)
    setTimeout(() => {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }, 250)
  }

  return (
    <AnimatePresence>
      {fullScreenMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[90] flex flex-col justify-between bg-[#050505]/95 backdrop-blur-2xl px-6 sm:px-12 md:px-20 py-8 text-white"
        >
          {/* Ambient Lighting Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-blue-600/10 blur-[150px] pointer-events-none -z-10" />

          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-6 w-full max-w-7xl mx-auto">
            <div className="flex items-center gap-3">
              <span className="font-black text-xl tracking-tighter text-white">PRATHAM SALI</span>
              <span className="font-mono text-xs uppercase text-blue-400 font-semibold px-2 py-0.5 rounded bg-blue-950/50 border border-blue-500/30">
                NAVIGATION
              </span>
            </div>

            <button
              onClick={() => setFullScreenMenuOpen(false)}
              onMouseEnter={() => setCursor('button', 'CLOSE')}
              onMouseLeave={resetCursor}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white font-mono text-xs uppercase tracking-wider transition-colors"
            >
              <span>CLOSE</span>
              <X size={16} />
            </button>
          </div>

          {/* Main Editorial Menu Links */}
          <div className="w-full max-w-7xl mx-auto my-auto py-6 flex flex-col justify-center">
            <nav className="flex flex-col gap-2 sm:gap-4">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.number}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: 0.05 * index, duration: 0.4 }}
                >
                  <button
                    onClick={() => handleNavigate(item.href)}
                    onMouseEnter={() => setCursor('button', 'GOTO')}
                    onMouseLeave={resetCursor}
                    className="group w-full flex items-center justify-between py-2 sm:py-3 border-b border-white/[0.06] hover:border-blue-500/40 text-left transition-all duration-300"
                  >
                    <div className="flex items-baseline gap-4 sm:gap-8">
                      <span className="font-mono text-sm sm:text-lg text-slate-500 group-hover:text-blue-400 font-bold transition-colors">
                        {item.number}
                      </span>
                      <h2 className="font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight uppercase text-slate-300 group-hover:text-white group-hover:translate-x-3 transition-all duration-300">
                        {item.title}
                      </h2>
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                      <span className="font-mono text-xs text-slate-500 group-hover:text-slate-300 transition-colors">
                        {item.subtitle}
                      </span>
                      <div className="p-2 rounded-full bg-white/5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <ArrowUpRight size={18} />
                      </div>
                    </div>
                  </button>
                </motion.div>
              ))}
            </nav>
          </div>

          {/* Bottom Coordinates */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6 w-full max-w-7xl mx-auto text-xs font-mono text-slate-400">
            <div className="flex items-center gap-6">
              <a
                href={PORTFOLIO_DATA.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 flex items-center gap-1.5 transition-colors"
              >
                <GithubIcon size={14} /> GITHUB
              </a>
              <a
                href={PORTFOLIO_DATA.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 flex items-center gap-1.5 transition-colors"
              >
                <LinkedinIcon size={14} /> LINKEDIN
              </a>
              <a
                href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                className="hover:text-blue-400 flex items-center gap-1.5 transition-colors"
              >
                <Mail size={14} /> {PORTFOLIO_DATA.personal.email}
              </a>
            </div>

            <div className="text-slate-500">
              PRESS <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white">ESC</kbd> TO EXIT
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
