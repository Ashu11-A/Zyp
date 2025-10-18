import { SettingsOptionProps } from '@/app/compress/page'
import { Button } from '@/components/ui/button'
import { Command, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import { Option } from '../Option'

export const colorTypes: {value: string, label: string}[] = [
  {
    value: 'ProPhoto RGB',
    label: 'ProPhoto RGB'
  },
  {
    value: 'Adobe RGB',
    label: 'Adobe RGB'
  },
  {
    value: 'Colormath RGB',
    label: 'Colormath RGB'
  },
  {
    value: 'sRGB',
    label: 'sRGB'
  },
  {
    value: 'SWOP CMYK',
    label: 'SWOP CMYK'
  },
  {
    value: '2200 Matt Paper',
    label: '2200 Matt Paper'
  }
]

export function ColorSpaceOption ({ settings, updateSettings }: SettingsOptionProps) {
  const [open, setOpen] = useState(false)

  return (
    <Option name='Color Space'>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {settings.colorSpace
              ? colorTypes.find((type) => type.value === settings.colorSpace)?.label
              : 'Select color space...'
            }
            <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search color space..." />
            <CommandList>
              {colorTypes.map((type) => (
                <CommandItem
                  key={type.value}
                  value={type.value}
                  onSelect={(currentValue) => {
                    updateSettings({ colorSpace: currentValue === settings.colorSpace ? '' : currentValue })
                    setOpen(false)
                  }}>
                  <CheckIcon
                    className={cn(
                      'mr-2 h-4 w-4',
                      settings.colorSpace === type.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {type.label}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>      
      </Popover>
    </Option>
  )
}