import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import {
  areEmailServicesAvailable,
  isTurnstileEnabledServer,
  isTurnstileFullyConfigured,
  getTurnstileSiteKeyServer,
} from '@/lib/turnstile-config'

describe('Turnstile Configuration', () => {
  const originalEnv = process.env

  beforeEach(() => {
    // Reset environment variables
    process.env = { ...originalEnv }
  })

  afterEach(() => {
    process.env = originalEnv
  })

  describe('areEmailServicesAvailable', () => {
    it('should return true when SMTP is configured', () => {
      process.env.SMTP_HOST = 'smtp.example.com'
      process.env.SMTP_PORT = '587'
      process.env.SMTP_FROM_EMAIL = 'from@example.com'
      process.env.SMTP_TO_EMAIL = 'to@example.com'

      expect(areEmailServicesAvailable()).toBe(true)
    })

    it('should return true when Turnstile is fully configured', () => {
      process.env.CLOUDFLARE_TURNSTILE_SITE_KEY = 'site-key'
      process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY = 'secret-key'

      expect(areEmailServicesAvailable()).toBe(true)
    })

    it('should return true when both SMTP and Turnstile are configured', () => {
      process.env.SMTP_HOST = 'smtp.example.com'
      process.env.SMTP_PORT = '587'
      process.env.SMTP_FROM_EMAIL = 'from@example.com'
      process.env.SMTP_TO_EMAIL = 'to@example.com'
      process.env.CLOUDFLARE_TURNSTILE_SITE_KEY = 'site-key'
      process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY = 'secret-key'

      expect(areEmailServicesAvailable()).toBe(true)
    })

    it('should return false when neither SMTP nor Turnstile are configured', () => {
      // Ensure no relevant env vars are set
      delete process.env.SMTP_HOST
      delete process.env.SMTP_PORT
      delete process.env.SMTP_FROM_EMAIL
      delete process.env.SMTP_TO_EMAIL
      delete process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY
      delete process.env.CLOUDFLARE_TURNSTILE_SITE_KEY

      expect(areEmailServicesAvailable()).toBe(false)
    })

    it('should return false when SMTP is partially configured', () => {
      process.env.SMTP_HOST = 'smtp.example.com'
      // Missing other required SMTP vars
      delete process.env.SMTP_PORT
      delete process.env.SMTP_FROM_EMAIL
      delete process.env.SMTP_TO_EMAIL
      delete process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY
      delete process.env.CLOUDFLARE_TURNSTILE_SITE_KEY

      expect(areEmailServicesAvailable()).toBe(false)
    })
  })

  describe('isTurnstileEnabledServer', () => {
    it('should return true when CLOUDFLARE_TURNSTILE_SECRET_KEY is set', () => {
      process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY = 'secret-key'
      expect(isTurnstileEnabledServer()).toBe(true)
    })

    it('should return false when CLOUDFLARE_TURNSTILE_SECRET_KEY is not set', () => {
      delete process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY
      expect(isTurnstileEnabledServer()).toBe(false)
    })
  })

  describe('isTurnstileFullyConfigured', () => {
    it('should return true when site and secret keys are set', () => {
      process.env.CLOUDFLARE_TURNSTILE_SITE_KEY = 'site-key'
      process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY = 'secret-key'
      expect(isTurnstileFullyConfigured()).toBe(true)
    })

    it('should return false when only site key is set', () => {
      process.env.CLOUDFLARE_TURNSTILE_SITE_KEY = 'site-key'
      delete process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY
      expect(isTurnstileFullyConfigured()).toBe(false)
    })

    it('should return false when only secret key is set', () => {
      process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY = 'secret-key'
      delete process.env.CLOUDFLARE_TURNSTILE_SITE_KEY
      expect(isTurnstileFullyConfigured()).toBe(false)
    })
  })

  describe('getTurnstileSiteKeyServer', () => {
    it('should prefer CLOUDFLARE_TURNSTILE_SITE_KEY over NEXT_PUBLIC', () => {
      process.env.CLOUDFLARE_TURNSTILE_SITE_KEY = 'site-key'
      process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY = 'public-key'
      expect(getTurnstileSiteKeyServer()).toBe('site-key')
    })

    it('should fallback to NEXT_PUBLIC when server key is missing', () => {
      delete process.env.CLOUDFLARE_TURNSTILE_SITE_KEY
      process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY = 'public-key'
      expect(getTurnstileSiteKeyServer()).toBe('public-key')
    })
  })
})
