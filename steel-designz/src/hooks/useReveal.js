import { useEffect, useRef } from 'react'
import { revealImage } from '../animations/revealImage'

/**
 * Hook to apply reveal animation to a ref element on mount
 *
 * @param {Object} options - Same options as revealImage()
 * @returns {React.RefObject} - Ref to attach to the element
 */
export function useReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current) {
      revealImage(ref.current, options)
    }
  }, [])

  return ref
}

export default useReveal
