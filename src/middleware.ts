import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const PROTECTED = ['/admin/dashboard', '/admin/photography', '/admin/videos', '/admin/info', '/admin/design']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isProtected = PROTECTED.some((p) => pathname === p || pathname.startsWith(p + '/'))
  if (!isProtected) return NextResponse.next()

  const token = request.cookies.get('admin_session')?.value
  if (!token) return redirectToLogin(request)

  try {
    const secret = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET)
    await jwtVerify(token, secret)
    return NextResponse.next()
  } catch {
    return redirectToLogin(request)
  }
}

function redirectToLogin(request: NextRequest) {
  const loginUrl = new URL('/admin', request.url)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ['/admin/dashboard', '/admin/photography', '/admin/videos', '/admin/info', '/admin/design'],
}
