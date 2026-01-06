# -------- Base image --------
# Pin to specific version for reproducibility and security
FROM oven/bun:1.1.38-alpine AS base
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app

# -------- Deps (restore & cache) --------
FROM base AS deps
# Only lockfile & manifest for better layer caching
# Support both bun.lock and pnpm-lock.yaml for migration
COPY package.json bun.lock* pnpm-lock.yaml* ./
# Install dependencies (Bun handles caching automatically)
# If bun.lock exists, use it; otherwise bun will generate it
RUN --mount=type=cache,id=bun-cache,target=/root/.bun/install/cache \
    if [ -f bun.lock ]; then \
      bun install --frozen-lockfile; \
    else \
      bun install; \
    fi

# -------- Builder --------
FROM base AS builder
WORKDIR /app
# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY package.json bun.lock* pnpm-lock.yaml* ./
# Copy the rest of your source code
COPY . .
# Build Next.js with standalone output for Docker
# Note: Bun runs Next.js which uses 'nodejs' runtime internally
# Source map warnings are non-fatal and can be ignored
ENV DOCKER_BUILD=true
RUN bun run build

# -------- Runtime (tiny, secure) --------
# Pin to specific version for reproducibility and security
FROM node:20.18.1-alpine AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app

# Install minimal dependencies
RUN apk add --no-cache curl

# Create non-root user with specific UID/GID for better security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy standalone server output & static assets with proper ownership
COPY --chown=nextjs:nodejs --from=builder /app/.next/standalone ./
COPY --chown=nextjs:nodejs --from=builder /app/.next/static ./.next/static
COPY --chown=nextjs:nodejs --from=builder /app/public ./public

# Copy entrypoint script and make it executable
COPY --chown=nextjs:nodejs docker-entrypoint.sh /app/docker-entrypoint.sh
RUN chmod +x /app/docker-entrypoint.sh

# Run as non-root for security
USER nextjs

# Network
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Health check (using curl which is now installed)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/ || exit 1

# Start the server using entrypoint script
# This ensures environment variables from Portainer are properly loaded
ENTRYPOINT ["/app/docker-entrypoint.sh"]
