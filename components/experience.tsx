'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Building2, ChevronDown, CheckCircle2, Calendar, MapPin, Sparkles, ShieldCheck } from 'lucide-react'
import { PORTFOLIO_DATA, ExperienceItem } from '@/data/portfolio'
import { useAppStore } from '@/lib/store'
import { SpotlightCard } from './spotlight-card'

export function Experience() {
  const shouldReduceMotion = useReducedMotion()
  const { setCursor, resetCursor } = useAppStore()
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const experiences = PORTFOLIO_DATA.experience

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <section id="experience" className="relative w-full py-28 px-4 sm:px-8 md:px-12 lg:px-16 bg-[#050505] overflow-hidden border-t border-white/[0.08]">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full bg-blue-600/5 blur-[160px] -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-blue-400 font-semibold mb-3">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span>CAREER JOURNEY</span>
            </div>
            <h2 className="font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tighter text-white">
              EXPERIENCE.
            </h2>
          </div>
          <p className="text-slate-400 text-sm sm:text-base max-w-md font-sans leading-relaxed">
            Professional track record engineering production software and enterprise backend systems.
          </p>
        </div>

        {/* Vertical Timeline Rail */}
        <div className="relative pl-6 sm:pl-10 md:pl-14 space-y-12">
          {/* Vertical Illuminated Line */}
          <div className="absolute left-2.5 sm:left-4 top-4 bottom-4 w-[2px] bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500 opacity-30" />

          {experiences.map((exp, idx) => {
            const isExpanded = expandedId === exp.id

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="relative group"
              >
                {/* Timeline Pulsing Node */}
                <div className="absolute -left-[30px] sm:-left-[42px] top-6 w-5 h-5 rounded-full bg-[#050505] border-2 border-blue-400 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.6)] z-10">
                  <div className="w-2 h-2 rounded-full bg-blue-400" />
                </div>

                {/* Experience Card */}
                <div
                  onClick={() => toggleExpand(exp.id)}
                  onMouseEnter={() => setCursor('button', isExpanded ? 'COLLAPSE' : 'EXPAND')}
                  onMouseLeave={resetCursor}
                  className="cursor-pointer"
                >
                  <SpotlightCard
                    borderRadius="rounded-3xl"
                    spotlightColor="rgba(59, 130, 246, 0.18)"
                    className={`border transition-all duration-300 p-6 sm:p-8 ${
                      isExpanded
                        ? 'bg-[#0b0e1d] border-blue-500/50 shadow-[0_0_35px_rgba(59,130,246,0.15)]'
                        : 'bg-[#080911]/80 hover:bg-[#0c0f1e] border-white/[0.08] hover:border-white/20'
                    }`}
                  >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="font-mono text-xs text-blue-400 font-bold uppercase tracking-wider block mb-1">
                        {exp.company}
                      </span>
                      <h3 className="font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                        {exp.role}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400 mt-2">
                        <span className="flex items-center gap-1">
                          <Calendar size={13} className="text-slate-500" />
                          {exp.period}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin size={13} className="text-slate-500" />
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-full bg-white/5 text-slate-400 group-hover:text-white transition-colors">
                        <ChevronDown
                          size={18}
                          className={`transition-transform duration-300 ${
                            isExpanded ? 'rotate-180 text-blue-400' : ''
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed mt-4">
                    {exp.description}
                  </p>

                  {/* Expandable Deep-Dive */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35 }}
                        className="overflow-hidden pt-6 mt-6 border-t border-white/10 space-y-6"
                      >
                        <div>
                          <h4 className="font-mono text-xs uppercase tracking-widest text-slate-400 font-bold mb-3">
                            RESPONSIBILITIES & CONTRIBUTIONS:
                          </h4>
                          <ul className="space-y-2.5">
                            {exp.highlights.map((item, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 font-sans leading-relaxed"
                              >
                                <CheckCircle2 size={15} className="text-blue-400 shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/[0.06]">
                          <div>
                            <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400 block mb-2 font-bold">
                              TECH STACK:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {exp.techStack.map((tech) => (
                                <span
                                  key={tech}
                                  className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 font-mono text-xs text-slate-300"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div>
                            <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-400 block mb-1 font-bold">
                              KEY BUSINESS IMPACT:
                            </span>
                            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                              {exp.impact}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  </SpotlightCard>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
