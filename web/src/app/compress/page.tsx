'use client'
import OptionsCompress from '@/components/compress/options'
import OptionsActions from '@/components/compress/OptionsActions'
import RenderImage from '@/components/compress/renderImg'
import { ToastContainer } from 'react-toastify'

export default function Compress () {

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 pt-10 pb-24 px-5">
      <ToastContainer />
      <RenderImage />
      <OptionsCompress />
      <OptionsActions />
    </main>
  )
}