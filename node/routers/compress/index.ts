import { Multipart } from '@/class/file.js'
import { queue } from '@/class/queue.js'
import { Router } from '@/class/router.js'
import { MethodType } from '@/types/router.js'

// const FileSchema = z.object({
//   base64: z.string(),
//   type: z.string(),
//   fileName: z.string()
// })

// const OptionsSchema = z.object({
//   quality: z.number().min(0).max(100),
//   threshold: z.number().min(0).max(255),
//   output: z.string(),
//   colorSpace: z.string(),
  
//   multPass: z.boolean(),
//   force: z.boolean(),
//   progressive: z.boolean(),
//   grayScale: z.boolean(),

//   sizeType: z.string(),
//   maxSize: z.number()
// })

// const RequestSchma = z.object({
//   files: z.array(FileSchema).min(1),
//   options: OptionsSchema
// })

// type FileRequestPost = z.infer<typeof RequestSchma>

export default new Router({
  name: 'process',
  description: 'Process Files',
  method: [{
    type: MethodType.Post,
    async run(request, reply) {
        
      try {
        const images = await (new Multipart(request)).getFiles()

        for (const img of images) {
          await queue.add({ img, fileName: img.name })
        }

        return reply.status(200).send({ code: 200, images })
      } catch (error) {
        return reply.status(400).send({ status: 400, statusText: error })
      }
    },
  }]
})