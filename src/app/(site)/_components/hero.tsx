'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Mail, MapPin } from 'lucide-react'

import { DigitalCard } from '@/components/digital-card'
import Section from '@/components/section'
import { Button } from '@/components/ui/button'
import { site } from '@/config/site'

export default function Hero() {
  const [cardOpen, setCardOpen] = useState(false)

  return (
    <Section id='home' full>
      <div className=''>
        <div className='flex flex-col items-start gap-6'>
          <span className='inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs md:text-sm'>
            <MapPin className='size-3.5' />
            Based in Cimahi, Indonesia
          </span>

          <h1 className='text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl'>
            Hi, I’m <span className='text-primary'>{`${site.name.first} ${site.name.last}`}</span>.
          </h1>

          <p className='text-muted-foreground text-xl sm:text-2xl'>
            Full-Stack Web Developer with a back-end focus, building robust, secure, and efficient
            systems — delivered with a clean, minimalist approach.
          </p>

          <p className='text-muted-foreground max-w-2xl text-base'>
            Open to collaborations and interesting problems. Ready to build something great?
          </p>

          <div className='flex flex-wrap items-center gap-3 pt-2'>
            <Button onClick={() => setCardOpen(true)}>
              <Mail className='mr-2 size-4' />
              Contact Me
            </Button>

            <Button asChild variant='outline'>
              <Link href='#projects' aria-label='See featured projects'>
                View Projects <ArrowRight className='ml-2 size-4' />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <DigitalCard open={cardOpen} onOpenChange={setCardOpen} />
    </Section>
  )
}
