import { ContactInvitation, PageIntro, PageShell } from '@/components/editorial'
import { pageMetadata } from '@/lib/metadata'
export const metadata = pageMetadata(
  'About',
  'The background and engineering approach of Bagaskara Achmad Zaky, a software engineer based in Indonesia.',
  '/about',
)
const experience = [
  [
    '2023',
    'PT Astra Graphia Information Technology',
    'Back-End Developer',
    'Internal tooling, SMTP reporting, Laravel data processing, automation, and Grafana dashboards.',
  ],
  [
    '2024',
    'Volantis Technology',
    'Back-End Developer / Lead Engineer',
    'Laravel and PostgreSQL applications, code review, testing, and delivery workflows.',
  ],
  [
    '2023',
    'Sobatdev Anagata Solusi Teknologi',
    'Founder / Software Engineer',
    'End-to-end client projects, back-end development, and delivery coordination.',
  ],
  [
    '2022–2023',
    'Telkom University & Bandung Techno Park',
    'Full-Stack Web Developer',
    'HR and recruitment applications, academic systems, and deployment automation.',
  ],
] as const
export default function AboutPage() {
  return (
    <PageShell trail={[{ name: 'About', path: '/about' }]}>
      <PageIntro
        title='An engineer, with the whole system in mind.'
        description='I’m Bagaskara Achmad Zaky. Most people call me Zacky. I’m a software engineer and web developer based in Indonesia.'
      />
      <section className='split-section'>
        <h2>
          From the interface
          <br />
          to the infrastructure.
        </h2>
        <div className='prose'>
          <p>
            My background spans multimedia, Arduino and C++, web development, and back-end systems.
            Over five years of hands-on work have shaped a practical approach: understand the
            workflow, make the boundaries clear, and build something people can depend on.
          </p>
          <p>
            I work with Laravel, Node.js, TypeScript, relational databases, and Linux. APIs,
            internal applications, integrations, and automation are where I spend much of my time.
            Self-hosting keeps me close to what happens after code is shipped.
          </p>
          <p>
            I value explicit data models, useful documentation, reviewable changes, and delivery
            practices that a small team can sustain.
          </p>
        </div>
      </section>
      <section className='editorial-section'>
        <div className='section-heading'>
          <h2>Experience</h2>
          <p>Selected roles from my professional background.</p>
        </div>
        <div className='timeline'>
          {experience.map(([date, company, role, description]) => (
            <article key={company}>
              <p className='meta-line'>{date}</p>
              <div>
                <h3>{company}</h3>
                <p className='role'>{role}</p>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className='split-section'>
        <h2>Education & practice</h2>
        <div className='prose'>
          <h3>Telkom University</h3>
          <p>Bachelor of Applied Science, Teknologi Rekayasa Multimedia, 2018–2022.</p>
          <h3>Bearmentor</h3>
          <p>Full-stack web development bootcamp, 2024.</p>
          <p>
            Outside project work, I explore self-hosted tools, homelab infrastructure, and small
            utilities that remove repetitive work.
          </p>
        </div>
      </section>
      <ContactInvitation />
    </PageShell>
  )
}
