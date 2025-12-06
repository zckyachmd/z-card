'use client'

import Link from 'next/link'

import { site } from '@/config/site'

export default function Navbar() {
  return (
    <>
      <header className='bg-background/80 sticky top-0 z-40 w-full border-b backdrop-blur'>
        <div className='mx-auto flex h-14 max-w-5xl items-center justify-between px-4'>
          <Link href='/' className='font-medium' aria-label='Go to homepage'>
            {`${site.name.first} ${site.name.last}`}
          </Link>

          <nav aria-label='Main navigation' className='flex items-center gap-3'>
            <Link
              href='#about'
              className='text-muted-foreground hover:text-foreground text-sm'
              aria-label='Navigate to about section'
            >
              About
            </Link>
            <Link
              href='#projects'
              className='text-muted-foreground hover:text-foreground text-sm'
              aria-label='Navigate to projects section'
            >
              Projects
            </Link>
            <Link
              href='#contact'
              className='text-muted-foreground hover:text-foreground text-sm'
              aria-label='Navigate to contact section'
            >
              Contact
            </Link>
          </nav>
        </div>
      </header>
    </>
  )
}
