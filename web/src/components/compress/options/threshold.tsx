import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { useOptionsStore } from '@/hooks/useOptions'
import { cn } from '@/lib/utils'
import { Dispatch, SetStateAction } from 'react'

interface ThresholdProps {
 threshold: number
 setThreshold: Dispatch<SetStateAction<number>>
}

export function ThresholdOption () {
  const { options, setOptions } = useOptionsStore((state) => state)

  const handleThreshold = (value: number) => {
    setOptions(Object.assign(options, {
      threshold: (value > 255)
        ? 255
        : value
    }))
  }

  return (
    <Card>
      <CardHeader className="p-6">
        <p>Threshold</p>
      </CardHeader>
      <CardDescription className="px-6 pb-1"><p className="text-red-500">Set to 0 to disable</p></CardDescription>
      <CardContent>
        <div className="flex flex-row h-full w-full gap-4">
          <Slider
            value={[options.threshold]}
            onValueChange={(value) => handleThreshold(value[value.length - 1])}
            max={255}
            step={1}
            className={cn('w-[90%]')}
          />
          <Input
            type="number"
            placeholder="Threshold"
            className="rounded-2xl w-16 h-10"
            min={0}
            max={100}
            value={options.threshold}
            onChange={(event) => handleThreshold(Number(event.target.value))}
          />
        </div>
      </CardContent>
    </Card>
  )
}