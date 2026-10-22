# Development

Use Node 24.22.1 and pnpm 10.34.7. Install with the frozen lockfile, branch from main, and keep changes reviewable. Do not add alternate lockfiles or commit environment secrets.

Read [architecture](docs/ARCHITECTURE.md), [coding standards](docs/CODING_STANDARDS.md), [testing](docs/TESTING.md), and [design system](DESIGN.md). Run format, lint, types, unit tests and production build before opening a PR. Browser tests use the production server and three engines. Include real results and mark environmental blockers unverified.

Content belongs in `content/articles`, project facts in `src/config/projects.ts`, and site identity in `src/config/site.ts`. Do not invent professional history or publish example writing as the owner's work. Changes to public content require a rebuild.

Hooks run staged formatting/lint before commit and checks before push. Use `pnpm exec husky` after installation if hooks are missing. CI is authoritative when local tooling cannot run a required check; a configured job is not evidence of a passed job.
