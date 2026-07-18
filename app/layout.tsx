import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { ThemeProvider } from './theme-provider'

export const metadata: Metadata = {
  title: 'Pratham Sali | Full-Stack Developer',
  description: 'Full-stack developer with a backend focus. Specializing in Node.js, TypeScript, MongoDB, and modern web technologies.',
  keywords: 'full-stack developer, backend developer, React, Next.js, Node.js, TypeScript',
  authors: [{ name: 'Pratham Sali' }],
  openGraph: {
    title: 'Pratham Sali | Full-Stack Developer',
    description: 'Full-stack developer with a backend focus.',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: [{ media: '(prefers-color-scheme: dark)', color: '#fbbf24' }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="antialiased">
        <ThemeProvider>
          {children}
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </ThemeProvider>
      </body>
    </html>
  )
}
