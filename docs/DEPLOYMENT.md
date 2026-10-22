# Environment and deployment

## Runtime

Node 24.22.1 LTS, pnpm 10.34.7, one pnpm-lock.yaml. `.nvmrc`, `.node-version`, package.json, Docker and CI align. `pnpm install --frozen-lockfile` must succeed before building. The host's default Node is not evidence that production uses the pinned version.

## Configuration

| Variable                                  | When            | Meaning                                                                                                                      |
| ----------------------------------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| NEXT_PUBLIC_GA_MEASUREMENT_ID             | Build           | Optional G-… measurement ID. Empty disables analytics. Docker build argument and GHCR repository variable use the same name. |
| SMTP_HOST / SMTP_PORT                     | Runtime         | SMTP endpoint; configure together with sender and recipient.                                                                 |
| SMTP_FROM_EMAIL / SMTP_TO_EMAIL           | Runtime         | Valid sender and private delivery recipient.                                                                                 |
| SMTP_USER / SMTP_PASS                     | Runtime         | Optional authentication, configured together. Never public.                                                                  |
| SMTP_SECURE                               | Runtime         | true for implicit TLS (typically 465); otherwise STARTTLS when available.                                                    |
| SMTP_REJECT_UNAUTHORIZED                  | Runtime         | Leave true; disabling certificate validation weakens transport security.                                                     |
| CLOUDFLARE_TURNSTILE_SITE_KEY             | Runtime         | Preferred public site key passed through the contact Server Component.                                                       |
| CLOUDFLARE_TURNSTILE_SECRET_KEY           | Runtime         | Verification secret. Both Turnstile keys must be configured together.                                                        |
| NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY | Build           | Legacy fallback; prefer runtime site-key variable for self-hosting.                                                          |
| RATE_LIMIT_MAX_REQUESTS                   | Runtime         | Positive request count per window, default 5.                                                                                |
| RATE_LIMIT_WINDOW_MS                      | Runtime         | Positive window length, default 60000ms.                                                                                     |
| DOCKER_BUILD                              | Build           | Enables standalone output; Dockerfile sets true.                                                                             |
| CONTENT_DIRECTORY                         | Test build only | Only tests/fixtures/articles is recognized; never deploy fixture output.                                                     |

Without SMTP, the UI opens an email application. Direct API delivery returns 503 if transport is unavailable or fails. No message-content logging fallback exists. Umami and Vercel tracking have been removed; old UMAMI variables have no tracking effect.

## Docker

Copy .env.example to .env and configure runtime secrets. `docker compose build --pull` then `docker compose up -d`; inspect `docker compose ps` and `/api/health`. Image uses a non-root user, standalone output, pinned Node/pnpm, frozen dependency install, and Node-native health checks. Compose limits two CPUs and 1GiB, drops capabilities and uses a read-only filesystem. Image optimization may require a writable `/app/.next/cache` tmpfs; validate under your host's mount policy.

Public NEXT_PUBLIC variables are compiled into the image and require rebuilding. Runtime SMTP/Turnstile secrets do not. Fonts are fetched during build and self-hosted afterward; build workers need access to the font source. Articles are packaged in the image. No database migrations are required. Deploy behind HTTPS with a reverse proxy that overwrites forwarded IP headers. Keep outbound SMTP and optional Turnstile verification reachable.

GHCR workflow publishes main after push; quality workflow verifies PRs. Require Quality checks in repository branch protection before merging. The agent does not merge automatically. Roll back by deploying the previous image SHA; content and code travel together.

Docker execution is only verified when a working daemon can build and run the image. CLI availability alone is insufficient; see the delivery/performance evidence for actual status.

The local daemon was subsequently started and a production image built successfully. A non-root read-only container with a writable image-cache tmpfs reached healthy state with zero restarts under 2 CPU / 1GiB limits. This verifies the local container path; it does not verify the public reverse proxy, DNS, SMTP credentials, or production CI permissions.
