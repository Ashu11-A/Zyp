'use client'
import { Dropzone } from '@/components/dropzone/dropzone'
import { useFilesStore } from '@/hooks/useFiles'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Home() {
  const { files, setFiles } = useFilesStore((state) => state)
  const [uploaded, setUpload] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (uploaded) router.push('/compress')
  }, [uploaded, router])

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center content-center">
      <div className="flex flex-col md:w-[600px] md:h-[300px] w-[90%] h-40 m-4">
        <Dropzone files={files} setFiles={setFiles} setUpload={setUpload}  />
      </div>
    </main>
  )
}
