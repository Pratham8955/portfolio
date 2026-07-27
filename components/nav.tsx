'use client'

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ThemeToggle } from './theme-toggle'
import { useState, useEffect } from 'react'
import { useAppStore } from '@/lib/store'

export function Navigation() {
  const shouldReduceMotion = !!useReducedMotion()
  const { resumePreviewOpen, projectModalOpen } = useAppStore()
  const [activeSection, setActiveSection] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Education', href: '#education' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ]

  useEffect(() => {
    const sections = navItems.map(item => item.href.slice(1))
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, observerOptions)

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    const handleScroll = () => {
      if (window.scrollY < 100) {
        setActiveSection('')
      }
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      {/* Nav Pill */}
      <motion.nav
        className="fixed top-5 left-0 right-0 mx-auto z-50 w-fit max-w-[calc(100vw-2rem)] border border-border/40 bg-background/60 backdrop-blur-lg rounded-full shadow-lg px-3 md:px-5 py-1.5 flex items-center gap-4 md:gap-6"
        initial={{ y: -100 }}
        animate={{ y: (resumePreviewOpen || projectModalOpen) ? -150 : 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.slice(1)
            return (
              <a
                key={item.label}
                href={item.href}
                className={`text-sm font-medium transition-colors relative px-4 py-1.5 rounded-full z-10 ${isActive
                    ? 'text-accent'
                    : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId={shouldReduceMotion ? undefined : "activeSectionBg"}
                    className="absolute inset-0 bg-accent/10 border border-accent/20 rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            )
          })}
        </div>

        <div className="flex items-center gap-2 pr-1">
          <ThemeToggle />

          {/* Mobile Menu Trigger */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted/50 transition-colors"
            whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            aria-label="Toggle menu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Dropdown — fixed to viewport, always centered */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[4.5rem] left-1/2 -translate-x-1/2 z-40 w-[85vw] max-w-xs p-3 bg-background/90 backdrop-blur-xl border border-border/40 rounded-3xl shadow-2xl flex flex-col gap-1 md:hidden"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1)
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-sm font-medium px-4 py-3 rounded-2xl transition-colors ${isActive
                      ? 'bg-accent/10 text-accent font-semibold'
                      : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
                    }`}
                >
                  {item.label}
                </a>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
