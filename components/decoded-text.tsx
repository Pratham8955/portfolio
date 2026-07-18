'use client'

import { useEffect, useState, useRef } from 'react'
import { useInView } from 'framer-motion'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*'

export function DecodedText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayText, setDisplayText] = useState(text)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: '-10% 0px' })

  useEffect(() => {
    if (!isInView) return

    let isMounted = true
    let frame = 0
    // Fewer frames (14) at a slightly faster interval (30ms) = ~420ms total, half the re-renders
    const totalFrames = 14
    const interval = 30

    const timer = setTimeout(() => {
      const run = setInterval(() => {
        if (!isMounted) { clearInterval(run); return }

        const progress = frame / totalFrames
        setDisplayText(
          text
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' '
              if (index / text.length < progress) return char
              return CHARS[Math.floor(Math.random() * CHARS.length)]
            })
            .join('')
        )

        if (frame >= totalFrames) {
          clearInterval(run)
          if (isMounted) setDisplayText(text)
        }
        frame++
      }, interval)

      return () => clearInterval(run)
    }, delay)

    return () => {
      isMounted = false
      clearTimeout(timer)
    }
  }, [isInView, text, delay])

  return <span ref={containerRef}>{displayText}</span>
}
