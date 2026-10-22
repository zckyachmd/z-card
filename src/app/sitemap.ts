import type { MetadataRoute } from 'next'
import { projects } from '@/config/projects'
import { site } from '@/config/site'
import { getArticles } from '@/lib/content'
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...['', '/about', '/projects', '/blog', '/contact', '/privacy'].map(route => ({
      url: `${site.website}${route}`,
    })),
    ...projects.map(project => ({ url: `${site.website}/projects/${project.slug}` })),
    ...getArticles().map(article => ({
      url: `${site.website}/blog/${article.slug}`,
      lastModified: article.updatedAt ?? article.publishedAt,
    })),
  ]
}
