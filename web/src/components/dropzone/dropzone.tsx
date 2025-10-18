'use client'
import { ImageSchema } from '@/database/entities'
import { useDatabase } from '@/hooks/useDatabase'
import { cn } from '@/lib/utils'
import localFont from 'next/font/local'
import { DragEvent, FormEvent, useRef, useState } from 'react'

const font = localFont({ src: './fonts/DelaGothicOne-Regular.ttf' })

/**
 * Dropzone component allows users to drag and drop files or click to select files.
 * 
 * @example
 * const [files, setFiles] = useState<File[]>([])
 * <Dropzone files={files} setFiles={setFiles} />
 * {files && files.map((file) => <Image src={URL.createObjectURL(file)} alt={file.name}  width={400} height={400}  key={file.name} ></Image>)}
 * 
 */
export function Dropzone({ setUpload }: { setUpload: (bool: boolean) => void }): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null)
  const dragRef = useRef<HTMLDivElement>(null)
  const inputFiles: File[] = []
  const [isDragging, setIsDragging] = useState(false)
  const { entry, initialized, database } = useDatabase(ImageSchema)

  if (!entry) return <>Carregando Banco de dados {String(database)}</>

  /**
   * Updates the files state with the newly selected or dropped files.
   */
  const updateFiles = async () => {
    for (const file of inputFiles) {
      const image = entry.create({
        name: file.name,
        type: file.type,
        base64: Buffer.from(await file.arrayBuffer()).toString('base64')
      })

      const result = await entry.save(image)
      console.log(result)
    }
    setUpload(true)
  }
  
  /**
   * Handles the click event on the dropzone div, triggering the file input click.
   */
  const handleDivClick = () => {
    inputRef.current?.click()
  }
  
  /**
   * Handles the change event on the file input, adding selected files to the file list.
   * 
   * @param {FormEvent<HTMLInputElement>} event - The event triggered by the file input change.
   */
  const handleFileChange = (event: FormEvent<HTMLInputElement>) => {
    for (const file of event.currentTarget?.files ?? []) inputFiles.push(file)
  
    updateFiles()    
  }
  
  /**
   * Handles the drop event on the dropzone, processing the dropped files.
   * 
   * @param {DragEvent<any>} event - The drag event triggered by dropping files.
   */
  const onDrop = (event: DragEvent<any>) => {
    event.preventDefault()
    event.stopPropagation()
    setIsDragging(false)
  
    if (event.dataTransfer.items.length > 0) {
      for (const item of event.dataTransfer.items) {
        const file = item.getAsFile()
        if (file) inputFiles.push(file)
      }
      return updateFiles()
    }
  
    for (const file of event.dataTransfer.files) {
      inputFiles.push(file)
    }
  
    updateFiles()
  }

  const handleIsDragging = (event: FormEvent<HTMLDivElement>, state: boolean) => {
    event.preventDefault()
    event.stopPropagation()

    setIsDragging(state)
  }
  
  return (
    <div
      ref={dragRef}
      draggable={true}
      onDrop={onDrop}
      onClick={handleDivClick}
      onDragOver={(event) => handleIsDragging(event, true)}
      onDragLeave={(event) => handleIsDragging(event, false)}
      className={cn(
        'flex w-full h-full',
        'justify-center items-center',
        'rounded-2xl border-2 border-dashed border-stone-500',
        'cursor-pointer',
        font.className,
      )}
    >
      <input
        ref={inputRef}
        multiple
        onChange={handleFileChange}
        type="file"
        accept='image/*, video/*'
        className='hidden absolute w-full h-full'
      />
      <p className='opacity-50'>{isDragging ? 'Drop your files here...' : 'Drag and drop, or click here'}</p>
    </div>
  )
}
  