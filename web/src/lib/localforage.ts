'use client'
import localforage from 'localforage' // Importação correta do localforage
import { ReactNode, useEffect } from 'react'

export function Localforage ({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window) {
      localforage.config({
        driver      : localforage.INDEXEDDB,
        name        : 'zyp',
        description : 'https://github.com/Ashu11-A/Zyp'
      })
      window.localforage = localforage
    }
  }, [])
  
  return children
}