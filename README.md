# Zacky Achmad / zacky.id

Personal engineering portfolio, résumé, digital contact card, and file-based technical journal. Next.js App Router, React, TypeScript, Tailwind, Zod, Vitest and Playwright. The UI supports device-following light/dark themes, a keyboard command menu and an interactive engineering skill tree.

## Run locally

1. Select Node **24.22.1 LTS** (`nvm use` reads `.nvmrc`).
2. Install pnpm **10.34.7** (`npm install --global pnpm@10.34.7`).
3. Run `pnpm install --frozen-lockfile`.
4. Copy `.env.example` to `.env.local` and configure only the services you use.
5. Run `pnpm dev` and open http://localhost:3000.

Production: `pnpm build` then `pnpm start`. Articles are deployment content: publish or update files and rebuild. The empty journal is intentional; the unpublished template is not attributed writing.

## Routes

`/`, `/about`, `/projects`, `/projects/[slug]`, `/blog`, `/blog/[slug]`, `/contact`, `/privacy`, `/feed.xml`, `/sitemap.xml`, `/api/health`, `/api/contact`.

## Quality checks

`pnpm format:check`, `pnpm lint`, `pnpm type-check`, `pnpm test`, `pnpm build`, `pnpm exec playwright install chromium firefox webkit`, `pnpm test:e2e`, `pnpm audit --prod --audit-level=high`.

Playwright starts the production server; build first and leave port 3000 free. The isolated article-fixture build is documented in [Testing](docs/TESTING.md). k6 tests production HTTP behavior and browser vitals; see [performance suite](tests/performance/README.md) and [actual report](PERFORMANCE_REPORT.md). Targets are not capacity guarantees.

## Documentation

- [Architecture and decisions](docs/ARCHITECTURE.md)
- [Content authoring](docs/CONTENT.md)
- [Environment and deployment](docs/DEPLOYMENT.md)
- [Analytics and SEO](docs/SEO_ANALYTICS.md)
- [Testing](docs/TESTING.md), [coding standards](docs/CODING_STANDARDS.md), [design system](DESIGN.md), [baseline](docs/BASELINE.md)

No external CMS, database or mandatory analytics is required. SMTP and Cloudflare Turnstile remain optional. Without SMTP, the contact form opens the visitor's email application and explicitly says it has not delivered a message.
