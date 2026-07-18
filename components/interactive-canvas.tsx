'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

export function InteractiveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (shouldReduceMotion) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let lastTime = 0
    let isScrolling = false
    let scrollTimeout: ReturnType<typeof setTimeout>

    // Only 16fps — minimal CPU impact
    const TARGET_FPS = 16
    const FRAME_INTERVAL = 1000 / TARGET_FPS

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const particleCount = Math.min(20, Math.floor((width * height) / 80000))
    const connectionDistanceSq = 70 * 70

    interface ParticleData { x: number; y: number; vx: number; vy: number; radius: number }
    const particles: ParticleData[] = []

    const init = () => {
      particles.length = 0
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          radius: Math.random() * 1.0 + 0.4,
        })
      }
    }

    const animate = (timestamp: number) => {
      animationFrameId = requestAnimationFrame(animate)

      // Pause canvas drawing while user is scrolling — frees the main thread
      if (isScrolling) return

      const delta = timestamp - lastTime
      if (delta < FRAME_INTERVAL) return
      lastTime = timestamp - (delta % FRAME_INTERVAL)

      ctx.clearRect(0, 0, width, height)

      ctx.fillStyle = 'rgba(59, 130, 246, 0.3)'
      ctx.beginPath()
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0
        ctx.moveTo(p.x + p.radius, p.y)
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
      }
      ctx.fill()

      ctx.lineWidth = 0.5
      ctx.strokeStyle = 'rgba(59,130,246,0.05)'
      ctx.beginPath()
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          if (dx * dx + dy * dy < connectionDistanceSq) {
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
          }
        }
      }
      ctx.stroke()
    }

    const onScroll = () => {
      isScrolling = true
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => { isScrolling = false }, 150)
    }

    let resizeTimeout: ReturnType<typeof setTimeout>
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        width = canvas.width = window.innerWidth
        height = canvas.height = window.innerHeight
        init()
      }, 200)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })

    init()
    animationFrameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrameId)
      clearTimeout(resizeTimeout)
      clearTimeout(scrollTimeout)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [shouldReduceMotion])

  if (shouldReduceMotion) return null

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 -z-10" />
}
