'use client'

import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let dotX = -100, dotY = -100
    let ringX = -100, ringY = -100
    let rafId: number
    
    // Check if device is touch
    let isTouch = window.matchMedia('(pointer: coarse)').matches

    const moveCursor = (e: MouseEvent) => {
      dotX = e.clientX
      dotY = e.clientY
    }

    // Lerp ring toward dot each animation frame
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t
    const RING_SPEED = 0.18

    const tick = () => {
      if (!isTouch) {
        ringX = lerp(ringX, dotX, RING_SPEED)
        ringY = lerp(ringY, dotY, RING_SPEED)

        dot.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px)`
        ring.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px)`
        
        dot.style.opacity = '1'
        ring.style.opacity = '1'
      } else {
        dot.style.opacity = '0'
        ring.style.opacity = '0'
      }

      rafId = requestAnimationFrame(tick)
    }

    const mediaQuery = window.matchMedia('(pointer: coarse)')
    const handleMediaChange = (e: MediaQueryListEvent) => {
      isTouch = e.matches
    }

    // Handle dynamic switching (e.g. devtools)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMediaChange)
    } else {
      mediaQuery.addListener(handleMediaChange)
    }

    window.addEventListener('mousemove', moveCursor, { passive: true })
    rafId = requestAnimationFrame(tick)

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleMediaChange)
      } else {
        mediaQuery.removeListener(handleMediaChange)
      }
      window.removeEventListener('mousemove', moveCursor)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full will-change-transform"
        style={{
          width: 8,
          height: 8,
          backgroundColor: 'rgba(59,130,246,0.95)',
          boxShadow: '0 0 8px 2px rgba(59,130,246,0.5)',
        }}
      />

      {/* Trailing ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full will-change-transform"
        style={{
          width: 32,
          height: 32,
          border: '1.5px solid rgba(59,130,246,0.4)',
        }}
      />
    </>
  )
}
