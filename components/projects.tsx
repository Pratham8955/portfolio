'use client'

import { motion, useReducedMotion, useMotionTemplate, useMotionValue, AnimatePresence } from 'framer-motion'
import { ExternalLink, GitBranch, X } from 'lucide-react'
import { useState, MouseEvent, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useAppStore } from '@/lib/store'

const projects = [
  {
    name: 'Maham',
    description: 'Live project management and guard task coordination platform',
    technologies: ['MongoDB', 'Next.js', 'Node.js', 'Redis'],
    problem: 'Managing profile update requests, coordinating diverse task types, and scheduling guard assignments across multiple time zones required a reliable and scalable backend system',
    technicalDecision: 'Used Redis caching to optimize frequent data queries, implemented Cron Jobs for automated time-zone-aware task scheduling, and built a WebSocket-ready backend architecture for real-time updates',
    color: '#3b82f6',
    github: '',
    live: '',
    architecture: 'Microservices architecture separating Auth, Task Management, and Guard Scheduling services.',
    dbSchema: 'MongoDB with denormalized collections for fast read operations, caching layer via Redis for session state.',
    apiFlow: 'RESTful API with JWT authentication. WebSockets for real-time guard location updates.',
    challenges: 'Handling real-time timezone conversions and concurrent task scheduling without race conditions.',
    lessons: 'Deepened understanding of distributed caching and background job processing.'
  },
  {
    name: 'MFTran',
    description: 'Customer query management and handling API backend system',
    technologies: ['Advanced Java', 'REST API', 'Postman'],
    problem: 'Processing customer inquiries required a robust backend to handle concurrent requests and data persistence',
    technicalDecision: 'Built scalable REST APIs with proper error handling and logging for production reliability',
    color: '#3b82f6',
    github: '',
    live: '',
    architecture: 'Monolithic Java backend utilizing Servlet architecture.',
    dbSchema: 'Relational mapping with MySQL for structured query tracking.',
    apiFlow: 'Standard synchronous REST API endpoints.',
    challenges: 'Ensuring thread safety and connection pooling for database operations.',
    lessons: 'Gained practical experience with Java Concurrency and standard JDBC operations.'
  },
  {
    name: 'Inventory Management System (Strata)',
    description: 'Inventory management system tracking item locations via QR code scanning with pay-per-grow pricing',
    technologies: ['MongoDB', 'Express', 'React', 'Node.js', 'TypeScript'],
    problem: 'Businesses needed an efficient, scalable way to track item locations without prohibitive upfront software costs',
    technicalDecision: 'Built around a pay-per-grow pricing approach and implemented QR code scanning for fast, accurate inventory tracking',
    color: '#3b82f6',
    github: '#',
    live: '#',
    architecture: 'MERN stack monolith deployed on AWS EC2.',
    dbSchema: 'MongoDB collections linked via ObjectIDs, optimized for aggregation queries.',
    apiFlow: 'Express routes handling CRUD with strict validation schemas using Zod.',
    challenges: 'Optimizing QR code generation and decoding on the client side.',
    lessons: 'Learned how to design multi-tenant SaaS architectures.'
  },
  {
    name: 'Ecommerce (GoWear)',
    description: 'Full-stack ecommerce platform for selling clothing for kids, men, and women',
    technologies: ['MongoDB', 'Express', 'React', 'Node.js'],
    problem: 'A clothing brand required a comprehensive online store with product browsing and transaction capabilities',
    technicalDecision: 'Used the full MERN stack to deliver a responsive shopping experience and efficient data management',
    color: '#3b82f6',
    github: '#',
    live: '#',
    architecture: 'MERN stack with Redux for state management.',
    dbSchema: 'Complex cart and order models with embedded sub-documents.',
    apiFlow: 'Integrated Stripe for payments, standard REST for product catalog.',
    challenges: 'Implementing robust cart logic and secure payment flows.',
    lessons: 'Gained experience in payment gateway integration and secure data handling.'
  },
  {
    name: 'College Management System (CampusWave)',
    description: 'Full-stack system for academic institution management',
    technologies: ['.NET Core', 'C#', 'React', 'SQL Server', 'Razorpay'],
    problem: 'Educational institutions needed centralized platform for managing departments, students, faculty, and fees',
    technicalDecision: 'Integrated Razorpay for secure payment processing and implemented role-based access control',
    color: '#3b82f6',
    github: '#',
    live: '#',
    architecture: 'N-Tier architecture using .NET Core Web API.',
    dbSchema: 'Highly normalized SQL Server database with referential integrity.',
    apiFlow: 'REST API with JWT-based role authorization (Student, Faculty, Admin).',
    challenges: 'Managing complex database migrations and relationships.',
    lessons: 'Deep dive into Entity Framework Core and C# paradigms.'
  },
  {
    name: 'Human Resource Management System (Working Wave)',
    description: 'Centralized employee data and HR operations management',
    technologies: ['Java EE', 'MySQL', 'Payara'],
    problem: 'HR teams needed unified platform for employee records, attendance training, task and leaves workflows',
    technicalDecision: 'Designed modular architecture with separate modules for different HR functions and roles',
    color: '#3b82f6',
    github: '#',
    live: '#',
    architecture: 'Enterprise Java Application deployed on Payara Server.',
    dbSchema: 'MySQL schema with triggers for audit logging.',
    apiFlow: 'EJB-based service layer exposed via REST.',
    challenges: 'Handling complex workflow approvals and state transitions for leaves.',
    lessons: 'Understanding Enterprise Java Beans and Application Servers.'
  },
]

function ProjectModal({ project, isOpen, onClose }: { project: typeof projects[0] | null, isOpen: boolean, onClose: () => void }) {
  const [mounted, setMounted] = useState(false)
  const [activeProject, setActiveProject] = useState(project)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (project) {
      setActiveProject(project)
    }
  }, [project])

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setShowContent(true), 350)
      return () => clearTimeout(timer)
    } else {
      setShowContent(false)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [isOpen])

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {isOpen && activeProject && (
        <motion.div className="fixed inset-0 z-[100] flex items-center justify-center px-4 md:px-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />
          <motion.div
            layoutId={activeProject ? `project-${activeProject.name}` : undefined}
            transition={{ type: 'spring', damping: 30, stiffness: 350, mass: 0.9 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15, ease: 'easeOut' } }}
            className={`relative w-full max-w-4xl max-h-[85dvh] md:max-h-[90vh] bg-card border border-border/50 rounded-2xl shadow-2xl z-10 ${isOpen && showContent ? 'overflow-y-auto custom-scrollbar' : 'overflow-hidden'}`}
            style={{ borderRadius: '1rem' }}
          >
            {showContent && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full h-full"
              >
                <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 border-b border-border bg-card/80 backdrop-blur-md">
                  <h2 className="text-2xl font-bold text-foreground">{activeProject.name}</h2>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-full bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="p-6 space-y-8">
                  {/* Overview */}
                  <div>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {activeProject.description}
                    </p>
                    {(activeProject.github || activeProject.live) && (
                      <div className="flex gap-4 mt-6">
                        {activeProject.github && (
                          <a href={activeProject.github} target={activeProject.github === '#' ? undefined : "_blank"} rel="noopener noreferrer" onClick={(e) => { if (activeProject.github === '#') e.preventDefault() }} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 text-foreground transition-colors text-sm font-medium">
                            <GitBranch size={16} /> Source Code
                          </a>
                        )}
                        {activeProject.live && (
                          <a href={activeProject.live} target={activeProject.live === '#' ? undefined : "_blank"} rel="noopener noreferrer" onClick={(e) => { if (activeProject.live === '#') e.preventDefault() }} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-colors text-sm font-medium shadow-lg shadow-accent/20">
                            <ExternalLink size={16} /> Live Demo
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="subtle-border p-5 rounded-xl bg-muted/20">
                        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-2">The Problem</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{activeProject.problem}</p>
                      </div>
                      <div className="subtle-border p-5 rounded-xl bg-accent/5 border-accent/20">
                        <h3 className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">Technical Solution</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{activeProject.technicalDecision}</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="subtle-border p-5 rounded-xl bg-muted/20">
                        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">Tech Stack</h3>
                        <div className="flex flex-wrap gap-2">
                          {activeProject.technologies.map(tech => (
                            <span key={tech} className="px-3 py-1 rounded-md text-xs font-medium bg-background border border-border/50 text-foreground shadow-sm">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="subtle-border p-5 rounded-xl bg-muted/20">
                        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-2">Lessons Learned</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{activeProject.lessons}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

function ProjectCard({ project, index, onClick, isActive }: { project: typeof projects[0], index: number, onClick: () => void, isActive: boolean }) {
  const shouldReduceMotion = !!useReducedMotion()
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    if (shouldReduceMotion) return
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <motion.div
      layoutId={`project-${project.name}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      className={`relative subtle-border p-5 md:p-8 bg-card/80 hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/10 group cursor-pointer overflow-hidden transform-gpu will-change-transform ${
        isActive ? 'pointer-events-none' : 'duration-300'
      }`}
      style={{ 
        opacity: isActive ? 0 : 1,
        borderRadius: '1rem',
        transitionProperty: isActive ? 'none' : 'border-color, box-shadow, background-color'
      }}
      whileHover={shouldReduceMotion || isActive ? {} : { y: -8, scale: 1.02 }}
      whileTap={shouldReduceMotion || isActive ? {} : { scale: 0.98 }}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 hidden md:block transform-gpu"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(59, 130, 246, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      {/* Animated glowing border effect */}
      <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-accent/20 transition-colors duration-500 z-0" />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg md:text-2xl font-bold text-foreground group-hover:text-accent transition-colors leading-snug">
            {project.name}
          </h3>
          <div className="p-2 rounded-full bg-muted/50 text-muted-foreground group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300 transform group-hover:rotate-45">
            <ExternalLink size={18} />
          </div>
        </div>

        <p className="text-muted-foreground group-hover:text-foreground/90 mb-6 text-sm leading-relaxed transition-colors flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 pt-4 border-t border-border/50">
          {project.technologies.slice(0, 4).map((tech, i) => (
            <motion.span
              key={tech}
              className="px-2.5 py-1 text-xs font-medium rounded-md bg-muted text-muted-foreground border border-border/30"
              initial={{ y: 10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 + 0.2 }}
            >
              {tech}
            </motion.span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2.5 py-1 text-xs font-medium rounded-md bg-muted text-muted-foreground border border-border/30">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export function Projects() {
  const [showAllProjects, setShowAllProjects] = useState(false)
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)
  const { setProjectModalOpen } = useAppStore()

  useEffect(() => {
    setProjectModalOpen(!!selectedProject)
  }, [selectedProject, setProjectModalOpen])

  const visibleProjects = showAllProjects ? projects : projects.slice(0, 4)

  return (
    <section id="projects" className="portfolio-container section-padding">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Featured Projects
            </h2>
            <p className="text-muted-foreground max-w-xl text-lg">
              A selection of my recent work, showcasing complex problem solving and modern architectures.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {visibleProjects.map((project, idx) => (
            <ProjectCard
              key={project.name}
              project={project}
              index={idx}
              isActive={selectedProject?.name === project.name}
              onClick={() => setSelectedProject(project)}
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
              className="px-8 py-3 rounded-full bg-accent/10 border border-accent/20 text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300 font-medium text-sm shadow-[0_0_15px_rgba(59,130,246,0.15)] hover:shadow-[0_0_25px_rgba(59,130,246,0.3)]"
            >
              {showAllProjects ? 'Show Less' : `View All Projects (${projects.length})`}
            </button>
          </motion.div>
        )}
      </motion.div>

      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  )
}
