import { Router } from '@/class/router.js'
import { MethodType } from '@/types/router.js'
import { writeFile } from 'fs/promises'
import { z } from 'zod'

const FileSchema = z.object({
  base64: z.string(),
  type: z.string(),
  fileName: z.string()
})

const OptionsSchema = z.object({
  quality: z.number().min(0).max(100),
  threshold: z.number().min(0).max(255),
  output: z.string(),
  colorSpace: z.string(),
  
  multPass: z.boolean(),
  force: z.boolean(),
  progressive: z.boolean(),
  grayScale: z.boolean(),

  sizeType: z.string(),
  maxSize: z.number()
})

const RequestSchma = z.object({
  files: z.array(FileSchema).min(1),
  options: OptionsSchema
})

type FileRequestPost = z.infer<typeof RequestSchma>

export default new Router({
  name: 'process',
  description: 'Process Files',
  method: [
    {
      type: MethodType.Post,
      async run(request, reply) {
        const files = request.files()
        
        for await (const file of files) {
          console.log(file.fields)
          await writeFile('test.png', file.file.read())
        }
        
        try {
          const parsedFiles = RequestSchma.parse(data)
          const images: File[] = []

          for (const image of parsedFiles.files) {
            const buffer = Buffer.from(image.base64, 'base64')
            const blob = new Blob([buffer])
            const file = new File([blob], image.fileName, { type: image.type })
            images.push(file)
          }

          return reply.status(200).send({ code: 200, parsedFiles })
        } catch (error) {
          if (error instanceof z.ZodError) {
            console.log(error.errors)
            return reply.status(400).send({ code: 400, statusText: error.issues })
          }
          return reply.status(400).send({ status: 400, statusText: error })
        }
      },
    }
  ]
})