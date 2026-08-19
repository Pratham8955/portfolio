'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Code2, Server, Layers, Database, Cpu, Sparkles, Terminal, ChevronDown, ChevronUp } from 'lucide-react'
import { PORTFOLIO_DATA, SkillItem } from '@/data/portfolio'
import { useAppStore } from '@/lib/store'
import { Magnetic } from './magnetic'
import { SpotlightCard } from './spotlight-card'

export function Stack() {
  const shouldReduceMotion = useReducedMotion()
  const { setCursor, resetCursor } = useAppStore()
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [hoveredSkill, setHoveredSkill] = useState<SkillItem | null>(null)
  const [showAll, setShowAll] = useState(false)

  const categories = ['All', 'Languages', 'Backend', 'Frontend', 'Database', 'DevOps & Tools']

  const skills = PORTFOLIO_DATA.skills

  const filteredSkills = skills.filter((skill) =>
    activeCategory === 'All' ? true : skill.category === activeCategory
  )

  // Show first 6 items by default, or all if expanded
  const displayedSkills = showAll ? filteredSkills : filteredSkills.slice(0, 6)
  const hasMore = filteredSkills.length > 6

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat)
    setShowAll(false)
  }

  return (
    <section id="stack" className="relative w-full py-28 px-4 sm:px-8 md:px-12 lg:px-16 bg-[#050505] overflow-hidden border-t border-white/[0.08]">
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/3 w-[600px] h-[600px] rounded-full bg-blue-600/5 blur-[160px] -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-blue-400 font-semibold mb-3">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span>TECHNICAL ECOSYSTEM</span>
            </div>
            <h2 className="font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tighter text-white">
              THE STACK.
            </h2>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                onMouseEnter={() => setCursor('button', category.toUpperCase())}
                onMouseLeave={resetCursor}
                className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-blue-600 text-white font-bold shadow-[0_0_20px_rgba(59,130,246,0.5)]'
                    : 'bg-[#0f111d] hover:bg-[#181b2e] border border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Skill Matrix + Inspection Terminal Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: Interactive Skills Cloud / Grid (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              {displayedSkills.map((skill) => {
                const isHovered = hoveredSkill?.name === skill.name

                return (
                  <motion.div
                    key={skill.name}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    onMouseEnter={() => {
                      setHoveredSkill(skill)
                      setCursor('button', 'TECH')
                    }}
                    onMouseLeave={() => {
                      setHoveredSkill(null)
                      resetCursor()
                    }}
                    className="cursor-pointer"
                  >
                    <SpotlightCard
                      borderRadius="rounded-2xl"
                      spotlightColor="rgba(59, 130, 246, 0.25)"
                      className={`p-4 sm:p-5 border transition-all duration-300 relative h-full ${
                        isHovered
                          ? 'bg-[#101428] border-blue-500 shadow-[0_0_25px_rgba(59,130,246,0.35)] scale-[1.02] z-20'
                          : 'bg-[#0a0c16]/80 hover:bg-[#0f1222] border-white/[0.08] hover:border-white/20 z-10'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono text-[10px] text-blue-400 font-bold px-2 py-0.5 rounded bg-blue-950/60 border border-blue-500/30">
                            {skill.category}
                          </span>
                        </div>
                        <span className="font-mono text-[11px] text-emerald-400 font-semibold">
                          {skill.proficiency}
                        </span>
                      </div>

                      <h3 className="font-black text-lg sm:text-xl text-white tracking-tight">
                        {skill.name}
                      </h3>

                      <p className="text-xs text-slate-400 mt-1 line-clamp-1 font-sans">
                        {skill.strength}
                      </p>

                      <div className="mt-3 pt-2.5 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-500">
                        <span className="truncate">Used in: {skill.usedIn}</span>
                      </div>
                    </SpotlightCard>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* See More / Show Less Toggle Button */}
            {hasMore && (
              <div className="flex justify-center pt-2">
                <Magnetic>
                  <button
                    onClick={() => setShowAll(!showAll)}
                    onMouseEnter={() => setCursor('button', showAll ? 'LESS' : 'MORE')}
                    onMouseLeave={resetCursor}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600/15 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 hover:text-white font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-md"
                  >
                    <span>
                      {showAll
                        ? 'SHOW LESS'
                        : `SEE MORE TECHNOLOGIES (+${filteredSkills.length - 6})`}
                    </span>
                    {showAll ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                  </button>
                </Magnetic>
              </div>
            )}
          </div>

          {/* Right: Technical Inspector Panel (5 Cols) */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="rounded-2xl border border-white/15 bg-[#090b14]/90 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
                <div className="flex items-center gap-2 text-xs font-mono text-blue-400 font-bold uppercase">
                  <Terminal size={15} />
                  <span>TECHNOLOGY INSPECTOR</span>
                </div>
                <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  SYSTEM READY
                </span>
              </div>

              {hoveredSkill ? (
                <motion.div
                  key={hoveredSkill.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  <div>
                    <span className="font-mono text-xs text-blue-400 font-semibold">
                      {hoveredSkill.category}
                    </span>
                    <h3 className="font-black text-3xl sm:text-4xl text-white tracking-tight uppercase">
                      {hoveredSkill.name}
                    </h3>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.07] space-y-3 font-mono text-xs">
                    <div>
                      <span className="text-slate-500 block uppercase text-[10px]">ENGINEERING STRENGTH:</span>
                      <span className="text-cyan-300 font-bold">{hoveredSkill.strength}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block uppercase text-[10px]">PRODUCTION / WORKPLACE USAGE:</span>
                      <span className="text-white">{hoveredSkill.usedIn}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block uppercase text-[10px]">PROJECT IMPLEMENTATIONS:</span>
                      <span className="text-white">{hoveredSkill.projects}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-2 font-bold">
                      RELATED TECHNOLOGIES:
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {hoveredSkill.relatedTech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-lg bg-blue-950/50 border border-blue-500/40 text-blue-300 font-mono text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="py-12 text-center text-slate-500 space-y-3 font-mono text-xs">
                  <Code2 size={32} className="mx-auto text-slate-600 opacity-60" />
                  <p>HOVER OVER ANY TECHNOLOGY TO INSPECT DETAILS & PROJECT IMPLEMENTATIONS.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
