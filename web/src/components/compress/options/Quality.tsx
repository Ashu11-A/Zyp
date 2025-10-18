import { SettingsOptionProps } from '@/app/compress/page'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'
import { Option } from '../Option'

export function QualityOption ({ settings, updateSettings }: SettingsOptionProps) {
  const handleQuality = (value: number) => {
    updateSettings({
      quality: (value <= 0)
        ? 1
        : (value > 100)
          ? 100
          : value
    })
  }

  return (
    <Option name='Quality'>
      <div className="flex flex-row h-full w-full items-center gap-4">
        <Slider
          value={[settings.quality]}
          onValueChange={(value) => handleQuality(value[value.length - 1])}
          max={100}
          step={1}
          className={cn('w-[90%]')}
        />
        <Input
          type="number"
          placeholder="Quality"
          className="rounded-2xl w-16 h-8 text-center"
          min={1}
          max={100}
          value={settings.quality}
          onChange={(event) => handleQuality(Number(event.target.value))}
        />
      </div>
    </Option>
  )
}