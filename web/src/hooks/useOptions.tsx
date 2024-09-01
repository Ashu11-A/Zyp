import { OptionsStoreContext } from '@/providers/optionsProvider'
import { OptionsStore } from '@/states/optionsState'
import { useContext } from 'react'
import { useStore } from 'zustand'

export const useOptionsStore = <T,>(
  selector: (store: OptionsStore) => T,
): T => {
  const optionsStoreContext = useContext(OptionsStoreContext)

  if (!optionsStoreContext) {
    throw new Error('useOptionsStore must be used within CounterStoreProvider')
  }
  return useStore(optionsStoreContext, selector)
}