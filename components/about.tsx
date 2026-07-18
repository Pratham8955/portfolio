'use client'

import { motion } from 'framer-motion'


export function About() {
  const techStacks = [
    { label: 'Node.js', category: 'backend' },
    { label: 'TypeScript', category: 'language' },
    { label: 'MongoDB', category: 'database' },
    { label: 'Redis', category: 'database' },
    { label: 'Next.js', category: 'frontend' },
    { label: 'React', category: 'frontend' },
    { label: 'Java', category: 'language' },
    { label: 'C#', category: 'language' },
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

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
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
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
          About
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6 group cursor-default">
            <p className="text-base md:text-lg text-muted-foreground group-hover:text-foreground leading-relaxed transition-colors">
              Web developer with hands-on full-stack experience gained through a
              traineeship at Finlogic Technologies and an internship at Elaunch Solutions.
              Having completed my MSc in ICT, I focus on building production-grade applications
              with modern web technologies.
            </p>
            <p className="text-base md:text-lg text-muted-foreground group-hover:text-foreground leading-relaxed transition-colors">
              Strong foundation in backend development and REST API design, with
              proficiency in frontend frameworks. Passionate about clean code,
              performance optimization, and solving complex problems.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
              Core Tech Stack
            </h3>
            <motion.div
              className="flex flex-wrap gap-3"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {techStacks.map((tech) => (
                <motion.span
                  key={tech.label}
                  className="tech-badge"
                  variants={itemVariants}
                >
                  {tech.label}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
