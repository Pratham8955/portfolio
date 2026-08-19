import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { ThemeProvider } from './theme-provider'
import { SmoothScrollProvider } from '@/components/smooth-scroll-provider'
import { CommandPalette } from '@/components/command-palette'
import { KeyboardShortcuts } from '@/components/keyboard-shortcuts'
import { ScrollProgress } from '@/components/scroll-progress'
import { GlobalResumePreview } from '@/components/global-resume-preview'
import { SplashScreen } from '@/components/splash-screen'
import { PORTFOLIO_DATA } from '@/data/portfolio'

export const metadata: Metadata = {
  title: 'Pratham Sali — Software Developer',
  description: 'Full-stack software developer with a backend focus. Engineering resilient REST APIs, microservices, and modern web architectures.',
  keywords: 'Pratham Sali, Full-Stack Developer, Backend Engineer, Java, Spring Boot, Node.js, Next.js, TypeScript, MongoDB, Redis, Surat',
  authors: [{ name: 'Pratham Sali', url: 'https://github.com/Pratham8955' }],
  creator: 'Pratham Sali',
  openGraph: {
    title: 'Pratham Sali — Software Developer',
    description: 'Full-stack software developer with a backend focus. Engineering resilient REST APIs, microservices, and modern web architectures.',
    type: 'website',
    url: 'https://portfolio-k69w.vercel.app/',
    siteName: 'Pratham Sali Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pratham Sali — Software Developer',
    description: 'Full-stack software developer with a backend focus.',
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
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'dark',
  themeColor: [{ media: '(prefers-color-scheme: dark)', color: '#050505' }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-[#050505] text-white">
      <body className="antialiased selection:bg-blue-500/30 selection:text-white bg-[#050505]">
        <ThemeProvider>
          <SmoothScrollProvider>
            <ScrollProgress />
            <KeyboardShortcuts />
            <CommandPalette />
            <GlobalResumePreview />

            <SplashScreen>
              {children}
              {process.env.NODE_ENV === 'production' && <Analytics />}
            </SplashScreen>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
