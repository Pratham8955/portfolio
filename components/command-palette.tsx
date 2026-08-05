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
  X
} from 'lucide-react'

export function CommandPalette() {
  const { commandPaletteOpen, setCommandPaletteOpen, setResumePreviewOpen } = useAppStore()

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
      // Small delay ensures the dialog's scroll-lock is removed before scrolling
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-xl overflow-hidden rounded-xl border border-border bg-card shadow-2xl"
          >
            <div className="flex items-center border-b border-border px-4">
              <Command.Input
                placeholder="Type a command or search..."
                className="flex w-full bg-transparent py-4 text-sm outline-none placeholder:text-muted-foreground text-foreground"
              />
              <button
                onClick={() => setCommandPaletteOpen(false)}
                className="ml-2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none"
              >
                <X size={18} />
                <span className="sr-only">Close</span>
              </button>
            </div>
            <Command.List className="max-h-[300px] overflow-y-auto p-2" data-lenis-prevent="true">
              <Command.Empty className="p-4 text-center text-sm text-muted-foreground">
                No results found.
              </Command.Empty>

              <Command.Group heading="Navigation" className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                <Command.Item
                  onSelect={() => runCommand(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }))}
                  className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-foreground hover:bg-muted/50 aria-selected:bg-muted aria-selected:text-accent"
                >
                  <User size={16} />
                  <span>About</span>
                </Command.Item>
                <Command.Item
                  onSelect={() => runCommand(() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }))}
                  className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-foreground hover:bg-muted/50 aria-selected:bg-muted aria-selected:text-accent"
                >
                  <Code size={16} />
                  <span>Projects</span>
                </Command.Item>
                <Command.Item
                  onSelect={() => runCommand(() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' }))}
                  className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-foreground hover:bg-muted/50 aria-selected:bg-muted aria-selected:text-accent"
                >
                  <Briefcase size={16} />
                  <span>Experience</span>
                </Command.Item>
                <Command.Item
                  onSelect={() => runCommand(() => document.getElementById('education')?.scrollIntoView({ behavior: 'smooth' }))}
                  className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-foreground hover:bg-muted/50 aria-selected:bg-muted aria-selected:text-accent"
                >
                  <GraduationCap size={16} />
                  <span>Education</span>
                </Command.Item>
                <Command.Item
                  onSelect={() => runCommand(() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }))}
                  className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-foreground hover:bg-muted/50 aria-selected:bg-muted aria-selected:text-accent"
                >
                  <Terminal size={16} />
                  <span>Skills</span>
                </Command.Item>
                <Command.Item
                  onSelect={() => runCommand(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }))}
                  className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-foreground hover:bg-muted/50 aria-selected:bg-muted aria-selected:text-accent"
                >
                  <Mail size={16} />
                  <span>Contact</span>
                </Command.Item>
              </Command.Group>

              <Command.Group heading="Links" className="px-2 py-1.5 text-xs font-medium text-muted-foreground mt-2">
                <Command.Item
                  onSelect={() => runCommand(() => window.open('https://github.com/Pratham8955', '_blank'))}
                  className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-foreground hover:bg-muted/50 aria-selected:bg-muted aria-selected:text-accent"
                >
                  <GitBranch size={16} />
                  <span>GitHub</span>
                </Command.Item>
                <Command.Item
                  onSelect={() => runCommand(() => window.open('https://www.linkedin.com/in/pratham-sali-7244a4216/', '_blank'))}
                  className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-foreground hover:bg-muted/50 aria-selected:bg-muted aria-selected:text-accent"
                >
                  <Globe size={16} />
                  <span>LinkedIn</span>
                </Command.Item>
                <Command.Item
                  onSelect={() => runCommand(() => setResumePreviewOpen(true))}
                  className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-foreground hover:bg-muted/50 aria-selected:bg-muted aria-selected:text-accent"
                >
                  <FileText size={16} />
                  <span>Resume</span>
                </Command.Item>
              </Command.Group>

            </Command.List>
          </motion.div>
        </Command.Dialog>
      )}
    </AnimatePresence>
  )
}
