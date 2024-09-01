'use client'
import { createOptionsStore } from '@/states/optionsState'
import { createContext, ReactNode, useRef } from 'react'

export type OptionsStoreAPI = ReturnType<typeof createOptionsStore>
export interface OptionsStoreProviderProps {
    children: ReactNode
}

export const OptionsStoreContext = createContext<OptionsStoreAPI | undefined>(undefined)

export const OptionsStoreProvider = ({ children }: OptionsStoreProviderProps) => {
  const storeRef = useRef<OptionsStoreAPI>()

  if (!storeRef.current) {
    storeRef.current = createOptionsStore()
  }

  return (
    <OptionsStoreContext.Provider value={storeRef.current}>
      {children}
    </OptionsStoreContext.Provider>
  )
}