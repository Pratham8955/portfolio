'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { DecodedText } from './decoded-text'
import {
  Code2,
  Terminal,
  Globe,
  Layers,
  Cpu,
  Server,
  Database,
  Flame,
  GitBranch,
  Workflow,
  Cpu as CpuIcon
} from 'lucide-react'

const row1Skills = [
  { name: 'Java', icon: Code2 },
  { name: 'JavaScript', icon: Terminal },
  { name: 'HTML', icon: Globe },
  { name: 'Next.js', icon: Layers },
  { name: 'Node.js', icon: Cpu },
  { name: 'Spring MVC', icon: Server },
  { name: 'MongoDB', icon: Database },
  { name: 'Git', icon: GitBranch },
  { name: 'Docker', icon: Layers },
  { name: 'VS Code', icon: Terminal },
]

const row2Skills = [
  { name: 'C#', icon: Code2 },
  { name: 'TypeScript', icon: Terminal },
  { name: 'CSS', icon: Globe },
  { name: 'React', icon: Layers },
  { name: 'Express.js', icon: Server },
  { name: '.NET Core', icon: CpuIcon },
  { name: 'MySQL', icon: Database },
  { name: 'Redis', icon: Flame },
  { name: 'GitHub', icon: GitBranch },
  { name: 'Postman', icon: Workflow },
]

const competencies = [
  { label: 'RESTful API Development', percentage: 90 },
  { label: 'System Architecture', percentage: 85 },
  { label: 'Database Design & Optimization', percentage: 80 },
  { label: 'Real-Time WebSockets & Webhook Handling', percentage: 75 },
  { label: 'Agile & Team Collaboration', percentage: 95 },
  { label: 'CI/CD & Cloud Deployment', percentage: 60 },
]

function Marquee({ items, direction = 'left', speed = 35, shouldReduceMotion }: { items: typeof row1Skills, direction?: 'left' | 'right', speed?: number, shouldReduceMotion: boolean }) {
  const duplicatedItems = [...items, ...items]

  return (
    <div className="relative w-full overflow-hidden py-3">
      {/* Soft gradient fade on left and right edges */}
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div
        className={`flex gap-4 w-max hover:[animation-play-state:paused] ${shouldReduceMotion
          ? ''
          : direction === 'left'
            ? 'animate-marquee'
            : 'animate-marquee-reverse'
          }`}
        style={{ '--speed': `${speed}s` } as React.CSSProperties}
      >
        {duplicatedItems.map((item, idx) => {
          const Icon = item.icon
          return (
            <div
              key={idx}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-border/40 bg-card/30 backdrop-blur-sm hover:border-accent/40 hover:text-accent transition-all duration-300 select-none group"
            >
              <Icon size={16} className="text-muted-foreground group-hover:text-accent transition-colors duration-300" />
              <span className="text-sm font-medium text-foreground">{item.name}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ProgressBar({ label, percentage, shouldReduceMotion }: { label: string, percentage: number, shouldReduceMotion: boolean }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-foreground">{label}</span>
        <span className="text-muted-foreground font-semibold">{percentage}%</span>
      </div>
      <div className="h-2 w-full bg-muted/50 rounded-full overflow-hidden border border-border/10">
        <motion.div
          className="h-full bg-accent rounded-full shadow-lg shadow-accent/20"
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0 : 1.2, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

export function Skills() {
  const shouldReduceMotion = !!useReducedMotion()

  return (
    <section id="skills" className="portfolio-container section-padding">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="space-y-16"
      >
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            <DecodedText text="Skills & Expertise" />
          </h2>
          <p className="text-muted-foreground max-w-xl">
            A snapshot of technologies I use to build scalable full-stack applications.
          </p>
        </div>

        {/* Marquees */}
        <div className="space-y-4 py-2">
          <Marquee items={row1Skills} direction="left" speed={30} shouldReduceMotion={shouldReduceMotion} />
          <Marquee items={row2Skills} direction="right" speed={32} shouldReduceMotion={shouldReduceMotion} />
        </div>

        {/* Competencies Progress Bars */}
        <div className="pt-8">
          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-8">
            Core Competencies
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {competencies.map((comp, idx) => (
              <ProgressBar
                key={idx}
                label={comp.label}
                percentage={comp.percentage}
                shouldReduceMotion={shouldReduceMotion}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
