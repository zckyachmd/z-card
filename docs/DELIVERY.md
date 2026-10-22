# Delivery report

## Executive summary

Z-Card is now a multipage personal engineering portfolio for zacky.id, with a real publishing foundation. The owner's revisions drove the final design: portfolio/résumé/digital contact identity first, navy/charcoal dark theme, device-following light mode, authentic portrait, animation, an interactive skill tree and keyboard command navigation. No fictional articles, employers, testimonials or performance outcomes were introduced.

Pull request: https://github.com/zckyachmd/z-card/pull/20 (target main; do not merge automatically).

## Architecture before / after

Before: forced-dynamic one-page card, anchor navigation, redundant section loading, always-on Vercel integrations, hybrid Bun installation/pnpm lockfile, Chromium-only next-dev testing.

After: Server Component pages and static generation for Home, About, Projects, project details, Journal, article details, Privacy, RSS and sitemap. Contact remains dynamic for runtime SMTP/Turnstile. Small client boundaries own interactions. Trusted Markdown and validated metadata live outside UI components. See ARCHITECTURE.md and BASELINE.md.

## Product and visual changes

Name and role lead the hero. Portrait, résumé link, work/contact actions and a downloadable contact card support professional discovery. Five connected skill nodes reveal actual engineering areas and relevant project links; branch discovery, activation and completion have reduced-motion equivalents. The command menu supports search, accented résumé queries, Enter, Tab and Escape/focus restoration. Projects, career history, contact and article layouts have distinct content structures.

Themes follow system preferences until changed. Fine borders, semantic surface pairs, visible focus, honest empty/error states, touch controls and responsive compositions replace the flat section carousel. Independent visual review scored the three requested finish fixes resolved; that review covered supplied homepage evidence, not every page or every assistive technology.

## Runtime and dependencies

Node 24.22.1 is pinned as an official LTS release; pnpm 10.34.7 remains the authoritative package manager. Next 16.4.2 and React 19.3.1 meet checked registry compatibility requirements and pass production builds. Next ESLint packages align. Vitest 4.1.12, Playwright 1.64.1, Tailwind 4.3.3 and Nodemailer 10.2.0 address stale tooling and audited vulnerabilities. Obsolete Vercel tracking dependencies and superseded page sections were removed.

Production audit: zero reported vulnerabilities at execution. Full audit: one unpatched development-only braces advisory through Next ESLint tooling. ESLint 9 is retained because transitive plugins do not declare ESLint 10 compatibility. Those limitations are explicit, not hidden with broad peer overrides.

## Publishing

Adjacent Markdown/JSON files are validated with Zod. Stable slugs, draft and future-date filtering, reading time, timestamps, categories/tags, related articles, safe rendering, syntax highlighting, code copying, anchors, table of contents, RSS and sitemap are implemented. The production journal intentionally starts empty. An unpublished authoring template and isolated test fixtures are included. Content publication requires a rebuild; never deploy the fixture build. See CONTENT.md.

## SEO and analytics

Unique metadata and canonicals, social previews, RSS discovery, sitemap, robots, semantic headings and Person/WebSite/BreadcrumbList/BlogPosting/SoftwareSourceCode structured data are present. Unknown and unpublished slugs return 404. JSON-LD/XML output is encoded.

GA4 uses optional NEXT_PUBLIC_GA_MEASUREMENT_ID, explicit consent, DNT/GPC handling and manual pathname views. Events accept predefined names and paths only. Tests intercept all analytics loading; no real tracking endpoints are used for verification. Google-side enhanced measurement must be disabled as documented to prevent duplication. See SEO_ANALYTICS.md.

## Security, performance and deployment

Server validation, bounded UTF-8 streaming bodies, bot protection and rate limiting remain. SMTP failure returns 503 rather than claiming delivery; message contents are not logged. Missing SMTP offers a clearly labeled email-application fallback. Rate limits remain process-local and proxy headers require trusted ingress configuration.

Docker uses pinned Node/pnpm, frozen install, standalone output, a non-root runtime and native health checks. A read-only container with 2 CPU / 1GiB limits and writable tmp/cache became healthy with zero restarts. No database migration is needed. Public NEXT_PUBLIC configuration requires rebuilding; SMTP/Turnstile secrets are runtime settings. See DEPLOYMENT.md.

Performance evidence is in ../PERFORMANCE_REPORT.md. k6 smoke, comparable old/new homepage baseline, representative container load and browser journeys executed. Stress/spike/soak were not executed. Final Lighthouse scores were 96 Performance / 100 Accessibility / 100 Best Practices / 100 SEO; cold simulated LCP 2.65s narrowly missed 2.5s. Synthetic browser p75 and field CWV are not interchangeable.

## Actual tests and evidence

- `pnpm test`: 152 tests passed across 10 files, including preservation of valid reply addresses longer than 100 characters.
- `pnpm lint`, `pnpm type-check`, `pnpm format:check`, `pnpm build`: passed locally and in the first complete Quality CI run.
- Local Chromium/WebKit main journeys: 24 passed; separate article/analytics fixture checks: 6 passed. Follow-up navigation/digital-card/accessibility checks: 6 passed. Local Firefox could not start its temporary profile; Linux CI retains and executes it.
- GitHub Quality run https://github.com/zckyachmd/z-card/actions/runs/39771584238 completed successfully, including three-engine browser verification, isolated fixtures, security audit and safe k6 smoke/baseline/load gates. Check the latest head run before merging subsequent commits.
- That run executed **36 main browser checks across Chromium, Firefox and WebKit**, with 9 fixture-only checks intentionally deferred to the separate fixture build; that build executed and passed **all 9 deferred checks**.
- Actual screenshots: `evidence/home-desktop-dark.png`, `home-desktop-light.png`, `home-mobile-dark.png`, `home-mobile-light.png`, and `skill-tree-complete-mobile.png`. Lighthouse HTML/JSON and machine-readable k6/resource evidence are in evidence/.

The browser task space later passed to user control, so additional manual viewport inspection stopped rather than taking control back. Existing tests and captures cover mobile/desktop. Screen-reader testing, manual 200% zoom and exhaustive real-device/tablet/browser coverage remain unverified.

## Deployment checks still required

Validate real SMTP delivery with an isolated test mailbox, production reverse proxy/DNS/TLS settings, Turnstile credentials, Google stream configuration, and chosen retention policy before declaring public production readiness. No real emails or destructive public-domain load tests were sent. Require latest CI checks, review the PR and deploy the image SHA after approval; do not deploy content fixtures. Field p75 Core Web Vitals and long-duration memory stability require real monitoring after deployment.
