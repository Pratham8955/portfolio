'use client'

import { motion } from 'framer-motion'
import { GraduationCap, Award, Calendar, MapPin, CheckCircle2 } from 'lucide-react'
import { PORTFOLIO_DATA } from '@/data/portfolio'

export function Education() {
  const educationList = PORTFOLIO_DATA.education

  return (
    <section id="education" className="relative w-full py-20 px-4 sm:px-8 md:px-12 lg:px-16 bg-[#050505] overflow-hidden border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-blue-400 font-semibold mb-3">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              <span>ACADEMIC FOUNDATION</span>
            </div>
            <h2 className="font-black text-3xl sm:text-5xl uppercase tracking-tighter text-white">
              EDUCATION.
            </h2>
          </div>
          <p className="text-slate-400 text-sm max-w-md font-sans">
            Formal degrees in Information & Communication Technology and Computer Applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {educationList.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 sm:p-8 rounded-3xl border border-white/[0.08] hover:border-blue-500/40 bg-[#080a13]/80 backdrop-blur-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-blue-950/60 border border-blue-500/30 text-blue-400">
                    <GraduationCap size={20} />
                  </div>
                  <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-500/30">
                    {edu.grade}
                  </span>
                </div>

                <h3 className="font-black text-xl sm:text-2xl text-white tracking-tight uppercase">
                  {edu.degree}
                </h3>
                <p className="text-blue-400 text-sm font-medium mt-1">
                  {edu.institution}
                </p>

                <div className="flex items-center gap-4 text-xs font-mono text-slate-500 mt-2 mb-6">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {edu.period}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin size={12} />
                    {edu.location}
                  </span>
                </div>

                <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                  {edu.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-blue-400 font-bold">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
