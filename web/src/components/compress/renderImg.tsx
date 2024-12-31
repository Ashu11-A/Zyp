'use client'
import { db } from '@/lib/db'
import { FileSaveLocal } from '@/states/filesState'
import { useLiveQuery } from 'dexie-react-hooks'
import Image from 'next/image'
import { useEffect, useMemo, useReducer, useRef, useState } from 'react'
import Moveable, { OnClip, OnDrag } from 'react-moveable'
import { Card, CardContent } from '../ui/card'

export default function RenderImage () {
  const images = useLiveQuery(() => db.images)
  const [files, setFiles] = useState<FileSaveLocal[]>([])
  const imageRef = useRef<Array<HTMLImageElement | null>>([])
  const [windowSize, setWindownSize] = useState<number>(0)

  const handleResize = () => setWindownSize(window.innerWidth)

  useEffect(() => {
    (async () => {
      setFiles(await images?.toArray() ?? [])
    })()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize',  handleResize)
  }, [images])

  // Impede a geração desnecessária de blobs
  const blobUrls = useMemo(() => files.map(file => URL.createObjectURL(new Blob([Buffer.from(file.base64, 'base64')]))), [files])

  return (
    <div className='grid grid-flow-row-dense md:grid-cols-2 grid-cols-1 gap-5'>
      {files && files.map((file, index) => (
        <div key={file.fileName}>
          <Card>
            <CardContent className="p-4">
              <Image
                ref={(ref) => {
                  if (imageRef.current) imageRef.current[index] = ref
                }}
                src={blobUrls[Number(index)]}
                alt={file.fileName}
                width={400}
                height={400}
                key={file.fileName}
              />
              <Moveable
                key={file.fileName + windowSize}
                target={() =>  imageRef.current[index] as HTMLImageElement}
                throttleDragRotate={0}
                startDragRotate={0}
                snapThreshold={5}
                // dragWithClip={0}
        
                clipTargetBounds={true}
                clipRelative={true}
                keepRatio={false}
                clippable={true}
                draggable={true}
                clipArea={true}
        
                defaultClipPath={'inset'}
                onDrag={(e: OnDrag) => {
                  return e.target.style.transform = e.transform
                }}
                onClip={(e: OnClip) => {
                  console.log(e.clipStyle)
                  return e.target.style.clipPath = e.clipStyle
                }}
              />
            </CardContent>
          </Card>
        </div>
      ))}

    </div>
  )
}