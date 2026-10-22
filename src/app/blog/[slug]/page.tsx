import Link from 'next/link'
import { notFound } from 'next/navigation'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import { visit } from 'unist-util-visit'
import GithubSlugger from 'github-slugger'
import { toString } from 'mdast-util-to-string'
import { ArticleContent } from '@/components/article-content'
import { JsonLd, PageIntro, PageShell } from '@/components/editorial'
import { site } from '@/config/site'
import { getArticle, getArticles, relatedArticles } from '@/lib/content'
import { pageMetadata } from '@/lib/metadata'
export function generateStaticParams() {
  return getArticles().map(({ slug }) => ({ slug }))
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const article = getArticle((await params).slug)
  if (!article) return { title: 'Article not found', robots: { index: false } }
  return {
    ...pageMetadata(article.title, article.description, `/blog/${article.slug}`),
    openGraph: {
      type: 'article' as const,
      title: article.title,
      description: article.description,
      url: `/blog/${article.slug}`,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt ?? article.publishedAt,
      authors: [`${site.website}/about`],
      tags: article.tags,
      images: ['/opengraph-image'],
    },
  }
}
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const article = getArticle((await params).slug)
  if (!article) notFound()
  const slugger = new GithubSlugger()
  const headings: { title: string; id: string; depth: number }[] = []
  visit(unified().use(remarkParse).parse(article.body), 'heading', node => {
    const title = toString(node)
    const id = slugger.slug(title)
    if (node.depth === 2 || node.depth === 3) headings.push({ title, id, depth: node.depth })
  })
  const related = relatedArticles(article)
  return (
    <PageShell
      trail={[
        { name: 'Journal', path: '/blog' },
        { name: article.title, path: `/blog/${article.slug}` },
      ]}
    >
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: article.title,
          description: article.description,
          datePublished: article.publishedAt,
          dateModified: article.updatedAt ?? article.publishedAt,
          author: { '@type': 'Person', name: 'Zacky Achmad', url: `${site.website}/about` },
          mainEntityOfPage: `${site.website}/blog/${article.slug}`,
          image: `${site.website}/opengraph-image`,
          keywords: article.tags,
          articleSection: article.category,
        }}
      />
      <article>
        <PageIntro title={article.title} description={article.description} />
        <p className='meta-line'>
          Zacky Achmad · <time dateTime={article.publishedAt}>{article.publishedAt}</time> ·{' '}
          {article.readingMinutes} min read
          {article.updatedAt && (
            <>
              {' '}
              · Updated <time dateTime={article.updatedAt}>{article.updatedAt}</time>
            </>
          )}
        </p>
        <p className='meta-line'>
          {article.category} / {article.tags.join(' / ')}
        </p>
        <div className='article-layout'>
          <ArticleContent body={article.body} />
          {headings.length > 0 && (
            <nav className='article-toc' aria-label='Table of contents'>
              <h2>On this page</h2>
              <ol>
                {headings.map(heading => (
                  <li key={heading.id} style={{ paddingLeft: heading.depth === 3 ? 12 : 0 }}>
                    <a href={`#${heading.id}`}>{heading.title}</a>
                  </li>
                ))}
              </ol>
            </nav>
          )}
        </div>
      </article>
      {related.length > 0 && (
        <section className='editorial-section'>
          <h2>Keep reading</h2>
          {related.map(other => (
            <p key={other.slug}>
              <Link className='text-link' href={`/blog/${other.slug}`}>
                {other.title}
              </Link>
            </p>
          ))}
        </section>
      )}
      <Link className='text-link' href='/blog'>
        Back to the journal
      </Link>
    </PageShell>
  )
}
