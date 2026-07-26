'use client'

import { motion } from 'framer-motion'
import { GitBranch, Star, GitFork, Activity } from 'lucide-react'

export function GithubWidget() {
  return (
    <motion.a
      href="https://github.com/Pratham8955"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="block w-full max-w-sm rounded-xl border border-border/50 bg-card/80 p-5 shadow-lg backdrop-blur-sm transition-all hover:border-accent/40 hover:shadow-xl hover:-translate-y-1 group"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <GitBranch className="text-foreground group-hover:text-accent transition-colors" size={20} />
          <span className="font-semibold text-foreground">@Pratham8955</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
          <Activity size={12} className="text-green-500" />
          <span>Active</span>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">Top Languages</span>
          <div className="flex gap-2">
             <span className="w-2.5 h-2.5 rounded-full bg-[#3178c6]" title="TypeScript" />
             <span className="w-2.5 h-2.5 rounded-full bg-[#f1e05a]" title="JavaScript" />
             <span className="w-2.5 h-2.5 rounded-full bg-[#b07219]" title="Java" />
          </div>
        </div>
        
        <div className="flex gap-4 pt-2 border-t border-border/50">
           <div className="flex items-center gap-1.5 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
             <Star size={14} />
             <span>12</span>
           </div>
           <div className="flex items-center gap-1.5 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
             <GitFork size={14} />
             <span>8</span>
           </div>
        </div>
      </div>
    </motion.a>
  )
}
