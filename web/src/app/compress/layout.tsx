'use client'
import { useOptionsStore } from '@/hooks/useOptions'
import { db } from '@/lib/db'
import { useLiveQuery } from 'dexie-react-hooks'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import 'react-toastify/ReactToastify.css'
import '../globals.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const images = useLiveQuery(() => db.images)
  const router = useRouter()
  const { loader } = useOptionsStore((state) => state)

  useEffect(() => {}, [])

  useEffect(() => {
    (async () => {
      if (await images?.count() === 0) router.replace('/')
    })()
  }, [images, router])
  return <div>{children}</div>
}
