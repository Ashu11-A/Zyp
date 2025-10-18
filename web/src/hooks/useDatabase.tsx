import { entities, initializeDatabase } from '@/database/datasource'
import { useEffect, useState } from 'react'
import { DataSource, EntitySchema, Repository } from 'typeorm'

type EntityInstance<T> = T extends EntitySchema<infer U> ? U : never;

export function useDatabase<T extends typeof entities[number]>(entry?: T) {
  const [initialized, setInitialized] = useState(false)
  const [database, setDatabase] = useState<DataSource | null>(null)
  const [entryy, setEntry] = useState<Repository<NonNullable<EntityInstance<typeof entry>>> | null>(null)

  useEffect(() => {
    let isMounted: boolean = true;

    (async () => {
      try {
        const db = await initializeDatabase()
    
        if (isMounted) {
          setDatabase(db)
          setInitialized(db.isInitialized)
        
          if (entry) {
            const repository = db.getRepository(entry)
            setEntry(repository)
          }
        }
        
      } catch (error) {
        console.error('Erro ao inicializar o banco de dados:', error)
      }
    })()

    return () => {
      isMounted = false
    }
  }, [entry])

  return { initialized, database, entry: entryy }
}
