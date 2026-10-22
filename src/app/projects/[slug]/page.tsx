import Link from 'next/link'
import { notFound } from 'next/navigation'
import { JsonLd, PageIntro, PageShell } from '@/components/editorial'
import { getProject, projects } from '@/config/projects'
import { site } from '@/config/site'
import { pageMetadata } from '@/lib/metadata'
export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }))
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug)
  return project
    ? pageMetadata(project.name, project.summary, `/projects/${project.slug}`)
    : { title: 'Project not found', robots: { index: false } }
}
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug)
  if (!project) notFound()
  return (
    <PageShell
      trail={[
        { name: 'Projects', path: '/projects' },
        { name: project.name, path: `/projects/${project.slug}` },
      ]}
    >
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareSourceCode',
          name: project.name,
          description: project.summary,
          codeRepository: project.repository,
          author: { '@id': `${site.website}/#person` },
          url: `${site.website}/projects/${project.slug}`,
          programmingLanguage: project.stack,
        }}
      />
      <PageIntro title={project.name} description={project.summary} />
      <div className='project-facts'>
        <div>
          <span>Project type</span>
          <p>{project.kind}</p>
        </div>
        <div>
          <span>Built with</span>
          <p>{project.stack.join(' · ')}</p>
        </div>
        <div>
          <span>Source</span>
          <p>
            {project.repository ? (
              <a data-track='project_source' href={project.repository}>
                Repository on GitHub
              </a>
            ) : (
              <span>Source not publicly available</span>
            )}
          </p>
          {project.live && (
            <a data-track='project_live' href={project.live}>
              Visit live project
            </a>
          )}
        </div>
      </div>
      <section className='split-section'>
        <h2>The context</h2>
        <p>{project.context}</p>
      </section>
      <section className='split-section'>
        <h2>The system</h2>
        <p>{project.architecture}</p>
      </section>
      <section className='split-section'>
        <h2>Engineering considerations</h2>
        <ul className='plain-list'>
          {project.considerations.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <div className='source-note'>
        <p>
          Overview based on the original portfolio and publicly available project documentation. No
          production scale or measured outcomes are claimed.
        </p>
      </div>
      <Link className='text-link' href='/projects'>
        Back to all projects
      </Link>
    </PageShell>
  )
}
