import About from './_components/about'
import Contact from './_components/contact'
import Hero from './_components/hero'
import Projects from './_components/projects'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default function HomePage() {
  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Zacky Achmad',
            url: 'https://zacky.id',
            jobTitle: 'Full-Stack Web Developer',
            address: { '@type': 'PostalAddress', addressLocality: 'Cimahi', addressCountry: 'ID' },
            email: 'hi@zacky.id',
          }),
        }}
      />
      <main className='lg:snap-y lg:snap-mandatory'>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
    </>
  )
}
