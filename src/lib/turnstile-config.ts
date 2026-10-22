/**
 * Cloudflare Turnstile Configuration
 *
 * Utility functions to check Turnstile configuration status
 */

/**
 * Check if Turnstile is enabled on the server side
 * (requires secret key to be configured)
 */
export function isTurnstileEnabledServer(): boolean {
  return !!process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY
}

/**
 * Get Turnstile site key on the server side
 * Prefer server env for runtime injection, fallback to NEXT_PUBLIC for build-time
 */
export function getTurnstileSiteKeyServer(): string {
  return (
    process.env.CLOUDFLARE_TURNSTILE_SITE_KEY ||
    process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY ||
    ''
  )
}

/**
 * Check if Turnstile is fully configured
 * (both site key and secret key are set)
 * This should be used for validation to ensure consistency
 */
export function isTurnstileFullyConfigured(): boolean {
  return !!(getTurnstileSiteKeyServer() && process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY)
}

/**
 * Check if SMTP is configured
 * Note: This is a server-side check and should not be used in client components
 */
function isSMTPConfigured(): boolean {
  return !!(
    process.env.SMTP_HOST &&
    process.env.SMTP_PORT &&
    process.env.SMTP_FROM_EMAIL &&
    process.env.SMTP_TO_EMAIL
  )
}

/**
 * Delivery needs SMTP; bot verification alone cannot deliver a message.
 * Without SMTP, the UI offers an explicit email-client fallback.
 * Note: This function accesses server environment variables and should not be used in client components
 */
export function areEmailServicesAvailable(): boolean {
  return isSMTPConfigured()
}
