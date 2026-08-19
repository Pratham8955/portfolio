'use client'

import { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { FileText, Command as CommandIcon, Menu } from 'lucide-react'
import { useAppStore } from '@/lib/store'
import { Magnetic } from './magnetic'
import { PORTFOLIO_DATA } from '@/data/portfolio'

export function Navigation() {
  const shouldReduceMotion = useReducedMotion()
  const {
    resumePreviewOpen,
    selectedProjectId,
    setFullScreenMenuOpen,
    setResumePreviewOpen,
    setCommandPaletteOpen,
    setCursor,
    resetCursor,
  } = useAppStore()

  const [activeSection, setActiveSection] = useState('')
  const [scrolled, setScrolled] = useState(false)

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Education', href: '#education' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#stack' },
    { label: 'Contact', href: '#contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)

      const sections = ['hero', 'about', 'experience', 'education', 'projects', 'how-i-build', 'stack', 'contact']
      const scrollPosition = window.scrollY + window.innerHeight * 0.35

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const hideNav = resumePreviewOpen || selectedProjectId !== null

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{
        y: hideNav ? -120 : 0,
        opacity: hideNav ? 0 : 1,
      }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="fixed top-4 sm:top-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none"
    >
      <nav
        className={`pointer-events-auto flex items-center justify-between gap-3 sm:gap-6 px-4 sm:px-6 py-2.5 rounded-full transition-all duration-300 ${
          scrolled
            ? 'bg-[#0a0c16]/85 backdrop-blur-xl border border-white/15 shadow-[0_10px_35px_rgba(0,0,0,0.7)]'
            : 'bg-[#0a0c16]/60 backdrop-blur-lg border border-white/10 shadow-lg'
        }`}
      >
        {/* Monogram / Brand */}
        <a
          href="#hero"
          onMouseEnter={() => setCursor('button', 'HOME')}
          onMouseLeave={resetCursor}
          className="flex items-center gap-2 font-black text-sm sm:text-base tracking-tighter text-white hover:text-blue-400 transition-colors"
        >
          <span className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-xs font-mono font-bold text-white shadow-[0_0_12px_rgba(59,130,246,0.5)]">
            {PORTFOLIO_DATA.personal.monogram}
          </span>
          <span className="hidden sm:inline font-bold tracking-tight">PRATHAM SALI</span>
        </a>

        {/* Center Nav Links (Desktop) */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const sectionTarget = link.href.replace('#', '')
            const isActive = activeSection === sectionTarget

            return (
              <a
                key={link.label}
                href={link.href}
                onMouseEnter={() => setCursor('button')}
                onMouseLeave={resetCursor}
                className={`relative px-3.5 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider transition-colors duration-200 ${
                  isActive
                    ? 'text-white font-bold bg-white/10 border border-white/15 shadow-inner'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                {link.label}
              </a>
            )
          })}
        </div>

        {/* Right Actions: Resume, Cmd+K, Menu Trigger */}
        <div className="flex items-center gap-2">
          {/* Resume Trigger */}
          <Magnetic>
            <button
              onClick={() => setResumePreviewOpen(true)}
              onMouseEnter={() => setCursor('button', 'RESUME')}
              onMouseLeave={resetCursor}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 hover:text-white font-mono text-[11px] font-semibold tracking-wider transition-colors"
            >
              <FileText size={13} />
              <span>RESUME</span>
            </button>
          </Magnetic>

          {/* Cmd+K Palette Trigger */}
          <button
            onClick={() => setCommandPaletteOpen(true)}
            onMouseEnter={() => setCursor('button', 'SEARCH')}
            onMouseLeave={resetCursor}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white font-mono text-[11px] transition-colors"
            title="Open Command Palette (Cmd + K)"
          >
            <CommandIcon size={12} />
            <span>K</span>
          </button>

          {/* Full-Screen Menu Hamburger */}
          <Magnetic>
            <button
              onClick={() => setFullScreenMenuOpen(true)}
              onMouseEnter={() => setCursor('menu')}
              onMouseLeave={resetCursor}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-blue-600 border border-white/15 text-white font-mono text-xs uppercase tracking-wider font-bold transition-all duration-300 shadow-sm"
              aria-label="Open Fullscreen Menu"
            >
              <Menu size={14} />
              <span className="hidden xs:inline">MENU</span>
            </button>
          </Magnetic>
        </div>
      </nav>
    </motion.header>
  )
}
