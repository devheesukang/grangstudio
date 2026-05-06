'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const LINKS = [
  { href: '/admin/photography', label: 'Photography' },
  { href: '/admin/videos', label: 'Videos' },
  { href: '/admin/info', label: 'Info' },
  { href: '/admin/design', label: 'Design' },
]

export function AdminNav() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin')
  }

  return (
    <header className="border-b border-neutral-800 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <Link
          href="/admin/dashboard"
          className="text-white text-xs tracking-widest uppercase font-light hover:opacity-70 transition-opacity"
        >
          Studio Grang
        </Link>
        <nav className="flex gap-1">
          {LINKS.map(({ href, label }) => {
            const active = pathname === href || pathname.startsWith(href + '/')
            return (
              <Link
                key={href}
                href={href}
                className="px-3 py-1.5 text-xs tracking-widest uppercase transition-colors"
                style={{
                  background: active ? 'white' : 'transparent',
                  color: active ? 'black' : '#888',
                }}
              >
                {label}
              </Link>
            )
          })}
        </nav>
      </div>
      <button
        onClick={handleLogout}
        className="text-xs tracking-widest uppercase text-neutral-500 hover:text-white transition-colors"
      >
        Sign out
      </button>
    </header>
  )
}
