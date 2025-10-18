import { EntitySchema } from 'typeorm'

export type SettingsType = {
  quality: number
  threshold: number
  output: string
  colorSpace: string
  
  multPass: boolean
  force: boolean
  progressive: boolean
  grayScale: boolean
  
  sizeType: string
  maxSize: number
  
}

export type SettingsTable = {
  id: number
}

export type SettingsRelations = {
  panel: SettingsType
}

export const SettingsSchema = new EntitySchema<SettingsType & SettingsTable & SettingsRelations>({
  name: 'Settings',
  tableName: 'settings',
  columns: {
    id: {
      type: 'int',
      primary: true
    },
    quality: {
      type: 'int8',
      default: 80
    },
    threshold: {
      type: 'int8',
      default: 0
    },
    output: {
      type: 'varchar',
      default: 'png'
    },
    colorSpace: {
      type: 'varchar',
      default: 'sRGB'
    },
  
    multPass: {
      type: 'boolean',
      default: false
    },
    force: {
      type: 'boolean',
      default: false
    },
    progressive: {
      type: 'boolean',
      default: false
    },
    grayScale: {
      type: 'boolean',
      default: false
    },

    sizeType: {
      type: 'varchar',
      default: 'MB'
    },
    maxSize: {
      type: 'int8',
      default: 0
    }
  },
  relations: {
    panel: {
      type: 'one-to-one',
      target: 'Panel',
      inverseSide: 'settings', // Define o lado inverso da relação no PanelSchema
    },
  }
})