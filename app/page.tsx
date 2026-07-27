import { Navigation } from '@/components/nav'
import { Hero } from '@/components/hero'
import { InteractiveCanvas } from '@/components/interactive-canvas'
import { CustomCursor } from '@/components/custom-cursor'
import { About } from '@/components/about'
import { Experience } from '@/components/experience'
import { Education } from '@/components/education'
import { Projects } from '@/components/projects'
import { Skills } from '@/components/skills'
import { Contact } from '@/components/contact'

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
