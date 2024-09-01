import { Router } from '@/class/router.js'
import { MethodType } from '@/types/router.js'

export default new Router({
  name: 'Home',
  description: 'Home API',
  method: [
    {
      type: MethodType.Get,
      async run(request, reply) {
        return reply.send('Hello World')
      },
    }
  ]
}) 