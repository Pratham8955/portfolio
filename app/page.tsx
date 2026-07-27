import { Navigation } from '@/components/nav'
import { Hero } from '@/components/hero'
import { InteractiveCanvas } from '@/components/interactive-canvas'
import { CustomCursor } from '@/components/custom-cursor'
import dynamic from 'next/dynamic'

// Lazy-load everything below the fold — only Hero is needed immediately
const About = dynamic(() => import('@/components/about').then(m => ({ default: m.About })))
const Experience = dynamic(() => import('@/components/experience').then(m => ({ default: m.Experience })))
const Education = dynamic(() => import('@/components/education').then(m => ({ default: m.Education })))
const Projects = dynamic(() => import('@/components/projects').then(m => ({ default: m.Projects })))
const Skills = dynamic(() => import('@/components/skills').then(m => ({ default: m.Skills })))
const Contact = dynamic(() => import('@/components/contact').then(m => ({ default: m.Contact })))

export default function Home() {
  return (
    <>
      <CustomCursor />
      <InteractiveCanvas />
      <Navigation />
      <main className="pt-16">
        <Hero />
        <About />
        <Experience />
        <Education />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </>
  )
}
