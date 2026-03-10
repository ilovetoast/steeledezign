/**
 * Build gallery data from src/assets/images/<category>/
 * Categories: dramatic, editorial, portfolio
 * Uses import.meta.glob for automatic discovery
 * Sizes: 320 (thumbnail), 640, 1024, 1600, 2000 (lightbox)
 * Includes object-position per image to keep faces visible (object-fit: cover)
 */
import { IMAGE_FOCAL_POINTS } from '../data/imageFocalPoints'

const imageModules = import.meta.glob(
  '../assets/images/**/*.{jpg,jpeg,png,webp}',
  {
    eager: true,
    query: { w: '320;640;1024;1600;2000', format: 'webp' },
    import: 'default',
  }
)

const coverModules = import.meta.glob(
  '../assets/images/cover/*.{jpg,jpeg,png,webp}',
  {
    eager: true,
    query: { w: '640;1024;1600;2000', format: 'webp' },
    import: 'default',
  }
)

const GALLERY_CATEGORIES = ['dramatic', 'editorial', 'portfolio']

/**
 * Extract category from path
 * e.g. '../assets/images/dramatic/1.jpg' -> 'dramatic'
 * e.g. '../assets/images/work/editorial/photo.png' -> 'editorial'
 */
function getCategoryFromPath(path) {
  const parts = path.split('/')
  // Category is the parent folder of the file
  return parts[parts.length - 2] || 'uncategorized'
}

/**
 * Format slug as title
 */
function slugToTitle(slug) {
  return slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ')
}

/**
 * Build gallery data structure
 */
export function buildGalleryData() {
  const byCategory = {}

  for (const [path, module] of Object.entries(imageModules)) {
    const category = getCategoryFromPath(path)
    if (!GALLERY_CATEGORIES.includes(category) || path.includes('/work/')) continue
    const filename = path.split('/').pop()?.replace(/\.[^.]+$/, '') || 'image'

    // Handle different module formats from vite-imagetools
    let src = ''
    let srcSet = undefined
    const value = module?.default ?? module
    if (typeof value === 'string') {
      src = value
    } else if (Array.isArray(value) && value.length > 0) {
      const widths = [320, 640, 1024, 1600, 2000]
      src = value[value.length - 1] || value[0]
      srcSet = value.map((u, i) => `${u} ${widths[i] || widths[widths.length - 1]}w`).join(', ')
    } else if (value?.src) {
      src = value.src
      srcSet = value.srcSet
    }

    if (!src) continue

    if (!byCategory[category]) {
      byCategory[category] = []
    }

    const objectPosition = IMAGE_FOCAL_POINTS[filename] ?? 'center'
    byCategory[category].push({
      src,
      srcSet,
      alt: `${slugToTitle(category)} makeup look for fashion photoshoot`,
      filename,
      objectPosition,
    })
  }

  // Sort images within each category by filename (natural sort for 1.jpg, 2.jpg, 10.jpg)
  for (const images of Object.values(byCategory)) {
    images.sort((a, b) => a.filename.localeCompare(b.filename, undefined, { numeric: true }))
  }

  return Object.entries(byCategory)
    .filter(([slug]) => GALLERY_CATEGORIES.includes(slug))
    .sort(([a], [b]) => GALLERY_CATEGORIES.indexOf(a) - GALLERY_CATEGORIES.indexOf(b))
    .map(([slug, images]) => ({
      title: slugToTitle(slug),
      slug,
      images: images.map(({ src, srcSet, alt, objectPosition }) => ({ src, srcSet, alt, objectPosition })),
    }))
}

/**
 * Get cover image for home page banner from src/assets/images/cover/
 * Returns first image with responsive sizes (640, 1024, 1600, 2000)
 */
export function getCoverImage() {
  const entries = Object.entries(coverModules)
  if (entries.length === 0) return null
  const [, module] = entries.sort(([a], [b]) => a.localeCompare(b))[0]
  const value = module?.default ?? module
  let src = ''
  let srcSet = undefined
  const widths = [640, 1024, 1600, 2000]
  if (typeof value === 'string') {
    src = value
  } else if (Array.isArray(value) && value.length > 0) {
    src = value[value.length - 1] || value[0]
    srcSet = value.map((u, i) => `${u} ${widths[i] || widths[widths.length - 1]}w`).join(', ')
  } else if (value?.src) {
    src = value.src
    srcSet = value.srcSet
  }
  return src ? { src, srcSet } : null
}

export default buildGalleryData
