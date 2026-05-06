import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin — Studio Grang',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-neutral-950 antialiased">{children}</div>
}
