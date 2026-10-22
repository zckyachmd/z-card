export const projects = [
  {
    slug: 'klikin-click',
    name: 'klikin.click',
    kind: 'Web application',
    summary: 'A URL shortener built around fast redirects and shareable links.',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Docker'],
    repository: undefined,
    live: 'https://klikin.click',
    context:
      'A focused web application for turning long URLs into short, shareable links. The existing portfolio identifies a Next.js interface, a PostgreSQL data store, and OpenAPI documentation.',
    architecture:
      'The interface and redirect workflow are backed by a relational link store through Prisma. API documentation describes the integration surface; Docker provides a repeatable packaging boundary.',
    considerations: [
      'Redirect correctness is the core user journey.',
      'User-supplied destinations need validation and abuse controls.',
      'A small public interface benefits from explicit API contracts.',
    ],
  },
  {
    slug: 'plantarium',
    name: 'Plantarium',
    kind: 'Data & API',
    summary: 'A structured REST API for plant taxonomy, varieties, synonyms, and categories.',
    stack: ['Hono', 'TypeScript', 'Bun', 'PostgreSQL', 'OpenAPI'],
    repository: 'https://github.com/zckyachmd/plantarium',
    live: undefined,
    context:
      'Plant information has relationships beyond a single name. This project exposes taxonomy, varieties, synonyms, and categories through a searchable REST API.',
    architecture:
      'Hono handles HTTP requests, Prisma connects the application to PostgreSQL, and OpenAPI describes the endpoints. The existing project uses Bun and Docker.',
    considerations: [
      'Names and synonyms represent different relationships.',
      'Search behavior needs predictable contracts.',
      'Relational modeling supports consistent taxonomy.',
    ],
  },
  {
    slug: 'immich-album-downloader',
    name: 'Immich Album Downloader',
    kind: 'Developer tool',
    summary: 'A command-line tool for downloading Immich albums and bulk backups.',
    stack: ['Bun', 'TypeScript', 'SQLite', 'CLI', 'Docker'],
    repository: 'https://github.com/zckyachmd/immich-album-downloader',
    live: undefined,
    context:
      'A practical utility for moving albums from a self-hosted photo library to local storage. The existing portfolio describes resumable downloads and bulk backup use.',
    architecture:
      'A Bun and TypeScript command-line application connects the Immich API to local files. SQLite tracks download state, checksum validation checks existing files, and resumable workflows recover failed transfers. Docker supports isolated execution.',
    considerations: [
      'Interrupted downloads need a clear recovery path.',
      'Filesystem operations must preserve existing data.',
      'Useful errors matter during unattended transfers.',
    ],
  },
] as const

export function getProject(slug: string) {
  return projects.find(project => project.slug === slug)
}
