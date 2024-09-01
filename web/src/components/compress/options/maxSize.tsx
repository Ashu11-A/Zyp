import { Card, CardContent, CardDescription, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectTrigger, SelectValue, SelectItem, SelectLabel } from '@/components/ui/select'
import { useOptionsStore } from '@/hooks/useOptions'

const Yottabytes = ['B', 'KB', 'MB', 'GB', 'TB']
export default function MaxSizeOptions () {
  const { options, setOptions } = useOptionsStore((state) => state)

  return (
    <Card>
      <CardFooter className="p-6"><p>Max Size</p></CardFooter>
      <CardDescription className="px-6 pb-1"><p className="text-red-500">Set to 0 to disable</p></CardDescription>
      <CardContent className="flex flex-col">
        <div className="flex flex-row">
          <Input className="h-9 w-[500%]" type="number" placeholder="Size" value={options.maxSize} onChange={(event) => setOptions(Object.assign(options, { maxSize: Number(event.target.value) }))} />
          <Select onValueChange={(value) => setOptions(Object.assign(options, { maxSize: Number(value) }))} defaultValue={options.sizeType}>
            <SelectTrigger>
              <SelectValue><p>{options.sizeType}</p></SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel><p>Yottabytes</p></SelectLabel>
                {Yottabytes.map((type) => <SelectItem key={type} value={type}>{type}</SelectItem>)}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}