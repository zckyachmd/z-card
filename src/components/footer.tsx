'use client'

import Link from 'next/link'
import { Github, Instagram, Linkedin } from 'lucide-react'

import ThemeToggle from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { site } from '@/config/site'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <>
      <footer role='contentinfo' className='border-t'>
        <div className='mx-auto max-w-5xl px-6 py-10'>
          <div className='flex flex-col gap-6 md:flex-row md:items-center md:justify-between'>
            {/* Brand */}
            <div className='space-y-1'>
              <Link href='/' className='text-sm font-medium hover:underline'>
                {`${site.name.first} ${site.name.last}`}
              </Link>
              <p className='text-muted-foreground text-xs'>{site.jobTitle}</p>
            </div>

            {/* Socials */}
            <div className='flex items-center gap-3'>
              <Button asChild variant='outline' size='icon'>
                <a
                  href={site.socials.github}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label='GitHub'
                >
                  <Github className='h-4 w-4' />
                </a>
              </Button>
              <Button asChild variant='outline' size='icon'>
                <a
                  href={site.socials.linkedin}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label='LinkedIn'
                >
                  <Linkedin className='h-4 w-4' />
                </a>
              </Button>
              <Button asChild variant='outline' size='icon'>
                <a
                  href={site.socials.instagram}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label='X (Twitter)'
                >
                  <Instagram className='h-4 w-4' />
                </a>
              </Button>
            </div>
          </div>

          <div className='text-muted-foreground mt-8 flex flex-col items-start justify-between gap-2 border-t pt-6 text-xs md:flex-row'>
            <p>© {year} Zacky Achmad. All rights reserved.</p>
            <p>Built with Next.js & TypeScript • Styled with Tailwind CSS & shadcn/ui</p>
          </div>
        </div>
      </footer>

      <ThemeToggle className='fixed right-4 bottom-4 z-50' />
    </>
  )
}
