import { site } from '@/config/site'
import { escapeXml, getArticles } from '@/lib/content'
export const dynamic = 'force-static'
export function GET() {
  const articles = getArticles()
  const items = articles
    .map(
      article =>
        `<item><title>${escapeXml(article.title)}</title><description>${escapeXml(article.description)}</description><link>${site.website}/blog/${article.slug}</link><guid isPermaLink="true">${site.website}/blog/${article.slug}</guid><pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>${article.tags.map(tag => `<category>${escapeXml(tag)}</category>`).join('')}</item>`,
    )
    .join('')
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>Zacky Achmad — Journal</title><link>${site.website}/blog</link><description>Notes on software and systems.</description><language>en</language><atom:link href="${site.website}/feed.xml" rel="self" type="application/rss+xml"/>${items}</channel></rss>`,
    { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } },
  )
}
