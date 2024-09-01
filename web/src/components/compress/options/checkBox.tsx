import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { useOptionsStore } from '@/hooks/useOptions'
import { Dispatch, SetStateAction } from 'react'

export function CheckBoxOption () {
  const { options, setOptions } = useOptionsStore((state) => state)

  const handleOption = (data: Record<string, string | boolean>) => {
    setOptions(Object.assign(options, data))
  }

  return (
    <Card>
      <CardContent className="flex flex-col p-5 gap-2">
        <div className="flex space-x-2 items-center">
          <Checkbox id="mult-pass" className="space-x-2" onCheckedChange={(state) => handleOption({ multPass: state ===  'indeterminate' ? false : state  })} />
          <label
            htmlFor="mult-pass"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Mult Pass
          </label>
        </div>

        <div className="flex space-x-2 items-center">
          <Checkbox id="force" className="space-x-2" onCheckedChange={(state) => handleOption({ force: state ===  'indeterminate' ? false : state } )} />
          <label
            htmlFor="force"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Force Compress
          </label>
        </div>

        <div className="flex space-x-2 items-center">
          <Checkbox id="progressive" className="space-x-2" onCheckedChange={(state) => handleOption({ progressive: state ===  'indeterminate' ? false : state })} />
          <label
            htmlFor="progressive"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Progressive
          </label>
        </div>

        <div className="flex space-x-2 items-center">
          <Checkbox id="GrayScale" className="space-x-2" onCheckedChange={(state) => handleOption({ grayScale: state ===  'indeterminate' ? false : state })} />
          <label
            htmlFor="GrayScale"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            GrayScale
          </label>
        </div>
      </CardContent>
    </Card>
  )
}