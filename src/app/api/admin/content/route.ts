import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminSession } from '@/lib/adminAuth'
import { getEffectiveConfig, writeContentConfig } from '@/lib/adminContent'

export async function GET(request: NextRequest) {
  if (!(await verifyAdminSession(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const config = await getEffectiveConfig()
  return NextResponse.json(config)
}

export async function POST(request: NextRequest) {
  if (!(await verifyAdminSession(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: 'BLOB_READ_WRITE_TOKEN is not configured. Add it to your environment variables.' },
      { status: 503 }
    )
  }

  const config = await request.json()
  await writeContentConfig(config)
  return NextResponse.json({ ok: true })
}
