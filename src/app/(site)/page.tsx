import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react'
import { ContactInvitation, JsonLd, ProjectList } from '@/components/editorial'
import { SaveContact } from '@/components/save-contact'
import { DeveloperPlayground } from '@/components/developer-playground'
import { site } from '@/config/site'
import { getArticles } from '@/lib/content'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata(
  'Zacky Achmad — Software Engineer',
  'Software engineer in Indonesia. Business applications, thoughtful APIs, practical automation, and reliable systems.',
  '/',
)
export default function HomePage() {
  const articles = getArticles().slice(0, 2)
  return (
    <div className='site-container portfolio-home'>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          '@id': `${site.website}/#person`,
          name: 'Bagaskara Achmad Zaky',
          alternateName: 'Zacky Achmad',
          url: site.website,
          image: `${site.website}/zacky-achmad.jpg`,
          jobTitle: 'Software Engineer',
          sameAs: Object.values(site.socials),
          address: { '@type': 'PostalAddress', addressCountry: 'ID' },
        }}
      />
      <section className='portfolio-hero' aria-labelledby='introduction'>
        <div className='portfolio-intro'>
          <h1 id='introduction'>
            Zacky Achmad.
            <br />
            <span>Software engineer.</span>
          </h1>
          <p className='portfolio-summary'>
            I build software for the real world. From business workflows and back-end APIs to the
            interfaces people use every day.
          </p>
          <div className='hero-actions'>
            <Link className='solid-link' href='/projects'>
              View my work <ArrowUpRight size={17} aria-hidden='true' />
            </Link>
            <Link className='outline-link' href='/contact'>
              Let’s talk <Mail size={16} aria-hidden='true' />
            </Link>
          </div>
          <div className='hero-socials'>
            <a href={site.socials.github}>
              <Github size={17} aria-hidden='true' />
              GitHub
            </a>
            <a href={site.socials.linkedin}>
              <Linkedin size={17} aria-hidden='true' />
              LinkedIn
            </a>
            <a href='https://www.self.so/zckyachmd'>
              View résumé <ArrowUpRight size={14} aria-hidden='true' />
            </a>
          </div>
        </div>
        <div className='profile-composition'>
          <figure className='profile-portrait'>
            <Image
              src='/zacky-achmad.jpg'
              alt='Zacky Achmad'
              fill
              preload
              fetchPriority='high'
              sizes='(max-width: 640px) 80vw, 400px'
            />
            <figcaption>
              <span>Zacky Achmad</span>
              <span>Software Engineer</span>
            </figcaption>
          </figure>
          <div className='profile-caption'>
            <span className='location-dot' aria-hidden='true' />
            <span>Based in Indonesia</span>
            <span className='profile-coordinate'>GMT +7</span>
          </div>
          <div className='mini-contact'>
            <div className='monogram' aria-hidden='true'>
              ZA.
            </div>
            <div>
              <strong>Bagaskara Achmad Zaky</strong>
              <p>Back end. Full stack. End to end.</p>
            </div>
            <SaveContact />
          </div>
        </div>
      </section>
      <div className='hero-bottom'>
        <p>Thoughtful engineering. Practical outcomes.</p>
        <a href='#selected-work'>
          Selected work <ArrowDown size={15} aria-hidden='true' />
        </a>
      </div>
      <section className='expertise-strip' aria-label='Core expertise'>
        <span>Laravel & PHP</span>
        <span>TypeScript & Node.js</span>
        <span>APIs & Integrations</span>
        <span>Docker & Linux</span>
      </section>
      <DeveloperPlayground />
      <section className='editorial-section portfolio-work' id='selected-work'>
        <div className='section-heading'>
          <div>
            <h2>Proof in the projects.</h2>
            <p>Applications, APIs, and tools built to be useful.</p>
          </div>
          <Link className='text-link' href='/projects'>
            All projects <ArrowUpRight size={16} aria-hidden='true' />
          </Link>
        </div>
        <ProjectList />
      </section>
      <section className='career-preview'>
        <div className='career-summary'>
          <h2>
            More than
            <br />
            the code.
          </h2>
          <p>
            Five years of hands-on experience connecting technical decisions with the way people
            actually work.
          </p>
          <Link className='text-link' href='/about'>
            My background & approach <ArrowUpRight size={16} aria-hidden='true' />
          </Link>
        </div>
        <div className='career-roles'>
          <article>
            <h3>Back-end systems & automation</h3>
            <span>Laravel · PostgreSQL · Integrations</span>
          </article>
          <article>
            <h3>Full-stack product development</h3>
            <span>TypeScript · React · API design</span>
          </article>
          <article>
            <h3>Delivery, operations & maintenance</h3>
            <span>Docker · Linux · CI/CD</span>
          </article>
        </div>
      </section>
      {articles.length > 0 && (
        <section className='editorial-section compact-writing'>
          <div className='section-heading'>
            <h2>From my desk</h2>
            <Link className='text-link' href='/blog'>
              All writing
            </Link>
          </div>
          {articles.map(article => (
            <article key={article.slug}>
              <h3>
                <Link href={`/blog/${article.slug}`}>{article.title}</Link>
              </h3>
              <p className='meta-line'>
                {article.category} · {article.readingMinutes} min read
              </p>
            </article>
          ))}
        </section>
      )}
      <ContactInvitation />
    </div>
  )
}
