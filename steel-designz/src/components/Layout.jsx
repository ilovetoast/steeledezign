/**
 * Main layout - nav, smooth scroll init, children
 */
import { useMemo, useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLenis } from '../hooks/useLenis'
import { getLenis } from '../animations/smoothScroll'
import { buildGalleryData } from '../utils/buildGalleryData'
import Footer from './Footer'
import FloatingCursor from './FloatingCursor'

export default function Layout({ children }) {
  useLenis()

  useEffect(() => {
    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)
    return () => window.removeEventListener('load', onLoad)
  }, [])

  const navItems = useMemo(() => {
    const categories = buildGalleryData()
    const categoryLinks = categories.map((c) => ({
      id: `category-${c.slug}`,
      label: c.title,
    }))
    return [
      ...categoryLinks,
      { id: 'experience', label: 'Experience' },
      { id: 'bio', label: 'Bio' },
      { id: 'contact', label: 'Contact' },
    ]
  }, [])

  const scrollTo = (id) => {
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
      </nav>

      <main>{children}</main>

      <Footer />
    </div>
  )
}
