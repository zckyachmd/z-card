import Link from 'next/link'
import { PageIntro, PageShell } from '@/components/editorial'
import { getArticles } from '@/lib/content'
import { pageMetadata } from '@/lib/metadata'
export const metadata = pageMetadata(
  'Journal',
  'Technical writing from Zacky Achmad about software, systems, and the decisions behind them.',
  '/blog',
)
export default function BlogPage() {
  const articles = getArticles()
  return (
    <PageShell trail={[{ name: 'Journal', path: '/blog' }]}>
      <PageIntro
        title='The engineering journal.'
        description='Notes on building software, understanding systems, and making considered technical decisions.'
      />
      <div className='journal-toolbar'>
        <p>
          {articles.length} published {articles.length === 1 ? 'article' : 'articles'}
        </p>
        <Link className='text-link' href='/feed.xml'>
          Subscribe via RSS
        </Link>
      </div>
      {articles.length ? (
        <div className='article-list'>
          {articles.map(article => (
            <article key={article.slug}>
              <p className='meta-line'>
                <time dateTime={article.publishedAt}>{article.publishedAt}</time> ·{' '}
                {article.category} · {article.readingMinutes} min read
              </p>
              <h2>
                <Link href={`/blog/${article.slug}`}>{article.title}</Link>
              </h2>
              <p>{article.description}</p>
              <p className='meta-line'>{article.tags.join(' / ')}</p>
            </article>
          ))}
        </div>
      ) : (
        <section className='journal-empty'>
          <span className='notebook-rule' aria-hidden='true' />
          <h2>Nothing published. Yet.</h2>
          <p>
            This space is reserved for original writing, grounded in real work. No filler, no
            borrowed expertise. The first article will appear here when it’s ready.
          </p>
          <Link className='text-link' href='/projects'>
            See what I’m building
          </Link>
        </section>
      )}
    </PageShell>
  )
}
