/**
 * Cloudflare Turnstile Configuration
 *
 * Utility functions to check Turnstile configuration status
 */

/**
 * Check if Turnstile is enabled on the client side
 * (requires site key to be configured)
 */
export function isTurnstileEnabledClient(): boolean {
  if (typeof window === 'undefined') {
    return false
  }
  return !!process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY
}

/**
 * Check if Turnstile is enabled on the server side
 * (requires secret key to be configured)
 */
export function isTurnstileEnabledServer(): boolean {
  return !!process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY
}

/**
 * Check if Turnstile is fully configured
 * (both site key and secret key are set)
 * This should be used for validation to ensure consistency
 */
export function isTurnstileFullyConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY &&
    process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY
  )
}

/**
 * Get Turnstile site key (client-side only)
 */
export function getTurnstileSiteKey(): string {
  return process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY || ''
}
