'use client'

import { motion, useReducedMotion, Variants, AnimatePresence } from 'framer-motion'
import { Code, Briefcase, Mail, FileText } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'
import { Magnetic } from './magnetic'

export function Hero() {
  const shouldReduceMotion = !!useReducedMotion()
  const containerRef = useRef<HTMLElement>(null)

  const roles = [
    'Full-Stack Developer',
    'Node.js Engineer',
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
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  const tagline = "Building scalable web applications with a strong backend foundation. Specializing in Node.js, TypeScript, and modern full-stack technologies."
  const words = tagline.split(" ")

  const typewriterContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  }

  const typewriterItem: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
  }

  return (
    <section
      ref={containerRef}
      className="portfolio-container section-padding flex flex-col justify-center min-h-screen relative overflow-hidden"
    >

      <motion.div
        className="space-y-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="space-y-2">
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
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="text-xl md:text-2xl font-semibold text-accent block"
                >
                  {roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={typewriterContainer}
          initial="hidden"
          animate="visible"
          className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed flex flex-wrap gap-x-1"
        >
          {words.map((word, index) => (
            <motion.span key={index} variants={typewriterItem}>
              {word}
            </motion.span>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">
          <Magnetic>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground font-medium rounded-lg hover:bg-accent/90 transition-colors shadow-lg shadow-accent/20"
            >
              <Mail size={18} />
              Get in Touch
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="https://github.com/Pratham8955"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border/50 bg-background/50 backdrop-blur-sm text-foreground font-medium rounded-lg hover:bg-muted/50 hover:border-accent/50 hover:text-accent transition-all duration-300"
            >
              <Code size={18} />
              GitHub
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="https://www.linkedin.com/in/pratham-sali-7244a4216/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border/50 bg-background/50 backdrop-blur-sm text-foreground font-medium rounded-lg hover:bg-muted/50 hover:border-accent/50 hover:text-accent transition-all duration-300"
            >
              <Briefcase size={18} />
              LinkedIn
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="/Pratham_Sali_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border/50 bg-background/50 backdrop-blur-sm text-foreground font-medium rounded-lg hover:bg-muted/50 hover:border-accent/50 hover:text-accent transition-all duration-300"
            >
              <FileText size={18} />
              Resume
            </a>
          </Magnetic>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-3 gap-6 pt-10 mt-2 max-w-xl border-t border-border/20"
        >
          <div>
            <p className="text-3xl md:text-4xl font-extrabold text-accent">1768+</p>
            <p className="text-[10px] md:text-xs text-muted-foreground mt-1 uppercase tracking-wider font-semibold font-mono">
              Coding Hours
            </p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-extrabold text-accent">17+</p>
            <p className="text-[10px] md:text-xs text-muted-foreground mt-1 uppercase tracking-wider font-semibold font-mono">
              Repositories
            </p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-extrabold text-accent">5+</p>
            <p className="text-[10px] md:text-xs text-muted-foreground mt-1 uppercase tracking-wider font-semibold font-mono">
              Live Projects
            </p>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        animate={shouldReduceMotion ? {} : { y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <a href="#about" className="text-muted-foreground hover:text-accent transition-colors">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </a>
      </motion.div>
    </section>
  )
}
