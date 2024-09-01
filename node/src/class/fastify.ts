import fastify, { FastifyInstance } from 'fastify'

interface Options {
    host: string
    port: number
}

export class Fastify {
  static server: FastifyInstance
  constructor(public options: Options){}

  init () {
    const server = fastify()
    Fastify.server = server
    return this
  }

  listen () {
    Fastify.server.listen({
      port: this.options.port,
      host: this.options.host
    }, (err, address) => {
      if (err !== null) {
        console.log(`Port unavailable: ${this.options.port}`)
        this.options.port = this.options.port + 1
        return this.listen()
      }
          
      console.log(`Server listening at ${address}`)
    })
  }
}
