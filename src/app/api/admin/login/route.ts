import { NextRequest, NextResponse } from 'next/server'
import { SignJWT } from 'jose'

const MAX_ATTEMPTS = 5
const LOCKOUT_MS = 10 * 60 * 1000

// In-memory rate limiting (resets on cold start — acceptable for single-user admin)
const attempts = new Map<string, { count: number; first: number }>()

function getClientIp(request: NextRequest): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown'
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request)
  const now = Date.now()

  const record = attempts.get(ip)
  if (record) {
    if (now - record.first < LOCKOUT_MS && record.count >= MAX_ATTEMPTS) {
      return NextResponse.json({ error: 'Too many attempts. Try again later.' }, { status: 429 })
    }
    if (now - record.first >= LOCKOUT_MS) {
      attempts.delete(ip)
    }
  }

  const { password } = await request.json()

  if (password !== process.env.ADMIN_PASSWORD) {
    const current = attempts.get(ip) ?? { count: 0, first: now }
    attempts.set(ip, { count: current.count + 1, first: current.first })
    return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 })
  }

  attempts.delete(ip)

  const secret = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET)
  const token = await new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret)

  const response = NextResponse.json({ ok: true })
  response.cookies.set('admin_session', token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24,
    secure: process.env.NODE_ENV === 'production',
  })
  return response
}
