'use client'
import { createFilesStore } from '@/states/filesState'
import { createContext, ReactNode, useRef } from 'react'

export type FilesStoreAPI = ReturnType<typeof createFilesStore>
export interface FilesStoreProviderProps {
    children: ReactNode
}

export const FilesStoreContext = createContext<FilesStoreAPI | undefined>(undefined)

export const FilesStoreProvider = ({ children }: FilesStoreProviderProps) => {
  const storeRef = useRef<FilesStoreAPI>()

  if (!storeRef.current) {
    storeRef.current = createFilesStore()
  }

  return (
    <FilesStoreContext.Provider value={storeRef.current}>
      {children}
    </FilesStoreContext.Provider>
  )
}