'use client'

import { type ComponentType, useState } from 'react'
import { Boxes, Briefcase, GraduationCap, MonitorSmartphone, Server, Wrench } from 'lucide-react'

import Section from '@/components/section'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

const HEADLINE = `From multimedia & Arduino (C/C++) to back-end and full-stack development. I craft scalable web apps with Laravel, Node/Bun, and TypeScript—delivering clean APIs (OpenAPI/Swagger) and reliable deployments with Docker & Linux.`

const BADGES: string[] = [
  'Back‑End First',
  'Full‑Stack with TS',
  'Self‑Hosted & Homelab',
  'OpenAPI Documentation',
  'Docker‑First Delivery',
  'Automation (Cron/Bots)',
]

type StackGroup = {
  label: string
  icon: ComponentType<{ className?: string }>
  items: string[]
}

const TECH_STACK: StackGroup[] = [
  {
    label: 'Frontend',
    icon: MonitorSmartphone,
    items: [
      'React',
      'Next.js',
      'Remix',
      'TypeScript',
      'Tailwind CSS',
      'Bootstrap',
      'shadcn/ui',
      'Flowbite',
      'jQuery',
      'Vite',
    ],
  },
  {
    label: 'Backend',
    icon: Server,
    items: [
      'PHP (Laravel / CodeIgniter)',
      'Node.js / Bun',
      'Hono',
      'NestJS',
      'Golang',
      'JavaScript',
      'C++',
      'RESTful APIs + OpenAPI (Swagger)',
      'PostgreSQL',
      'MySQL / MariaDB',
      'Oracle (basic)',
      'Redis',
    ],
  },
  {
    label: 'Infra / Tools',
    icon: Boxes,
    items: [
      'Docker / OrbStack',
      'MacOS',
      'Linux (RHEL/Ubuntu/Debian)',
      'Homelab (Synology)',
      'Git & GitHub/GitLab',
      'VS Code',
      'CI/CD Pipelines',
      'Postman',
      'Scalar',
      'TablePlus',
      'Cyberduck',
    ],
  },
]

type TimelineItem = {
  icon: ComponentType<{ className?: string }>
  title: string
  meta: string
  desc: string
}

const EDUCATION: TimelineItem[] = [
  {
    icon: GraduationCap,
    title: 'B.A.Sc — Teknologi Rekayasa Multimedia',
    meta: 'Universitas Telkom • 2018 – 2022',
    desc: 'Applied Computer Science foundation with focus on software engineering and web technologies.',
  },
  {
    icon: Wrench,
    title: 'Full‑Stack Web Developer — Bootcamp',
    meta: 'Bearmentor • 2024',
    desc: 'Hands‑on full‑stack development practice and modern workflows.',
  },
]

const EXPERIENCE: TimelineItem[] = [
  {
    icon: Briefcase,
    title: 'Back‑End Developer — PT Astra Graphia Information Technology (AGIT)',
    meta: 'Jakarta Selatan • Apr 2023 – Present',
    desc: 'Optimized internal tools and automated key processes. Built SMTP email reporting, improved data processing (Laravel, MySQL, Cron), and delivered real‑time dashboards with Grafana.',
  },
  {
    icon: Briefcase,
    title: 'Lead Engineer — Volantis Technology',
    meta: 'Yogyakarta • Aug 2024 – Nov 2024',
    desc: 'Led a 25‑person cross‑functional team. Drove clean‑code practices, code reviews, and automated testing with GitLab CI/CD, ESLint, and GrumPHP.',
  },
  {
    icon: Briefcase,
    title: 'Back‑End Developer — Volantis Technology',
    meta: 'Yogyakarta • May 2024 – Aug 2024',
    desc: 'Built robust server‑side apps with Laravel & PostgreSQL. Optimized schemas, ensured seamless data flow, and collaborated closely with front‑end teams. Used Docker for containerization.',
  },
  {
    icon: Briefcase,
    title: 'Founder / Software Engineer — Sobatdev Anagata Solusi Teknologi',
    meta: 'Bandung • Feb 2023 – Nov 2023',
    desc: 'Led projects end‑to‑end. Specialized in back‑end (Laravel) with MySQL/PostgreSQL. Managed resources, timelines, and client delivery with an emphasis on clean code.',
  },
  {
    icon: Briefcase,
    title: 'Full‑Stack Web Developer — Telkom University',
    meta: 'Bandung • Feb 2023 – Apr 2023',
    desc: 'Developed and maintained an HR portal and recruitment app using Laravel and jQuery, streamlining HR workflows.',
  },
  {
    icon: Briefcase,
    title: 'Full‑Stack Web Developer — Bandung Techno Park',
    meta: 'Bandung • Jun 2022 – Feb 2023',
    desc: 'Led SIAKAD development. Managed full lifecycle, responsive UIs (jQuery), and back‑end optimization. Automated deployments with GitLab CI/CD.',
  },
  {
    icon: Briefcase,
    title: 'Full‑Stack Web Developer — Universitas Telkom (Internship)',
    meta: 'Bandung • Feb 2022 – Jul 2022',
    desc: 'Delivered an information‑rich competition website with CodeIgniter & PHP, from concept to deployment.',
  },
  {
    icon: Briefcase,
    title: 'Web Specialist — Schole Fitrah (Internship)',
    meta: 'Bandung • Aug 2021 – Jan 2022',
    desc: 'Maintained WordPress site, coordinated timelines and team communication. Contributed to IoT tools (C++/Arduino).',
  },
  {
    icon: Briefcase,
    title: 'Web Developer — Bandung Command Center (Internship)',
    meta: 'Bandung • Jun 2021 – Sep 2021',
    desc: 'Managed WordPress content and experimented with AR via Spark AR for Instagram effects.',
  },
  {
    icon: Briefcase,
    title: 'Practicum Assistant — Universitas Telkom',
    meta: 'Bandung • Aug 2019 – Dec 2019',
    desc: 'TA for Algorithms & Data Structures: guided labs and designed exercises to deepen understanding.',
  },
]
// ===== /Data =====

export default function AboutSection() {
  return (
    <Section id='about'>
      <div className=''>
        {/* Title + chips */}
        <div className='mb-5 flex flex-wrap items-center gap-2 text-[11px] md:text-xs'>
          <span className='rounded-full border px-2.5 py-0.5'>About</span>
        </div>

        <h1 className='text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl'>
          A bit about me
        </h1>

        {/* Headline */}
        <p className='text-muted-foreground mt-3 max-w-3xl text-sm sm:text-base'>{HEADLINE}</p>

        {/* Badges */}
        <div className='mt-4 flex flex-wrap gap-2'>
          {BADGES.map(b => (
            <Badge key={b} variant='outline'>
              {b}
            </Badge>
          ))}
        </div>

        <Separator className='my-6' />

        {/* Tech Stack */}
        <section aria-labelledby='tech-stack' className='space-y-4'>
          <h2 id='tech-stack' className='text-base font-semibold'>
            Tech Stack
          </h2>
          <div className='grid gap-3 md:grid-cols-3'>
            {TECH_STACK.map(({ label, icon: Icon, items }) => (
              <div key={label} className='rounded-xl border p-3'>
                <div className='mb-2 flex items-center gap-2 text-sm font-medium'>
                  <Icon className='size-4' aria-hidden='true' /> {label}
                </div>
                <div className='flex flex-wrap gap-2'>
                  {items.map(it => (
                    <Badge key={it} variant='outline'>
                      {it}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator className='my-6' />

        {/* Work Experience */}
        <section aria-labelledby='work-experience' className='space-y-4'>
          <h2 id='work-experience' className='text-base font-semibold'>
            Work Experience
          </h2>
          <Timeline items={EXPERIENCE} maxVisible={4} />
        </section>

        <Separator className='my-6' />

        {/* Education */}
        <section aria-labelledby='education' className='space-y-4'>
          <h2 id='education' className='text-base font-semibold'>
            Education
          </h2>
          <Timeline items={EDUCATION} maxVisible={2} />
        </section>

        {/* CTA */}
        <div className='mt-8 flex flex-wrap items-center gap-3'>
          <a
            href='#contact'
            className='hover:bg-accent rounded-md border px-4 py-2 text-sm'
            aria-label='Jump to contact'
          >
            Get in Touch
          </a>
          <a
            href='https://www.self.so/zckyachmd'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:bg-accent rounded-md border px-4 py-2 text-sm'
            aria-label='Download CV'
          >
            Download CV
          </a>
        </div>
      </div>
    </Section>
  )
}

// ===== Dumb UI pieces =====
// Ganti komponen Timeline kamu dengan versi ini
function Timeline({
  items,
  maxVisible = 4, // tampilkan 4 entri dulu
  collapsible = true,
}: {
  items: TimelineItem[]
  maxVisible?: number
  collapsible?: boolean
}) {
  const [expanded, setExpanded] = useState(false)
  const hasOverflow = collapsible && items.length > maxVisible
  const visible = expanded || !hasOverflow ? items : items.slice(0, maxVisible)

  return (
    <>
      <ol className='relative ml-2 space-y-5 border-l pl-5'>
        {visible.map(({ icon: Icon, title, meta, desc }, idx) => (
          <li key={idx} className='group'>
            <span className='bg-background absolute -left-[7px] mt-2 inline-flex size-3 rounded-full border' />
            <div className='flex flex-col gap-0.5'>
              <div className='flex items-center gap-2 text-sm font-medium'>
                <Icon className='size-4' aria-hidden='true' /> {title}
              </div>
              <div className='text-muted-foreground text-[11px]'>{meta}</div>
              <p className='text-muted-foreground text-sm'>{desc}</p>
            </div>
          </li>
        ))}
      </ol>

      {hasOverflow && (
        <div className='mt-3'>
          <button
            type='button'
            onClick={() => setExpanded(v => !v)}
            aria-expanded={expanded}
            className='hover:bg-accent rounded-md border px-3 py-1.5 text-xs'
          >
            {expanded ? 'View less' : `View more (${items.length})`}
          </button>
        </div>
      )}
    </>
  )
}
