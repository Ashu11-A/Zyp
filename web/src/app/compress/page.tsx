'use client'
import OptionsCompress from '@/components/compress/options'
import RenderImage from '@/components/compress/renderImg'
import { Button } from '@/components/ui/button'
import { useOptionsStore } from '@/hooks/useOptions'
import axios from 'axios'
import { MouseEvent } from 'react'
import { ToastContainer, toast } from 'react-toastify'

export default function Compress () {
  // const handleSubmitImage = async (event: MouseEvent) => {
  //   const formData = new FormData()
  //   event.preventDefault()
  //   event.preventDefault()

  //   for (const image of files) {
  //     formData.append('file', image)
  //     formData.append('path', image.name)
  //   }
  //   formData.append('options', JSON.stringify(options))

  //   const response = await  toast.promise(axios.post('/api', formData), {
  //     pending: 'Pending request...',
  //     error: 'An error occurred in the request',
  //     success: 'Successful request'
  //   }, {
  //     theme: 'dark'
  //   })
  //   console.log(response)
  // }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 pt-10 pb-24 px-5">
      <ToastContainer />
      <RenderImage />
      <OptionsCompress />
      <div className="flex w-full justify-end">
        {/* <Button
          variant={'outline'}
          className="bg-green-500"
          onClick={(event) => void handleSubmitImage(event)}
        >
            Submit
        </Button> */}
      </div>
    </main>
  )
}