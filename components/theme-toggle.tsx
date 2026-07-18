'use client'

import { useTheme } from '@/app/theme-provider'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme()

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-lg border border-border/50 bg-muted/50 animate-pulse" />
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center justify-center w-10 h-10 rounded-lg border border-border/50 bg-muted/50 hover:bg-muted transition-colors"
      aria-label={`Switch to ${theme === 'dark' ? 'black and white' : 'dark'} theme`}
      title={`Switch to ${theme === 'dark' ? 'B&W' : 'Dark'} theme`}
    >
      {theme === 'dark' ? (
        <Sun size={20} className="text-accent" />
      ) : (
        <Moon size={20} className="text-foreground" />
      )}
    </button>
  )
}
