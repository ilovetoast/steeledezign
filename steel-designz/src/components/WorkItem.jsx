/**
 * Editorial work item - cinematic reveal
 * Uses .reveal-container class for batch animation from parent
 */
import { useRef, memo } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DEFAULT_SIZES } from '../utils/responsiveImage'

let refreshTimeout = null
const debouncedRefresh = () => {
  if (refreshTimeout) clearTimeout(refreshTimeout)
  refreshTimeout = setTimeout(() => {
    ScrollTrigger.refresh()
    refreshTimeout = null
  }, 100)
}

function WorkItem({ image, alt, onClick }) {
  const containerRef = useRef(null)

  return (
    <article
      ref={containerRef}
      data-cursor-hover
      className="group cursor-pointer py-16"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
    >
      <div className="flex justify-center">
        <div className="w-full max-w-[1200px] overflow-hidden">
          <div className="image-reveal reveal-container aspect-[4/5] md:aspect-[16/10] bg-neutral-800 overflow-hidden">
            {image?.src ? (
              <img
                src={image.src}
                srcSet={image.srcSet}
                sizes={DEFAULT_SIZES}
                alt={alt || 'Editorial makeup work'}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
                onLoad={debouncedRefresh}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-neutral-500 text-sm">
                Placeholder
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

export default memo(WorkItem)
