/**
 * Build gallery data from src/assets/images/<category>/
 * Each folder under images/ = one category
 * Uses import.meta.glob for automatic discovery
 *
 * Structure: images/dramatic/1.jpg, images/editorial/2.jpg, etc.
 */

const imageModules = import.meta.glob(
  '../assets/images/**/*.{jpg,jpeg,png,webp}',
  {
    eager: true,
    query: { w: '320;640;1024;1600;2000', format: 'webp' },
    import: 'default',
  }
)

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

    byCategory[category].push({
      src,
      srcSet,
      alt: `${slugToTitle(category)} makeup look for fashion photoshoot`,
      filename,
    })
  }

  // Sort images within each category by filename (natural sort for 1.jpg, 2.jpg, 10.jpg)
  for (const images of Object.values(byCategory)) {
    images.sort((a, b) => a.filename.localeCompare(b.filename, undefined, { numeric: true }))
  }

  const MAX_IMAGES_PER_SECTION = 7

  return Object.entries(byCategory)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([slug, images]) => ({
      title: slugToTitle(slug),
      slug,
      images: images.slice(0, MAX_IMAGES_PER_SECTION).map(({ src, srcSet, alt }) => ({ src, srcSet, alt })),
    }))
}

export default buildGalleryData
