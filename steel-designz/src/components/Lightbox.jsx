/**
 * Fullscreen lightbox viewer
 * GSAP animations, esc/click-outside to close, prev/next nav
 */
import { useEffect, useRef } from 'react'
import { lightboxOpen, lightboxClose } from '../animations/lightboxAnimation'

export default function Lightbox({ isOpen, onClose, items = [], currentIndex = 0, onNavigate }) {
  const overlayRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    if (!isOpen || !overlayRef.current || !imageRef.current) return

    lightboxOpen(overlayRef.current, imageRef.current)
  }, [isOpen])

  const handleClose = () => {
    if (!overlayRef.current || !imageRef.current) {
      onClose()
      return
    }
    const tl = lightboxClose(overlayRef.current, imageRef.current)
    tl.eventCallback('onComplete', onClose)
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return
      if (e.key === 'Escape') handleClose()
      if (e.key === 'ArrowRight') onNavigate?.(Math.min(currentIndex + 1, items.length - 1))
      if (e.key === 'ArrowLeft') onNavigate?.(Math.max(currentIndex - 1, 0))
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, items.length, currentIndex])

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) handleClose()
  }

  const currentItem = items[currentIndex]

  if (!isOpen) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
    >
      <div className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center">
        <div
          ref={imageRef}
          className="max-w-full max-h-[90vh] object-contain"
        >
          {currentItem?.src ? (
            <img
              src={currentItem.src}
              srcSet={currentItem.srcSet}
              sizes="100vw"
              alt={currentItem.alt || 'Work'}
              className="max-w-full max-h-[90vh] object-contain"
            />
          ) : (
            <div className="w-96 h-96 bg-neutral-800 flex items-center justify-center text-neutral-500">
              {currentItem?.alt || 'Image'}
            </div>
          )}
        </div>

        {items.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onNavigate?.(Math.max(currentIndex - 1, 0)) }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              aria-label="Previous image"
            >
              ←
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onNavigate?.(Math.min(currentIndex + 1, items.length - 1)) }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              aria-label="Next image"
            >
              →
            </button>
          </>
        )}

        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); handleClose() }}
          className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          aria-label="Close"
        >
          ×
        </button>
      </div>
    </div>
  )
}
