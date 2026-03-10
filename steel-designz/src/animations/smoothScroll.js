import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenisInstance = null
let rafCallback = null

/**
 * Initialize Lenis smooth scrolling, synced with GSAP ScrollTrigger
 * Call once on app mount
 */
export function initSmoothScroll() {
  if (lenisInstance) return lenisInstance

  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
  })

  // Proxy ScrollTrigger to use Lenis scroll (required for correct trigger timing with smooth scroll)
  const scroller = document.documentElement
  ScrollTrigger.scrollerProxy(scroller, {
    scrollTop(value) {
      if (arguments.length) lenisInstance.scrollTo(value)
      return lenisInstance.scroll
    },
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
    },
  })

  // Sync Lenis with GSAP ScrollTrigger
  lenisInstance.on('scroll', ScrollTrigger.update)

  rafCallback = (time) => lenisInstance.raf(time * 1000)
  gsap.ticker.add(rafCallback)

  // Recalculate triggers after proxy + Lenis are ready
  requestAnimationFrame(() => ScrollTrigger.refresh())

  gsap.ticker.lagSmoothing(0)

  // Add lenis class to html for styling
  document.documentElement.classList.add('lenis', 'lenis-smooth')

  return lenisInstance
}

/**
 * Destroy Lenis instance and cleanup
 */
export function destroySmoothScroll() {
  if (lenisInstance && rafCallback) {
    gsap.ticker.remove(rafCallback)
    rafCallback = null
  }
  if (lenisInstance) {
    ScrollTrigger.scrollerProxy(document.documentElement) // clear proxy
    lenisInstance.destroy()
    lenisInstance = null
    document.documentElement.classList.remove('lenis', 'lenis-smooth')
  }
}

export function getLenis() {
  return lenisInstance
}

export default initSmoothScroll
