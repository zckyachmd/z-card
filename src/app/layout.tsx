import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'

import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import SkipLink from '@/components/skip-link'
import { ThemeProvider } from '@/components/theme-provider'

import './globals.css'
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
})

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
      </body>
    </html>
  )
}
