'use client'
import { cn } from '@/lib/utils'
import localFont from 'next/font/local'
import { useRouter } from 'next/navigation'
import { Dispatch, DragEvent, FormEvent, SetStateAction, useEffect, useRef, useState } from 'react'

const font = localFont({ src: './fonts/DelaGothicOne-Regular.ttf' })

/**
 * Dropzone component allows users to drag and drop files or click to select files.
 * 
 * @param {Object} props - The component properties.
 * @param {File[]} props.files - The current array of selected files.
 * @param {Dispatch<SetStateAction<File[]>>} props.setFiles - The function to update the selected files.
 * 
 * @returns {JSX.Element} A dropzone area with drag-and-drop and file selection functionality.
 * 
 * @example
 * const [files, setFiles] = useState<File[]>([])
 * <Dropzone files={files} setFiles={setFiles} />
 * {files && files.map((file) => <Image src={URL.createObjectURL(file)} alt={file.name}  width={400} height={400}  key={file.name} ></Image>)}
 * 
 */
export function Dropzone({ files, setFiles, setUpload }: { files: File[], setFiles: (files: File[]) => void, setUpload: (bool: boolean) => void }): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null)
  const dragRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const inputFiles: File[] = []

  /**
     * Updates the files state with the newly selected or dropped files.
     */
  const updateFiles = () => {
    setFiles([...files, ...inputFiles])
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
  