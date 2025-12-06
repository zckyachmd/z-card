'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Home, RefreshCw } from 'lucide-react'

import Section from '@/components/section'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Application error:', error)
    }
  }, [error])

  return (
    <Section id='error' full>
      <div className='flex flex-col items-center justify-center gap-6 text-center'>
        <div className='space-y-4'>
          <h1 className='text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl'>
            Something went wrong
          </h1>
          <p className='text-muted-foreground max-w-2xl text-base sm:text-lg'>
            We encountered an unexpected error. Don&apos;t worry, we&apos;re on it!
          </p>
          {error.digest && (
            <p className='text-muted-foreground text-sm'>
              Error ID: <code className='bg-muted rounded px-2 py-1 text-xs'>{error.digest}</code>
            </p>
          )}
        </div>

        <div className='flex flex-wrap items-center justify-center gap-3'>
          <Button onClick={reset} variant='default'>
            <RefreshCw className='mr-2 size-4' />
            Try again
          </Button>
          <Button asChild variant='outline'>
            <Link href='/'>
              <Home className='mr-2 size-4' />
              Go home
            </Link>
          </Button>
        </div>
      </div>
    </Section>
  )
}
