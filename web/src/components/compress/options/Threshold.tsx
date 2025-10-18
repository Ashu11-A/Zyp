import { SettingsOptionProps } from '@/app/compress/page'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'
import { Option } from '../Option'

export function ThresholdOption ({ settings, updateSettings }: SettingsOptionProps) {

  const handleThreshold = (value: number) => {
    updateSettings({
      threshold: (value > 255)
        ? 255
        : value
    })
  }

  return (
    <Option name='Threshold' >
      <div className="flex flex-row h-full w-full items-center gap-4">
        <Slider
          value={[settings.threshold]}
          onValueChange={(value) => handleThreshold(value[value.length - 1])}
          max={255}
          step={1}
          className={cn('w-[90%]')}
        />
        <Input
          type="number"
          placeholder="Threshold"
          className="rounded-2xl w-16 h-8 text-center"
          min={0}
          max={100}
          value={settings.threshold}
          onChange={(event) => handleThreshold(Number(event.target.value))}
        />
      </div>
    </Option>
  )
}