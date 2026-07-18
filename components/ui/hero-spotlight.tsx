'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface HeroSpotlightProps {
  className?: string
  fill?: string
}

export function HeroSpotlight({ className, fill = 'rgba(59, 130, 246, 0.3)' }: HeroSpotlightProps) {
  return (
    <svg
      className={cn(
        'pointer-events-none absolute -top-40 left-0 h-[150%] w-full animate-spotlight opacity-0',
        className
      )}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3787 2842"
      fill="none"
    >
      <g filter="url(#heroSpotlightFilter)">
        <ellipse
          cx="1924.71"
          cy="273.501"
          rx="1924.71"
          ry="273.501"
          transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
          fill={fill}
          fillOpacity="0.35"
        />
      </g>
      <defs>
        <filter
          id="heroSpotlightFilter"
          x="0.860352"
          y="0.838989"
          width="3785.16"
          height="2840.26"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="151" result="effect1_foregroundBlur_1065_8" />
        </filter>
      </defs>
    </svg>
  )
}

interface AnimatedBorderProps {
  children: React.ReactNode
  className?: string
  containerClassName?: string
  duration?: number
}

export function AnimatedBorder({ children, className, containerClassName }: AnimatedBorderProps) {
  return (
    <div className={cn('relative group/border p-[1px] rounded-xl overflow-hidden', containerClassName)}>
      {/* Rotating conic gradient border */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover/border:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-[-200%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(59,130,246,0.6)_360deg)]" />
      </div>
      <div className={cn('relative z-10 rounded-[11px] bg-card/40 backdrop-blur-sm', className)}>
        {children}
      </div>
    </div>
  )
}
