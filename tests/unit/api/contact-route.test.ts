import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { POST, GET } from '@/app/api/contact/route'
import { validateRobot } from '@/lib/robot-validation'
import { validateContactForm } from '@/lib/validation'
import { sendContactEmail } from '@/lib/email'

// Mock dependencies
vi.mock('@/lib/rate-limit', () => ({
  checkRateLimit: vi.fn(),
  getClientIP: vi.fn(),
}))

vi.mock('@/lib/robot-validation', () => ({
  validateRobot: vi.fn(),
}))

vi.mock('@/lib/validation', () => ({
  validateContactForm: vi.fn(),
}))

vi.mock('@/lib/email', () => ({
  sendContactEmail: vi.fn(),
}))

// Mock NextResponse
vi.mock('next/server', () => ({
  NextResponse: {
    json: vi.fn((body, init) => ({
      json: async () => body,
      status: init?.status || 200,
      headers: new Headers(init?.headers),
    })),
  },
}))

describe('POST /api/contact', () => {
  const originalEnv = process.env

  beforeEach(() => {
    vi.clearAllMocks()
    process.env = {
      ...originalEnv,
      RATE_LIMIT_MAX_REQUESTS: '5',
    }
  })

  afterEach(() => {
    process.env = originalEnv
  })

  it('should return 429 when rate limit is exceeded', async () => {
    const { checkRateLimit } = await import('@/lib/rate-limit')
    const { getClientIP } = await import('@/lib/rate-limit')
    vi.mocked(getClientIP).mockReturnValue('127.0.0.1')
    vi.mocked(checkRateLimit).mockReturnValue({
      allowed: false,
      remaining: 0,
      resetAt: Date.now() + 60000,
    })

    const request = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message with enough characters.',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(data.success).toBe(false)
    expect(data.error).toBe('Too many requests. Please try again later.')
    expect(response.status).toBe(429)
  })

  it('should return 400 when request body is invalid JSON', async () => {
    const { checkRateLimit } = await import('@/lib/rate-limit')
    const { getClientIP } = await import('@/lib/rate-limit')
    vi.mocked(getClientIP).mockReturnValue('127.0.0.1')
    vi.mocked(checkRateLimit).mockReturnValue({
      allowed: true,
      remaining: 4,
      resetAt: Date.now() + 60000,
    })

    const request = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: 'invalid json',
    })

    const response = await POST(request)
    const data = await response.json()

    expect(data.success).toBe(false)
    expect(data.error).toBe('Invalid JSON in request body')
    expect(response.status).toBe(400)
  })

  it('should return 400 when validation fails', async () => {
    const { checkRateLimit } = await import('@/lib/rate-limit')
    const { getClientIP } = await import('@/lib/rate-limit')
    vi.mocked(getClientIP).mockReturnValue('127.0.0.1')
    vi.mocked(checkRateLimit).mockReturnValue({
      allowed: true,
      remaining: 4,
      resetAt: Date.now() + 60000,
    })
    vi.mocked(validateContactForm).mockReturnValue({
      success: false,
      error: {
        issues: [{ path: ['email'], message: 'Invalid email address' }],
      },
    } as never)

    const request = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'John Doe',
        email: 'invalid-email',
        message: 'Test message with enough characters.',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(data.success).toBe(false)
    expect(data.error).toBe('Invalid email address')
    expect(data.details?.field).toBe('email')
    expect(response.status).toBe(400)
  })

  it('should return 200 when robot is detected (silent success)', async () => {
    const { checkRateLimit } = await import('@/lib/rate-limit')
    const { getClientIP } = await import('@/lib/rate-limit')
    vi.mocked(getClientIP).mockReturnValue('127.0.0.1')
    vi.mocked(checkRateLimit).mockReturnValue({
      allowed: true,
      remaining: 4,
      resetAt: Date.now() + 60000,
    })
    vi.mocked(validateContactForm).mockReturnValue({
      success: true,
      data: {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message with enough characters.',
        honeypot: 'filled',
        submissionTime: 1000,
      },
    } as never)
    vi.mocked(validateRobot).mockReturnValue({
      isRobot: true,
      reason: 'Honeypot field filled',
    })

    const request = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message with enough characters.',
        honeypot: 'filled',
        submissionTime: 1000,
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(data.success).toBe(true)
    expect(data.message).toBe('Message sent successfully')
    expect(response.status).toBe(200)
  })

  it('should send email and return 200 on success', async () => {
    const { checkRateLimit } = await import('@/lib/rate-limit')
    const { getClientIP } = await import('@/lib/rate-limit')
    vi.mocked(getClientIP).mockReturnValue('127.0.0.1')
    vi.mocked(checkRateLimit).mockReturnValue({
      allowed: true,
      remaining: 4,
      resetAt: Date.now() + 60000,
    })
    vi.mocked(validateContactForm).mockReturnValue({
      success: true,
      data: {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message with enough characters.',
        honeypot: '',
        submissionTime: 5000,
      },
    } as never)
    vi.mocked(validateRobot).mockReturnValue({
      isRobot: false,
    })
    vi.mocked(sendContactEmail).mockResolvedValue({
      success: true,
    })

    const request = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message with enough characters.',
        honeypot: '',
        submissionTime: 5000,
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(data.success).toBe(true)
    expect(data.message).toBe('Message sent successfully')
    expect(response.status).toBe(200)
    expect(sendContactEmail).toHaveBeenCalledWith(
      {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message with enough characters.',
      },
      expect.objectContaining({
        ipAddress: '127.0.0.1',
        submissionTime: 5000,
      }),
    )
  })

  it('should return 200 even when email sending fails', async () => {
    const { checkRateLimit } = await import('@/lib/rate-limit')
    const { getClientIP } = await import('@/lib/rate-limit')
    vi.mocked(getClientIP).mockReturnValue('127.0.0.1')
    vi.mocked(checkRateLimit).mockReturnValue({
      allowed: true,
      remaining: 4,
      resetAt: Date.now() + 60000,
    })
    vi.mocked(validateContactForm).mockReturnValue({
      success: true,
      data: {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message with enough characters.',
        honeypot: '',
        submissionTime: 5000,
      },
    } as never)
    vi.mocked(validateRobot).mockReturnValue({
      isRobot: false,
    })
    vi.mocked(sendContactEmail).mockResolvedValue({
      success: false,
      error: 'SMTP connection failed',
    })

    const request = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message with enough characters.',
        honeypot: '',
        submissionTime: 5000,
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(data.success).toBe(true)
    expect(data.message).toBe('Message sent successfully')
    expect(response.status).toBe(200)
  })

  it('should return 500 on unexpected error', async () => {
    const { getClientIP } = await import('@/lib/rate-limit')
    vi.mocked(getClientIP).mockImplementation(() => {
      throw new Error('Unexpected error')
    })

    const request = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message with enough characters.',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(data.success).toBe(false)
    expect(data.error).toBe(
      'An error occurred while processing your request. Please try again later.',
    )
    expect(response.status).toBe(500)
  })

  it('should exclude honeypot and submissionTime from email data', async () => {
    const { checkRateLimit } = await import('@/lib/rate-limit')
    const { getClientIP } = await import('@/lib/rate-limit')
    vi.mocked(getClientIP).mockReturnValue('127.0.0.1')
    vi.mocked(checkRateLimit).mockReturnValue({
      allowed: true,
      remaining: 4,
      resetAt: Date.now() + 60000,
    })
    vi.mocked(validateContactForm).mockReturnValue({
      success: true,
      data: {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message with enough characters.',
        honeypot: 'should-not-be-sent',
        submissionTime: 5000,
      },
    } as never)
    vi.mocked(validateRobot).mockReturnValue({
      isRobot: false,
    })
    vi.mocked(sendContactEmail).mockResolvedValue({
      success: true,
    })

    const request = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message with enough characters.',
        honeypot: 'should-not-be-sent',
        submissionTime: 5000,
      }),
    })

    await POST(request)

    expect(sendContactEmail).toHaveBeenCalledWith(
      {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message with enough characters.',
      },
      expect.objectContaining({
        ipAddress: '127.0.0.1',
        submissionTime: 5000,
      }),
    )
    expect(sendContactEmail).not.toHaveBeenCalledWith(
      expect.objectContaining({
        honeypot: expect.anything(),
        submissionTime: expect.anything(),
      }),
    )
  })
})

describe('GET /api/contact', () => {
  it('should return 405 Method Not Allowed', async () => {
    const response = await GET()
    const data = await response.json()

    expect(data.success).toBe(false)
    expect(data.error).toBe('Method not allowed')
    expect(response.status).toBe(405)
  })
})
