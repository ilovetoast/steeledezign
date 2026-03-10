/**
 * Selected Work - editorial scroll sections
 * Batch animation runs here after all WorkItems render
 */
import { useLayoutEffect, useRef, useState, useMemo } from 'react'
import { revealWorkImages } from '../animations/revealImage'
import { getLenis } from '../animations/smoothScroll'
import WorkItem from './WorkItem'
import Lightbox from './Lightbox'
import { buildGalleryData } from '../utils/buildGalleryData'

export default function WorkGrid() {
  const sectionRef = useRef(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxCategory, setLightboxCategory] = useState(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const categories = useMemo(() => buildGalleryData(), [])

  useLayoutEffect(() => {
    if (!categories.length) return

    const cleanup = revealWorkImages()
    return () => cleanup?.()
  }, [categories.length])

  const openLightbox = (categorySlug, index) => {
    setLightboxCategory(categorySlug)
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    setLightboxCategory(null)
  }

  const scrollToCategory = (slug) => {
    const el = document.getElementById(`category-${slug}`)
    const lenis = getLenis()
    if (lenis && el) {
      lenis.scrollTo(el, { offset: -80, duration: 1.2 })
    } else if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const currentCategory = categories.find((c) => c.slug === lightboxCategory)
  const lightboxItems = currentCategory?.images ?? []

  return (
    <section ref={sectionRef} id="work" className="py-32 px-6 bg-neutral-900 text-white">
      <p className="section-label mb-4 text-center">Selected Work</p>
      <h2 className="category-title mb-20 text-center">Featured Projects</h2>

      {categories.length > 0 && (
        <nav
          className="flex flex-wrap justify-center gap-2 md:gap-4 mb-24 items-center"
          aria-label="Category navigation"
        >
          {categories.map((cat, i) => (
            <span key={cat.slug} className="flex items-center gap-2 md:gap-4">
              {i > 0 && <span className="text-white/40">•</span>}
              <button
                type="button"
                onClick={() => scrollToCategory(cat.slug)}
                className="nav-text text-white/70 hover:text-white transition-colors"
              >
                {cat.title}
              </button>
            </span>
          ))}
        </nav>
      )}

      <div className="space-y-40 max-w-[1200px] mx-auto">
        {categories.map((category) => (
          <article
            key={category.slug}
            id={`category-${category.slug}`}
            className="scroll-mt-24"
          >
            <h3 className="category-hero">
              {category.title.toUpperCase()}
            </h3>

            <div className="space-y-0">
              {category.images.map((image, index) => (
                <WorkItem
                  key={`${category.slug}-${index}-${image.alt}`}
                  image={image}
                  alt={image.alt}
                  onClick={() => openLightbox(category.slug, index)}
                />
              ))}
            </div>
          </article>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="max-w-2xl mx-auto text-center py-16 border border-dashed border-neutral-700 rounded">
          <p className="body-text opacity-70">
            Add images to <code className="text-neutral-400">src/assets/images/category-name/</code> to build your portfolio.
          </p>
          <p className="caption mt-4">Example: dramatic, editorial, portfolio</p>
        </div>
      )}

      <Lightbox
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        items={lightboxItems}
        currentIndex={lightboxIndex}
        onNavigate={setLightboxIndex}
      />
    </section>
  )
}
