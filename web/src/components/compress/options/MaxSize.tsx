import { SettingsOptionProps } from '@/app/compress/page'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Option } from '../Option'

const Yottabytes = ['B', 'KB', 'MB', 'GB', 'TB']
export default function MaxSizeOptions ({ settings, updateSettings }: SettingsOptionProps) {

  return (
    <Option name='Max Size' description='Set to 0 to disable'>
      <div className="flex flex-row">
        <Input
          className="h-9 w-[500%]"
          type="number"
          placeholder="Size"
          value={settings.maxSize}
          onChange={(event) => updateSettings({ maxSize: Number(event.target.value) })}
        />
        <Select
          onValueChange={(value) => updateSettings({ maxSize: Number(value) })}
          defaultValue={settings.sizeType}
        >
          <SelectTrigger>
            <SelectValue><p>{settings.sizeType}</p></SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel><p>Yottabytes</p></SelectLabel>
              {Yottabytes.map((type) => <SelectItem key={type} value={type}>{type}</SelectItem>)}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </Option>
  )
}