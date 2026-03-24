/**
 * Hero - Glow-style paper fold scroll animation
 * Order: dramatic → editorial → portfolio
 * Fixed label per group, transitions when entering new category
 * Images expand on click
 */
import { useLayoutEffect, useRef, useMemo, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { buildGalleryData, getCoverImage } from '../utils/buildGalleryData'
import BannerCanvas from './BannerCanvas'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const containerRef = useRef(null)
  const labelRef = useRef(null)
  const overlayRef = useRef(null)
  const imageWrapRef = useRef(null)
  const navDirectionRef = useRef(0)
  const [expandedIndex, setExpandedIndex] = useState(null)

  const closeExpanded = useCallback(() => {
    const overlay = overlayRef.current
    const wrap = imageWrapRef.current
    if (overlay && wrap) {
      gsap.to([overlay, wrap], {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => setExpandedIndex(null),
      })
      gsap.to(wrap, { scale: 0.95, duration: 0.25, ease: 'power2.in' })
    } else {
      setExpandedIndex(null)
    }
  }, [])

  const heroSections = useMemo(() => {
    const categories = buildGalleryData()
    const sections = []
    categories.forEach((cat) => {
      if (!cat.images?.length) return
      cat.images.forEach((img, i) => {
        sections.push({
          label: cat.title.toUpperCase(),
          slug: cat.slug,
          image: img,
          isFirstInGroup: i === 0,
        })
      })
    })
    return sections
  }, [])

  const groupStarts = useMemo(() => {
    const starts = []
    heroSections.forEach((s, i) => {
      if (i === 0 || s.label !== heroSections[i - 1].label) starts.push({ index: i, label: s.label })
    })
    return starts
  }, [heroSections])

  const goPrev = useCallback(() => {
    navDirectionRef.current = -1
    setExpandedIndex((i) => {
      if (i === null) return null
      return i === 0 ? heroSections.length - 1 : i - 1
    })
  }, [heroSections.length])

  const goNext = useCallback(() => {
    navDirectionRef.current = 1
    setExpandedIndex((i) => {
      if (i === null) return null
      return i === heroSections.length - 1 ? 0 : i + 1
    })
  }, [heroSections.length])

  useLayoutEffect(() => {
    const handleKey = (e) => {
      if (expandedIndex === null) return
      if (e.key === 'Escape') closeExpanded()
      else if (e.key === 'ArrowLeft') goPrev()
      else if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [expandedIndex, closeExpanded, goPrev, goNext])

  useLayoutEffect(() => {
    const overlay = overlayRef.current
    const wrap = imageWrapRef.current
    if (!overlay || !wrap || expandedIndex === null) return

    const direction = navDirectionRef.current
    navDirectionRef.current = 0

    gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' })

    if (direction !== 0) {
      const fromX = direction > 0 ? 80 : -80
      gsap.fromTo(wrap, { x: fromX, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: 'power2.out' })
    } else {
      gsap.fromTo(wrap, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.2)' })
    }
  }, [expandedIndex])

  useLayoutEffect(() => {
    const panels = containerRef.current?.querySelectorAll('.panel')
    const label = labelRef.current
    if (!panels?.length || !label) return

    const triggers = []
    const BANNER_LABEL = 'Andrea Steele Makeup'
    const currentLabelRef = { current: BANNER_LABEL }

    if (label) {
      label.textContent = BANNER_LABEL
      gsap.set(label, { y: 0, opacity: 1 })
    }

    const transitionToLabel = (newLabel, scrollDown = true) => {
      if (newLabel === currentLabelRef.current) return
      gsap.killTweensOf(label)
      currentLabelRef.current = newLabel
      const exitY = scrollDown ? -80 : 80
      const enterFromY = scrollDown ? 60 : -60
      gsap.to(label, {
        y: exitY,
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          label.textContent = newLabel
          label.classList.toggle('is-contact', newLabel === 'CONTACT')
          gsap.set(label, { y: enterFromY })
          gsap.to(label, { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' })
        },
      })
    }

    const bannerEl = containerRef.current?.querySelector('.hero-banner')
    if (bannerEl && label) {
      const bannerSt = ScrollTrigger.create({
        trigger: bannerEl,
        start: 'top top',
        end: 'bottom top',
        onEnter: () => transitionToLabel(BANNER_LABEL, true),
        onEnterBack: () => transitionToLabel(BANNER_LABEL, false),
        onLeave: () => transitionToLabel(heroSections[0]?.label || 'DRAMATIC', true),
      })
      triggers.push(bannerSt)
    }

    groupStarts.forEach(({ index, label: newLabel }, gi) => {
      const panel = panels[index]
      const prevLabel = gi > 0 ? groupStarts[gi - 1].label : BANNER_LABEL
      if (!panel || !label) return

      const st = ScrollTrigger.create({
        trigger: panel,
        start: gi === 0 ? 'top top' : 'top 75%',
        end: gi === 0 ? 'bottom top' : 'top 25%',
        onEnter: () => transitionToLabel(newLabel, true),
        onEnterBack: () => transitionToLabel(newLabel, false),
        onLeaveBack: () => transitionToLabel(prevLabel, false),
      })
      triggers.push(st)
    })

    const contactEl = document.getElementById('contact')
    const lastLabel = groupStarts.length > 0 ? groupStarts[groupStarts.length - 1].label : 'PORTFOLIO'
    const isMobile = () => window.matchMedia('(max-width: 767px)').matches
    const isNarrow = () => window.matchMedia('(max-width: 1024px)').matches

    // Mobile: hide label when scrolled past last portfolio panel, show again when scrolling back up to it
    const lastPanel = panels[panels.length - 1]
    if (lastPanel && label) {
      const pastLastPanelSt = ScrollTrigger.create({
        trigger: lastPanel,
        start: 'bottom top',
        end: 'bottom top',
        onEnter: () => {
          if (isNarrow()) document.body.classList.add('in-contact-section')
        },
        onLeaveBack: () => {
          if (isNarrow()) document.body.classList.remove('in-contact-section')
        },
      })
      triggers.push(pastLastPanelSt)
    }

    if (contactEl && label) {
      const contactSt = ScrollTrigger.create({
        trigger: contactEl,
        start: 'top bottom',
        end: 'top 25%',
        onEnter: () => {
          if (!isMobile()) transitionToLabel('CONTACT', true)
          document.body.classList.add('in-contact-section')
        },
        onEnterBack: () => {
          if (!isMobile()) transitionToLabel('CONTACT', false)
          document.body.classList.add('in-contact-section')
        },
        onLeave: () => document.body.classList.remove('in-contact-section'),
        onLeaveBack: () => {
          transitionToLabel(lastLabel, false)
          document.body.classList.remove('in-contact-section')
        },
      })
      triggers.push(contactSt)
    }

    gsap.utils.toArray(panels).forEach((panel) => {
      const mask = panel.querySelector('.panel-mask')
      if (!mask) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: panel,
          start: 'top 85%',
          end: 'bottom 20%',
          scrub: true,
          // markers: true,
        },
      })

      tl.fromTo(
        mask,
        { rotateX: 55, y: 240, scale: 0.72 },
        { rotateX: 0, y: 0, scale: 1, ease: 'none', duration: 1 }
      )
        .to({}, { duration: 0.35 })
        .to(mask, { rotateX: 55, y: 240, scale: 0.72, ease: 'none', duration: 1 })

      triggers.push(tl)
    })

    ScrollTrigger.refresh()

    return () => {
      triggers.forEach((t) => t.kill?.())
    }
  }, [heroSections, groupStarts])

  const bannerImage = useMemo(() => getCoverImage() ?? heroSections[0]?.image, [heroSections])

  return (
    <div ref={containerRef} className="hero-panels">
      <div className="panel-label-anchor">
        <div ref={labelRef} className="panel-label-fixed" aria-hidden="true">
          Andrea Steele Makeup
        </div>
      </div>
      <section id="banner" className="hero-banner" aria-label="Andrea Steele Makeup">
        <div className="hero-banner-bg">
          {bannerImage?.src && (
            <>
              <img
                src={bannerImage.src}
                srcSet={bannerImage.srcSet}
                sizes="100vw"
                alt=""
                className="hero-banner-img"
              />
              <BannerCanvas imageSrc={bannerImage.src} />
            </>
          )}
          <div className="hero-banner-overlay" />
        </div>
      </section>
      {heroSections.map((section, i) => (
        <section
          key={i}
          className="panel"
          id={section.isFirstInGroup ? `category-${section.slug}` : undefined}
        >
          <div className="panel-perspective">
            <div
              className="panel-mask panel-mask-clickable"
              role="button"
              tabIndex={0}
              onClick={() => section.image?.src && setExpandedIndex(i)}
              onKeyDown={(e) => e.key === 'Enter' && section.image?.src && setExpandedIndex(i)}
              aria-label={`Expand ${section.image?.alt || 'image'}`}
            >
              <div className="panel-image">
                {section.image?.src ? (
                  <img
                    src={section.image.src}
                    srcSet={section.image.srcSet}
                    sizes="(max-width: 1700px) 95vw, 1700px"
                    alt={section.image.alt || 'Makeup portfolio'}
                    className="panel-image-img"
                    loading={i > 2 ? 'lazy' : 'eager'}
                    decoding="async"
                    style={section.image.objectPosition ? { objectPosition: section.image.objectPosition } : undefined}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </section>
      ))}
      {expandedIndex !== null && heroSections[expandedIndex]?.image && (
        <div
          ref={overlayRef}
          className="image-expand-overlay"
          onClick={closeExpanded}
          role="button"
          tabIndex={0}
          aria-label="Close expanded image"
        >
          <div
            ref={imageWrapRef}
            className="image-expand-inner"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={heroSections[expandedIndex].image.src}
              srcSet={heroSections[expandedIndex].image.srcSet}
              sizes="95vw"
              alt={heroSections[expandedIndex].image.alt || 'Expanded view'}
              style={heroSections[expandedIndex].image.objectPosition ? { objectPosition: heroSections[expandedIndex].image.objectPosition } : undefined}
            />
          </div>
          <button
            type="button"
            className="image-expand-btn image-expand-prev"
            onClick={(e) => { e.stopPropagation(); goPrev() }}
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            type="button"
            className="image-expand-btn image-expand-next"
            onClick={(e) => { e.stopPropagation(); goNext() }}
            aria-label="Next image"
          >
            ›
          </button>
        </div>
      )}
    </div>
  )
}
