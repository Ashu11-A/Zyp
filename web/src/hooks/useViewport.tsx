import { useCallback, useEffect, useState } from 'react'

export function useViewport () {
  const [viewport, setViewport] = useState({ width: 0, height: 0 })

  const handleResize = useCallback(() => setViewport({
    height: window.innerHeight,
    width: window.innerWidth
  }), [])

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  })

  return viewport
}