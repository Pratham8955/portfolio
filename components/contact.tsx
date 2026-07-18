'use client'

import { motion } from 'framer-motion'
import { DecodedText } from './decoded-text'
import { Mail, Phone, Code, Briefcase, MapPin } from 'lucide-react'

export function Contact() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const contactLinks = [
    {
      icon: Mail,
      label: 'Email',
      value: 'prathamsali123@gmail.com',
      href: 'mailto:prathamsali123@gmail.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 6352547022',
      href: 'tel:+916352547022',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Surat, Gujarat',
      href: '#',
    },
    {
      icon: Code,
      label: 'GitHub',
      value: 'github.com',
      href: 'https://github.com/Pratham8955',
    },
    {
      icon: Briefcase,
      label: 'LinkedIn',
      value: 'linkedin.com',
      href: 'https://www.linkedin.com/in/pratham-sali-7244a4216/',
    },
  ]

  return (
    <section id="contact" className="portfolio-container section-padding">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          <DecodedText text="Let's Connect" />
        </h2>
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
          I&apos;m always interested in hearing about new projects and opportunities.
          Feel free to reach out!
        </p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {contactLinks.map((link, idx) => {
            const Icon = link.icon
            return (
              <motion.a
                key={idx}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : '_self'}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : ''}
                className="subtle-border rounded-lg p-6 hover:border-accent/50 hover:bg-muted/30 transition-all group no-underline text-foreground"
                variants={itemVariants}
                whileHover={{ y: -5 }}
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-muted/50 group-hover:bg-accent/20 transition-colors">
                    <Icon
                      size={24}
                      className="text-accent group-hover:text-accent transition-colors"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground group-hover:text-accent mb-1 transition-colors" style={{ color: undefined }}>
                      {link.label}
                    </h3>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {link.value}
                    </p>
                  </div>
                </div>
              </motion.a>
            )
          })}
        </motion.div>

        <motion.div
          className="mt-12 pt-8 border-t border-border text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground">
            © 2025 Pratham Sali. All rights reserved.
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}
