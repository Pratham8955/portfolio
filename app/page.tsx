import { CustomCursor } from '@/components/custom-cursor'
import { Navigation } from '@/components/nav'
import { FullscreenMenu } from '@/components/fullscreen-menu'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { Experience } from '@/components/experience'
import { Education } from '@/components/education'
import { Projects } from '@/components/projects'
import { HowIBuild } from '@/components/how-i-build'
import { Stack } from '@/components/stack'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Navigation />
      <FullscreenMenu />
      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Education />
        <Projects />
        <HowIBuild />
        <Stack />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
