import { useFilesStore } from '@/hooks/useFiles'
import { useOptionsStore } from '@/hooks/useOptions'
import axios from 'axios'
import { MouseEvent } from 'react'
import { toast } from 'react-toastify'
import { Button } from '../ui/button'

export default function OptionsActions () {
  const { options } = useOptionsStore((state) => state)
  const { files } = useFilesStore((state) => state)

  const handleSubmitImage = async (event: MouseEvent) => {
    const formData = new FormData()
    event.preventDefault()
    event.preventDefault()

    for (const image of files) {
      formData.append('file', image)
      formData.append('path', image.name)
    }
    formData.append('options', JSON.stringify(options))

    const response = await  toast.promise(axios.post('/api', formData), {
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