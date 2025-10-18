import sqljs from 'sql.js'
import { DataSource } from 'typeorm'
import { ImageSchema } from './entities'
import 'localforage'
import { SettingsSchema } from './entities/Settings'
import { PanelSchema } from './entities/Panel'

let dbInstance: DataSource | null = null

export const entities = [PanelSchema ,ImageSchema, SettingsSchema]

export const initializeDatabase = async () => {
  if (dbInstance && dbInstance.isInitialized) return dbInstance

  const sql = await sqljs({
    locateFile: file => `https://sql.js.org/dist/${file}`
  })
  const datasource = new DataSource({
    type: 'sqljs',
    location: 'zyp',
    autoSave: true,
    driver: sql,
    useLocalForage: true,
    synchronize: true,
    logging: true,
    entities
  })

  await datasource.initialize()
  dbInstance = datasource

  return dbInstance
}