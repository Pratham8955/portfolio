'use client'

import { motion, useReducedMotion, useMotionTemplate, useMotionValue, AnimatePresence } from 'framer-motion'
import { useState, MouseEvent } from 'react'
import { GraduationCap, ChevronDown, CheckCircle2 } from 'lucide-react'

const educationList = [
  {
    degree: 'MSc ICT',
    institution: 'J. P. Dawar Institute of Information Science and Technology',
    period: 'Aug 2024 – Jul 2026',
    location: 'Surat, Gujarat',
    highlights: [
      'Currently pursuing Master of Science in Information and Communication Technology.',
      'Focusing on advanced software engineering, system architecture, and modern web technologies.'
    ],
  },
  {
    degree: 'BCA (Bachelor of Computer Applications)',
    institution: 'Smt. Diwaliben Harji Bhai Gondaliya College of BCA and IT',
    period: 'Oct 2021 – Apr 2024',
    location: 'Surat, Gujarat',
    highlights: [
      'Graduated with a CGPA of 8.23.',
      'Built a strong foundation in programming languages, databases, and software development methodologies.'
    ],
  },
]

function EducationCard({ edu, idx, shouldReduceMotion }: { edu: typeof educationList[0], idx: number, shouldReduceMotion: boolean }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    if (shouldReduceMotion) return
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  const hasExpandedContent = edu.highlights && edu.highlights.length > 0;

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
        onClick={() => hasExpandedContent && setIsExpanded(!isExpanded)}
        className={`subtle-border rounded-xl p-6 md:p-8 bg-card/80 transition-colors transition-shadow duration-300 group relative overflow-hidden ${hasExpandedContent ? 'cursor-pointer hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/10' : ''} transform-gpu will-change-transform`}
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
                  <GraduationCap size={24} className="group-hover:animate-pulse" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-accent transition-colors leading-snug">
                    {edu.degree}
                  </h3>
                  <p className="text-accent font-medium mt-1 text-base">{edu.institution}</p>
                  <p className="text-sm text-muted-foreground group-hover:text-foreground mt-0.5 transition-colors">{edu.location}</p>
                </div>
              </div>
              <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-4 sm:gap-2 w-full sm:w-auto mt-4 sm:mt-0 border-t sm:border-t-0 border-border/30 pt-4 sm:pt-0">
                <p className="text-xs text-muted-foreground group-hover:text-foreground whitespace-nowrap font-medium bg-muted/50 px-3 py-1.5 rounded-full border border-border/20 transition-colors">
                  {edu.period}
                </p>
                {hasExpandedContent && (
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-1.5 bg-muted/30 rounded-full text-muted-foreground group-hover:text-accent group-hover:bg-accent/10 transition-colors flex-shrink-0"
                  >
                    <ChevronDown size={16} />
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          <AnimatePresence>
            {isExpanded && hasExpandedContent && (
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
                      Details
                    </h4>
                    <ul className="space-y-3">
                      {edu.highlights?.map((highlight, i) => (
                        <li key={i} className="flex gap-3 text-muted-foreground group-hover:text-foreground/90 transition-colors">
                          <span className="text-accent font-bold mt-1.5 text-[10px] shrink-0">✦</span>
                          <span className="text-sm leading-relaxed">{highlight}</span>
                        </li>
                      ))}
                    </ul>
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

export function Education() {
  const shouldReduceMotion = !!useReducedMotion()

  return (
    <section id="education" className="portfolio-container section-padding">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-16">
          Education
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
            {educationList.map((edu, idx) => (
              <EducationCard key={idx} edu={edu} idx={idx} shouldReduceMotion={shouldReduceMotion} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
