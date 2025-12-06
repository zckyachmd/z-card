import Link from 'next/link'
import { Home, Mail } from 'lucide-react'

import Section from '@/components/section'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <Section id='not-found' full>
      <div className='flex flex-col items-center justify-center gap-6 text-center'>
        <div className='space-y-4'>
          <h1 className='text-6xl font-bold tracking-tight sm:text-7xl md:text-8xl'>404</h1>
          <h2 className='text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl'>
            Page not found
          </h2>
          <p className='text-muted-foreground max-w-2xl text-base sm:text-lg'>
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <div className='flex flex-wrap items-center justify-center gap-3'>
          <Button asChild variant='default'>
            <Link href='/'>
              <Home className='mr-2 size-4' />
              Go home
            </Link>
          </Button>
          <Button asChild variant='outline'>
            <Link href='/#contact'>
              <Mail className='mr-2 size-4' />
              Contact me
            </Link>
          </Button>
        </div>
      </div>
    </Section>
  )
}
