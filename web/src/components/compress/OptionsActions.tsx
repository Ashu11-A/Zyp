import { useImages } from '@/hooks/useImage'
import { useSettings } from '@/hooks/useSettings'
import axios from 'axios'
import { MouseEvent } from 'react'
import { toast } from 'react-toastify'
import { Button } from '../ui/button'

export default function OptionsActions () {
  const { settings } = useSettings()
  const { images } = useImages()

  const handleSubmitImage = async (event: MouseEvent) => {
    const formData = new FormData()
    event.preventDefault()
    event.preventDefault()

    for (const image of images) {
      formData.append('file', image.blob)
      formData.append('path', image.name)
      formData.append('options', JSON.stringify(settings))
    }

    const response = await toast.promise(axios.post('/api/compress', formData), {
      pending: 'Pending request...',
      error: 'An error occurred in the request',
      success: 'Successful request'
    }, {
      theme: 'dark'
    })
    console.log(response)
  }

  return (
    <div className="flex w-full justify-end">
      <Button
        variant={'outline'}
        className="bg-green-500"
        onClick={(event) => void handleSubmitImage(event)}
      >
            Submit
      </Button>
    </div>
  )
}