import { afterEach, describe, expect, it, vi } from 'vitest'
import { trackEvent, validMeasurementId } from '@/lib/analytics'
describe('analytics', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })
  it('rejects missing and malformed configuration', () => {
    expect(validMeasurementId(undefined)).toBe(false)
    expect(validMeasurementId('G-TEST123')).toBe(true)
    expect(validMeasurementId('G-x<script>')).toBe(false)
  })
  it('sends no event before consent and never accepts form payloads', () => {
    const gtag = vi.fn()
    vi.stubGlobal('window', { location: { pathname: '/contact' }, gtag, analyticsAllowed: false })
    trackEvent('contact_start')
    expect(gtag).not.toHaveBeenCalled()
    vi.stubGlobal('window', { location: { pathname: '/contact' }, gtag, analyticsAllowed: true })
    trackEvent('contact_start')
    expect(gtag).toHaveBeenCalledWith('event', 'contact_start', { page_path: '/contact' })
  })
})
