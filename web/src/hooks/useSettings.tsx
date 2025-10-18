import { SettingsSchema, SettingsType } from '@/database/entities/Settings'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Repository } from 'typeorm'
import { useDatabase } from './useDatabase'

export function useSettings () {
  const [entryy, setEntry] = useState<Repository<SettingsType> | null>(null)
  const [updated, setUpdated] = useState(false)
  const [id, setId] = useState(0)
  const { entry } = useDatabase(SettingsSchema)

  const [settings, setSettings] = useState<SettingsType>({
    quality: 80,
    threshold: 0,
    colorSpace: 'sRGB',
    force: false,
    grayScale: false,
    maxSize: 0,
    multPass: false,
    output: 'png',
    progressive: false,
    sizeType: 'MB',
  })

  useEffect(() => {
    (async () => {
      if (!entry) return
      const data = (await entry.find())[0]

      if (data) {
        setSettings(data)
        setId(data.id)
      }
      setEntry(entry)
      setUpdated(false)
    })()
  }, [entry, updated])

  const updateSettings = useCallback(async (data: Record<string, string | boolean | number>) => {
    if (entry) {
      await entry.update({ id }, data)
      console.log(settings, data)
      setUpdated(true)
    }
  }, [entry, id, settings])

  return { settings, entry: entryy, updateSettings, id }
}