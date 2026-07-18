'use client'

import { motion, useReducedMotion } from 'framer-motion'
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

const allSkills = [
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.04,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

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
            Skills &amp; Expertise
          </h2>
          <p className="text-muted-foreground max-w-xl">
            A snapshot of technologies I use to build scalable full-stack applications.
          </p>
        </div>

        {/* Static skills grid */}
        <motion.div
          className="flex flex-wrap gap-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {allSkills.map((item, idx) => {
            const Icon = item.icon
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-medium bg-muted text-muted-foreground hover:bg-muted/70 hover:text-foreground transition-colors duration-200 group"
              >
                <Icon size={16} className="text-muted-foreground group-hover:text-accent transition-colors duration-200" />
                <span>{item.name}</span>
              </motion.div>
            )
          })}
        </motion.div>

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
