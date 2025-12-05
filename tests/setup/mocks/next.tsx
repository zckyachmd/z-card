/**
 * Next.js mocks untuk Vitest
 *
 * Mocks common Next.js modules yang tidak available di test environment
 */

import { vi } from 'vitest'
import React from 'react'

// Mock next/image
vi.mock('next/image', () => ({
  default: (props: {
    src: string
    alt: string
    width?: number
    height?: number
    [key: string]: unknown
  }) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return React.createElement('img', {
      src: props.src,
      alt: props.alt,
      width: props.width,
      height: props.height,
    })
  },
}))

// Mock next/link
vi.mock('next/link', () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode
    href: string
    [key: string]: unknown
  }) => {
    return React.createElement('a', { href, ...props }, children)
  },
}))

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
  useParams: () => ({}),
}))

// Mock CSS imports
vi.mock('*.css', () => ({}))
vi.mock('*.scss', () => ({}))
vi.mock('*.module.css', () => ({}))
vi.mock('*.module.scss', () => ({}))

// Mock static assets (images, fonts, etc.)
vi.mock('*.svg', () => ({
  default: 'svg-mock',
}))
vi.mock('*.png', () => ({
  default: 'png-mock',
}))
vi.mock('*.jpg', () => ({
  default: 'jpg-mock',
}))
vi.mock('*.jpeg', () => ({
  default: 'jpeg-mock',
}))
vi.mock('*.gif', () => ({
  default: 'gif-mock',
}))
vi.mock('*.webp', () => ({
  default: 'webp-mock',
}))
