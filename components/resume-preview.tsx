'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, Printer, Maximize, FileText } from 'lucide-react'

interface ResumePreviewProps {
  isOpen: boolean
  onClose: () => void
  resumeUrl: string
}

export function ResumePreview({ isOpen, onClose, resumeUrl }: ResumePreviewProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showIframe, setShowIframe] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      const timer = setTimeout(() => setShowIframe(true), 350)
      return () => {
        clearTimeout(timer)
        document.body.style.overflow = 'unset'
      }
    } else {
      setShowIframe(false)
      setIsFullscreen(false)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const [iframeKey, setIframeKey] = useState('desktop')

  useEffect(() => {
    const handleResize = () => {
      setIframeKey(window.innerWidth < 768 ? 'mobile' : 'desktop')
    }
    // Set initial value
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 z-[100] flex items-center justify-center px-4 md:px-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />
          <motion.div
            layoutId="resume-modal"
            transition={{ type: 'spring', damping: 30, stiffness: 350, mass: 0.9 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15, ease: 'easeOut' } }}
            className={`relative flex flex-col bg-card border border-border shadow-2xl z-10 custom-scrollbar overflow-x-hidden ${isOpen && showIframe ? 'overflow-y-auto' : 'overflow-hidden'} ${isFullscreen ? 'w-full h-full' : 'w-full max-w-7xl h-[85dvh] md:h-[90vh]'}`}
            style={{ borderRadius: '1rem' }}
            data-lenis-prevent="true"
          >
            {/* Header Toolbar */}
            <div className="sticky top-0 z-50 flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 border-b border-border bg-card w-full">
              <div className="flex items-center gap-2 text-foreground font-medium min-w-0 flex-1 pr-2 sm:pr-4">
                <FileText size={18} className="text-accent shrink-0" />
                <span className="truncate text-sm sm:text-base">Pratham_Sali_Resume.pdf</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="hidden sm:block p-1.5 sm:p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors shrink-0"
                  title="Toggle Fullscreen"
                >
                  <Maximize size={18} />
                </button>
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex p-1.5 sm:p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors shrink-0"
                  title="Print"
                >
                  <Printer size={18} />
                </a>
                <a
                  href={resumeUrl}
                  download
                  className="p-1.5 sm:p-2 text-muted-foreground hover:text-accent hover:bg-accent/10 rounded-md transition-colors shrink-0"
                  title="Download PDF"
                >
                  <Download size={18} />
                </a>
                <div className="w-px h-5 sm:h-6 bg-border mx-1 shrink-0" />
                <button
                  onClick={onClose}
                  className="p-1.5 sm:p-2 rounded-full bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors shrink-0"
                  title="Close"
                >
                  <X size={18} className="sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* PDF Viewer Area */}
            <div className="flex-1 bg-muted/10 relative w-full h-full flex items-center justify-center">
              {!showIframe && (
                <div className="absolute flex flex-col items-center gap-4 text-muted-foreground">
                  <div className="w-8 h-8 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
                  <span className="text-sm font-medium animate-pulse">Loading Document...</span>
                </div>
              )}
              {showIframe && (
                <iframe
                  key={iframeKey}
                  src={`${resumeUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                  className="w-full h-full border-none"
                  title="Resume PDF"
                  loading="lazy"
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
