'use client'

import { motion, Variants } from 'framer-motion'
import { Mail, Phone, Code, Briefcase, MapPin, CheckCircle2, Copy } from 'lucide-react'
import { useState } from 'react'

export function Contact() {
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('prathamsali123@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, type: 'spring', stiffness: 300, damping: 24 },
    },
  }

  const contactLinks = [
    { icon: Mail, label: 'Email', value: 'prathamsali123@gmail.com', href: 'mailto:prathamsali123@gmail.com', action: handleCopyEmail },
    { icon: Phone, label: 'Phone', value: '+91 6352547022', href: 'tel:+916352547022' },
    { icon: MapPin, label: 'Location', value: 'Surat, Gujarat', href: '#' },
    { icon: Code, label: 'GitHub', value: 'github.com/Pratham8955', href: 'https://github.com/Pratham8955' },
    { icon: Briefcase, label: 'LinkedIn', value: 'linkedin.com/in/pratham-sali', href: 'https://www.linkedin.com/in/pratham-sali-7244a4216/' },
  ]

  return (
    <section id="contact" className="portfolio-container section-padding">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Let&apos;s Connect
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            I&apos;m currently open for new opportunities. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {contactLinks.map((link, idx) => {
            const Icon = link.icon
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="group relative"
              >
                <a
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : '_self'}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : ''}
                  onClick={(e) => {
                    if (link.action) {
                      e.preventDefault()
                      link.action()
                    }
                  }}
                  className="flex items-center gap-4 p-5 rounded-2xl subtle-border bg-card/40 hover:bg-muted/50 hover:border-accent/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300"
                >
                  <div className="p-3.5 rounded-xl bg-muted/80 group-hover:bg-accent/20 transition-colors duration-300">
                    <Icon size={24} className="text-muted-foreground group-hover:text-accent transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground text-lg">{link.label}</h3>
                    <p className="text-sm text-muted-foreground truncate">{link.value}</p>
                  </div>
                  {link.action && (
                    <div className="p-2 text-muted-foreground group-hover:text-accent transition-colors">
                      {copied && link.label === 'Email' ? <CheckCircle2 size={18} className="text-green-500" /> : <Copy size={18} />}
                    </div>
                  )}
                </a>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          className="mt-24 pt-8 border-t border-border/50 text-center flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground/70 text-sm">
            © {new Date().getFullYear()} Pratham Sali. All rights reserved.
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}
