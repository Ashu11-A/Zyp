import { Fastify } from './class/fastify.js'
import { Router } from './class/router.js'

const fastify = new Fastify({ port: 3000, host: '0.0.0.0' })

fastify.init()

await Router.register()

fastify.listen()