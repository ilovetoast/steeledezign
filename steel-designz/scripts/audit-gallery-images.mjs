/**
 * One-off audit: list images under src/assets/images (excluding cover, production)
 * Omit files with short side < MIN_SHORT or unreadable
 */
import sharp from 'sharp'
import { readdir } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '../src/assets/images')
const SKIP_DIRS = new Set(['cover', 'production'])
const MIN_SHORT = 900

const exts = /\.(jpe?g|png|webp|tiff?|heic)$/i

async function walk(dir, relBase = '') {
  const out = []
  const entries = await readdir(dir, { withFileTypes: true })
  for (const e of entries) {
    const rel = path.join(relBase, e.name)
    const full = path.join(dir, e.name)
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue
      out.push(...(await walk(full, rel)))
    } else if (exts.test(e.name)) {
      out.push({ full, rel: rel.replace(/\\/g, '/') })
    }
  }
  return out
}

const files = await walk(root)
const omitted = []
const ok = []

for (const { full, rel } of files) {
  try {
    const m = await sharp(full).metadata()
    const w = m.width || 0
    const h = m.height || 0
    const short = Math.min(w, h)
    if (short < MIN_SHORT) {
      omitted.push({ rel, w, h, reason: `short side ${short}px < ${MIN_SHORT}px` })
    } else {
      ok.push({ rel, w, h })
    }
  } catch (err) {
    omitted.push({ rel, reason: err.message })
  }
}

console.log(JSON.stringify({ ok: ok.length, omitted: omitted.length, omittedList: omitted, okList: ok }, null, 2))
