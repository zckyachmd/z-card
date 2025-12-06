import { beforeEach, describe, expect, it } from 'vitest'

import { checkRateLimit, getClientIP } from '@/lib/rate-limit'

describe('checkRateLimit', () => {
  beforeEach(() => {
    // Reset environment variables
    delete process.env.RATE_LIMIT_MAX_REQUESTS
    delete process.env.RATE_LIMIT_WINDOW_MS
  })

  it('should allow first request', () => {
    const result = checkRateLimit('127.0.0.1')
    expect(result.allowed).toBe(true)
    expect(result.remaining).toBeGreaterThan(0)
    expect(result.resetAt).toBeGreaterThan(Date.now())
  })

  it('should use default max requests (5)', () => {
    // Use unique IP to avoid conflicts with other tests
    const ip = `127.0.0.${Date.now()}`
    const results = []
    for (let i = 0; i < 5; i++) {
      results.push(checkRateLimit(ip))
    }
    expect(results[4]?.allowed).toBe(true)
    expect(results[4]?.remaining).toBe(0)

    // 6th request should be blocked
    const blocked = checkRateLimit(ip)
    expect(blocked.allowed).toBe(false)
    expect(blocked.remaining).toBe(0)
  })

  it('should use custom RATE_LIMIT_MAX_REQUESTS from environment', () => {
    process.env.RATE_LIMIT_MAX_REQUESTS = '3'
    const ip = '192.168.1.1'
    const results = []
    for (let i = 0; i < 3; i++) {
      results.push(checkRateLimit(ip))
    }
    expect(results[2]?.allowed).toBe(true)
    expect(results[2]?.remaining).toBe(0)

    // 4th request should be blocked
    const blocked = checkRateLimit(ip)
    expect(blocked.allowed).toBe(false)
  })

  it('should use custom RATE_LIMIT_WINDOW_MS from environment', () => {
    process.env.RATE_LIMIT_WINDOW_MS = '10000' // 10 seconds
    const result = checkRateLimit('10.0.0.1')
    const expectedResetAt = Date.now() + 10000
    // Allow 100ms tolerance
    expect(result.resetAt).toBeGreaterThanOrEqual(expectedResetAt - 100)
    expect(result.resetAt).toBeLessThanOrEqual(expectedResetAt + 100)
  })

  it('should track requests per IP independently', () => {
    // Use unique IPs to avoid conflicts with other tests
    const ip1 = `127.0.0.${Date.now()}`
    const ip2 = `192.168.1.${Date.now() + 1}`

    // Make 3 requests from IP1
    checkRateLimit(ip1)
    checkRateLimit(ip1)
    checkRateLimit(ip1)

    // Make 1 request from IP2
    const ip2Result = checkRateLimit(ip2)
    expect(ip2Result.allowed).toBe(true)
    expect(ip2Result.remaining).toBe(4) // Should have 4 remaining (5 - 1)
  })

  it('should reset after window expires', async () => {
    process.env.RATE_LIMIT_WINDOW_MS = '100' // 100ms window
    const ip = '172.16.0.1'

    // Exhaust limit
    for (let i = 0; i < 5; i++) {
      checkRateLimit(ip)
    }
    const blocked = checkRateLimit(ip)
    expect(blocked.allowed).toBe(false)

    // Wait for window to expire
    await new Promise(resolve => setTimeout(resolve, 150))

    // Should be allowed again
    const allowed = checkRateLimit(ip)
    expect(allowed.allowed).toBe(true)
    expect(allowed.remaining).toBe(4)
  })

  it('should return correct remaining count', () => {
    process.env.RATE_LIMIT_MAX_REQUESTS = '5'
    // Use unique IP to avoid conflicts with other tests
    const ip = `10.0.0.${Date.now()}`

    const result1 = checkRateLimit(ip)
    expect(result1.remaining).toBe(4) // 5 - 1 = 4

    const result2 = checkRateLimit(ip)
    expect(result2.remaining).toBe(3) // 5 - 2 = 3

    const result3 = checkRateLimit(ip)
    expect(result3.remaining).toBe(2) // 5 - 3 = 2
  })

  it('should return resetAt timestamp', () => {
    const ip = '192.168.0.1'
    const result = checkRateLimit(ip)
    expect(result.resetAt).toBeGreaterThan(Date.now())
    expect(result.resetAt).toBeLessThanOrEqual(Date.now() + 60000) // Default 60s window
  })
})

describe('getClientIP', () => {
  it('should extract IP from x-forwarded-for header', () => {
    const request = new Request('http://example.com', {
      headers: {
        'x-forwarded-for': '192.168.1.1, 10.0.0.1',
      },
    })
    const ip = getClientIP(request)
    expect(ip).toBe('192.168.1.1')
  })

  it('should use first IP from x-forwarded-for when multiple present', () => {
    const request = new Request('http://example.com', {
      headers: {
        'x-forwarded-for': '203.0.113.1, 198.51.100.1, 192.0.2.1',
      },
    })
    const ip = getClientIP(request)
    expect(ip).toBe('203.0.113.1')
  })

  it('should trim whitespace from x-forwarded-for IP', () => {
    const request = new Request('http://example.com', {
      headers: {
        'x-forwarded-for': '  192.168.1.1  ',
      },
    })
    const ip = getClientIP(request)
    expect(ip).toBe('192.168.1.1')
  })

  it('should use x-real-ip header when x-forwarded-for is not present', () => {
    const request = new Request('http://example.com', {
      headers: {
        'x-real-ip': '10.0.0.1',
      },
    })
    const ip = getClientIP(request)
    expect(ip).toBe('10.0.0.1')
  })

  it('should prefer x-forwarded-for over x-real-ip', () => {
    const request = new Request('http://example.com', {
      headers: {
        'x-forwarded-for': '192.168.1.1',
        'x-real-ip': '10.0.0.1',
      },
    })
    const ip = getClientIP(request)
    expect(ip).toBe('192.168.1.1')
  })

  it('should return "unknown" when no IP headers are present', () => {
    const request = new Request('http://example.com')
    const ip = getClientIP(request)
    expect(ip).toBe('unknown')
  })

  it('should handle empty x-forwarded-for header', () => {
    const request = new Request('http://example.com', {
      headers: {
        'x-forwarded-for': '',
      },
    })
    const ip = getClientIP(request)
    expect(ip).toBe('unknown')
  })
})
