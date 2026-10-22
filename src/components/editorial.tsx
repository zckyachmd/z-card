import Link from 'next/link'
import type { ReactNode } from 'react'
import { projects } from '@/config/projects'
import { breadcrumbData } from '@/lib/metadata'

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}

export function PageIntro({ title, description }: { title: string; description: string }) {
  return (
    <header className='page-intro'>
      <h1>{title}</h1>
      <p>{description}</p>
    </header>
  )
}

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  const trail = [{ name: 'Home', path: '/' }, ...items]
  return (
    <>
      <nav aria-label='Breadcrumb' className='breadcrumbs'>
        <ol>
          {trail.map((item, index) => (
            <li key={item.path}>
              {index > 0 && <span aria-hidden='true'>/</span>}
              {index === trail.length - 1 ? (
                <span aria-current='page'>{item.name}</span>
              ) : (
                <Link href={item.path}>{item.name}</Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={breadcrumbData(trail)} />
    </>
  )
}

export function PageShell({
  children,
  trail,
}: {
  children: ReactNode
  trail: { name: string; path: string }[]
}) {
  return (
    <div className='site-container page-shell'>
      <Breadcrumbs items={trail} />
      {children}
    </div>
  )
}

export function ProjectList({ limit = projects.length }: { limit?: number }) {
  return (
    <div className='project-list'>
      {projects.slice(0, limit).map(project => (
        <article className='project-row' key={project.slug}>
          <div className='project-kind'>{project.kind}</div>
          <div>
            <h3>
              <Link href={`/projects/${project.slug}`}>{project.name}</Link>
            </h3>
            <p>{project.summary}</p>
            <p className='stack-line'>{project.stack.join(' · ')}</p>
          </div>
          <Link
            href={`/projects/${project.slug}`}
            className='project-read'
            aria-label={`Read about ${project.name}`}
          >
            Read project <span aria-hidden='true'>↗</span>
          </Link>
        </article>
      ))}
    </div>
  )
}

export function ContactInvitation() {
  return (
    <section className='contact-invitation'>
      <div>
        <h2>
          Good software starts
          <br />
          with a good conversation.
        </h2>
        <p>Have a system to build, a problem to untangle, or an idea to discuss?</p>
      </div>
      <Link className='solid-link' href='/contact'>
        Start a conversation
      </Link>
    </section>
  )
}
