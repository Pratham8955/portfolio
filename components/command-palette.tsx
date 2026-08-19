'use client'

import * as React from 'react'
import { Command } from 'cmdk'
import { useAppStore } from '@/lib/store'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Code,
  Briefcase,
  Terminal,
  Mail,
  FileText,
  GitBranch,
  Globe,
  GraduationCap,
  User,
  Compass,
  X,
  ExternalLink
} from 'lucide-react'

export function CommandPalette() {
  const { commandPaletteOpen, setCommandPaletteOpen, setResumePreviewOpen, setSelectedProjectId } = useAppStore()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setCommandPaletteOpen(!commandPaletteOpen)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [commandPaletteOpen, setCommandPaletteOpen])

  const runCommand = React.useCallback(
    (command: () => unknown) => {
      setCommandPaletteOpen(false)
      setTimeout(() => {
        command()
      }, 150)
    },
    [setCommandPaletteOpen]
  )

  return (
    <AnimatePresence>
      {commandPaletteOpen && (
        <Command.Dialog
          open={commandPaletteOpen}
          onOpenChange={setCommandPaletteOpen}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/15 bg-[#090b14] shadow-2xl text-white"
          >
            <div className="flex items-center border-b border-white/10 px-4">
              <Command.Input
                placeholder="Type a command or search sections..."
                className="flex w-full bg-transparent py-4 text-sm outline-none placeholder:text-slate-500 text-white font-mono"
              />
              <button
                onClick={() => setCommandPaletteOpen(false)}
                className="ml-2 p-1 rounded-sm opacity-70 hover:opacity-100 transition-opacity"
              >
                <X size={18} />
                <span className="sr-only">Close</span>
              </button>
            </div>
            <Command.List className="max-h-[340px] overflow-y-auto p-2 font-sans" data-lenis-prevent="true">
              <Command.Empty className="p-4 text-center text-sm font-mono text-slate-500">
                No matching records found.
              </Command.Empty>

              <Command.Group heading="Navigation" className="px-2 py-1.5 text-xs font-mono font-bold text-blue-400">
                <Command.Item
                  onSelect={() => runCommand(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }))}
                  className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-slate-300 hover:bg-white/5 aria-selected:bg-blue-600/20 aria-selected:text-white"
                >
                  <User size={16} className="text-blue-400" />
                  <span>About</span>
                </Command.Item>
                <Command.Item
                  onSelect={() => runCommand(() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' }))}
                  className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-slate-300 hover:bg-white/5 aria-selected:bg-blue-600/20 aria-selected:text-white"
                >
                  <Briefcase size={16} className="text-blue-400" />
                  <span>Experience</span>
                </Command.Item>
                <Command.Item
                  onSelect={() => runCommand(() => document.getElementById('education')?.scrollIntoView({ behavior: 'smooth' }))}
                  className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-slate-300 hover:bg-white/5 aria-selected:bg-blue-600/20 aria-selected:text-white"
                >
                  <GraduationCap size={16} className="text-blue-400" />
                  <span>Education</span>
                </Command.Item>
                <Command.Item
                  onSelect={() => runCommand(() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }))}
                  className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-slate-300 hover:bg-white/5 aria-selected:bg-blue-600/20 aria-selected:text-white"
                >
                  <Code size={16} className="text-blue-400" />
                  <span>Projects</span>
                </Command.Item>
                <Command.Item
                  onSelect={() => runCommand(() => document.getElementById('stack')?.scrollIntoView({ behavior: 'smooth' }))}
                  className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-slate-300 hover:bg-white/5 aria-selected:bg-blue-600/20 aria-selected:text-white"
                >
                  <Terminal size={16} className="text-blue-400" />
                  <span>Skills & Stack</span>
                </Command.Item>
                <Command.Item
                  onSelect={() => runCommand(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }))}
                  className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-slate-300 hover:bg-white/5 aria-selected:bg-blue-600/20 aria-selected:text-white"
                >
                  <Mail size={16} className="text-blue-400" />
                  <span>Contact</span>
                </Command.Item>
              </Command.Group>

              <Command.Group heading="Featured Projects" className="px-2 py-1.5 text-xs font-mono font-bold text-emerald-400 mt-2">
                <Command.Item
                  onSelect={() => runCommand(() => setSelectedProjectId('strata'))}
                  className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-slate-300 hover:bg-white/5 aria-selected:bg-blue-600/20 aria-selected:text-white"
                >
                  <ExternalLink size={16} className="text-emerald-400" />
                  <span>Open Strata Case Study (QR SaaS)</span>
                </Command.Item>
                <Command.Item
                  onSelect={() => runCommand(() => setSelectedProjectId('maham'))}
                  className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-slate-300 hover:bg-white/5 aria-selected:bg-blue-600/20 aria-selected:text-white"
                >
                  <ExternalLink size={16} className="text-emerald-400" />
                  <span>Open Maham Case Study (Enterprise System)</span>
                </Command.Item>
              </Command.Group>

              <Command.Group heading="External Links" className="px-2 py-1.5 text-xs font-mono font-bold text-slate-400 mt-2">
                <Command.Item
                  onSelect={() => runCommand(() => window.open('https://github.com/Pratham8955', '_blank'))}
                  className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-slate-300 hover:bg-white/5 aria-selected:bg-blue-600/20 aria-selected:text-white"
                >
                  <GitBranch size={16} />
                  <span>GitHub Profile</span>
                </Command.Item>
                <Command.Item
                  onSelect={() => runCommand(() => window.open('https://www.linkedin.com/in/pratham-sali-7244a4216/', '_blank'))}
                  className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-slate-300 hover:bg-white/5 aria-selected:bg-blue-600/20 aria-selected:text-white"
                >
                  <Globe size={16} />
                  <span>LinkedIn Profile</span>
                </Command.Item>
                <Command.Item
                  onSelect={() => runCommand(() => setResumePreviewOpen(true))}
                  className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-slate-300 hover:bg-white/5 aria-selected:bg-blue-600/20 aria-selected:text-white"
                >
                  <FileText size={16} />
                  <span>Open Resume Preview Modal</span>
                </Command.Item>
              </Command.Group>
            </Command.List>
          </motion.div>
        </Command.Dialog>
      )}
    </AnimatePresence>
  )
}
