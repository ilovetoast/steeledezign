/**
 * Main layout - nav, smooth scroll init, children
 */
import { useMemo, useEffect, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLenis } from '../hooks/useLenis'
import { getLenis } from '../animations/smoothScroll'
import { buildGalleryData } from '../utils/buildGalleryData'
import FloatingCursor from './FloatingCursor'

const HERO_ORDER = ['dramatic', 'editorial', 'portfolio']

export default function Layout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  useLenis()

  useEffect(() => {
    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)
    return () => window.removeEventListener('load', onLoad)
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileMenuOpen])

  const navItems = useMemo(() => {
    const categories = buildGalleryData()
    const bySlug = Object.fromEntries(categories.map((c) => [c.slug, c]))
    const items = []
    HERO_ORDER.forEach((slug) => {
      if (bySlug[slug]?.images?.length) {
        items.push({ id: `category-${slug}`, label: bySlug[slug].title })
      }
    })
    items.push({ id: 'contact', label: 'Contact' })
    return items
  }, [])

  const scrollTo = (id) => {
    setMobileMenuOpen(false)
    const el = document.getElementById(id)
    const lenis = getLenis()
    if (lenis && el) {
      lenis.scrollTo(el, { offset: -80, duration: 1.2 })
    } else if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950">
      <FloatingCursor />
      <nav className="fixed top-0 left-0 right-0 z-50 py-6 px-6 flex justify-between items-center bg-neutral-950/95 backdrop-blur-sm">
        <button
          type="button"
          onClick={() => scrollTo('hero')}
          className="nav-text text-white hover:opacity-80 transition-opacity"
        >
          Andrea Steele Makeup
        </button>
        <ul className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => scrollTo(item.id)}
                className="nav-text text-white/80 hover:text-white transition-colors"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => setMobileMenuOpen((o) => !o)}
          className="md:hidden p-2 -mr-2 text-white hover:opacity-80 transition-opacity"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          <span className="block w-6 h-0.5 bg-white mb-1.5" />
          <span className="block w-6 h-0.5 bg-white mb-1.5" />
          <span className="block w-6 h-0.5 bg-white" />
        </button>
      </nav>
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 flex flex-col items-center justify-center bg-neutral-950"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="false"
        >
          <ul className="flex flex-col items-center gap-8 text-center" onClick={(e) => e.stopPropagation()}>
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => scrollTo(item.id)}
                  className="nav-text text-white/90 hover:text-white transition-colors text-3xl font-light tracking-wide"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <main>{children}</main>
    </div>
  )
}
