import type { MetadataRoute } from 'next'

import { site } from '@/config/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return [
    {
      url: site.website,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: {
          en: site.website,
        },
      },
    },
  ]
}
