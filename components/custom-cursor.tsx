'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useAppStore } from '@/lib/store'

export function CustomCursor() {
  const shouldReduceMotion = useReducedMotion()
  const { cursorVariant, cursorText } = useAppStore()
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Detect touch device
    const checkTouch = () => {
      setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window)
    }
    checkTouch()
    window.addEventListener('resize', checkTouch)
    return () => window.removeEventListener('resize', checkTouch)
  }, [])

  useEffect(() => {
    if (isTouchDevice || shouldReduceMotion) return

    let mouseX = -100
    let mouseY = -100
    let currentX = -100
    let currentY = -100
    let rafId: number

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!isVisible) setIsVisible(true)

      // Direct placement for inner dot (instant response)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX - 3}px, ${mouseY - 3}px, 0)`
      }
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    // Smooth spring/lerp for trailing badge
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor

    const render = () => {
      currentX = lerp(currentX, mouseX, 0.2)
      currentY = lerp(currentY, mouseY, 0.2)

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`
      }

      rafId = requestAnimationFrame(render)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    rafId = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(rafId)
    }
  }, [isTouchDevice, isVisible, shouldReduceMotion])

  if (isTouchDevice || shouldReduceMotion) return null

  const isExpanded = cursorVariant !== 'default' && cursorVariant !== 'hidden'
  const displayText = cursorText || (
    cursorVariant === 'project' ? 'VIEW' :
    cursorVariant === 'button' ? 'OPEN' :
    cursorVariant === 'menu' ? 'MENU' :
    cursorVariant === 'github' ? 'GITHUB' :
    cursorVariant === 'contact' ? "LET'S TALK" : ''
  )

  return (
    <>
      {/* Precision Center Dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_#3b82f6] will-change-transform"
        style={{
          opacity: isVisible && cursorVariant !== 'hidden' ? 1 : 0,
          transition: 'opacity 0.2s ease',
        }}
      />

      {/* Dynamic Morphing Outer Cursor Badge */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] will-change-transform"
        style={{
          opacity: isVisible && cursorVariant !== 'hidden' ? 1 : 0,
          transition: 'opacity 0.2s ease',
        }}
      >
        <motion.div
          className="relative -top-1/2 -left-1/2 flex items-center justify-center rounded-full transition-colors duration-200"
          animate={{
            width: isExpanded ? 80 : 34,
            height: isExpanded ? 80 : 34,
            backgroundColor: isExpanded ? 'rgba(59, 130, 246, 0.95)' : 'rgba(59, 130, 246, 0.08)',
            borderColor: isExpanded ? 'rgba(255, 255, 255, 0.4)' : 'rgba(59, 130, 246, 0.35)',
            backdropFilter: isExpanded ? 'blur(4px)' : 'none',
          }}
          transition={{ type: 'spring', stiffness: 450, damping: 28 }}
          style={{
            borderWidth: '1.5px',
            borderStyle: 'solid',
            boxShadow: isExpanded ? '0 0 25px rgba(59, 130, 246, 0.6)' : 'none',
          }}
        >
          <AnimatePresence>
            {isExpanded && displayText && (
              <motion.span
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.15 }}
                className="font-mono text-[10px] font-extrabold uppercase tracking-widest text-white select-none text-center px-1"
              >
                {displayText}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  )
}
