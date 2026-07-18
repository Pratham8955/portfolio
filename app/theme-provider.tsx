'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type Theme = 'dark' | 'bw'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  mounted: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('portfolio-theme') as Theme | null
    const initialTheme = (stored === 'bw' || stored === 'dark') ? stored : 'dark'
    setTheme(initialTheme)
    document.documentElement.setAttribute('data-theme', initialTheme)
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === 'dark' ? 'bw' : 'dark'
      localStorage.setItem('portfolio-theme', newTheme)
      document.documentElement.setAttribute('data-theme', newTheme)
      return newTheme
    })
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
