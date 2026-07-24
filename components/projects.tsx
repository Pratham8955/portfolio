'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { useState } from 'react'


const projects = [
  {
    name: 'Maham (Live Project)',
    description: 'Live project management and guard task coordination platform',
    technologies: ['Next.js', 'Node.js', 'MongoDB', 'Redis'],
    problem: 'Managing profile update requests, coordinating diverse task types, and scheduling guard assignments across multiple time zones required a reliable and scalable backend system',
    technicalDecision: 'Used Redis caching to optimize frequent data queries, implemented Cron Jobs for automated time-zone-aware task scheduling, and built a WebSocket-ready backend architecture for real-time updates',
    color: '#3b82f6',
  },
  {
    name: 'MFTran (Live Project)',
    description: 'Customer query management and handling API backend system',
    technologies: ['Advanced Java', 'REST API', 'Postman'],
    problem: 'Processing customer inquiries required a robust backend to handle concurrent requests and data persistence',
    technicalDecision: 'Built scalable REST APIs with proper error handling and logging for production reliability',
    color: '#3b82f6',
  },
  {
    name: 'Inventory Management System (Strata)',
    description: 'Inventory management system tracking item locations via QR code scanning with pay-per-grow pricing',
    technologies: ['Node.js', 'Express', 'React', 'TypeScript', 'MongoDB'],
    problem: 'Businesses needed an efficient, scalable way to track item locations without prohibitive upfront software costs',
    technicalDecision: 'Built around a pay-per-grow pricing approach and implemented QR code scanning for fast, accurate inventory tracking',
    color: '#3b82f6',
  },
  {
    name: 'Ecommerce (GoWear)',
    description: 'Full-stack ecommerce platform for selling clothing for kids, men, and women',
    technologies: ['MongoDB', 'Express', 'React', 'Node.js'],
    problem: 'A clothing brand required a comprehensive online store with product browsing and transaction capabilities',
    technicalDecision: 'Used the full MERN stack to deliver a responsive shopping experience and efficient data management',
    color: '#3b82f6',
  },
  {
    name: 'College Management System (CampusWave)',
    description: 'Full-stack system for academic institution management',
    technologies: ['.NET Core', 'C#', 'React', 'SQL Server', 'Razorpay'],
    problem: 'Educational institutions needed centralized platform for managing departments, students, faculty, and fees',
    technicalDecision: 'Integrated Razorpay for secure payment processing and implemented role-based access control',
    color: '#3b82f6',
  },
  {
    name: 'Human Resource Management System (Working Wave)',
    description: 'Centralized employee data and HR operations management',
    technologies: ['Java EE', 'MySQL', 'Payara'],
    problem: 'HR teams needed unified platform for employee records, attendance training, task and leaves workflows',
    technicalDecision: 'Designed modular architecture with separate modules for different HR functions and roles',
    color: '#3b82f6',
  },
]

function ProjectCard({ project, index }: { project: typeof projects[0], index: number }) {
  const shouldReduceMotion = !!useReducedMotion()
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative subtle-border rounded-xl p-5 md:p-8 bg-card/80 transition-[border-color,box-shadow,transform] duration-200 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5 hover:-translate-y-1 group cursor-pointer overflow-hidden"
      style={{ willChange: 'transform, opacity' }}
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg md:text-2xl font-semibold text-foreground group-hover:text-accent transition-colors leading-snug">
          {project.name}
        </h3>
        <ExternalLink
          size={20}
          className="text-muted-foreground group-hover:text-accent transition-colors opacity-0 group-hover:opacity-100 duration-200 shrink-0 ml-2"
        />
      </div>

      <p className="text-muted-foreground group-hover:text-foreground mb-4 text-sm leading-relaxed transition-colors">
        {project.description}
      </p>

      <div className="space-y-4 mb-6">
        <div>
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
            Problem Solved
          </h4>
          <p className="text-xs text-muted-foreground group-hover:text-foreground leading-relaxed transition-colors">{project.problem}</p>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
            Key Technical Decision
          </h4>
          <p className="text-xs text-muted-foreground group-hover:text-foreground leading-relaxed transition-colors">
            {project.technicalDecision}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 pt-2 min-h-[36px]">
        {project.technologies.map((tech, i) => (
          <motion.span
            key={tech}
            className="tech-badge text-xs"
            animate={isHovered ? { y: 0, opacity: 1 } : { y: 15, opacity: 0 }}
            initial={{ y: 15, opacity: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : {
              delay: isHovered ? i * 0.04 : 0,
              duration: 0.25,
              ease: 'easeOut',
            }}
          >
            {tech}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}

export function Projects() {
  const [showAllProjects, setShowAllProjects] = useState(false)
  const visibleProjects = showAllProjects ? projects : projects.slice(0, 4)

  return (
    <section id="projects" className="portfolio-container section-padding">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-12">
          Featured Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visibleProjects.map((project, idx) => (
            <ProjectCard
              key={project.name}
              project={project}
              index={idx}
            />
          ))}
        </div>

        {projects.length > 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 flex justify-center"
          >
            <button
              onClick={() => setShowAllProjects(!showAllProjects)}
              className="px-6 py-3 rounded-full bg-accent/10 text-accent hover:bg-accent/20 transition-colors duration-300 font-medium text-sm"
            >
              {showAllProjects ? 'Show Less' : `View All Projects (${projects.length})`}
            </button>
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}
