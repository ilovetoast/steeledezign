/**
 * Turn filename (no extension) into an editorial caption for Stills stills.
 */
export function formatStillsCaption(filename) {
  if (!filename) return ''
  return filename
    .replace(/ _ /g, ' — ')
    .replace(/_/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}
