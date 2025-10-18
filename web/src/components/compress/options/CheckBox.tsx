import { SettingsOptionProps } from '@/app/compress/page'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Option } from '../Option'

export function CheckBoxOption ({ updateSettings }: SettingsOptionProps) {
  return (
    <Option>
      <div className="flex space-x-2 items-center">
        <Checkbox id="mult-pass" className="space-x-2" onCheckedChange={(state) => updateSettings({ multPass: state ===  'indeterminate' ? false : state  })} />
        <label
          htmlFor="mult-pass"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Mult Pass
        </label>
      </div>

      <div className="flex space-x-2 items-center">
        <Checkbox id="force" className="space-x-2" onCheckedChange={(state) => updateSettings({ force: state ===  'indeterminate' ? false : state } )} />
        <label
          htmlFor="force"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Force Compress
        </label>
      </div>

      <div className="flex space-x-2 items-center">
        <Checkbox id="progressive" className="space-x-2" onCheckedChange={(state) => updateSettings({ progressive: state ===  'indeterminate' ? false : state })} />
        <label
          htmlFor="progressive"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Progressive
        </label>
      </div>

      <div className="flex space-x-2 items-center">
        <Checkbox id="GrayScale" className="space-x-2" onCheckedChange={(state) => updateSettings({ grayScale: state ===  'indeterminate' ? false : state })} />
        <label
          htmlFor="GrayScale"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          GrayScale
        </label>
      </div>
    </Option>
  )
}