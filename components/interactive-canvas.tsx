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
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    // Reduced particle count for performance
    const particleCount = Math.min(50, Math.floor((width * height) / 30000))
    const connectionDistance = 100
    const connectionDistanceSq = connectionDistance * connectionDistance
    const mouse = { x: null as number | null, y: null as number | null, radius: 120 }
    let mousePending = false

    class Particle {
      x: number
      y: number
      vx: number
      vy: number
      radius: number

      constructor() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.vx = (Math.random() - 0.5) * 0.25
        this.vy = (Math.random() - 0.5) * 0.25
        this.radius = Math.random() * 1.2 + 0.4
      }

      update() {
        this.x += this.vx
        this.y += this.vy

        if (this.x < 0) this.x = width
        if (this.x > width) this.x = 0
        if (this.y < 0) this.y = height
        if (this.y > height) this.y = 0

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x
          const dy = mouse.y - this.y
          const distSq = dx * dx + dy * dy
          const radiusSq = mouse.radius * mouse.radius
          if (distSq < radiusSq) {
            const dist = Math.sqrt(distSq)
            const force = (mouse.radius - dist) / mouse.radius
            const angle = Math.atan2(dy, dx)
            this.x -= Math.cos(angle) * force * 1.0
            this.y -= Math.sin(angle) * force * 1.0
          }
        }
      }
    }

    const particles: Particle[] = []

    const init = () => {
      particles.length = 0
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      // Draw particles
      ctx.fillStyle = 'rgba(59, 130, 246, 0.25)'
      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        ctx.beginPath()
        ctx.arc(particles[i].x, particles[i].y, particles[i].radius, 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw connections — batched by opacity bucket to reduce ctx state changes
      ctx.lineWidth = 0.7
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distSq = dx * dx + dy * dy

          if (distSq < connectionDistanceSq) {
            const opacity = (1 - Math.sqrt(distSq) / connectionDistance) * 0.08
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(59,130,246,${opacity.toFixed(2)})`
            ctx.stroke()
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      init()
    }

    // Throttle mousemove via rAF flag — fires at most once per frame
    const handleMouseMove = (e: MouseEvent) => {
      if (mousePending) return
      mousePending = true
      requestAnimationFrame(() => {
        mouse.x = e.clientX
        mouse.y = e.clientY
        mousePending = false
      })
    }

    const handleMouseLeave = () => {
      mouse.x = null
      mouse.y = null
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)

    init()
    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [shouldReduceMotion])

  if (shouldReduceMotion) return null

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 -z-10" />
}
