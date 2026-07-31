'use client'

import { motion } from 'framer-motion'
import { Zap, Code2, Database, Layers } from 'lucide-react'

export function CurrentlyBuildingWidget() {
  const focuses = [
    { name: 'Microservices Architecture', icon: Layers, color: 'text-blue-400' },
    { name: 'Spring Boot 4', icon: Zap, color: 'text-green-400' },
    { name: 'Docker & Kubernetes', icon: Database, color: 'text-cyan-400' },
    { name: 'System Design', icon: Code2, color: 'text-purple-400' }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="subtle-border rounded-xl p-5 md:p-6 bg-card/80 backdrop-blur-sm mt-8 w-full shadow-lg relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />

      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
        </div>
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
          Currently Focused On
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
        {focuses.map((focus, i) => {
          const Icon = focus.icon
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3 bg-muted/30 hover:bg-muted/60 transition-colors p-3 rounded-lg border border-border/30"
            >
              <Icon size={16} className={focus.color} />
              <span className="text-sm font-medium text-muted-foreground">{focus.name}</span>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
