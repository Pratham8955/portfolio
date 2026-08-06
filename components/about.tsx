'use client'

import { motion, useMotionTemplate, useMotionValue, Variants } from 'framer-motion'
import { CurrentlyBuildingWidget } from './currently-building'
import { MouseEvent } from 'react'
import { GraduationCap, Code2, Rocket, Briefcase } from 'lucide-react'

function AboutCard({ children, title, icon: Icon, delay = 0 }: { children: React.ReactNode, title: string, icon: any, delay?: number }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      onMouseMove={handleMouseMove}
      className="relative subtle-border rounded-xl p-6 bg-card/80 group overflow-hidden"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              350px circle at ${mouseX}px ${mouseY}px,
              rgba(59, 130, 246, 0.1),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
            <Icon size={20} />
          </div>
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        </div>
        <p className="text-sm md:text-base text-muted-foreground group-hover:text-foreground leading-relaxed transition-colors duration-300">
          {children}
        </p>
      </div>
    </motion.div>
  )
}

export function About() {
  const techStacks = [
    { label: 'Java', category: 'language' },
    { label: 'Spring Boot', category: 'backend' },
    { label: 'MySQL', category: 'database' },
    { label: 'Node.js', category: 'backend' },
    { label: 'TypeScript', category: 'language' },
    { label: 'Redis', category: 'database' },
    { label: 'MongoDB', category: 'database' },
    { label: 'Next.js', category: 'frontend' },
    { label: 'React', category: 'frontend' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 300, damping: 20 },
    },
  }

  return (
    <section id="about" className="portfolio-container section-padding">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            About Me
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-7 space-y-6">
            <AboutCard title="Background" icon={GraduationCap} delay={0.1}>
              Web developer with hands-on full-stack experience gained through a traineeship at Finlogic Technologies and an internship at Elaunch Solutions. Having completed my MSc in ICT, I focus on building production-grade applications with modern web technologies.
            </AboutCard>

            <AboutCard title="Approach" icon={Rocket} delay={0.2}>
              Strong foundation in backend development and REST API design, with proficiency in frontend frameworks. Passionate about clean code, performance optimization, and solving complex problems. I treat every project as an opportunity to build something robust and scalable.
            </AboutCard>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="subtle-border rounded-xl p-6 bg-card/50 backdrop-blur-sm">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4 flex items-center gap-2">
                <Code2 size={16} />
                Core Tech Stack
              </h3>
              <motion.div
                className="flex flex-wrap gap-2"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {techStacks.map((tech) => (
                  <motion.span
                    key={tech.label}
                    className="px-3 py-1.5 rounded-md text-xs font-medium bg-muted/80 text-muted-foreground hover:bg-accent/20 hover:text-accent border border-border/50 hover:border-accent/30 transition-all duration-300 cursor-default"
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                  >
                    {tech.label}
                  </motion.span>
                ))}
              </motion.div>
            </div>
            
            <CurrentlyBuildingWidget />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
