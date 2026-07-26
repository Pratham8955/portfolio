'use client'

import { useAppStore } from '@/lib/store'
import { ResumePreview } from './resume-preview'

export function GlobalResumePreview() {
  const { resumePreviewOpen, setResumePreviewOpen } = useAppStore()

  return (
    <ResumePreview
      isOpen={resumePreviewOpen}
      onClose={() => setResumePreviewOpen(false)}
      resumeUrl="/Pratham_Sali_Resume.pdf"
    />
  )
}
