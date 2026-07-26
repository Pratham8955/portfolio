'use client'

import { motion, useReducedMotion, Variants, AnimatePresence, useMotionTemplate, useMotionValue } from 'framer-motion'
import { Code, Briefcase, Mail, FileText, CheckCircle2 } from 'lucide-react'
import { useState, useEffect, MouseEvent } from 'react'
import { Magnetic } from './magnetic'
import { useAppStore } from '@/lib/store'

const roles = [
  'Full-Stack Developer',
  'Software Engineer',
  'Backend Architect',
  'Java Developer',
  'Node.js Developer',
  '.NET Developer',
]

function RoleCycler({ shouldReduceMotion }: { shouldReduceMotion: boolean }) {
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    if (shouldReduceMotion) return
    const id = setInterval(() => {
      setRoleIndex(i => (i + 1) % roles.length)
    }, 2500)
    return () => clearInterval(id)
  }, [shouldReduceMotion])

  return (
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
  )
}

export function Hero() {
  const shouldReduceMotion = !!useReducedMotion()
  const { resumePreviewOpen, setResumePreviewOpen } = useAppStore()

  // Mouse lighting effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    // Only compute for non-reduced motion
    if (shouldReduceMotion) return
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

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
      className="portfolio-container section-padding flex flex-col justify-center min-h-[auto] md:min-h-[min(100dvh,850px)] relative overflow-hidden group/hero"
      onMouseMove={handleMouseMove}
      style={{ contentVisibility: 'visible' }}
    >
      {/* Floating Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent/5 blur-[120px] transform-gpu will-change-transform"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, -40, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] rounded-full bg-indigo-500/5 blur-[100px] transform-gpu will-change-transform"
        />
      </div>

      {/* Mouse Lighting (Cursor aware) */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover/hero:opacity-100 hidden md:block"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(59, 130, 246, 0.05),
              transparent 80%
            )
          `,
        }}
      />

      <motion.div
        className="space-y-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="space-y-4" style={{ willChange: 'transform, opacity' }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-medium text-accent">Available for new opportunities</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-foreground text-pretty tracking-tight">
            <span className="bg-gradient-to-r from-accent to-indigo-500 bg-clip-text text-transparent">
              Pratham Sali
            </span>
          </h1>

          {/* Cycling role subtitle optimized to prevent full Hero re-renders */}
          <RoleCycler shouldReduceMotion={shouldReduceMotion} />
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
          <Magnetic>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 bg-accent text-accent-foreground font-medium rounded-lg hover:bg-accent/90 transition-colors duration-200 shadow-lg shadow-accent/20 text-sm md:text-base relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <Mail size={16} className="relative z-10" />
              <span className="relative z-10">Get in Touch</span>
            </a>
          </Magnetic>

          <Magnetic>
            <a
              href="https://github.com/Pratham8955"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 border border-border/50 bg-muted text-foreground font-medium rounded-lg hover:bg-muted/70 hover:text-accent hover:border-accent/50 transition-all duration-200 text-sm md:text-base group"
            >
              <Code size={16} className="group-hover:scale-110 transition-transform" />
              GitHub
            </a>
          </Magnetic>

          <Magnetic>
            <a
              href="https://www.linkedin.com/in/pratham-sali-7244a4216/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 border border-border/50 bg-muted text-foreground font-medium rounded-lg hover:bg-muted/70 hover:text-accent hover:border-accent/50 transition-all duration-200 text-sm md:text-base group"
            >
              <Briefcase size={16} className="group-hover:scale-110 transition-transform" />
              LinkedIn
            </a>
          </Magnetic>

          <Magnetic>
            <motion.button
              layoutId="resume-modal"
              onClick={() => setResumePreviewOpen(true)}
              className={`group relative flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-accent px-6 py-3 font-semibold text-accent-foreground shadow-lg hover:shadow-accent/25 ${resumePreviewOpen ? 'transition-none pointer-events-none' : ''}`}
              style={{ 
                opacity: resumePreviewOpen ? 0 : 1,
                borderRadius: '0.5rem' 
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FileText size={16} className="group-hover:scale-110 transition-transform" />
              Resume
            </motion.button>
          </Magnetic>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-3 gap-4 md:gap-6 pt-8 mt-2 w-full max-w-xs sm:max-w-sm md:max-w-xl border-t border-border/20"
          style={{ willChange: 'transform, opacity' }}
        >
          <div className="group">
            <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-accent group-hover:scale-105 transition-transform origin-left">1768+</p>
            <p className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground mt-1 uppercase tracking-wider font-semibold font-mono">
              Coding Hours
            </p>
          </div>
          <div className="group">
            <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-accent group-hover:scale-105 transition-transform origin-left">17+</p>
            <p className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground mt-1 uppercase tracking-wider font-semibold font-mono">
              Repositories
            </p>
          </div>
          <div className="group">
            <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-accent group-hover:scale-105 transition-transform origin-left">5+</p>
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
        <a href="#about" className="text-muted-foreground hover:text-accent transition-colors flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest font-mono">Scroll</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </motion.div>
    </section>
  )
}
