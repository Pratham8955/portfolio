'use client'

import { motion, useReducedMotion, useSpring } from 'framer-motion'
import { useRef } from 'react'

export function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const springConfig = { stiffness: 180, damping: 18, mass: 0.1 }
  const x = useSpring(0, springConfig)
  const y = useSpring(0, springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (shouldReduceMotion || !ref.current) return
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    x.set((e.clientX - (left + width / 2)) * 0.3)
    y.set((e.clientY - (top + height / 2)) * 0.3)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  if (shouldReduceMotion) {
    return <div ref={ref}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
    >
      {children}
    </motion.div>
  )
}
