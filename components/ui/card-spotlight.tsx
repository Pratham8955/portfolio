'use client'

import React, { useRef, useState } from 'react'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CardSpotlightProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  radius?: number
  spotlightColor?: string
  className?: string
}

export function CardSpotlight({
  children,
  radius = 400,
  spotlightColor = 'rgba(59, 130, 246, 0.15)',
  className,
  ...props
}: CardSpotlightProps) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [isHovered, setIsHovered] = useState(false)

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  const maskImage = useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, white, transparent 80%)`

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn('group relative', className)}
      {...props}
    >
      {/* Spotlight overlay */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: spotlightColor,
          maskImage,
          WebkitMaskImage: maskImage,
        }}
      />
      {/* Animated gradient border on hover */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: 'transparent',
          border: '1px solid transparent',
          backgroundImage: useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, rgba(59,130,246,0.4), transparent 80%)`,
          backgroundOrigin: 'border-box',
          maskImage,
          WebkitMaskImage: maskImage,
        }}
      />
      {children}
    </div>
  )
}
