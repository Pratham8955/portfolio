'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Copy, Check, Send, FileText, AlertCircle } from 'lucide-react'
import { PORTFOLIO_DATA } from '@/data/portfolio'
import { Magnetic } from './magnetic'
import { GithubIcon, LinkedinIcon } from './icons'
import { useAppStore } from '@/lib/store'

export function Contact() {
  const { setResumePreviewOpen, setCursor, resetCursor } = useAppStore()
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email)
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return

    setFormStatus('submitting')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setFormStatus('success')
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setFormStatus('idle'), 5000)
      } else {
        setFormStatus('error')
        setErrorMessage(data.error || 'Failed to transmit message. Please email directly.')
      }
    } catch (err) {
      console.error('Contact submit error:', err)
      setFormStatus('error')
      setErrorMessage('Network error while dispatching message. Please email directly.')
    }
  }

  return (
    <section id="contact" className="relative w-full py-32 px-4 sm:px-8 md:px-12 lg:px-16 bg-[#050505] overflow-hidden border-t border-white/[0.08]">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-[700px] h-[700px] rounded-full bg-blue-600/10 blur-[180px] -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Giant Editorial Headline */}
        <div className="mb-16">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-blue-400 font-semibold mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span>START A CONVERSATION</span>
          </div>
          <h2 className="font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase tracking-tighter text-white leading-[0.88]">
            LET&apos;S BUILD <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-white bg-clip-text text-transparent">
              SOMETHING.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Coordinates (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed">
              Available for full-time engineering roles, backend contracts, and technical collaborations. Reach out directly or dispatch a message below.
            </p>

            {/* Quick Email Copy Card */}
            <div className="p-6 rounded-2xl border border-white/10 bg-[#090b14]/80 backdrop-blur-md space-y-4">
              <span className="font-mono text-xs text-slate-400 uppercase tracking-wider block">
                DIRECT INBOX
              </span>
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-sm sm:text-base text-white font-bold truncate">
                  {PORTFOLIO_DATA.personal.email}
                </span>
                <button
                  onClick={handleCopyEmail}
                  onMouseEnter={() => setCursor('button', 'COPY')}
                  onMouseLeave={resetCursor}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-blue-600 border border-white/10 text-white transition-colors shrink-0"
                  title="Copy email address"
                >
                  {copiedEmail ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                </button>
              </div>
              {copiedEmail && (
                <span className="font-mono text-xs text-emerald-400 block animate-fadeIn">
                  ✓ EMAIL ADDRESS COPIED TO CLIPBOARD
                </span>
              )}
            </div>

            {/* Coordinates list */}
            <div className="space-y-3 font-mono text-xs text-slate-400">
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <Phone size={16} className="text-blue-400" />
                <span>{PORTFOLIO_DATA.personal.phone}</span>
              </div>
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <MapPin size={16} className="text-blue-400" />
                <span>{PORTFOLIO_DATA.personal.location}</span>
              </div>
            </div>

            {/* Direct Social & Resume Triggers */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Magnetic>
                <a
                  href={PORTFOLIO_DATA.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setCursor('github')}
                  onMouseLeave={resetCursor}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs uppercase"
                >
                  <GithubIcon size={15} /> GITHUB
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href={PORTFOLIO_DATA.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setCursor('button', 'LINKEDIN')}
                  onMouseLeave={resetCursor}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs uppercase"
                >
                  <LinkedinIcon size={15} /> LINKEDIN
                </a>
              </Magnetic>
              <Magnetic>
                <button
                  onClick={() => setResumePreviewOpen(true)}
                  onMouseEnter={() => setCursor('button', 'RESUME')}
                  onMouseLeave={resetCursor}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 font-mono text-xs uppercase"
                >
                  <FileText size={15} /> RESUME
                </button>
              </Magnetic>
            </div>
          </div>

          {/* Right Column: Interactive Dispatch Form (7 cols) */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-white/15 bg-[#090b14]/90 backdrop-blur-2xl p-6 sm:p-10 shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-2">
                <span className="font-mono text-xs uppercase tracking-widest text-slate-400 font-bold">
                  MESSAGE DISPATCH PROTOCOL
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contact-name" className="block font-mono text-xs uppercase tracking-wider text-slate-400 mb-2">
                    YOUR NAME
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 focus:border-blue-500 focus:outline-none text-white font-sans text-sm transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block font-mono text-xs uppercase tracking-wider text-slate-400 mb-2">
                    EMAIL ADDRESS
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="jane@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 focus:border-blue-500 focus:outline-none text-white font-sans text-sm transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="block font-mono text-xs uppercase tracking-wider text-slate-400 mb-2">
                  PROJECT / INQUIRY DETAILS
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  placeholder="Tell me about the product or opportunity..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 focus:border-blue-500 focus:outline-none text-white font-sans text-sm transition-colors resize-none"
                />
              </div>

              {formStatus === 'success' && (
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-400 font-mono text-xs flex items-center gap-2">
                  <Check size={16} />
                  <span>TRANSMISSION RECEIVED. I WILL RESPOND SHORTLY!</span>
                </div>
              )}

              {formStatus === 'error' && (
                <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/40 text-red-400 font-mono text-xs flex items-center gap-2">
                  <AlertCircle size={16} />
                  <span>{errorMessage || 'FAILED TO TRANSMIT MESSAGE. PLEASE EMAIL DIRECTLY.'}</span>
                </div>
              )}

              <Magnetic className="w-full sm:w-auto">
                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  onMouseEnter={() => setCursor('contact')}
                  onMouseLeave={resetCursor}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs uppercase tracking-widest font-bold shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all duration-300 disabled:opacity-50"
                >
                  <Send size={15} />
                  <span>{formStatus === 'submitting' ? 'TRANSMITTING...' : "LET'S TALK →"}</span>
                </button>
              </Magnetic>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
