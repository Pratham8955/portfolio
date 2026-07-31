'use client'

import { motion, useReducedMotion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { useState, MouseEvent } from 'react'
import {
  Code2,
  Terminal,
  Globe,
  Layers,
  Cpu,
  Server,
  Database,
  Flame,
  GitBranch,
  Workflow,
  Cpu as CpuIcon,
  Cloud
} from 'lucide-react'

// Enhanced Skills Data
const allSkills = [
  { name: 'Java', icon: Code2, category: 'Languages', yoe: '2+ years', usedIn: 'Finlogic Tech', projects: 'MFTran, HRMS', strength: 'Enterprise Backend' },
  { name: 'JavaScript', icon: Terminal, category: 'Languages', yoe: '3+ years', usedIn: 'Elaunch Solutions', projects: 'Maham, Ecommerce', strength: 'Full-Stack Logic' },
  { name: 'TypeScript', icon: Terminal, category: 'Languages', yoe: '1.5+ years', usedIn: 'Elaunch Solutions', projects: 'Inventory System', strength: 'Type-Safe Frontend' },
  { name: 'Next.js', icon: Layers, category: 'Frontend', yoe: '1.5+ years', usedIn: 'Elaunch Solutions', projects: 'Maham', strength: 'SSR & Routing' },
  { name: 'React', icon: Layers, category: 'Frontend', yoe: '2+ years', usedIn: 'Academic Projects', projects: 'CampusWave', strength: 'UI Components' },
  { name: 'Node.js', icon: Cpu, category: 'Backend', yoe: '2+ years', usedIn: 'Elaunch Solutions', projects: 'Maham, Ecommerce', strength: 'Scalable APIs' },
  { name: 'Express.js', icon: Server, category: 'Backend', yoe: '2+ years', usedIn: 'Personal Projects', projects: 'Inventory System', strength: 'REST APIs' },
  { name: 'Spring Boot', icon: Server, category: 'Backend', yoe: '1+ years', usedIn: 'Finlogic Tech', projects: 'HRMS', strength: 'Microservices' },
  { name: '.NET Core', icon: CpuIcon, category: 'Backend', yoe: '1+ years', usedIn: 'Academic Projects', projects: 'CampusWave', strength: 'Enterprise Auth' },
  { name: 'MongoDB', icon: Database, category: 'Database', yoe: '2+ years', usedIn: 'Elaunch Solutions', projects: 'Maham', strength: 'NoSQL Data Modeling' },
  { name: 'MySQL', icon: Database, category: 'Database', yoe: '3+ years', usedIn: 'Finlogic Tech', projects: 'HRMS', strength: 'Relational Design' },
  { name: 'Redis', icon: Flame, category: 'Database', yoe: '1+ years', usedIn: 'Elaunch Solutions', projects: 'Maham', strength: 'Caching & WebSockets' },
  { name: 'Docker', icon: Layers, category: 'DevOps', yoe: '<1 year', usedIn: 'Learning', projects: 'Personal', strength: 'Containerization' },
  { name: 'Git & GitHub', icon: GitBranch, category: 'DevOps', yoe: '3+ years', usedIn: 'All Roles', projects: 'All Projects', strength: 'Version Control' },
  { name: 'Postman', icon: Workflow, category: 'DevOps', yoe: '2+ years', usedIn: 'Finlogic & Elaunch', projects: 'API Testing', strength: 'Endpoint Validation' },
]

const categories = ['All', 'Frontend', 'Backend', 'Database', 'DevOps', 'Languages']

function SkillCard({ skill, shouldReduceMotion }: { skill: typeof allSkills[0], shouldReduceMotion: boolean }) {
  const Icon = skill.icon
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
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={shouldReduceMotion ? {} : { y: -5, rotateX: 2, rotateY: -2 }}
      onMouseMove={handleMouseMove}
      className="relative rounded-xl border border-border/50 bg-card/60 p-5 shadow-lg group overflow-hidden transition-colors hover:border-accent/50"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 hidden md:block"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              250px circle at ${mouseX}px ${mouseY}px,
              rgba(59, 130, 246, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-lg bg-muted text-muted-foreground group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300 shadow-inner">
            <Icon size={22} />
          </div>
          <div>
            <h4 className="font-bold text-foreground text-base group-hover:text-accent transition-colors">{skill.name}</h4>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">{skill.category}</span>
          </div>
        </div>

        <div className="space-y-2 mt-2 flex-1">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Experience</span>
            <span className="font-medium text-foreground">{skill.yoe}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Used In</span>
            <span className="font-medium text-foreground text-right">{skill.usedIn}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Projects</span>
            <span className="font-medium text-foreground text-right truncate max-w-[120px]">{skill.projects}</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-border/50">
          <p className="text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">Strength:</span> {skill.strength}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

function ProgressBar({ label, percentage, shouldReduceMotion }: { label: string, percentage: number, shouldReduceMotion: boolean }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-foreground">{label}</span>
        <span className="text-muted-foreground font-semibold">{percentage}%</span>
      </div>
      <div className="h-2 w-full bg-muted/50 rounded-full overflow-hidden border border-border/10">
        <motion.div
          className="h-full bg-accent rounded-full shadow-lg shadow-accent/20"
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0 : 1.2, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

const competencies = [
  { label: 'RESTful API Development', percentage: 90 },
  { label: 'System Architecture', percentage: 85 },
  { label: 'Database Design & Optimization', percentage: 80 },
  { label: 'Real-Time WebSockets & Webhook Handling', percentage: 75 },
  { label: 'Agile & Team Collaboration', percentage: 95 },
  { label: 'CI/CD & Cloud Deployment', percentage: 60 },
]

export function Skills() {
  const shouldReduceMotion = !!useReducedMotion()
  const [activeCategory, setActiveCategory] = useState('All')
  const [showAll, setShowAll] = useState(false)

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat)
    setShowAll(false)
  }

  const filteredSkills = allSkills.filter(skill =>
    activeCategory === 'All' ? true : skill.category === activeCategory
  )

  const displayedSkills = showAll ? filteredSkills : filteredSkills.slice(0, 8)

  return (
    <section id="skills" className="portfolio-container section-padding">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="space-y-12"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Skills &amp; Expertise
            </h2>
            <p className="text-muted-foreground max-w-xl text-lg">
              A comprehensive breakdown of my technical arsenal and proficiencies.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat 
                    ? 'bg-accent text-accent-foreground shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic skills grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {displayedSkills.map((skill) => (
            <SkillCard key={skill.name} skill={skill} shouldReduceMotion={shouldReduceMotion} />
          ))}
        </motion.div>

        {filteredSkills.length > 8 && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-2.5 rounded-full border border-border/50 bg-card/60 hover:bg-accent hover:text-accent-foreground transition-colors font-medium text-sm flex items-center gap-2 shadow-sm"
            >
              {showAll ? 'Show Less' : 'Show More'}
            </button>
          </div>
        )}

        {/* Competencies Progress Bars */}
        <div className="pt-16 mt-8 border-t border-border/30">
          <h3 className="text-2xl font-bold text-foreground mb-8">
            Core Competencies
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
            {competencies.map((comp, idx) => (
              <ProgressBar
                key={idx}
                label={comp.label}
                percentage={comp.percentage}
                shouldReduceMotion={shouldReduceMotion}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
