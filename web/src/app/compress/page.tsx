'use client'

import { CheckBoxOption } from '@/components/compress/options/CheckBox'
import { ColorSpaceOption } from '@/components/compress/options/ColorSpace'
import MaxSizeOptions from '@/components/compress/options/MaxSize'
import { OutputOption } from '@/components/compress/options/Output'
import { QualityOption } from '@/components/compress/options/Quality'
import { ThresholdOption } from '@/components/compress/options/Threshold'
import OptionsActions from '@/components/compress/OptionsActions'
import { Card, CardContent } from '@/components/ui/card'
import { SettingsType } from '@/database/entities'
import { useImages } from '@/hooks/useImage'
import { useSettings } from '@/hooks/useSettings'
import { useViewport } from '@/hooks/useViewport'
import Image from 'next/image'
import { useCallback, useRef, useState } from 'react'
import Moveable from 'react-moveable'

export type SettingsOptionProps = {
  settings: SettingsType
  updateSettings: (data: Partial<SettingsType>) => void
}

const MIN_WIDTH = 500
const MIN_HEIGHT = 500

export default function Compress () {
  const { settings } = useSettings()
  const images = useImages()
  const viewport = useViewport()
  const refs = useRef<Array<HTMLImageElement | null>>([])
  const [settingsCache, setSettingsCache] = useState<SettingsType>(settings)

  const updateSettings = useCallback((data: Partial<SettingsType>) => {
    setSettingsCache((state) => ({ ...state, ...data }))
  }, [])

  const calculateImageSize = (width: number, height: number) => {
    if (width < MIN_WIDTH || height < MIN_HEIGHT) {
      const aspectRatio = width / height

      // Ajusta largura e altura com base no aspect ratio
      if (width < MIN_WIDTH) {
        width = MIN_WIDTH
        height = Math.round(MIN_WIDTH / aspectRatio)
      }

      if (height < MIN_HEIGHT) {
        height = MIN_HEIGHT
        width = Math.round(MIN_HEIGHT * aspectRatio)
      }
    }

    return { width, height }
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-5 pt-10 pb-24 px-5">
      {images.map(({ id, name, blob, height, width }) => {
        const { width: adjustedWidth, height: adjustedHeight } = calculateImageSize(width, height)

        return (
          <Card key={id} className="flex md:flex-row flex-col">
            <CardContent className="p-4">
              <Image
                ref={(ref) => {
                  if (refs.current) refs.current[id] = ref
                }}
                key={name}
                src={blob}
                alt={name}
                unoptimized
                width={adjustedWidth}
                height={adjustedHeight}
              />
              <Moveable
                key={`${id}-${viewport.width}-${viewport.height}`}
                target={() => refs.current[id] as HTMLImageElement}
                keepRatio={false}
                clippable={true}
                clipArea={true}
                minWidth={150}
                minHeight={150}
                clipTargetBounds={true}
                onClip={({ target, clipStyles }) => {
                  const [top, right, bottom, left] = clipStyles.map((value) => parseFloat(value))
              
                  // Dimensões do elemento
                  const targetWidth = target.offsetWidth
                  const targetHeight = target.offsetHeight
                  
                  // Dimensões do clipe atual
                  const width = targetWidth - left - right
                  const height = targetHeight - top - bottom
                  
                  const minWidth = ((adjustedWidth / 100) * 10)
                  const minHeight = ((adjustedHeight / 100) * 10)

                  console.log(width, minWidth)
                  console.log(height, minHeight)

                  let finalLeft = left
                  let finalRight = right

                  let finalTop = top
                  let finalBottom = bottom

                  if (width < minWidth) {
                    const widthDiff = minWidth - width
                    const adjustedLeft = left - widthDiff / 2
                    const adjustedRight = right - widthDiff / 2
                    
                    finalLeft = Math.max(0, adjustedLeft)
                    finalRight = Math.max(0, adjustedRight)
                  }

                  if (height < minHeight) {
                    const heightDiff = minHeight - height
              
                    const adjustedTop = top - heightDiff / 2
                    const adjustedBottom = bottom - heightDiff / 2
              
                    finalTop = Math.max(0, adjustedTop)
                    finalBottom = Math.max(0, adjustedBottom)
                  }
              
                  target.style.clipPath = `inset(${finalTop}px ${finalRight}px ${finalBottom}px ${finalLeft}px)`
                }}
              />
            </CardContent>
            <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-4 h-full w-full">
              <QualityOption settings={settingsCache} updateSettings={updateSettings} />
              <ThresholdOption settings={settingsCache} updateSettings={updateSettings} />
              <ColorSpaceOption settings={settingsCache} updateSettings={updateSettings} />
              <CheckBoxOption settings={settingsCache} updateSettings={updateSettings} />
              <OutputOption settings={settingsCache} updateSettings={updateSettings} />
              <MaxSizeOptions settings={settingsCache} updateSettings={updateSettings} />
            </div>
          </Card>
        )
      })}
      <OptionsActions />
    </div>
  )
}
