'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  ExternalLink,
  GitBranch,
  X,
  Building2,
  Briefcase,
  ShieldCheck,
  ArrowUpRight,
  Layers,
  Sparkles,
  Database,
  Cpu,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { PORTFOLIO_DATA, Project } from '@/data/portfolio'
import { useAppStore } from '@/lib/store'
import { Magnetic } from './magnetic'
import { SpotlightCard } from './spotlight-card'

export function Projects() {
  const shouldReduceMotion = useReducedMotion()
  const { selectedProjectId, setSelectedProjectId, setCursor, resetCursor } = useAppStore()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [showAllProjects, setShowAllProjects] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const projects = PORTFOLIO_DATA.projects
  const featuredProjects = projects.filter((p) => p.featured)
  const otherProjects = projects.filter((p) => !p.featured)
  const INITIAL_PROJECT_COUNT = 2
  const displayedOtherProjects = showAllProjects ? otherProjects : otherProjects.slice(0, INITIAL_PROJECT_COUNT)
  const hasMoreProjects = otherProjects.length > INITIAL_PROJECT_COUNT

  useEffect(() => {
    if (selectedProjectId) {
      const found = projects.find((p) => p.id === selectedProjectId)
      setSelectedProject(found || null)
      document.body.style.overflow = 'hidden'

      // Focus the scroll container so keyboard navigation works immediately
      const timer = setTimeout(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.focus()
        }
      }, 50)
      return () => clearTimeout(timer)
    } else {
      setSelectedProject(null)
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedProjectId, projects])

  const handleModalKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      setSelectedProjectId(null)
      return
    }

    const container = scrollContainerRef.current
    if (!container) return

    if (e.key === 'ArrowDown') {
      container.scrollBy({ top: 100, behavior: 'smooth' })
      e.preventDefault()
    } else if (e.key === 'ArrowUp') {
      container.scrollBy({ top: -100, behavior: 'smooth' })
      e.preventDefault()
    } else if (e.key === 'PageDown' || e.key === ' ') {
      container.scrollBy({ top: 400, behavior: 'smooth' })
      e.preventDefault()
    } else if (e.key === 'PageUp') {
      container.scrollBy({ top: -400, behavior: 'smooth' })
      e.preventDefault()
    } else if (e.key === 'Home') {
      container.scrollTo({ top: 0, behavior: 'smooth' })
      e.preventDefault()
    } else if (e.key === 'End') {
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' })
      e.preventDefault()
    }
  }

  return (
    <section id="projects" className="relative w-full py-28 px-4 sm:px-8 md:px-12 lg:px-16 bg-[#050505] overflow-hidden border-t border-white/[0.08]">
      {/* Ambient Lighting */}
      <div className="pointer-events-none absolute top-1/4 right-1/4 w-[700px] h-[700px] rounded-full bg-blue-600/5 blur-[180px] -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-blue-400 font-semibold mb-3">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span>PRODUCTION SHOWCASE</span>
            </div>
            <h2 className="font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tighter text-white">
              SELECTED WORK.
            </h2>
          </div>
          <p className="text-slate-400 text-sm sm:text-base max-w-md font-sans leading-relaxed">
            Real-world enterprise systems, full-stack web applications, and database architectures built for scale and performance.
          </p>
        </div>

        {/* Featured Projects: Large Visual Scenes */}
        <div className="flex flex-col gap-12 sm:gap-16 mb-20">
          {featuredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: idx * 0.15 }}
              onClick={() => setSelectedProjectId(project.id)}
              onMouseEnter={() => setCursor('project', 'VIEW CASE')}
              onMouseLeave={resetCursor}
              className="cursor-pointer"
            >
              <SpotlightCard
                borderRadius="rounded-3xl"
                spotlightColor="rgba(59, 130, 246, 0.25)"
                className="group relative border border-white/15 bg-gradient-to-b from-[#0e1222]/90 to-[#070913]/90 backdrop-blur-xl p-6 sm:p-10 md:p-14 transition-all duration-500 hover:border-blue-500/60 hover:shadow-[0_0_50px_rgba(59,130,246,0.2)]"
              >
                {/* Subtle top sheen */}
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left Info Column (7 cols) */}
                <div className="lg:col-span-7 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5 mb-4">
                      <span className="font-mono text-xs font-bold text-blue-400 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30">
                        {project.type.toUpperCase()}
                      </span>
                      {project.company && (
                        <span className="font-mono text-xs text-slate-400">
                          • {project.company}
                        </span>
                      )}
                    </div>

                    <h3 className="font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase group-hover:text-blue-300 transition-colors duration-300">
                      {project.shortTitle}
                    </h3>

                    <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed mt-4">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Tech stack & CTAs */}
                  <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 font-mono text-xs text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 font-mono text-xs text-blue-400 font-bold uppercase tracking-wider group-hover:translate-x-1.5 transition-transform duration-300">
                      <span>OPEN CASE STUDY</span>
                      <ArrowUpRight size={16} />
                    </div>
                  </div>
                </div>

                {/* Right Architecture Abstract Card (5 cols) */}
                <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-[#070913] p-6 flex flex-col gap-4 font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 text-slate-400">
                    <span className="text-[11px] font-bold text-blue-400">01 — ARCHITECTURE SPEC</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>

                  <div className="space-y-2 text-slate-300 text-xs">
                    <p className="line-clamp-3 leading-relaxed">
                      <strong className="text-white">Core Solution:</strong> {project.caseStudy.solution}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-500/20 text-slate-300 text-[11px] space-y-1">
                    <div className="text-blue-400 font-bold uppercase">Key Highlights:</div>
                    <ul className="space-y-1 text-slate-400">
                      {project.caseStudy.keyFeatures.slice(0, 2).map((feat, i) => (
                        <li key={i} className="flex items-center gap-1.5 truncate">
                          <CheckCircle2 size={12} className="text-emerald-400 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {project.live && (
                    <div className="pt-2 flex items-center justify-between text-[11px] text-emerald-400 font-semibold">
                      <span>● LIVE APPLICATION AVAILABLE</span>
                      <ExternalLink size={13} />
                    </div>
                  )}
                </div>
              </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        {/* Supporting Projects Grid */}
        <div>
          <h3 className="font-mono text-xs uppercase tracking-widest text-slate-400 font-bold mb-8 flex items-center gap-2">
            <span>OTHER PROJECTS:</span>
            <div className="h-px flex-1 bg-white/10" />
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayedOtherProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => setSelectedProjectId(project.id)}
                onMouseEnter={() => setCursor('project', 'VIEW')}
                onMouseLeave={resetCursor}
                className="cursor-pointer"
              >
                <SpotlightCard
                  borderRadius="rounded-2xl"
                  spotlightColor="rgba(59, 130, 246, 0.2)"
                  className="p-6 sm:p-8 border border-white/[0.08] hover:border-blue-500/40 bg-[#090b14]/70 hover:bg-[#0f1324]/80 backdrop-blur-md transition-all duration-300 flex flex-col justify-between group shadow-lg h-full"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="font-mono text-[10px] text-blue-400 font-bold px-2.5 py-0.5 rounded-full bg-blue-950/60 border border-blue-500/30">
                        {project.type.toUpperCase()}
                      </span>
                    </div>

                    <h4 className="font-black text-2xl text-white tracking-tight uppercase group-hover:text-blue-300 transition-colors">
                      {project.name}
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-400 mt-2 line-clamp-2 leading-relaxed font-sans">
                      {project.tagline}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[10px] text-slate-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 font-mono text-xs text-blue-400 font-bold group-hover:translate-x-1 transition-transform">
                      <span>CASE STUDY</span>
                      <ArrowUpRight size={14} />
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>

          {hasMoreProjects && (
            <div className="flex justify-center mt-10">
              <Magnetic>
                <button
                  onClick={() => setShowAllProjects(!showAllProjects)}
                  onMouseEnter={() => setCursor('button', showAllProjects ? 'LESS' : 'MORE')}
                  onMouseLeave={resetCursor}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600/15 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 hover:text-white font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-md"
                >
                  <span>
                    {showAllProjects
                      ? 'SHOW LESS PROJECTS'
                      : `SEE MORE PROJECTS (+${otherProjects.length - INITIAL_PROJECT_COUNT})`}
                  </span>
                  {showAllProjects ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                </button>
              </Magnetic>
            </div>
          )}
        </div>
      </div>

      {/* Full-Screen Immersive Project Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            ref={scrollContainerRef}
            tabIndex={0}
            data-lenis-prevent="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onKeyDown={handleModalKeyDown}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setSelectedProjectId(null)
              }
            }}
            className="fixed inset-0 z-[100] overflow-y-auto p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-2xl outline-none focus:outline-none custom-scrollbar flex justify-center items-start"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl rounded-3xl border border-white/15 bg-[#090b14] shadow-2xl p-6 sm:p-10 md:p-12 text-white my-6 sm:my-10"
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8">
                <div>
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className="font-mono text-xs font-bold text-blue-400 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30">
                      {selectedProject.type.toUpperCase()}
                    </span>
                    {selectedProject.company && (
                      <span className="font-mono text-xs text-slate-400">
                        • {selectedProject.company}
                      </span>
                    )}
                  </div>
                  <h2 className="font-black text-2xl sm:text-4xl md:text-5xl uppercase tracking-tight">
                    {selectedProject.name}
                  </h2>
                </div>

                <button
                  onClick={() => setSelectedProjectId(null)}
                  onMouseEnter={() => setCursor('button', 'CLOSE')}
                  onMouseLeave={resetCursor}
                  className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors"
                  aria-label="Close Case Study"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Action Links / NDA Notification */}
              <div className="flex flex-wrap items-center gap-3 mb-8">
                {selectedProject.live && (
                  <a
                    href={selectedProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs uppercase tracking-wider font-bold shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all"
                  >
                    <ExternalLink size={14} />
                    <span>LAUNCH LIVE DEMO</span>
                  </a>
                )}

                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs uppercase tracking-wider font-bold transition-colors"
                  >
                    <GitBranch size={14} />
                    <span>SOURCE REPOSITORY</span>
                  </a>
                )}

                {selectedProject.githubFrontend && (
                  <a
                    href={selectedProject.githubFrontend}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs uppercase font-bold"
                  >
                    <GitBranch size={14} />
                    <span>FRONTEND REPO</span>
                  </a>
                )}

                {selectedProject.githubBackend && (
                  <a
                    href={selectedProject.githubBackend}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs uppercase font-bold"
                  >
                    <GitBranch size={14} />
                    <span>BACKEND REPO</span>
                  </a>
                )}
              </div>

              {/* 8-Part Case Study Content */}
              <div className="space-y-8 text-slate-300 font-sans leading-relaxed">
                {/* 01 Overview */}
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-blue-400 font-bold mb-2">
                    01 — OVERVIEW
                  </h3>
                  <p className="text-sm sm:text-base text-slate-200">
                    {selectedProject.caseStudy.overview}
                  </p>
                </div>

                {/* 02 Problem & 03 Solution Split */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-2xl bg-red-950/20 border border-red-500/20">
                    <h3 className="font-mono text-xs uppercase tracking-widest text-red-400 font-bold mb-2">
                      02 — THE PROBLEM
                    </h3>
                    <p className="text-sm text-slate-300">
                      {selectedProject.caseStudy.problem}
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/20">
                    <h3 className="font-mono text-xs uppercase tracking-widest text-emerald-400 font-bold mb-2">
                      03 — THE SOLUTION
                    </h3>
                    <p className="text-sm text-slate-300">
                      {selectedProject.caseStudy.solution}
                    </p>
                  </div>
                </div>

                {/* 04 Architecture */}
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-blue-400 font-bold mb-2">
                    04 — SYSTEM ARCHITECTURE
                  </h3>
                  <p className="text-sm sm:text-base text-slate-200 font-mono">
                    {selectedProject.caseStudy.architecture}
                  </p>
                </div>

                {/* 05 Tech Stack */}
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-widest text-slate-400 font-bold mb-3">
                    05 — TECHNOLOGIES USED
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.caseStudy.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 rounded-lg bg-blue-950/40 border border-blue-500/30 font-mono text-xs text-blue-300 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 06 Key Features */}
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-widest text-slate-400 font-bold mb-3">
                    06 — KEY FEATURES & FUNCTIONALITIES
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedProject.caseStudy.keyFeatures.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-slate-200"
                      >
                        <CheckCircle2 size={15} className="text-blue-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 07 Challenges & Lessons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
                  <div>
                    <h3 className="font-mono text-xs uppercase tracking-widest text-amber-400 font-bold mb-2">
                      07 — ENGINEERING CHALLENGES
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400">
                      {selectedProject.caseStudy.challenges}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-bold mb-2">
                      08 — LESSONS LEARNED
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400">
                      {selectedProject.caseStudy.lessons}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
