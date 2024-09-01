import { CheckBoxOption } from './options/checkBox'
import { ColorSpaceOption } from './options/colorSpace'
import MaxSizeOptions from './options/maxSize'
import { OutputOption } from './options/output'
import { QualityOption } from './options/quality'
import { ThresholdOption } from './options/threshold'

export default function OptionsCompress () {
  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-4 h-full w-full">
      <QualityOption />
      <ThresholdOption />
      <ColorSpaceOption />
      <CheckBoxOption />
      <OutputOption />
      <MaxSizeOptions />
    </div>
  )
}