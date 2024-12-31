'use client'
import { Dropzone } from '@/components/dropzone/dropzone'
import { db } from '@/lib/db'
import { useLiveQuery } from 'dexie-react-hooks'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Home() {
  const [uploaded, setUpload] = useState(false)
  const images = useLiveQuery(() => db.images)
  const router = useRouter()

  useEffect(() => {
    (async () => {
      if (uploaded && await images?.count() !== 0) router.push('/compress')
    })()
  }, [images, router, uploaded])

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center content-center">
      <div className="flex flex-col md:w-[600px] md:h-[300px] w-[90%] h-40 m-4">
        <Dropzone setUpload={setUpload}  />
      </div>
    </main>
  )
}
