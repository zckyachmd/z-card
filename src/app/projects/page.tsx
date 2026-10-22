import { ContactInvitation, PageIntro, PageShell, ProjectList } from '@/components/editorial'
import { pageMetadata } from '@/lib/metadata'
export const metadata = pageMetadata(
  'Projects',
  'Selected engineering projects: web applications, structured APIs, and practical developer tools.',
  '/projects',
)
export default function ProjectsPage() {
  return (
    <PageShell trail={[{ name: 'Projects', path: '/projects' }]}>
      <PageIntro
        title='Useful by design.'
        description='Selected projects across web applications, data, and developer tooling. Different surfaces, the same interest in clear systems and practical problems.'
      />
      <ProjectList />
      <ContactInvitation />
    </PageShell>
  )
}
