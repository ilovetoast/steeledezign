/**
 * Gallery from src/assets/images/<CategoryName>/
 * Skips: cover/, production/ (and Commercial/ — screen recordings only)
 * Omits paths listed in src/data/galleryExcluded.json (low resolution)
 * WebP responsive srcset; lazy-load in Hero for below-fold images
 */
import { IMAGE_FOCAL_POINTS, IMAGE_FOCAL_BY_IMAGETOOLS_ID } from '../data/imageFocalPoints'
import galleryExcluded from '../data/galleryExcluded.json'

const SKIP_TOP_LEVEL = new Set(['cover', 'production', 'Commercial'])

/** Display order for known folders; others sort after */
export const GALLERY_CATEGORY_ORDER = ['Beauty', 'SPFX', 'Stills', 'Wedding']

const excludedSet = new Set(galleryExcluded.omitted.map((p) => p.replace(/\\/g, '/')))

// HEIC not supported by Vite imagetools pipeline — convert to JPG for web if needed
// Negated patterns: corrupt/unreadable files (still listed in galleryExcluded.json)
const imageModules = import.meta.glob(
  '../assets/images/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP,tif,tiff,TIF}',
  {
    eager: true,
    query: { w: '480;960;1280;1600;2000;2400', format: 'webp' },
    import: 'default',
  }
)

const coverModules = import.meta.glob(
  '../assets/images/cover/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG}',
  {
    eager: true,
    query: { w: '640;1024;1600;2000;2400', format: 'webp' },
    import: 'default',
  }
)

/**
 * Top-level category folder under images/ (handles nested subfolders)
 */
function getCategoryFromPath(path) {
  const normalized = path.replace(/\\/g, '/')
  const m = normalized.match(/images\/([^/]+)\//)
  return m ? m[1] : 'uncategorized'
}

function relativeFromImages(path) {
  const normalized = path.replace(/\\/g, '/')
  const idx = normalized.indexOf('images/')
  if (idx === -1) return ''
  return normalized.slice(idx + 'images/'.length)
}

function slugToTitle(slug) {
  return slug
    .split(/[-_]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

function focalFromImagetoolsSrc(src, srcSet) {
  const haystack = [src, srcSet].filter(Boolean).join(' ')
  const m = haystack.match(/@imagetools\/([a-f0-9]{40})\b/i)
  return m ? IMAGE_FOCAL_BY_IMAGETOOLS_ID[m[1]] : undefined
}

function parseModule(module) {
  let src = ''
  let srcSet = undefined
  const value = module?.default ?? module
  const widths = [480, 960, 1280, 1600, 2000, 2400]
  if (typeof value === 'string') {
    src = value
  } else if (Array.isArray(value) && value.length > 0) {
    src = value[value.length - 1] || value[0]
    srcSet = value.map((u, i) => `${u} ${widths[i] || widths[widths.length - 1]}w`).join(', ')
  } else if (value?.src) {
    src = value.src
    srcSet = value.srcSet
  }
  return { src, srcSet }
}

export function buildGalleryData() {
  const byCategory = {}

  for (const [path, module] of Object.entries(imageModules)) {
    const category = getCategoryFromPath(path)
    if (SKIP_TOP_LEVEL.has(category)) continue

    const rel = relativeFromImages(path)
    if (excludedSet.has(rel)) continue

    const filename = path.split('/').pop()?.replace(/\.[^.]+$/, '') || 'image'
    const { src, srcSet } = parseModule(module)
    if (!src) continue

    if (!byCategory[category]) {
      byCategory[category] = []
    }

    const focalKey = `${category}/${filename}`
    const objectPosition =
      focalFromImagetoolsSrc(src, srcSet) ??
      IMAGE_FOCAL_POINTS[focalKey] ??
      IMAGE_FOCAL_POINTS[filename] ??
      'center'
    byCategory[category].push({
      src,
      srcSet,
      alt: `${category} — professional makeup portfolio`,
      filename,
      objectPosition,
    })
  }

  for (const images of Object.values(byCategory)) {
    images.sort((a, b) => a.filename.localeCompare(b.filename, undefined, { numeric: true }))
  }

  const order = (a, b) => {
    const ia = GALLERY_CATEGORY_ORDER.indexOf(a)
    const ib = GALLERY_CATEGORY_ORDER.indexOf(b)
    if (ia === -1 && ib === -1) return a.localeCompare(b)
    if (ia === -1) return 1
    if (ib === -1) return -1
    return ia - ib
  }

  return Object.entries(byCategory)
    .filter(([, imgs]) => imgs.length > 0)
    .sort(([a], [b]) => order(a, b))
    .map(([slug, images]) => ({
      title: slug,
      slug: slug.toLowerCase().replace(/\s+/g, '-'),
      images: images.map(({ src, srcSet, alt, objectPosition }) => ({
        src,
        srcSet,
        alt,
        objectPosition,
      })),
    }))
}

export function getHeroCategoryOrder() {
  return buildGalleryData().map((c) => c.slug)
}

export function getCoverImage() {
  const entries = Object.entries(coverModules)
  if (entries.length === 0) return null
  const [, module] = entries.sort(([a], [b]) => a.localeCompare(b))[0]
  const value = module?.default ?? module
  let src = ''
  let srcSet = undefined
  const widths = [640, 1024, 1600, 2000, 2400]
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
