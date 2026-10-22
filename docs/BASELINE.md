# Modernization baseline

Baseline commit: `80cb2fadc5583518ebbe6032aa1b7e2868336e43`.

Initial checks: 8 unit test files, 144 tests passed; lint passed. Host Node was 26.12.0 and pnpm 12.14.0. Docker CLI exists but the OrbStack daemon socket is unavailable. k6 is installed (v2.3.0). Modernization checks explicitly use Node 24.22.1 and pnpm 10.34.7 rather than assuming the host runtime is representative.

Initial tree was clean on `main`. Next.js 16.1.7 and React 19.1.0 use App Router with a single force-dynamic homepage. Sections are dynamically imported with redundant Suspense/skeleton layers. Navigation uses page anchors. Root layout calls headers without awaiting it and enables Vercel Analytics and Speed Insights unconditionally. Umami is configurable independently, allowing duplicate tracking.

Docker installs with Bun 1.1.38 without an authoritative Bun lockfile, then runs Node 20.18.1. CI/tooling and local pnpm therefore do not share a deterministic dependency strategy. ESLint Next configuration remains at 15.4.6 while Next is 16.1.7. Package manager and runtime are not pinned in package.json.

Contact uses server validation, honeypot/robot checks, optional Turnstile, SMTP and process-local rate limiting. Content-Length alone does not bound chunked request bodies. Process-local limits cannot coordinate multiple replicas. Existing biography contains dated roles and a Present entry; do not silently assert current employment.

Projects already described in source include klikin.click, Temu Kawan BOT, Plantarium, Z-Weather, Hono Auth, and Immich Album Downloader. There are no verified authored articles in the supplied application. Publishing should start empty with an unpublished template.

Playwright only enables Chromium and tests next dev. No k6 suite exists. No benchmark capacity claims are justified by this baseline. Automated checks and measured results are recorded separately as executed.
