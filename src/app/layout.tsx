import type { Metadata } from 'next'
import {
  Inter,
  Cormorant_Garamond,
  Bebas_Neue,
  DM_Sans,
  Syne,
} from 'next/font/google'
import { getEffectiveConfig } from '@/lib/adminContent'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})
const bebas = Bebas_Neue({ subsets: ['latin'], weight: '400', variable: '--font-bebas', display: 'swap' })
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans', display: 'swap' })
const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Studio Grang',
  description: 'Photography & Video Direction by Kang Bosun',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const config = await getEffectiveConfig()
  const variant = config.activeVariant ?? 'v1'

  return (
    <html
      lang="en"
      data-design={variant}
      suppressHydrationWarning
      className={[
        inter.variable,
        cormorant.variable,
        bebas.variable,
        dmSans.variable,
        syne.variable,
      ].join(' ')}
    >
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  )
}
