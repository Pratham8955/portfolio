'use client'

import { motion, useReducedMotion, Variants, AnimatePresence } from 'framer-motion'
import { Code, Briefcase, Mail, FileText } from 'lucide-react'
import { useState, useEffect } from 'react'

export function Hero() {
  const shouldReduceMotion = !!useReducedMotion()

  const roles = [
    'Full-Stack Developer',
    'Node.js Developer',
    'Backend Architect',
    'Java Developer',
    '.NET Developer',
  ]
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    if (shouldReduceMotion) return
    const id = setInterval(() => {
      setRoleIndex(i => (i + 1) % roles.length)
    }, 2500)
    return () => clearInterval(id)
  }, [shouldReduceMotion])

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: 0.05,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  const tagline = "Building scalable web applications with a strong backend foundation. Specializing in Node.js, TypeScript, and modern full-stack technologies."

  return (
    <section
      className="portfolio-container section-padding flex flex-col justify-center min-h-[auto] md:min-h-[min(100vh,850px)] relative overflow-hidden"
      style={{ contentVisibility: 'visible' }}
    >
      <motion.div
        className="space-y-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="space-y-2" style={{ willChange: 'transform, opacity' }}>
          <h1 className="text-5xl md:text-7xl font-bold text-foreground text-pretty tracking-tight">
            <span className="bg-gradient-to-r from-accent to-indigo-500 bg-clip-text text-transparent">
              Pratham Sali
            </span>
          </h1>

          {/* Cycling role subtitle */}
          <div className="h-8 md:h-10 flex items-center overflow-hidden">
            <span className="text-xl md:text-2xl text-muted-foreground mr-2">I&apos;m a&nbsp;</span>
            <div className="relative overflow-hidden h-8 md:h-10 flex items-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={{ y: 28, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -28, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="text-xl md:text-2xl font-semibold text-accent block"
                  style={{ willChange: 'transform, opacity' }}
                >
                  {roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Single fade-in for tagline — no per-word animation overhead */}
        <motion.p
          variants={itemVariants}
          className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed"
          style={{ willChange: 'transform, opacity' }}
        >
          {tagline}
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-wrap gap-3 pt-4" style={{ willChange: 'transform, opacity' }}>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 bg-accent text-accent-foreground font-medium rounded-lg hover:bg-accent/90 hover:-translate-y-1 active:translate-y-0 transition-[background-color,transform] duration-200 shadow-lg shadow-accent/20 text-sm md:text-base"
          >
            <Mail size={16} />
            Get in Touch
          </a>
          <a
            href="https://github.com/Pratham8955"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 border border-border/50 bg-muted text-foreground font-medium rounded-lg hover:bg-muted/70 hover:text-accent hover:border-accent/50 hover:-translate-y-1 active:translate-y-0 transition-[background-color,color,border-color,transform] duration-200 text-sm md:text-base"
          >
            <Code size={16} />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/pratham-sali-7244a4216/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 border border-border/50 bg-muted text-foreground font-medium rounded-lg hover:bg-muted/70 hover:text-accent hover:border-accent/50 hover:-translate-y-1 active:translate-y-0 transition-[background-color,color,border-color,transform] duration-200 text-sm md:text-base"
          >
            <Briefcase size={16} />
            LinkedIn
          </a>
          <a
            href="/Pratham_Sali_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 border border-border/50 bg-muted text-foreground font-medium rounded-lg hover:bg-muted/70 hover:text-accent hover:border-accent/50 hover:-translate-y-1 active:translate-y-0 transition-[background-color,color,border-color,transform] duration-200 text-sm md:text-base"
          >
            <FileText size={16} />
            Resume
          </a>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-3 gap-4 md:gap-6 pt-8 mt-2 w-full max-w-xs sm:max-w-sm md:max-w-xl border-t border-border/20"
          style={{ willChange: 'transform, opacity' }}
        >
          <div>
            <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-accent">1768+</p>
            <p className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground mt-1 uppercase tracking-wider font-semibold font-mono">
              Coding Hours
            </p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-accent">17+</p>
            <p className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground mt-1 uppercase tracking-wider font-semibold font-mono">
              Repositories
            </p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-accent">5+</p>
            <p className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground mt-1 uppercase tracking-wider font-semibold font-mono">
              Live Projects
            </p>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={shouldReduceMotion ? {} : { y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ willChange: 'transform' }}
      >
        <a href="#about" className="text-muted-foreground hover:text-accent transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </motion.div>
    </section>
  )
}
