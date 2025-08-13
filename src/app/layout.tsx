import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { ThemeProvider } from '@/components/theme-provider'

import './globals.css'
const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })

export const metadata: Metadata = {
  title: 'Zacky Achmad — Full-Stack Web Developer',
  description:
    'Portfolio of Zacky Achmad, a back-end leaning full-stack web developer based in Cimahi, Indonesia. Clean, secure, and efficient systems.',
  metadataBase: new URL('https://zacky.id'),
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Zacky Achmad — Full-Stack Web Developer',
    description: 'Clean, secure, and efficient systems. Based in Cimahi, Indonesia.',
    url: '/',
    siteName: 'zacky.id',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zacky Achmad — Full-Stack Web Developer',
    description: 'Clean, secure, and efficient systems.',
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
      { rel: 'manifest', url: '/favicon/site.webmanifest' },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
