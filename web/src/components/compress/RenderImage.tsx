'use client'

import { useImages } from '@/hooks/useImage'
import Image from 'next/image'
import { useRef } from 'react'
import Moveable, { OnClip, OnDrag } from 'react-moveable'
import { Card, CardContent } from '../ui/card'
import { useViewport } from '@/hooks/useViewport'

export default function RenderImage () {
  const images = useImages()
  const imageRef = useRef<Array<HTMLImageElement | null>>([])
  const { width } = useViewport()

  console.log(images)

  return (
    <div className='grid grid-flow-row-dense md:grid-cols-2 grid-cols-1 gap-5'>
      {images.map(({ name, blob }, index: number) => (
        <div key={name}>
          <Card>
            <CardContent className="p-4">
              <Image
                ref={(ref) => {
                  if (imageRef.current) imageRef.current[index] = ref
                }}
                key={name}
                src={blob}
                alt={name}
                width={400}
                height={400}
              />
              <Moveable
                key={name + width}
                target={() =>  imageRef.current[index] as HTMLImageElement}
                throttleDragRotate={0}
                startDragRotate={0}
                snapThreshold={5}

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