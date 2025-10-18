'use client'
import { Dropzone } from '@/components/dropzone/dropzone'
import { useImages } from '@/hooks/useImage'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Home() {
  const [uploaded, setUpload] = useState(false)
  const { images } = useImages()
  const router = useRouter()
  const [storage, setStorage] = useState<StorageEstimate | null>(null)

  useEffect(() => {
    (async () => setStorage(await navigator.storage.estimate()))()
  }, [])

  useEffect(() => {
    (async () => {
      if (uploaded && images.length !== 0) router.push('/compress')
    })()
  }, [images, router, uploaded])

  return (
    <main className="flex flex-1 w-full flex-col items-center justify-center content-center">
      <div className="flex flex-col md:w-[600px] md:h-[300px] w-[90%] h-40 m-4">
        <Dropzone setUpload={setUpload}  />
      </div>
    </main>
  )
}
