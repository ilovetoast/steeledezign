/**
 * Glow-style image reveal — Design Embraced / Gemmy Woud-Binnendijk effect
 * https://designembraced.com/case/gemmy-woud-binnendijk/
 *
 * Uses gsap.from() + per-element ScrollTrigger. No gsap.set() — elements
 * stay visible until animation runs, avoiding stuck opacity:0.
 */
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const REVEAL_SELECTOR = '.image-reveal'

/**
 * Cinematic batch reveal — each image animates when IT enters viewport
 * Overflow hidden on parent creates the photograph-sliding-into-frame effect
 */
export function revealWorkImages() {
  const elements = gsap.utils.toArray(REVEAL_SELECTOR)
  if (!elements.length) return null

  const triggers = elements.map((el) =>
    gsap.from(el, {
      opacity: 0,
      y: 120,
      scale: 1.1,
      duration: 1.4,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    })
  )

  return () => {
    triggers.forEach((t) => {
      t.scrollTrigger?.kill()
      t.kill()
    })
  }
}

export default revealWorkImages
