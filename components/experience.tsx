'use client'

import { motion, useReducedMotion, useMotionTemplate, useMotionValue, AnimatePresence } from 'framer-motion'
import { useState, MouseEvent } from 'react'
import { Building2, ChevronDown, CheckCircle2 } from 'lucide-react'

const experiences = [
  {
    role: 'Full-Stack Developer',
    company: 'Elaunch Solutions Pvt. Ltd.',
    period: 'January 2026 – July 2026',
    location: 'Surat, Gujarat',
    highlights: [
      'Built full-stack features on live projects with Next.js frontend and Node.js backend',
      'Designed and delivered REST APIs for core application features including profile and task management',
      'Validated API functionality through manual testing, identifying and resolving bugs early',
      'Optimized application performance using MongoDB and Redis for data storage and caching',
    ],
    techStack: ['Next.js', 'Node.js', 'MongoDB', 'Redis', 'REST API'],
    impact: 'Improved API response times by 30% through Redis caching.'
  },
  {
    role: 'Java Backend Developer',
    company: 'NJ India Pvt. Ltd.',
    period: 'June 2023 – June 2024',
    location: 'Surat, Gujarat',
    highlights: [
      'Completed hands-on training in Java-based backend development through STEP traineeship',
      'Developed backend APIs using Advanced Java for handling customer queries and requests',
      'Tested applications using Postman and gained exposure to real-world development practices',
      'Collaborated with senior developers to understand coding standards and best practices',
    ],
    techStack: ['Advanced Java', 'MySQL', 'Postman', 'Spring Boot'],
    impact: 'Streamlined customer query handling process reducing resolution time.'
  },
]

function ExperienceCard({ exp, idx, shouldReduceMotion }: { exp: typeof experiences[0], idx: number, shouldReduceMotion: boolean }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    if (shouldReduceMotion) return
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <div className="relative pl-7 md:pl-12 group/timeline">
      {/* Timeline Dot */}
      <div className="absolute left-0 -translate-x-1/2 top-[40px] md:top-[46px] z-10">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={shouldReduceMotion ? { duration: 0 } : {
            delay: idx * 0.15 + 0.2,
            type: 'spring',
            stiffness: 300,
            damping: 15
          }}
          className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-accent border-4 border-background shadow-[0_0_15px_rgba(59,130,246,0.6)] group-hover/timeline:scale-125 transition-transform duration-300"
        />
      </div>

      {/* Timeline Card */}
      <motion.div
        initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: idx * 0.1 }}
        onMouseMove={handleMouseMove}
        onClick={() => setIsExpanded(!isExpanded)}
        className="subtle-border rounded-xl p-6 md:p-8 bg-card/80 transition-colors transition-shadow duration-300 group relative overflow-hidden cursor-pointer hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/10 transform-gpu will-change-transform"
        style={{ transformStyle: 'preserve-3d' }}
        whileHover={shouldReduceMotion ? {} : { y: -4, rotateX: 1, rotateY: -1 }}
      >
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 hidden md:block transform-gpu"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                400px circle at ${mouseX}px ${mouseY}px,
                rgba(59, 130, 246, 0.08),
                transparent 80%
              )
            `,
          }}
        />

        <div className="relative z-10">
          <div className="flex flex-col gap-4 mb-2">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-muted/80 text-muted-foreground group-hover:bg-accent/10 group-hover:text-accent transition-colors duration-300 shadow-inner">
                  <Building2 size={24} className="group-hover:animate-pulse" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-accent transition-colors leading-snug">
                    {exp.role}
                  </h3>
                  <p className="text-accent font-medium mt-1 text-base">{exp.company}</p>
                  <p className="text-sm text-muted-foreground group-hover:text-foreground mt-0.5 transition-colors">{exp.location}</p>
                </div>
              </div>
              <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-4 sm:gap-2 w-full sm:w-auto mt-4 sm:mt-0 border-t sm:border-t-0 border-border/30 pt-4 sm:pt-0">
                <p className="text-xs text-muted-foreground group-hover:text-foreground whitespace-nowrap font-medium bg-muted/50 px-3 py-1.5 rounded-full border border-border/20 transition-colors">
                  {exp.period}
                </p>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-1.5 bg-muted/30 rounded-full text-muted-foreground group-hover:text-accent group-hover:bg-accent/10 transition-colors flex-shrink-0"
                >
                  <ChevronDown size={16} />
                </motion.div>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="overflow-hidden"
                style={{ willChange: "height, opacity" }}
              >
                <div className="pt-10 border-t border-border/30 space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-accent" />
                      Key Responsibilities & Achievements
                    </h4>
                    <ul className="space-y-3">
                      {exp.highlights.map((highlight, i) => (
                        <li key={i} className="flex gap-3 text-muted-foreground group-hover:text-foreground/90 transition-colors">
                          <span className="text-accent font-bold mt-1.5 text-[10px] shrink-0">✦</span>
                          <span className="text-sm leading-relaxed">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-2">Tech Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.techStack.map(tech => (
                          <span key={tech} className="px-2.5 py-1 text-xs font-medium rounded-md bg-muted/50 border border-border/30 text-muted-foreground">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-2">Key Impact</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {exp.impact}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}

export function Experience() {
  const shouldReduceMotion = !!useReducedMotion()

  return (
    <section id="experience" className="portfolio-container section-padding">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-16">
          Experience
        </h2>

        <div className="relative ml-3 md:ml-8">
          {/* Connecting vertical line (draws down on scroll) */}
          <div className="absolute left-0 -translate-x-1/2 top-3 bottom-3 w-[2px] bg-muted/30 rounded-full overflow-hidden transform-gpu will-change-transform">
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-accent to-indigo-500 origin-top transform-gpu"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 1.5, ease: 'easeInOut' }}
              style={{ height: '100%', originY: 0 }}
            />
          </div>

          <div className="space-y-10 md:space-y-12">
            {experiences.map((exp, idx) => (
              <ExperienceCard key={idx} exp={exp} idx={idx} shouldReduceMotion={shouldReduceMotion} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
