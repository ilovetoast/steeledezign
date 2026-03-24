/**
 * Maps vite-imagetools @imagetools/<sha1> IDs to gallery relative paths.
 * Uses the same hash + resolveConfigs logic as vite-imagetools for gallery imports.
 */
import { createHash } from 'node:crypto'
import { readdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { extractEntries, resolveConfigs, builtinOutputFormats } from 'imagetools-core'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const imagesRoot = path.join(__dirname, '../src/assets/images')
const SKIP = new Set(['cover', 'production', 'Commercial'])
const EXTS = /\.(jpe?g|png|webp|tiff?)$/i

function hash(keyParts) {
  const h = createHash('sha1')
  for (const keyPart of keyParts) {
    h.update(keyPart)
  }
  return h.digest('hex')
}

function generateImageID(config, imageHash) {
  return hash([JSON.stringify(config), imageHash])
}

function clampW(wParam, intrinsicWidth) {
  return [...new Set(wParam.split(';').map((d) => (parseInt(d, 10) <= intrinsicWidth ? d : intrinsicWidth.toString())))].join(';')
}

async function walk(dir, relBase = '') {
  const out = []
  const entries = await readdir(dir, { withFileTypes: true })
  for (const e of entries) {
    const rel = path.join(relBase, e.name)
    const full = path.join(dir, e.name)
    if (e.isDirectory()) {
      if (SKIP.has(e.name) && relBase === '') continue
      out.push(...(await walk(full, rel)))
    } else if (EXTS.test(e.name)) {
      out.push({ full, rel: rel.replace(/\\/g, '/') })
    }
  }
  return out
}

async function lastSrcIdForFile(fullPath) {
  const img = sharp(fullPath)
  const buf = await img.toBuffer()
  const imageHash = hash([buf])
  const metadata = await sharp(buf).metadata()
  const intrinsicWidth = metadata.width || 0
  let w = clampW('480;960;1280;1600;2000;2400', intrinsicWidth)
  const params = new URLSearchParams({ w, format: 'webp' })
  const parameters = extractEntries(params)
  const imageConfigs = resolveConfigs(parameters, builtinOutputFormats)
  if (!imageConfigs.length) return null
  const lastConfig = imageConfigs[imageConfigs.length - 1]
  return generateImageID(lastConfig, imageHash)
}

const files = (await walk(imagesRoot)).filter((f) => !f.rel.startsWith('cover/') && !f.rel.startsWith('production/'))

const idToRel = {}
for (const { full, rel } of files) {
  try {
    const id = await lastSrcIdForFile(full)
    if (id) idToRel[id] = rel
  } catch {
    // skip unreadable
  }
}

console.log(JSON.stringify(idToRel, null, 2))
