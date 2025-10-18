import { SettingsOptionProps } from '@/app/compress/page'
import { Button } from '@/components/ui/button'
import { Command, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import { Option } from '../Option'

export const fileTypes: {value: string, label: string}[] = [
  {
    value: 'png',
    label: '.png'
  },
  {
    value: 'jpg',
    label: '.jpg'
  },
  {
    value: 'jpeg',
    label: '.jpeg'
  }
]

export function OutputOption ({ settings, updateSettings }: SettingsOptionProps) {
  const [open, setOpen] = useState(false)

  return (
    <Option name='Output'>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {settings.output
              ? fileTypes.find((type) => type.value === settings.output)?.label
              : 'Select output file...'
            }
            <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search file ext..." />
            <CommandList>
              {fileTypes.map((type) => (
                <CommandItem
                  key={type.value}
                  value={type.value}
                  onSelect={(currentValue) => {
                    updateSettings({ output: currentValue === settings.output ? '' : currentValue })
                    setOpen(false)
                  }}>
                  <CheckIcon
                    className={cn(
                      'mr-2 h-4 w-4',
                      settings.output === type.value ? 'opacity-100' : 'opacity-0'
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