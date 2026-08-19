'use client'

import { motion, useReducedMotion, useMotionTemplate, useMotionValue, AnimatePresence } from 'framer-motion'
import { ExternalLink, GitBranch, X, Building2, Briefcase, ShieldCheck } from 'lucide-react'
import { useState, MouseEvent, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useAppStore } from '@/lib/store'

interface Project {
  name: string
  type: string
  company?: string
  description: string
  technologies: string[]
  problem: string
  technicalDecision: string
  color: string
  github?: string
  githubFrontend?: string
  githubBackend?: string
  live?: string
  architecture: string
  dbSchema: string
  apiFlow: string
  challenges: string
  lessons: string
  context: string
}

const projects: Project[] = [
  {
    name: 'Maham',
    type: 'Industry Project',
    company: 'Elaunch Solutions Pvt. Ltd.',
    description: 'Live project management and guard task coordination platform',
    technologies: ['MongoDB', 'Next.js', 'Node.js', 'Redis'],
    problem: 'Managing profile update requests, coordinating diverse task types, and scheduling guard assignments across multiple time zones required a reliable and scalable backend system',
    technicalDecision: 'Used Redis caching to optimize frequent data queries, implemented Cron Jobs for automated time-zone-aware task scheduling, and built a WebSocket-ready backend architecture for real-time updates',
    color: '#3b82f6',
    github: '',
    live: '',
    architecture: 'Microservices architecture separating Auth, Task Management, and Guard Scheduling services.',
    dbSchema: 'MongoDB with denormalized collections for fast read operations, caching layer via Redis for session state.',
    apiFlow: 'REST API with JWT authentication. WebSockets for real-time guard location updates.',
    challenges: 'Handling real-time timezone conversions and concurrent task scheduling without race conditions.',
    lessons: 'Deepened understanding of distributed caching and background job processing.',
    context: 'Developed and maintained as an active production system during full-stack development at Elaunch Solutions Pvt. Ltd. Codebase and client data are proprietary under NDA.'
  },
  {
    name: 'MFTran',
    type: 'Industry Project',
    company: 'NJ India Pvt. Ltd.',
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
    lessons: 'Gained practical experience with Java Concurrency and standard JDBC operations.',
    context: 'Developed during tenure at NJ India Pvt. Ltd. as part of an enterprise backend system handling real-world customer query pipelines.'
  },
  {
    name: 'Inventory Management System (Strata)',
    type: 'Personal Project',
    description: 'Inventory management system tracking item locations via QR code scanning with pay-per-grow pricing',
    technologies: ['MongoDB', 'Express', 'React', 'Node.js', 'TypeScript'],
    problem: 'Businesses needed an efficient, scalable way to track item locations without prohibitive upfront software costs',
    technicalDecision: 'Built around a pay-per-grow pricing approach and implemented QR code scanning for fast, accurate inventory tracking',
    color: '#3b82f6',
    github: 'https://github.com/Pratham8955/Strata-Advance-Inventory',
    live: 'https://strata-inventory.netlify.app/',
    architecture: 'MERN stack monolith deployed on AWS EC2.',
    dbSchema: 'MongoDB collections linked via ObjectIDs, optimized for aggregation queries.',
    apiFlow: 'Express routes handling CRUD with strict validation schemas using Zod.',
    challenges: 'Optimizing QR code generation and decoding on the client side.',
    lessons: 'Learned how to design multi-tenant SaaS architectures.',
    context: 'Independent full-stack SaaS project built to demonstrate end-to-end QR code asset tracking and scalable cloud architecture.'
  },
  {
    name: 'Ecommerce (GoWear)',
    type: 'Personal Project',
    description: 'Full-stack ecommerce platform for selling clothing for kids, men, and women',
    technologies: ['MongoDB', 'Express', 'React', 'Node.js'],
    problem: 'A clothing brand required a comprehensive online store with product browsing and transaction capabilities',
    technicalDecision: 'Used the full MERN stack to deliver a responsive shopping experience and efficient data management',
    color: '#3b82f6',
    github: 'https://github.com/Pratham8955/GoWear',
    live: '',
    architecture: 'MERN stack with Redux for state management.',
    dbSchema: 'Complex cart and order models with embedded sub-documents.',
    apiFlow: 'Integrated Stripe for payments, standard REST for product catalog.',
    challenges: 'Implementing robust cart logic and secure payment flows.',
    lessons: 'Gained experience in payment gateway integration and secure data handling.',
    context: 'Full-featured ecommerce store with real-time cart state management, checkout flows, and catalog filters.'
  },
  {
    name: 'College Management System (CampusWave)',
    type: 'Academic Project',
    description: 'Full-stack system for academic institution management',
    technologies: ['.NET Core', 'C#', 'React', 'SQL Server', 'Razorpay'],
    problem: 'Educational institutions needed centralized platform for managing departments, students, faculty, and fees',
    technicalDecision: 'Integrated Razorpay for secure payment processing and implemented role-based access control',
    color: '#3b82f6',
    githubFrontend: 'https://github.com/Pratham8955/CMSFrontend',
    githubBackend: 'https://github.com/Pratham8955/CMS',
    live: '',
    architecture: 'N-Tier architecture using .NET Core Web API.',
    dbSchema: 'Highly normalized SQL Server database with referential integrity.',
    apiFlow: 'REST API with JWT-based role authorization (Student, Faculty, Admin).',
    challenges: 'Managing complex database migrations and relationships.',
    lessons: 'Deep dive into Entity Framework Core and C# paradigms.',
    context: 'Comprehensive academic management portal featuring role-based workflows and online fee payment integrations.'
  },
  {
    name: 'Human Resource Management System (Working Wave)',
    type: 'Academic Project',
    description: 'Centralized employee data and HR operations management',
    technologies: ['Java EE', 'MySQL', 'Payara'],
    problem: 'HR teams needed unified platform for employee records, attendance training, task and leaves workflows',
    technicalDecision: 'Designed modular architecture with separate modules for different HR functions and roles',
    color: '#3b82f6',
    github: 'https://github.com/Pratham8955/Human_resource_management_system',
    live: '',
    architecture: 'Enterprise Java Application deployed on Payara Server.',
    dbSchema: 'MySQL schema with triggers for audit logging.',
    apiFlow: 'EJB-based service layer exposed via REST.',
    challenges: 'Handling complex workflow approvals and state transitions for leaves.',
    lessons: 'Understanding Enterprise Java Beans and Application Servers.',
    context: 'Modular enterprise HR application designed for managing complex employee lifecycles and leave approval hierarchies.'
  },
]

function ProjectModal({ project, isOpen, onClose }: { project: Project | null, isOpen: boolean, onClose: () => void }) {
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

  const isIndustry = activeProject?.type === 'Industry Project'
  const hasLinks = activeProject && (
    (activeProject.github && activeProject.github !== '#') ||
    (activeProject.githubFrontend && activeProject.githubFrontend !== '#') ||
    (activeProject.githubBackend && activeProject.githubBackend !== '#') ||
    (activeProject.live && activeProject.live !== '#')
  )

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
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h2 className="text-2xl font-bold text-foreground">{activeProject.name}</h2>
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        isIndustry
                          ? 'bg-accent/15 text-accent border border-accent/30'
                          : 'bg-muted text-muted-foreground border border-border/50'
                      }`}>
                        {isIndustry ? <Building2 size={12} /> : <Briefcase size={12} />}
                        {activeProject.type}
                      </span>
                    </div>
                    {activeProject.company && (
                      <p className="text-xs text-muted-foreground">
                        Developed at <span className="font-semibold text-foreground">{activeProject.company}</span>
                      </p>
                    )}
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-full bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="p-6 space-y-8">
                  {/* Overview & Action / Security Notice */}
                  <div>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {activeProject.description}
                    </p>
                    {hasLinks ? (
                      <div className="flex flex-wrap gap-3 mt-6">
                        {activeProject.githubFrontend && (
                          <a
                            href={activeProject.githubFrontend}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 text-foreground transition-colors text-sm font-medium border border-border/50"
                          >
                            <GitBranch size={16} /> Frontend Code
                          </a>
                        )}
                        {activeProject.githubBackend && (
                          <a
                            href={activeProject.githubBackend}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 text-foreground transition-colors text-sm font-medium border border-border/50"
                          >
                            <GitBranch size={16} /> Backend Code
                          </a>
                        )}
                        {activeProject.github && !activeProject.githubFrontend && !activeProject.githubBackend && (
                          <a
                            href={activeProject.github}
                            target={activeProject.github === '#' ? undefined : "_blank"}
                            rel="noopener noreferrer"
                            onClick={(e) => { if (activeProject.github === '#') e.preventDefault() }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 text-foreground transition-colors text-sm font-medium border border-border/50"
                          >
                            <GitBranch size={16} /> Source Code
                          </a>
                        )}
                        {activeProject.live && activeProject.live !== '#' && (
                          <a
                            href={activeProject.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-colors text-sm font-medium shadow-lg shadow-accent/20"
                          >
                            <ExternalLink size={16} /> Live Demo
                          </a>
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-wrap items-center gap-3 mt-6">
                        <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-muted/40 border border-border/50 text-xs text-muted-foreground">
                          <ShieldCheck size={16} className="text-accent flex-shrink-0" />
                          <span>
                            <strong className="text-foreground">
                              {isIndustry ? 'Enterprise Production Codebase' : 'Project Repository'}
                            </strong>
                            {' '}• {isIndustry ? 'Proprietary system protected under NDA' : 'Internal / Private repository'}
                          </span>
                        </div>
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
                      <div className={`subtle-border p-5 rounded-xl ${
                        isIndustry ? 'bg-accent/5 border-accent/20' : 'bg-muted/20'
                      }`}>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className={`text-sm font-semibold uppercase tracking-wider flex items-center gap-1.5 ${
                            isIndustry ? 'text-accent' : 'text-foreground'
                          }`}>
                            {isIndustry ? <Building2 size={14} /> : <Briefcase size={14} />}
                            {isIndustry ? 'Industry Project Context' : 'Project Context'}
                          </h3>
                          {isIndustry && (
                            <span className="text-[11px] font-semibold uppercase px-2 py-0.5 rounded bg-accent/10 text-accent border border-accent/20">
                              Production
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {activeProject.context}
                        </p>
                        {activeProject.company && (
                          <div className="mt-3 pt-2.5 border-t border-border/30 flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Organization</span>
                            <span className="font-semibold text-foreground">{activeProject.company}</span>
                          </div>
                        )}
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

  const isIndustry = project.type === 'Industry Project'

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
        {/* Project Tag / Badge */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
            isIndustry
              ? 'bg-accent/15 text-accent border border-accent/30 shadow-[0_0_10px_rgba(59,130,246,0.15)]'
              : 'bg-muted text-muted-foreground border border-border/40'
          }`}>
            {isIndustry ? <Building2 size={12} /> : <Briefcase size={12} />}
            {project.type}
          </span>
          {project.company && (
            <span className="text-xs text-muted-foreground font-medium truncate">
              • {project.company}
            </span>
          )}
        </div>

        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg md:text-2xl font-bold text-foreground group-hover:text-accent transition-colors leading-snug">
            {project.name}
          </h3>
          <div className="p-2 rounded-full bg-muted/50 text-muted-foreground group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300 transform group-hover:rotate-45 shrink-0 ml-2">
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

