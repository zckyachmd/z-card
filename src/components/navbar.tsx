'use client'

import Link from 'next/link'

import { site } from '@/config/site'

export default function Navbar() {
  return (
    <>
      <header className='bg-background/80 sticky top-0 z-40 w-full border-b backdrop-blur'>
        <div className='mx-auto flex h-14 max-w-5xl items-center justify-between px-4'>
          <Link href='/' className='font-medium'>
            {`${site.name.first} ${site.name.last}`}
          </Link>

          <nav className='flex items-center gap-3'>
            <Link href='#about' className='text-muted-foreground hover:text-foreground text-sm'>
              About
            </Link>
            <Link href='#projects' className='text-muted-foreground hover:text-foreground text-sm'>
              Projects
            </Link>
            <Link href='#contact' className='text-muted-foreground hover:text-foreground text-sm'>
              Contact
            </Link>
          </nav>
        </div>
      </header>
    </>
  )
}
