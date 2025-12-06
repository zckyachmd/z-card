import Section from '@/components/section'
import HeroSkeleton from '@/components/skeletons/hero-skeleton'

export default function Loading() {
  return (
    <main>
      <Section id='home' full>
        <HeroSkeleton />
      </Section>
    </main>
  )
}
