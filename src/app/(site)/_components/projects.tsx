'use client'

import * as React from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, ExternalLink, Github } from 'lucide-react'

import Section from '@/components/section'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export type Project = {
  title: string
  blurb: string
  tech: string[]
  live?: string
  repo?: string
}

const PROJECTS: Project[] = [
  {
    title: 'klikin.click — URL Shortener',
    blurb:
      'URL shortener built with Next.js and TypeScript. Fast redirects, clean UI, and shareable links.',
    tech: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'shadcn/ui',
      'Prisma ORM',
      'PostgreSQL',
      'OpenAPI/Swagger',
      'Docker',
    ],
    live: 'https://klikin.click',
    repo: 'https://github.com/zckyachmd/klikin.click',
  },
  {
    title: 'Temu Kawan BOT — Telegram matchmaking bot',
    blurb: 'Telegram bot that connects users via prompts and a simple matching flow.',
    tech: [
      'NestJS',
      'TypeScript',
      'Prisma ORM',
      'PostgreSQL',
      'Node.js',
      'pnpm',
      'Telegram Bot API',
    ],
    live: 'https://t.me/TemuKawanBot',
    repo: 'https://github.com/zckyachmd/temu-kawan-bot',
  },
  {
    title: 'Plantarium — Plant Data REST API',
    blurb:
      'REST API for plant taxonomy, varieties, synonyms, and categories—structured and searchable.',
    tech: [
      'REST API',
      'Hono',
      'TypeScript',
      'Bun',
      'Prisma ORM',
      'PostgreSQL',
      'OpenAPI/Swagger',
      'Docker',
    ],
    repo: 'https://github.com/zckyachmd/plantarium',
  },
  {
    title: 'Z-Weather — ESP8266 weather station',
    blurb: 'Collects temperature and humidity; publishes via MQTT to a lightweight dashboard.',
    tech: ['Arduino', 'C++', 'ESP8266', 'MQTT', 'DHT22', 'IoT'],
    repo: 'https://github.com/zckyachmd/z-weather',
  },
  {
    title: 'Hono Auth — Auth boilerplate on HonoJs',
    blurb: 'Authentication starter with JWT, session patterns, and guards—ready for secure APIs.',
    tech: [
      'Hono',
      'TypeScript',
      'Bun',
      'JWT',
      'Prisma ORM',
      'PostgreSQL',
      'OpenAPI/Swagger',
      'Docker',
    ],
    repo: 'https://github.com/zckyachmd/hono-auth',
  },
  {
    title: 'Immich Album Downloader',
    blurb: 'CLI to download Immich albums—fast, resumable, and safe for bulk backups.',
    tech: ['Node.js', 'TypeScript', 'CLI'],
    repo: 'https://github.com/zckyachmd/immich-album-downloader',
  },
]

export default function ProjectsSection() {
  const scrollerRef = React.useRef<HTMLDivElement | null>(null)

  const scrollByViewport = (dir: 'left' | 'right') => {
    const node = scrollerRef.current
    if (!node) return
    const amount = node.clientWidth
    node.scrollBy({ left: dir === 'right' ? amount : -amount, behavior: 'smooth' })
  }

  return (
    <Section id='projects'>
      <div>
        <div className='mb-5 flex flex-wrap items-center gap-2 text-[11px] md:text-xs'>
          <span className='rounded-full border px-2.5 py-0.5'>Projects</span>
          <span className='rounded-full border px-2.5 py-0.5'>Featured</span>
        </div>

        <div className='flex items-end justify-between gap-3'>
          <div>
            <h2 className='text-2xl font-semibold tracking-tight sm:text-3xl'>Featured Work</h2>
            <p className='text-muted-foreground mt-2 max-w-2xl text-sm sm:text-base'>
              A few projects that reflect how I think about reliability, security, and developer
              experience.
            </p>
          </div>

          <div className='hidden gap-2 sm:flex'>
            <button
              type='button'
              onClick={() => scrollByViewport('left')}
              aria-label='Previous projects'
              className='text-muted-foreground hover:bg-accent inline-flex items-center justify-center rounded-md border p-2'
            >
              <ChevronLeft className='size-4' aria-hidden='true' />
            </button>
            <button
              type='button'
              onClick={() => scrollByViewport('right')}
              aria-label='Next projects'
              className='text-muted-foreground hover:bg-accent inline-flex items-center justify-center rounded-md border p-2'
            >
              <ChevronRight className='size-4' aria-hidden='true' />
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className='mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none]'
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          {PROJECTS.map(p => (
            <div
              key={p.title}
              className='flex-shrink-0 basis-full snap-start sm:basis-1/2 lg:basis-1/3'
            >
              <ProjectCard {...p} />
            </div>
          ))}
        </div>

        <div className='mt-6'>
          <a
            href='https://github.com/zckyachmd?tab=repositories'
            target='_blank'
            rel='noopener noreferrer'
            className='text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm'
          >
            <Github className='size-4' aria-hidden='true' /> View more on GitHub
          </a>
        </div>
      </div>
    </Section>
  )
}

function ProjectCard({ title, blurb, tech, live, repo }: Project) {
  return (
    <Card className='group relative flex h-full flex-col overflow-hidden transition-shadow hover:shadow-sm'>
      <CardHeader>
        <CardTitle className='text-base'>{title}</CardTitle>
      </CardHeader>

      <CardContent className='flex-1 space-y-4'>
        <p className='text-muted-foreground line-clamp-3 min-h-[3.75rem] text-sm'>{blurb}</p>
        <div className='flex flex-wrap gap-1.5'>
          {tech.map(t => (
            <Badge key={t} variant='outline' className='text-[11px]'>
              {t}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className='mt-auto flex items-center gap-2'>
        {live && (
          <Link
            href={live}
            target='_blank'
            rel='noopener noreferrer'
            className='hover:bg-accent inline-flex items-center gap-1 rounded-md border px-3 py-1.5 text-xs'
            aria-label={`Open live demo: ${title}`}
          >
            <ExternalLink className='size-3.5' aria-hidden='true' /> Live
          </Link>
        )}
        {repo && (
          <a
            href={repo}
            target='_blank'
            rel='noopener noreferrer'
            className='hover:bg-accent inline-flex items-center gap-1 rounded-md border px-3 py-1.5 text-xs'
            aria-label={`Open repository: ${title}`}
          >
            <Github className='size-3.5' aria-hidden='true' /> Repo
          </a>
        )}
      </CardFooter>

      <div
        className='pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100'
        aria-hidden
      >
        <div className='from-primary/5 absolute inset-x-0 -top-10 h-24 bg-gradient-to-b to-transparent' />
      </div>
    </Card>
  )
}
