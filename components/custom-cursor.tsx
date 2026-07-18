'use client'

import { useEffect } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Dot — near-instant
  const dotX = useSpring(cursorX, { stiffness: 2000, damping: 80, mass: 0.05 })
  const dotY = useSpring(cursorY, { stiffness: 2000, damping: 80, mass: 0.05 })

  // Ring — lazy trail
  const ringX = useSpring(cursorX, { stiffness: 150, damping: 22, mass: 0.4 })
  const ringY = useSpring(cursorY, { stiffness: 150, damping: 22, mass: 0.4 })

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    window.addEventListener('mousemove', moveCursor, { passive: true })
    return () => window.removeEventListener('mousemove', moveCursor)
  }, [cursorX, cursorY])

  return (
    <>
      {/* Inner glowing dot */}
      <motion.div
        className="pointer-events-none fixed z-[9999] rounded-full will-change-transform"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          width: 8,
          height: 8,
          backgroundColor: 'rgba(59,130,246,0.95)',
          boxShadow: '0 0 8px 2px rgba(59,130,246,0.5)',
        }}
      />

      {/* Trailing ring */}
      <motion.div
        className="pointer-events-none fixed z-[9998] rounded-full will-change-transform"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: 32,
          height: 32,
          border: '1.5px solid rgba(59,130,246,0.4)',
        }}
      />
    </>
  )
}
