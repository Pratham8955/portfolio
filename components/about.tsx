'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { GraduationCap, Briefcase, Code2, Server, Cpu, Database, Sparkles, CheckCircle2 } from 'lucide-react'
import { PORTFOLIO_DATA } from '@/data/portfolio'
import { useAppStore } from '@/lib/store'

export function About() {
  const shouldReduceMotion = useReducedMotion()
  const { setCursor, resetCursor } = useAppStore()

  const focusPillars = [
    {
      title: 'BACKEND ARCHITECTURE',
      desc: 'Building scalable RESTful microservices, event-driven pipelines, and robust service layers in Node.js, Spring Boot, and .NET Core.',
      icon: Server,
      tech: 'Node.js • Java • Spring Boot • Express • .NET',
    },
    {
      title: 'HIGH-THROUGHPUT CACHING & DB',
      desc: 'Optimizing high-frequency reads and session state using Redis in-memory storage, paired with relational (MySQL, SQL Server) & document (MongoDB) databases.',
      icon: Database,
      tech: 'Redis • MongoDB • MySQL • SQL Server',
    },
    {
      title: 'REACTIVE MODERN FRONTENDS',
      desc: 'Crafting responsive, high-performance web applications and design systems utilizing Next.js 16 App Router, React 19, TypeScript, and modern CSS.',
      icon: Code2,
      tech: 'Next.js • React • TypeScript • Tailwind CSS',
    },
    {
      title: 'SYSTEM RELIABILITY & TESTING',
      desc: 'Ensuring production stability through rigorous endpoint validation, Postman test automation suites, JWT authentication, and RBAC security.',
      icon: Cpu,
      tech: 'Postman • REST APIs • Docker • Git',
    },
  ]

  return (
    <section id="about" className="relative w-full py-28 px-4 sm:px-8 md:px-12 lg:px-16 bg-[#050505] overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="pointer-events-none absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-blue-600/5 blur-[150px] -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-blue-400 font-semibold mb-3">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span>DEVELOPER PROFILE</span>
            </div>
            <h2 className="font-black text-5xl sm:text-7xl md:text-8xl uppercase tracking-tighter text-white">
              WHO I AM.
            </h2>
          </div>

          <div className="font-mono text-xs text-slate-400 max-w-sm flex flex-col gap-1.5">
            <span className="text-white font-bold">{PORTFOLIO_DATA.personal.name}</span>
            <span>{PORTFOLIO_DATA.personal.location}</span>
            <span className="text-blue-400">{PORTFOLIO_DATA.about.subtitle}</span>
          </div>
        </div>

        {/* Narrative & Focus Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Narrative Column (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {PORTFOLIO_DATA.about.narrative.map((paragraph, idx) => (
              <p
                key={idx}
                className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed"
              >
                {paragraph}
              </p>
            ))}

            {/* Quick Education / Career Snapshot Badge */}
            <div className="mt-4 p-5 rounded-2xl bg-[#0c0e18] border border-white/10 flex flex-col gap-3">
              <div className="flex items-center gap-2.5 text-blue-400 font-mono text-xs font-bold uppercase tracking-wider">
                <GraduationCap size={16} />
                <span>ACADEMIC DISTINCTION</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                Completed <strong className="text-white">MSc in ICT</strong> (CGPA: 7.77) and <strong className="text-white">BCA</strong> (CGPA: 8.23). Experienced through enterprise roles at <strong className="text-white">Elaunch Solutions</strong> and <strong className="text-white">NJ India</strong>.
              </p>
            </div>
          </div>

          {/* Right Architecture Pillars (7 Cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {focusPillars.map((pillar, idx) => {
              const Icon = pillar.icon

              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  onMouseEnter={() => setCursor('button', 'FOCUS')}
                  onMouseLeave={resetCursor}
                  className="p-5 sm:p-6 rounded-2xl border border-white/[0.08] hover:border-blue-500/40 bg-[#090b14]/80 hover:bg-[#0e1224]/80 backdrop-blur-md transition-all duration-300 flex flex-col justify-between group shadow-lg"
                >
                  <div>
                    <div className="p-3 rounded-xl bg-white/5 group-hover:bg-blue-600/20 text-slate-400 group-hover:text-cyan-300 border border-white/10 group-hover:border-cyan-500/30 transition-colors w-fit mb-4">
                      <Icon size={20} />
                    </div>
                    <h3 className="font-black text-sm sm:text-base text-white tracking-tight uppercase mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans mb-4">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/[0.06] font-mono text-[10px] text-blue-400">
                    {pillar.tech}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
