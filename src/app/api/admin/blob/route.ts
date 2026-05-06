import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminSession } from '@/lib/adminAuth'
import { getUploadedBlobPathname } from '@/lib/blobPath'

export async function DELETE(request: NextRequest) {
  if (!(await verifyAdminSession(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: 'BLOB_READ_WRITE_TOKEN is not configured.' },
      { status: 503 }
    )
  }

  const { src } = await request.json()
  if (typeof src !== 'string') {
    return NextResponse.json({ error: 'Image src is required.' }, { status: 400 })
  }

  const pathname = getUploadedBlobPathname(src)
  if (!pathname) {
    return NextResponse.json({ ok: true, skipped: true })
  }

  const { del } = await import('@vercel/blob')
  await del(pathname)

  return NextResponse.json({ ok: true, deleted: pathname })
}
