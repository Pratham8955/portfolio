'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export function SplashScreen({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 2200) // 2.2 seconds for the splash screen
    return () => clearTimeout(timer)
  }, [])

  const [animationComplete, setAnimationComplete] = useState(false)

  // If not mounted yet, render a basic static splash to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
        <div className="text-4xl font-bold tracking-tighter flex items-center gap-1">
          <span className="text-foreground">P</span>
          <span className="text-accent">S</span>
          <span className="text-foreground">.</span>
        </div>
      </div>
    )
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash && (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.1,
              filter: "blur(10px)"
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background pointer-events-none"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative flex flex-col items-center justify-center"
            >
              <div className="text-5xl md:text-6xl font-bold tracking-tighter flex items-center gap-3 relative z-10">
                <span className="text-foreground">Pratham</span>
                <span className="text-accent">Sali</span>
              </div>

              <motion.div
                className="absolute inset-0 rounded-full border border-accent/20 scale-[2]"
                initial={{ scale: 0.5, opacity: 1 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Apple-style system zoom transition for the main app content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
        animate={{
          opacity: showSplash ? 0 : 1,
          scale: showSplash ? 0.95 : 1,
          filter: showSplash ? "blur(4px)" : "blur(0px)",
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        onAnimationComplete={() => {
          if (!showSplash) setAnimationComplete(true)
        }}
        className="min-h-screen"
        style={animationComplete ? { transform: 'none', filter: 'none' } : undefined}
      >
        {children}
      </motion.div>
    </>
  )
}
