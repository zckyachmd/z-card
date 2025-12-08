#!/bin/sh
set -e

# Entrypoint script untuk memastikan environment variables terbaca dengan benar
# Script ini memastikan env vars dari Portainer tersedia untuk Next.js

echo "Starting z-card application..."
echo "Environment: ${NODE_ENV:-production}"

# List semua environment variables yang diperlukan (untuk debugging)
if [ "${NODE_ENV}" != "production" ] || [ "${DEBUG_ENV:-}" = "true" ]; then
  echo "=== Environment Variables ==="
  echo "SMTP_HOST: ${SMTP_HOST:-not set}"
  echo "SMTP_PORT: ${SMTP_PORT:-not set}"
  echo "SMTP_FROM_EMAIL: ${SMTP_FROM_EMAIL:-not set}"
  echo "SMTP_TO_EMAIL: ${SMTP_TO_EMAIL:-not set}"
  echo "CLOUDFLARE_TURNSTILE_SECRET_KEY: ${CLOUDFLARE_TURNSTILE_SECRET_KEY:+set}"
  echo "NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY: ${NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY:+set}"
  echo "============================="
fi

# Start the server
# Bun akan secara otomatis membaca environment variables dari process.env
exec bun server.js

