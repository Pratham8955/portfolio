import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AppState {
  commandPaletteOpen: boolean
  setCommandPaletteOpen: (open: boolean) => void
  shortcutsEnabled: boolean
  toggleShortcuts: () => void
  resumePreviewOpen: boolean
  setResumePreviewOpen: (open: boolean) => void
  projectModalOpen: boolean
  setProjectModalOpen: (open: boolean) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      commandPaletteOpen: false,
      setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
      shortcutsEnabled: true,
      toggleShortcuts: () => set((state) => ({ shortcutsEnabled: !state.shortcutsEnabled })),
      resumePreviewOpen: false,
      setResumePreviewOpen: (open) => set({ resumePreviewOpen: open }),
      projectModalOpen: false,
      setProjectModalOpen: (open) => set({ projectModalOpen: open }),
    }),
    {
      name: 'portfolio-storage',
      partialize: (state) => ({ shortcutsEnabled: state.shortcutsEnabled }),
    }
  )
)
