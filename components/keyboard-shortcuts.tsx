'use client'

import { useEffect, useState } from 'react'
import { useAppStore } from '@/lib/store'
import { AnimatePresence, motion } from 'framer-motion'
import { Command } from 'lucide-react'

export function KeyboardShortcuts() {
  const { shortcutsEnabled, setCommandPaletteOpen, setResumePreviewOpen } = useAppStore()
  const [toast, setToast] = useState<{ message: string; show: boolean }>({ message: '', show: false })

  const showToast = (message: string) => {
    setToast({ message, show: true })
    setTimeout(() => setToast({ message: '', show: false }), 2500)
  }

  useEffect(() => {
    if (!shortcutsEnabled) return

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input or textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return

      const key = e.key.toLowerCase()

      switch (key) {
        case 'g':
          window.open('https://github.com/Pratham8955', '_blank')
          showToast('Opening GitHub...')
          break
        case 'l':
          window.open('https://www.linkedin.com/in/pratham-sali-7244a4216/', '_blank')
          showToast('Opening LinkedIn...')
          break
        case 'r':
          setResumePreviewOpen(true)
          showToast('Opening Resume Preview')
          break
        case 'c':
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
          showToast('Navigating to Contact')
          break
        case 'p':
          document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
          showToast('Navigating to Projects')
          break
        case '?':
          setCommandPaletteOpen(true)
          showToast('Opening Command Palette')
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [shortcutsEnabled, setCommandPaletteOpen])

  return (
    <AnimatePresence>
      {toast.show && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 20, x: '-50%' }}
          className="fixed bottom-20 left-1/2 z-50 flex items-center gap-2 rounded-full bg-card border border-border/50 px-4 py-2 shadow-xl backdrop-blur-md"
        >
          <Command size={14} className="text-accent" />
          <span className="text-sm font-medium text-foreground">{toast.message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
