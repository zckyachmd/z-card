import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'

import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import SkipLink from '@/components/skip-link'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'

import './globals.css'
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
})

const umamiWebsiteId = process.env.UMAMI_WEBSITE_ID ?? process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID
const umamiBaseUrl = process.env.UMAMI_URL ?? process.env.NEXT_PUBLIC_UMAMI_URL
const umamiScriptPath =
  process.env.UMAMI_SCRIPT_PATH ?? process.env.NEXT_PUBLIC_UMAMI_SCRIPT_PATH ?? '/script.js'
const umamiDomains = process.env.UMAMI_DOMAINS ?? process.env.NEXT_PUBLIC_UMAMI_DOMAINS
const umamiAutoTrackDisabled =
  (process.env.UMAMI_AUTO_TRACK ?? process.env.NEXT_PUBLIC_UMAMI_AUTO_TRACK) === 'false'
const umamiScriptSrc = umamiBaseUrl
  ? `${umamiBaseUrl.replace(/\/$/, '')}${
      umamiScriptPath.startsWith('/') ? umamiScriptPath : `/${umamiScriptPath}`
    }`
  : null

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  title: 'Zacky Achmad — Full-Stack Web Developer',
  description:
    'Portfolio of Zacky Achmad, a back-end leaning full-stack web developer based in Cimahi, Indonesia. Clean, secure, and efficient systems.',
  metadataBase: new URL('https://zacky.id'),
  alternates: { canonical: '/' },
  keywords: [
    'Full-Stack Developer',
    'Web Developer',
    'Portfolio',
    'Indonesia',
    'Cimahi',
    'Backend Developer',
    'Frontend Developer',
    'Software Engineer',
  ],
  authors: [{ name: 'Zacky Achmad', url: 'https://zacky.id' }],
  creator: 'Zacky Achmad',
  publisher: 'Zacky Achmad',
  category: 'Portfolio',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Zacky Achmad — Full-Stack Web Developer',
    description: 'Clean, secure, and efficient systems. Based in Cimahi, Indonesia.',
    url: '/',
    siteName: 'zacky.id',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Zacky Achmad - Full-Stack Web Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zacky Achmad — Full-Stack Web Developer',
    description: 'Clean, secure, and efficient systems.',
    images: ['/opengraph-image'],
  },
  icons: {
    icon: [
      { url: '/favicon/favicon.ico' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    other: [
      {
        rel: 'android-chrome',
        url: '/favicon/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        rel: 'android-chrome',
        url: '/favicon/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      { rel: 'manifest', url: '/manifest.json' },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <SkipLink />
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main id='main-content'>{children}</main>
          <Footer />
        </ThemeProvider>
        <Toaster />
        {umamiWebsiteId && umamiScriptSrc ? (
          <Script
            src={umamiScriptSrc}
            data-website-id={umamiWebsiteId}
            data-domains={umamiDomains}
            data-auto-track={umamiAutoTrackDisabled ? 'false' : undefined}
            async
          />
        ) : null}
      </body>
    </html>
  )
}
