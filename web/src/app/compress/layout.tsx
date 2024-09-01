'use client'
import { useFilesStore } from '@/hooks/useFiles'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import 'react-toastify/ReactToastify.css'
import '../globals.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { files } = useFilesStore((state) => state)
  const router = useRouter()

  useEffect(() => {
    if (files.length === 0) router.replace('/')
  }, [files, router])
  return (
    <>
      {children}
    </>
  )
}
