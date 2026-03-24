/**
 * Floating cursor - circle with "VIEW" when hovering over images
 * Uses GSAP for smooth follow animation
 * Hidden on touch devices
 */
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function FloatingCursor() {
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    setIsTouch(window.matchMedia('(hover: none)').matches)
  }, [])
  const cursorRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)
  const [hoverLabel, setHoverLabel] = useState('VIEW')
  const mouseRef = useRef({ x: 0, y: 0 })
  const posRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      if (posRef.current.x === 0 && posRef.current.y === 0) {
        posRef.current = { x: e.clientX, y: e.clientY }
      }
    }

    const handleMouseOver = (e) => {
      const el = e.target.closest('[data-cursor-hover]')
      if (el) {
        setIsHovering(true)
        const t = el.dataset.cursorText?.trim()
        setHoverLabel(t || 'VIEW')
      }
    }

    const handleMouseOut = (e) => {
      if (!e.relatedTarget?.closest('[data-cursor-hover]')) {
        setIsHovering(false)
        setHoverLabel('VIEW')
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    let rafId = 0
    const tick = () => {
      const { x, y } = mouseRef.current
      posRef.current.x += (x - posRef.current.x) * 0.08
      posRef.current.y += (y - posRef.current.y) * 0.08
      gsap.set(cursor, {
        x: posRef.current.x,
        y: posRef.current.y,
        xPercent: -50,
        yPercent: -50,
      })
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [])

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    gsap.to(cursor, {
      scale: isHovering ? 0.8 : 0,
      opacity: isHovering ? 1 : 0,
      duration: 0.25,
      ease: 'power2.out',
    })
  }, [isHovering])

  if (isTouch) return null

  const isLong = hoverLabel.length > 6

  return (
    <div
      ref={cursorRef}
      className={`pointer-events-none fixed left-0 top-0 z-[100] rounded-full border border-white/80 flex items-center justify-center bg-black/50 backdrop-blur-sm scale-0 opacity-0 ${
        isLong ? 'min-h-11 px-2.5 py-1 max-w-[7.5rem]' : 'w-12 h-12'
      }`}
      aria-hidden="true"
    >
      <span className="text-center font-medium tracking-wide text-white leading-tight text-[8px] uppercase">
        {hoverLabel}
      </span>
    </div>
  )
}
