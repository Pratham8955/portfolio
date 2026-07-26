'use client'

import { motion, useScroll, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const [readingProgress, setReadingProgress] = useState(0)

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      setReadingProgress(Math.round(latest * 100))
    })
  }, [scrollYProgress])

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent origin-left z-50 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
        style={{ scaleX }}
      />
      
      {/* Reading Progress Indicator */}
      <motion.div 
        className="fixed bottom-6 right-6 z-40 bg-card/80 backdrop-blur-md border border-border/50 text-muted-foreground text-xs font-mono px-2 py-1 rounded-md shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: readingProgress > 5 ? 1 : 0, y: readingProgress > 5 ? 0 : 20 }}
        transition={{ duration: 0.3 }}
      >
        {readingProgress}%
      </motion.div>
    </>
  )
}
