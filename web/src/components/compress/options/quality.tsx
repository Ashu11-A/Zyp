import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { useOptionsStore } from '@/hooks/useOptions'
import { cn } from '@/lib/utils'

export function QualityOption () {
  const { options, setOptions } = useOptionsStore((state) => state)

  const handleQuality = (value: number) => {
    setOptions((Object.assign(options, {
      quality: (value <= 0)
        ? 1
        : (value > 100)
          ? 100
          : value
    })))
  }

  return (
    <Card>
      <CardHeader>
        <p>Quality</p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row h-full w-full gap-4">
          <Slider
            value={[options.quality]}
            onValueChange={(value) => handleQuality(value[value.length - 1])}
            max={100}
            step={1}
            className={cn('w-[90%]')}
          />
          <Input
            type="number"
            placeholder="Quality"
            className="rounded-2xl w-16 h-10"
            min={1}
            max={100}
            value={options.quality}
            onChange={(event) => handleQuality(Number(event.target.value))}
          />
        </div>
      </CardContent>
    </Card>
  )
}