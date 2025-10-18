import { EntitySchema } from 'typeorm'
import { ImageType } from './Image'
import { SettingsType } from './Settings'

export type PanelType = {
  id: number
  images: ImageType[]
  settings: SettingsType
}

export const PanelSchema = new EntitySchema<PanelType>({
  name: 'Panel',
  tableName: 'panel',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true
    },
  },
  relations: {
    images: {
      type: 'one-to-many',
      target: 'Image',
      inverseSide: 'panel', // Define o lado inverso da relação no ImageSchema
      cascade: true,
    },
    settings: {
      type: 'one-to-one',
      target: 'Settings',
      cascade: true,
      joinColumn: true, // Especifica que essa entidade terá a coluna de junção
    },
  }
})