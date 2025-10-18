'use client'
import { ImageSchema } from '@/database/entities'
import { useDatabase } from '@/hooks/useDatabase'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import '../globals.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { initialized, entry } = useDatabase(ImageSchema)
  const router = useRouter()

  useEffect(() => {
    if (entry && initialized) {
      (async () => {
        const count = await entry.count()

        if (count === 0) router.push('/')
      })()
    }
  }, [initialized, entry, router])

  return children
}
