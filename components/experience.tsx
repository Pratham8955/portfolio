'use client'

import { motion, useReducedMotion } from 'framer-motion'


const experiences = [
  {
    role: 'Full-Stack Intern',
    company: 'Elaunch Solutions Pvt. Ltd.',
    period: 'January 2025 – July 2025',
    location: 'Surat, Gujarat',
    highlights: [
      'Built full-stack features on live projects with Next.js frontend and Node.js backend',
      'Designed and delivered REST APIs for core application features including profile and task management',
      'Validated API functionality through manual testing, identifying and resolving bugs early',
      'Optimized application performance using MongoDB and Redis for data storage and caching',
    ],
  },
  {
    role: 'Java Backend Trainee',
    company: 'Finlogic Technologies India Pvt. Ltd.',
    period: 'June 2023 – June 2024',
    location: 'Surat, Gujarat',
    highlights: [
      'Completed hands-on training in Java-based backend development through STEP traineeship',
      'Developed backend APIs using Advanced Java for handling customer queries and requests',
      'Tested applications using Postman and gained exposure to real-world development practices',
      'Collaborated with senior developers to understand coding standards and best practices',
    ],
  },
]

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
          <div className="absolute left-0 top-3 bottom-3 w-[2px] bg-muted/30">
            <motion.div
              className="absolute top-0 left-0 w-full bg-accent origin-top"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 1.2, ease: 'easeInOut' }}
              style={{ height: '100%', originY: 0 }}
            />
          </div>

          <div className="space-y-10 md:space-y-12">
            {experiences.map((exp, idx) => (
              <div key={idx} className="relative pl-7 md:pl-12">
                {/* Timeline Dot */}
                <div className="absolute left-0 -translate-x-1/2 top-[28px] z-10">
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
                    className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full bg-accent border-2 border-background ring-4 ring-accent/15 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                  />
                </div>

                {/* Timeline Card */}
                <motion.div
                  initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: idx * 0.1 }}
                  className="subtle-border rounded-xl p-5 md:p-8 bg-card/80 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5 hover:-translate-y-1 transition-[border-color,box-shadow,transform] duration-200 group"
                  style={{ willChange: 'transform, opacity' }}
                >
                  <div className="flex flex-col gap-2 mb-5 md:mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg md:text-2xl font-semibold text-foreground group-hover:text-accent transition-colors leading-snug">
                          {exp.role}
                        </h3>
                        <p className="text-accent font-medium mt-1 text-sm md:text-base">{exp.company}</p>
                        <p className="text-xs text-muted-foreground group-hover:text-foreground mt-0.5 transition-colors">{exp.location}</p>
                      </div>
                      <p className="text-xs text-muted-foreground group-hover:text-foreground whitespace-nowrap font-medium bg-muted/30 px-3 py-1 rounded-full border border-border/20 self-start transition-colors">
                        {exp.period}
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {exp.highlights.map((highlight, i) => (
                      <li key={i} className="flex gap-3 text-muted-foreground group-hover:text-foreground transition-colors">
                        <span className="text-accent font-bold mt-1.5 text-xs shrink-0">•</span>
                        <span className="text-sm leading-relaxed">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
