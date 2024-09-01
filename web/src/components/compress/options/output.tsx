import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Command, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useOptionsStore } from '@/hooks/useOptions'
import { cn } from '@/lib/utils'
import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons'
import { useState } from 'react'

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

export function OutputOption () {
  const { options, setOptions } = useOptionsStore((state) => state)
  const [open, setOpen] = useState(false)

  return (
    <Card>
      <CardHeader><p>Output</p></CardHeader>
      <CardContent>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              role='combobox'
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {options.output
                ? fileTypes.find((type) => type.value === options.output)?.label
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
                      setOptions(Object.assign(options, { output: currentValue === options.output ? '' : currentValue }))
                      setOpen(false)
                    }}>
                    <CheckIcon
                      className={cn(
                        'mr-2 h-4 w-4',
                        options.output === type.value ? 'opacity-100' : 'opacity-0'
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