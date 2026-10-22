// @vitest-environment node
import { describe, expect, it } from 'vitest'
import {
  articleSchema,
  escapeXml,
  getArticle,
  getArticles,
  isPublished,
  readingMinutes,
} from '@/lib/content'
import sitemap from '@/app/sitemap'
import { GET } from '@/app/feed.xml/route'
describe('publishing boundaries', () => {
  const metadata = {
    slug: 'real-work',
    title: 'Real work',
    description: 'A real description',
    publishedAt: '2026-01-01',
    category: 'Engineering',
    tags: ['testing'],
  }
  it('defaults to draft and rejects unsafe slugs and invalid dates', () => {
    expect(articleSchema.parse(metadata).draft).toBe(true)
    expect(articleSchema.safeParse({ ...metadata, slug: '../secret' }).success).toBe(false)
    expect(articleSchema.safeParse({ ...metadata, publishedAt: '2026-02-31' }).success).toBe(false)
    expect(articleSchema.safeParse({ ...metadata, updatedAt: '2025-01-01' }).success).toBe(false)
  })
  it('excludes drafts and future publications', () => {
    expect(isPublished({ draft: true, publishedAt: '2020-01-01' })).toBe(false)
    expect(isPublished({ draft: false, publishedAt: '2099-01-01' })).toBe(false)
    expect(isPublished({ draft: false, publishedAt: '2020-01-01' })).toBe(true)
    expect(getArticle('publishing-template')).toBeUndefined()
    expect(getArticle('../package')).toBeUndefined()
    expect(getArticles()).toEqual([])
  })
  it('calculates reading time and encodes feeds', async () => {
    expect(readingMinutes('word '.repeat(441))).toBe(3)
    expect(readingMinutes('')).toBe(1)
    expect(escapeXml('<script>&"')).toBe('&lt;script&gt;&amp;&quot;')
    const response = GET()
    expect(response.headers.get('content-type')).toContain('application/rss+xml')
    expect(await response.text()).not.toContain('<item>')
  })
  it('includes primary routes and projects, excludes drafts', () => {
    const urls = sitemap().map(item => item.url)
    expect(urls).toContain('https://zacky.id/about')
    expect(urls).toContain('https://zacky.id/projects/plantarium')
    expect(urls.some(url => url.includes('publishing-template'))).toBe(false)
  })
})
