import ContactWrapper from '@/app/(site)/_components/contact-wrapper'
import { PageIntro, PageShell } from '@/components/editorial'
import { site } from '@/config/site'
import { SaveContact } from '@/components/save-contact'
import { pageMetadata } from '@/lib/metadata'
export const metadata = pageMetadata(
  'Contact',
  'Contact Zacky Achmad about engineering roles, software projects, and collaboration.',
  '/contact',
)
export const dynamic = 'force-dynamic'
export default function ContactPage() {
  return (
    <PageShell trail={[{ name: 'Contact', path: '/contact' }]}>
      <PageIntro
        title='Let’s make something useful.'
        description='For engineering opportunities, project conversations, or a thoughtful technical exchange. Tell me what you’re working on.'
      />
      <div className='contact-layout'>
        <aside>
          <h2>A direct line.</h2>
          <a className='contact-email' href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <p>
            Based in Indonesia.
            <br />
            Working with people, wherever they are.
          </p>
          <a href={site.socials.linkedin}>Connect on LinkedIn</a>
          <div>
            <SaveContact />
          </div>
        </aside>
        <ContactWrapper />
      </div>
    </PageShell>
  )
}
