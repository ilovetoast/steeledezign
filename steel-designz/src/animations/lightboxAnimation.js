import gsap from 'gsap'

/**
 * Lightbox open animation - zoom and fade in
 */
export function lightboxOpen(overlay, image) {
  const tl = gsap.timeline()

  tl.fromTo(
    overlay,
    { opacity: 0 },
    { opacity: 1, duration: 0.3, ease: 'power2.out' }
  ).fromTo(
    image,
    { scale: 0.9, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.4, ease: 'power2.out' },
    '-=0.1'
  )

  return tl
}

/**
 * Lightbox close animation - zoom out and fade
 */
export function lightboxClose(overlay, image) {
  const tl = gsap.timeline()

  tl.to(image, {
    scale: 0.95,
    opacity: 0,
    duration: 0.25,
    ease: 'power2.in',
  }).to(
    overlay,
    {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
    },
    '-=0.1'
  )

  return tl
}

export default { lightboxOpen, lightboxClose }
