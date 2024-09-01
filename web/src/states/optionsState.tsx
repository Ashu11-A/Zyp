import { createStore } from 'zustand'

export type OptionsState = {
    quality: number
    threshold: number
    output: string
    colorSpace: string
    
    multPass: boolean
    force: boolean
    progressive: boolean
    grayScale: boolean

    sizeType: string
    maxSize: number
}

export type OptionsActions = {
    setOptions: (options: OptionsState) => void
}

export type OptionsStore = OptionsActions & {
  options: OptionsState
}

export const createOptionsStore = () => {
  return createStore<OptionsStore>((set) => ({
    options: {
      quality: 80,
      threshold: 0,
      colorSpace: 'sRGB',
      force: false,
      grayScale: false,
      maxSize: 0,
      multPass: false,
      output: 'png',
      progressive: false,
      sizeType: 'MB',
    },
    setOptions: (options) => set((state) => {
      return ({ ...state, ...options })
    }),
  }))
}
