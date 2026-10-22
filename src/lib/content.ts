import fs from 'node:fs'
import path from 'node:path'
import { z } from 'zod'

const slugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
const dateSchema = z.iso.date()
export const articleSchema = z
  .object({
    slug: slugSchema,
    title: z.string().min(1),
    description: z.string().min(1).max(300),
    publishedAt: dateSchema,
    updatedAt: dateSchema.optional(),
    draft: z.boolean().default(true),
    category: z.string().min(1),
    tags: z.array(z.string().min(1)).default([]),
  })
  .refine(value => !value.updatedAt || value.updatedAt >= value.publishedAt, {
    message: 'updatedAt must not precede publishedAt',
  })
export type Article = z.infer<typeof articleSchema> & { body: string; readingMinutes: number }

export function readingMinutes(body: string) {
  return Math.max(1, Math.ceil(body.trim().split(/\s+/).filter(Boolean).length / 220))
}

export function isPublished(article: Pick<Article, 'draft' | 'publishedAt'>, now = new Date()) {
  return !article.draft && new Date(`${article.publishedAt}T00:00:00Z`) <= now
}

export function getArticles(): Article[] {
  const directory =
    process.env.CONTENT_DIRECTORY === 'tests/fixtures/articles'
      ? path.join(process.cwd(), 'tests/fixtures/articles')
      : path.join(process.cwd(), 'content/articles')
  return fs
    .readdirSync(directory)
    .filter(file => file.endsWith('.json'))
    .map(file => {
      const metadata = articleSchema.parse(
        JSON.parse(fs.readFileSync(path.join(directory, file), 'utf8')),
      )
      if (file !== `${metadata.slug}.json`)
        throw new Error(`Article filename must match slug: ${file}`)
      const body = fs.readFileSync(path.join(directory, `${metadata.slug}.md`), 'utf8')
      return { ...metadata, body, readingMinutes: readingMinutes(body) }
    })
    .filter(article => isPublished(article))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
}

export function getArticle(slug: string) {
  return slugSchema.safeParse(slug).success
    ? getArticles().find(article => article.slug === slug)
    : undefined
}

export function relatedArticles(article: Article) {
  return getArticles()
    .filter(other => other.slug !== article.slug)
    .map(other => ({
      article: other,
      score:
        other.tags.filter(tag => article.tags.includes(tag)).length +
        Number(other.category === article.category),
    }))
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(item => item.article)
}

export function escapeXml(value: string) {
  return value.replace(
    /[<>&"']/g,
    character =>
      ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[character]!,
  )
}
