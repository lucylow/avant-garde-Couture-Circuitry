import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, DM_Sans, JetBrains_Mono } from 'next/font/google'
import { MobileNav, SiteHeader } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { MaisonProvider } from '@/lib/maison-store'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
})
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' })
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' })

const title = 'AVANT-GARDE COUTURE CIRCUITRY | Maison de Couture Électronique'
const description =
  'Discover AVANT-GARDE COUTURE CIRCUITRY, an experimental Parisian fashion house where haute couture, electrical engineering, wearable electronics, and creative technology come together.'

export const metadata: Metadata = {
  title,
  description,
  applicationName: 'AVANT-GARDE COUTURE CIRCUITRY',
  openGraph: { title, description, siteName: 'MAISON AVANT-GARDE', images: ['/images/salon-hero.png'] },
  generator: 'v0.app',
  icons: { icon: [{ url: '/icon.svg', type: 'image/svg+xml' }], apple: '/apple-icon.png' },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#651E36',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${dmSans.variable} ${jetbrains.variable} bg-background`}>
      <body className="font-sans antialiased">
        <MaisonProvider>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
          <MobileNav />
        </MaisonProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
