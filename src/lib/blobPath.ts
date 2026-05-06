export function getUploadedBlobPathname(src: string): string | null {
  let pathname = src

  try {
    pathname = new URL(src, 'http://localhost').pathname
  } catch {
    pathname = src
  }

  const prefix = '/api/blob/'
  if (!pathname.startsWith(prefix)) return null

  const blobPathname = decodeURIComponent(pathname.slice(prefix.length))
  return blobPathname.startsWith('uploads/') ? blobPathname : null
}
