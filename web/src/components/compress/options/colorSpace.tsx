import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Command, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useOptionsStore } from '@/hooks/useOptions'
import { cn } from '@/lib/utils'
import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons'
import { useState } from 'react'

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

export function ColorSpaceOption () {
  const { options, setOptions } = useOptionsStore((state) => state)
  const [open, setOpen] = useState(false)

  return (
    <Card>
      <CardHeader><p>Color Space</p></CardHeader>
      <CardContent>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              role='combobox'
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {options.colorSpace
                ? colorTypes.find((type) => type.value === options.colorSpace)?.label
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
                      setOptions(Object.assign(options, {
                        colorSpace: currentValue === options.colorSpace ? '' : currentValue
                      }))
                      setOpen(false)
                    }}>
                    <CheckIcon
                      className={cn(
                        'mr-2 h-4 w-4',
                        options.colorSpace === type.value ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    {type.label}
                  </CommandItem>
                ))}
              </CommandList>
            </Command>
          </PopoverContent>      
        </Popover>
      </CardContent>
    </Card>
  )
}