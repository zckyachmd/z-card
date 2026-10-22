import type { Metadata, Viewport } from 'next'
import { Geist } from 'next/font/google'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import SkipLink from '@/components/skip-link'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { AnalyticsConsent } from '@/components/analytics-consent'
import { JsonLd } from '@/components/editorial'
import { site } from '@/config/site'
import './globals.css'
const sans = Geist({ subsets: ['latin'], variable: '--font-interface', display: 'swap' })
export const viewport: Viewport = { width: 'device-width', initialScale: 1 }
export const metadata: Metadata = {
  metadataBase: new URL(site.website),
  title: { default: 'Zacky Achmad — Software Engineer', template: '%s | Zacky Achmad' },
  description:
    'Software engineer in Indonesia. Business applications, integrations, and practical software.',
  authors: [{ name: 'Zacky Achmad', url: `${site.website}/about` }],
  alternates: { types: { 'application/rss+xml': '/feed.xml' } },
  openGraph: {
    type: 'website',
    siteName: 'zacky.id',
    locale: 'en_US',
    images: ['/opengraph-image'],
  },
  twitter: { card: 'summary_large_image', images: ['/opengraph-image'] },
  robots: { index: true, follow: true },
  icons: { icon: '/favicon/favicon.ico', apple: '/favicon/apple-touch-icon.png' },
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={sans.variable}>
        <SkipLink />
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main id='main-content' tabIndex={-1}>
            {children}
          </main>
          <Footer />
          <AnalyticsConsent />
          <Toaster />
        </ThemeProvider>
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            '@id': `${site.website}/#website`,
            name: 'Zacky Achmad',
            url: site.website,
          }}
        />
      </body>
    </html>
  )
}
