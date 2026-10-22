import type { Metadata } from 'next'
import { site } from '@/config/site'

export function pageMetadata(title: string, description: string, pathname: string): Metadata {
  return {
    title: pathname === '/' ? { absolute: title } : title,
    description,
    alternates: { canonical: pathname },
    openGraph: {
      title,
      description,
      url: pathname,
      type: 'website',
      siteName: 'zacky.id',
      images: ['/opengraph-image'],
    },
    twitter: { card: 'summary_large_image', title, description, images: ['/opengraph-image'] },
  }
}

export function breadcrumbData(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${site.website}${item.path}`,
    })),
  }
}
