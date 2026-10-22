'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Blocks, Braces, Database, GitBranch, Server, Terminal } from 'lucide-react'

const domains = [
  {
    id: 'backend',
    name: 'Back end',
    icon: Braces,
    stack: 'Laravel / PHP / Node.js',
    title: 'The logic behind the interface.',
    description:
      'Business rules, background jobs, reporting, and APIs. I start by understanding the workflow and making the data boundaries explicit.',
    href: '/about',
    link: 'My engineering background',
  },
  {
    id: 'data',
    name: 'Data',
    icon: Database,
    stack: 'PostgreSQL / MySQL / Prisma',
    title: 'Give the domain a clear shape.',
    description:
      'Relational models, searchable data, and useful API contracts. Plantarium brings plant taxonomy, varieties, and synonyms into a structured service.',
    href: '/projects/plantarium',
    link: 'Inspect Plantarium',
  },
  {
    id: 'interfaces',
    name: 'Interfaces',
    icon: Blocks,
    stack: 'React / Next.js / TypeScript',
    title: 'Make the system usable.',
    description:
      'Interfaces that make the next action clear. Forms, navigation, and accessibility belong to the same engineering problem as the API behind them.',
    href: '/projects/klikin-click',
    link: 'Inspect klikin.click',
  },
  {
    id: 'operations',
    name: 'Operations',
    icon: Server,
    stack: 'Docker / Linux / CI/CD',
    title: 'The job continues after deployment.',
    description:
      'Repeatable environments, deployment automation, and self-hosted infrastructure. I care about the person who has to run and maintain the system.',
    href: '/about',
    link: 'More about my practice',
  },
  {
    id: 'tools',
    name: 'Tools',
    icon: Terminal,
    stack: 'CLI / Automation / Integrations',
    title: 'Less repetitive work. More useful work.',
    description:
      'Small utilities can solve very concrete problems. Immich Album Downloader connects a self-hosted photo library to a practical backup workflow.',
    href: '/projects/immich-album-downloader',
    link: 'Inspect the downloader',
  },
] as const

export function DeveloperPlayground() {
  const [active, setActive] = useState(0)
  const [explored, setExplored] = useState<number[]>([0])
  const selected = domains[active]
  return (
    <section className='developer-playground' aria-labelledby='playground-title'>
      <div className='section-heading'>
        <div>
          <h2 id='playground-title'>Explore my skill tree.</h2>
          <p>Pick a node. See how I think, and where it shows up.</p>
        </div>
        <p className='exploration-count' aria-live='polite'>
          {explored.length} / {domains.length} nodes explored
        </p>
      </div>
      <div className='skill-tree-layout'>
        <div className='skill-map' data-complete={explored.length === domains.length}>
          <div className='skill-core' aria-hidden='true'>
            <GitBranch size={25} />
            <span>ZA / ENGINEER</span>
          </div>
          <div className='skill-path' aria-hidden='true' />
          <div className='skill-nodes' role='group' aria-label='Engineering skill areas'>
            {domains.map((domain, index) => {
              const Icon = domain.icon
              return (
                <button
                  key={domain.id}
                  type='button'
                  className={`skill-node ${index === active ? 'selected' : ''} ${explored.includes(index) ? 'is-explored' : ''}`}
                  aria-pressed={index === active}
                  aria-controls='skill-detail'
                  onClick={() => {
                    setActive(index)
                    setExplored(previous =>
                      previous.includes(index) ? previous : [...previous, index],
                    )
                  }}
                >
                  <svg className='node-branch' viewBox='0 0 28 32' aria-hidden='true'>
                    <path d='M0 16 H28' pathLength='1' />
                  </svg>
                  <span className='node-icon'>
                    <Icon size={20} aria-hidden='true' />
                  </span>
                  <span>{domain.name}</span>
                  <span className='node-state' aria-hidden='true'>
                    {explored.includes(index) ? '●' : '+'}
                  </span>
                </button>
              )
            })}
          </div>
          <div className='skill-map-caption'>
            <span>Five connected disciplines.</span>
            <span>One engineer.</span>
          </div>
        </div>
        <div className='skill-detail' id='skill-detail' aria-live='polite' aria-atomic='true'>
          <div key={selected.id} className='skill-detail-content'>
            <h3>
              <span className='skill-domain-title'>{selected.name}.</span>
              {selected.title}
            </h3>
            <p>{selected.description}</p>
            <p className='skill-stack'>{selected.stack}</p>
            <Link className='text-link' href={selected.href}>
              {selected.link}
              <ArrowUpRight size={16} aria-hidden='true' />
            </Link>
          </div>
          <div className='skill-progress' aria-hidden='true'>
            {domains.map((domain, index) => (
              <span key={domain.id} className={explored.includes(index) ? 'explored' : ''} />
            ))}
          </div>
          {explored.length === domains.length && (
            <div className='skill-complete' role='status'>
              <svg className='completion-mark' viewBox='0 0 40 40' aria-hidden='true'>
                <circle cx='20' cy='20' r='17' pathLength='1' />
                <path d='m12 20 5 5 11-11' pathLength='1' />
              </svg>
              <p>
                <strong>Full map explored.</strong>
                <span>Now see the work behind it.</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
