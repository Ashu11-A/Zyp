'use client'
import { useFilesStore } from '@/hooks/useFiles'
import Image from 'next/image'
import { useRef } from 'react'
import Moveable, { OnClip, OnDrag } from 'react-moveable'
import { Card, CardContent } from '../ui/card'

export default function RenderImage () {
  const { files } = useFilesStore((state) => state)
  const imageRef = useRef<Array<HTMLImageElement | null>>([])

  return (
    <div>
      {files && files.map((file, index) => (
        <div key={file.name}>
          <Card>
            <CardContent className="p-4">
              <Image
                ref={(ref) => {
                  if (imageRef.current) imageRef.current[index] = ref
                }}
                src={URL.createObjectURL(file)} alt={file.name}  width={400} height={400}  key={file.name}
              />
              <Moveable
                key={file.name}
                target={() => {
                  return imageRef.current[index]
                }}
                throttleDragRotate={0}
                startDragRotate={0}
                snapThreshold={5}
                dragWithClip={0}
        
                clipTargetBounds={true}
                clipRelative={false}
                keepRatio={false}
                clippable={true}
                draggable={true}
                clipArea={true}
        
                defaultClipPath={'inset'}
                onDrag={(e: OnDrag) => {
                  e.target.style.transform = e.transform
                }}
                onClip={(e: OnClip) => {
                                          
                  e.target.style.clipPath = e.clipStyle
                }}
              />
            </CardContent>
          </Card>
        </div>
      ))}

    </div>
  )
}