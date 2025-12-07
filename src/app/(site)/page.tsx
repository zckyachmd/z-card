import { Suspense } from 'react'
import nextDynamic from 'next/dynamic'

import Section from '@/components/section'
import AboutSkeleton from '@/components/skeletons/about-skeleton'
import ContactSkeleton from '@/components/skeletons/contact-skeleton'
import HeroSkeleton from '@/components/skeletons/hero-skeleton'
import ProjectsSkeleton from '@/components/skeletons/projects-skeleton'

// Lazy load all sections with skeleton loading states
// All sections are lazy loaded to show skeleton during initial load
const Hero = nextDynamic(() => import('@/app/(site)/_components/hero'), {
  loading: () => (
    <Section id='home' full>
      <HeroSkeleton />
    </Section>
  ),
})

const About = nextDynamic(() => import('@/app/(site)/_components/about'), {
  loading: () => (
    <Section id='about'>
      <AboutSkeleton />
    </Section>
  ),
})

const Projects = nextDynamic(() => import('@/app/(site)/_components/projects'), {
  loading: () => (
    <Section id='projects'>
      <ProjectsSkeleton />
    </Section>
  ),
})

const Contact = nextDynamic(() => import('@/app/(site)/_components/contact'), {
  loading: () => (
    <Section id='contact'>
      <ContactSkeleton />
    </Section>
  ),
})

export const dynamic = 'force-dynamic'
export const runtime = 'bun'

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
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Cimahi',
              addressCountry: 'ID',
            },
            email: 'hi@zacky.id',
            image: 'https://zacky.id/opengraph-image',
            sameAs: [
              'https://github.com/zckyachmd',
              'https://linkedin.com/in/zckyachmd',
              'https://instagram.com/zckyachmd',
            ],
            worksFor: {
              '@type': 'Organization',
              name: 'PT Astra Graphia Information Technology (AGIT)',
              jobTitle: 'Back-End Developer',
            },
            alumniOf: {
              '@type': 'EducationalOrganization',
              name: 'Universitas Telkom',
              description: 'B.A.Sc — Teknologi Rekayasa Multimedia',
            },
          }),
        }}
      />
      <div className='lg:snap-y lg:snap-mandatory'>
        <Suspense
          fallback={
            <Section id='home' full>
              <HeroSkeleton />
            </Section>
          }
        >
          <Hero />
        </Suspense>
        <Suspense
          fallback={
            <Section id='about'>
              <AboutSkeleton />
            </Section>
          }
        >
          <About />
        </Suspense>
        <Suspense
          fallback={
            <Section id='projects'>
              <ProjectsSkeleton />
            </Section>
          }
        >
          <Projects />
        </Suspense>
        <Suspense
          fallback={
            <Section id='contact'>
              <ContactSkeleton />
            </Section>
          }
        >
          <Contact />
        </Suspense>
      </div>
    </>
  )
}
