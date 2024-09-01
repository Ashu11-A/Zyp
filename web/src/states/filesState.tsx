import { createStore } from 'zustand'

export type FilesState = {
    files: File[]
}

export type FilesActions = {
    setFiles: (files: File[]) => void
}

export type FilesStore = FilesState & FilesActions

export const createFilesStore = () => {
  return createStore<FilesStore>(
    (set) => ({
      files: [],
      setFiles: (files) => set((state) => {
        return ({ ...state, files: [...state.files, ...files] })
      })
    })
  )
}
