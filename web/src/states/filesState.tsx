import { createStore } from 'zustand'
import * as lodash from 'lodash'

export type FilesState = {
    files: File[]
}

export type FilesActions = {
    setFiles: (files: File[]) => void
    loader: () => void
}

export type FileSaveLocal = {
  fileName: string
  type: string
  base64: string
}

export type FilesStore = FilesState & FilesActions

export const createFilesStore = () => {
  return createStore<FilesStore>(
    (set) => ({
      files: [],
      setFiles: async (files) => set((state) => {
        const newData = lodash.uniqBy([...state.files, ...files], 'name') as File[]
        const oldData = JSON.parse(localStorage.getItem('Files') ?? '[]') as FileSaveLocal[]
        void saveData(newData, oldData)

        return ({ ...state, files: newData })
      }),
      loader: () => (set((state) => {
        const files = JSON.parse(localStorage.getItem('Files') ?? '[]') as FileSaveLocal[]
        let oldFiles: File[] = []
        
        for (const { base64, fileName, type } of files) {
          const buffer = Buffer.from(base64, 'base64')
          const blob = new Blob([buffer])
          const file = new File([blob], fileName, { type: type })
          oldFiles.push(file)
        }

        const filesData = lodash.uniqBy([...oldFiles, ...state.files], 'name')

        return ({ ...state, files: filesData })
      }))
    }) 
  )
}

async function saveData (data: File[], oldData: FileSaveLocal[]) {
  const processedData: FileSaveLocal[] = []
  processedData.push(...oldData)

  for (const file of data) {
    processedData.push({
      fileName: file.name,
      type: file.type,
      base64: Buffer.from(await file.arrayBuffer()).toString('base64')
    })
  }

  const filesData = lodash.uniqBy(processedData, 'fileName')

  localStorage.setItem('Files', JSON.stringify(filesData))
}