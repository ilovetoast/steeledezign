import { useEffect } from 'react'
import { initSmoothScroll, destroySmoothScroll } from '../animations/smoothScroll'

/**
 * Hook to initialize Lenis smooth scrolling on mount
 * Call once at app root (Layout or App)
 */
export function useLenis() {
  useEffect(() => {
    const lenis = initSmoothScroll()

    return () => {
      destroySmoothScroll()
    }
  }, [])
}

export default useLenis
