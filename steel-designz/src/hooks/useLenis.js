import { useLayoutEffect } from 'react'
import { initSmoothScroll, destroySmoothScroll } from '../animations/smoothScroll'

/**
 * Hook to initialize Lenis smooth scrolling on mount
 * Uses useLayoutEffect so Lenis + scrollerProxy are ready before child animations (ScrollTrigger) run
 */
export function useLenis() {
  useLayoutEffect(() => {
    const lenis = initSmoothScroll()

    return () => {
      destroySmoothScroll()
    }
  }, [])
}

export default useLenis
