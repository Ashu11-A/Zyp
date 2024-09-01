import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'
import { Button } from './ui/button'

export default function SwitchTheme () {
  const theme = useTheme()

  return (
    <Button
      variant='secondary'
      onClick={() => theme.setTheme(theme.resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      {theme.resolvedTheme === 'dark' ? <MoonIcon/> : <SunIcon/>}
    </Button>
  )
}