/**
 * Commercial / gallery clips: src loads when near viewport (lazy), then muted loop autoplay.
 * Custom controls: play / pause and sound on / off (no native video chrome).
 */
import { useRef, useEffect, useState, useCallback } from 'react'

export default function GalleryVideo({ src, lazy = true, variant = 'panel' }) {
  const wrapRef = useRef(null)
  const videoRef = useRef(null)
  const userPausedRef = useRef(false)
  const [shouldLoad, setShouldLoad] = useState(!lazy)
  const [paused, setPaused] = useState(true)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    if (!lazy) return
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) setShouldLoad(true)
      },
      { rootMargin: '200px', threshold: 0.02 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [lazy])

  const runAutoplay = useCallback(() => {
    const v = videoRef.current
    if (!v || !shouldLoad || !src) return
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      userPausedRef.current = true
      v.pause()
      return
    }
    if (!userPausedRef.current) v.play().catch(() => {})
  }, [shouldLoad, src])

  useEffect(() => {
    runAutoplay()
  }, [runAutoplay])

  const togglePlay = useCallback((e) => {
    e.stopPropagation()
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      userPausedRef.current = false
      v.play().catch(() => {})
    } else {
      userPausedRef.current = true
      v.pause()
    }
  }, [])

  const toggleMute = useCallback((e) => {
    e.stopPropagation()
    const v = videoRef.current
    if (!v) return
    const next = !v.muted
    v.muted = next
    setMuted(next)
  }, [])

  const videoClass = variant === 'panel' ? 'panel-video-el' : 'image-expand-video-el'

  return (
    <div ref={wrapRef} className={`gallery-video-wrap gallery-video-wrap--${variant}`}>
      <video
        ref={videoRef}
        src={shouldLoad ? src : undefined}
        muted={muted}
        loop
        playsInline
        preload={shouldLoad ? 'metadata' : 'none'}
        className={videoClass}
        onLoadedData={runAutoplay}
        onPlay={() => setPaused(false)}
        onPause={() => setPaused(true)}
      />
      <div
        className="gallery-video-controls"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        role="toolbar"
        aria-label="Video controls"
      >
        <button type="button" className="gallery-video-btn" onClick={togglePlay}>
          {paused ? 'Play' : 'Pause'}
        </button>
        <button type="button" className="gallery-video-btn" onClick={toggleMute}>
          {muted ? 'Sound on' : 'Mute'}
        </button>
      </div>
    </div>
  )
}
