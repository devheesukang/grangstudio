import { ThemeProvider } from 'next-themes'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
    </ThemeProvider>
  )
}
