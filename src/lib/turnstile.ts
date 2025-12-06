/**
 * Cloudflare Turnstile Verification
 *
 * Server-side verification of Turnstile tokens
 */

interface TurnstileVerifyResponse {
  success: boolean
  'error-codes'?: string[]
  challenge_ts?: string
  hostname?: string
}

/**
 * Verify Turnstile token with Cloudflare
 */
export async function verifyTurnstileToken(
  token: string,
  remoteip?: string,
): Promise<{ success: boolean; error?: string }> {
  const secretKey = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY

  if (!secretKey) {
    console.warn('CLOUDFLARE_TURNSTILE_SECRET_KEY not set, skipping Turnstile verification')
    return { success: true } // Allow submission if Turnstile is not configured
  }

  if (!token) {
    return { success: false, error: 'Turnstile token is missing' }
  }

  try {
    const formData = new FormData()
    formData.append('secret', secretKey)
    formData.append('response', token)
    if (remoteip) {
      formData.append('remoteip', remoteip)
    }

    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
    })

    const result = (await response.json()) as TurnstileVerifyResponse

    if (!result.success) {
      const errors = result['error-codes'] || ['Unknown error']
      console.warn('Turnstile verification failed:', errors)
      return { success: false, error: errors.join(', ') }
    }

    return { success: true }
  } catch (error) {
    console.error('Turnstile verification error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Verification failed',
    }
  }
}
