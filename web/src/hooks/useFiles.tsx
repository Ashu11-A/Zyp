import { FilesStoreContext } from '@/providers/filesProvider'
import { FilesStore } from '@/states/filesState'
import { useContext } from 'react'
import { useStore } from 'zustand'

export const useFilesStore = <T,>(
  selector: (store: FilesStore) => T,
): T => {
  const filesStoreContext = useContext(FilesStoreContext)

  if (!filesStoreContext) {
    throw new Error('useFilesStore must be used within CounterStoreProvider')
  }
  return useStore(filesStoreContext, selector)
}