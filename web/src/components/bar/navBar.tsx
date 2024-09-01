'use client'
import { HomeIcon, ImageIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import SwitchTheme from '../switchTheme'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '../ui/card'
import { useFilesStore } from '@/hooks/useFiles'

interface MenuItems {
  name: string
  path: string
  disable?: boolean
  icon: JSX.Element
}

export default function NavBar () {
  const router = useRouter()
  const { files } = useFilesStore((state) => state)
  const menuItems: MenuItems[] = [
    {
      name: 'Home',
      path: '/',
      icon: <HomeIcon />
    },
    {
      name: 'Process',
      path: 'compress',
      icon: <ImageIcon />,
      disable: files.length === 0
    }
  ]
  return (
    <div className={cn(
      'fixed',
      'md:h-[50vh] h-12 md:w-12 w-screen',
      'md:left-4 bottom-10'
    )}>
      <div className={cn(
        'flex md:flex-row flex-col',
        'w-auto h-auto',
        'items-center md:justify-center justify-end',
      )}>
        <Card>
          <CardContent className='flex md:flex-col flex-row p-0 w-auto h-auto'>
            {menuItems.map((item) =>
              <div key={item.name}>
                <Button variant='secondary' className='m-2' disabled={item.disable} onClick={() => router.push(item.path)}>
                  {item.icon}
                </Button>
              </div>
            )}
            <div className='m-2'>
              <SwitchTheme/>
            </div>
          </CardContent> 
        </Card>
      </div>
    </div>
  )
}