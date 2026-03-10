/**
 * Responsive image helper using vite-imagetools
 * Images in src/assets/images/ generate: 320, 640, 1024, 1600, 2000px
 *
 * Usage:
 * import { getResponsiveImage } from '@/utils/responsiveImage'
 * const { src, srcSet, sizes } = getResponsiveImage(import.meta.glob('@/assets/images/work/*.{jpg,jpeg,png,webp}'))
 *
 * Or for single image import:
 * import img from './image.jpg?w=320;640;1024;1600;2000&format=webp'
 * // img will have srcSet if multiple widths
 */

const WIDTHS = [320, 640, 1024, 1600, 2000]

/**
 * Generate vite-imagetools query string for responsive sizes
 * Use when importing: import img from './photo.jpg' + getResponsiveQuery()
 */
export function getResponsiveQuery(format = 'webp') {
  const widths = WIDTHS.join(';')
  return `?w=${widths}&format=${format}`
}

/**
 * Default sizes attribute for responsive images
 * Editorial layout: max 1200px centered images
 */
export const DEFAULT_SIZES = '(max-width: 1280px) 100vw, 1200px'

/**
 * Get srcSet from vite-imagetools image import
 * When using: import img from './x.jpg?w=320;640;1024;1600;2000'
 * img may be { src, srcSet } or string
 */
export function parseImageImport(img) {
  if (typeof img === 'string') {
    return { src: img, srcSet: undefined }
  }
  if (img?.srcSet) {
    return { src: img.src, srcSet: img.srcSet }
  }
  return { src: img?.src || img, srcSet: img?.srcSet }
}

export { WIDTHS }
export default getResponsiveQuery
