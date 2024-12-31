import { FileSaveLocal } from '@/states/filesState'
import Dexie, { Table } from 'dexie'

export class DB extends Dexie {
  images!: Table<FileSaveLocal> 
  constructor() {
    super('zyp')
    this.version(1).stores({
      images: 'fileName, type, base64'  
    })
  }
}

export const db = new DB()