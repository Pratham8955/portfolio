import { create } from 'zustand'

export type CursorVariant = 'default' | 'project' | 'button' | 'menu' | 'github' | 'contact' | 'hidden'

interface AppState {
  commandPaletteOpen: boolean
  setCommandPaletteOpen: (open: boolean) => void
  shortcutsEnabled: boolean
  toggleShortcuts: () => void
  resumePreviewOpen: boolean
  setResumePreviewOpen: (open: boolean) => void
  selectedProjectId: string | null
  setSelectedProjectId: (id: string | null) => void
  fullScreenMenuOpen: boolean
  setFullScreenMenuOpen: (open: boolean) => void
  cursorVariant: CursorVariant
  cursorText: string
  setCursor: (variant: CursorVariant, text?: string) => void
  resetCursor: () => void
}

export const useAppStore = create<AppState>((set) => ({
  commandPaletteOpen: false,
  setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
  shortcutsEnabled: true,
  toggleShortcuts: () => set((state) => ({ shortcutsEnabled: !state.shortcutsEnabled })),
  resumePreviewOpen: false,
  setResumePreviewOpen: (open) => set({ resumePreviewOpen: open }),
  selectedProjectId: null,
  setSelectedProjectId: (id) => set({ selectedProjectId: id }),
  fullScreenMenuOpen: false,
  setFullScreenMenuOpen: (open) => set({ fullScreenMenuOpen: open }),
  cursorVariant: 'default',
  cursorText: '',
  setCursor: (variant, text = '') => set({ cursorVariant: variant, cursorText: text }),
  resetCursor: () => set({ cursorVariant: 'default', cursorText: '' }),
}))
