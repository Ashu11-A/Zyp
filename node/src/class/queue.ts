import Queue, { Job } from 'bull'

export const queue = new Queue('compress', {
  limiter: {
    max: 50,
    duration: 10000,
  },
  redis: {
    host: '127.0.0.1',
    port: 6379
  }
})

queue.process(async (job: Job) => {
  try {
    // Simula o processamento do arquivo (ex: compressão)
    console.log('Processando arquivo:', job.data.fileName)
  } catch (error) {
    console.error('Erro no processamento do job:', error)
    throw error // Se der erro, o job pode ser reencadeado ou tratado
  }
})