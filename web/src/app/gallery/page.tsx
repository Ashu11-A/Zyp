'use client'
import { useImages } from '@/hooks/useImage'
import Image from 'next/image'

export default function Gallery () {
  const images = useImages()

  return <div>
    {JSON.stringify(images)}
    {images.map((image) => <Image key={image.id} width={400} height={200} alt={image.name} src={image.blob} />)}
  </div>
  //   
}