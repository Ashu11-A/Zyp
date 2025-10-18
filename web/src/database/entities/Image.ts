import { EntitySchema } from 'typeorm'
import { SettingsType } from './Settings'

export type ImageType = {
  id: number
  name: string
  type: string
  base64: string
  panel: SettingsType
}

export const ImageSchema = new EntitySchema<ImageType>({
  name: 'Image',
  tableName: 'image',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true
    },
    name: {
      type: 'text'
    },
    type: {
      type: 'int8'
    },
    base64: {
      type: 'text'
    }
  },
  relations: {
    panel: {
      type: 'many-to-one',
      target: 'Panel',
      joinColumn: true,
    }
  }
})
