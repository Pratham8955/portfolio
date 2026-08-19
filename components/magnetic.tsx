'use client'

import React, { useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface MagneticProps {
  children: React.ReactNode
  strength?: number
  className?: string
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export function Magnetic({
  children,
  strength = 0.35,
  className = '',
  onMouseEnter,
  onMouseLeave,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const shouldReduceMotion = useReducedMotion()

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !ref.current) return
    const { clientX, clientY } = e
    const { height, width, left, top } = ref.current.getBoundingClientRect()
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    setPosition({ x: middleX * strength, y: middleY * strength })
  }

  const reset = () => {
    setPosition({ x: 0, y: 0 })
    if (onMouseLeave) onMouseLeave()
  }

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 350, damping: 20, mass: 0.5 }}
    >
      {children}
    </motion.div>
  )
}
