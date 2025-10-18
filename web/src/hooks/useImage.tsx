import { ImageSchema, ImageType } from '@/database/entities'
import { useEffect, useMemo, useState } from 'react'
import { useDatabase } from './useDatabase'

export type ImageData = {
  id: number
  name: string
  type: string
  size: number
  width: number
  height: number
  blob: string
}

export function useImages () {
  const { initialized, entry } = useDatabase(ImageSchema)
  const [images, setImages] = useState<ImageType[]>([])

  useEffect(() => {
    (async () => setImages(await entry?.find() ?? []))()
  }, [initialized, entry])

  const blobs = useMemo(() => {
    const data: ImageData[] = []

    images.forEach(({ base64, name, type , id}) => {
      const buffer = Buffer.from(base64, 'base64')
      const blob = new Blob([buffer], { type })
      const url = URL.createObjectURL(blob)
    
      const image = new Image()
      image.src = `data:${type};base64,${base64}`

      data.push({
        id,
        name,
        type,
        size: buffer.byteLength,
        height: image.naturalHeight,
        width: image.naturalWidth,
        blob: url
      })
    })

    return data
  }, [images, initialized])

  return blobs
}