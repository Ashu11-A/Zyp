import { ReactNode } from 'react'

export function Option ({ name, children, description }: { name?: string, description?: string, children: ReactNode }) {
  return <div className='px-5 py-3'>
    {name && <p className="pb-2">{name}</p>}
    {description && <p className="pb-1 text-red-500">{description}</p>}
    <div className="flex flex-row h-full w-full gap-4">{children}</div>
  </div>
}