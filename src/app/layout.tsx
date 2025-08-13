import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'

import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { ThemeProvider } from '@/components/theme-provider'

import './globals.css'
const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })

export const metadata: Metadata = {
  title: 'Zacky Achmad — Full-Stack Web Developer',
  description:
    'Portfolio of Zacky Achmad, a back‑end leaning full‑stack web developer based in Cimahi, Indonesia. Clean, secure, and efficient systems.',
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
  icons: { icon: '/favicon.ico' },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
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
