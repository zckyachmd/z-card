import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { sendContactEmail } from '@/lib/email'

// Mock nodemailer - use vi.hoisted to make mocks accessible in tests
const { mockSendMail, mockCreateTransport } = vi.hoisted(() => {
  const mockSendMail = vi.fn()
  const mockCreateTransport = vi.fn(() => ({
    sendMail: mockSendMail,
  }))
  return { mockSendMail, mockCreateTransport }
})

vi.mock('nodemailer', () => ({
  default: {
    createTransport: mockCreateTransport,
  },
}))

describe('sendContactEmail', () => {
  const originalEnv = process.env

  beforeEach(() => {
    vi.clearAllMocks()
    // Reset environment variables
    process.env = {
      ...originalEnv,
      SMTP_HOST: 'smtp.example.com',
      SMTP_PORT: '587',
      SMTP_SECURE: 'false',
      SMTP_USER: 'user@example.com',
      SMTP_PASS: 'password',
      SMTP_FROM_EMAIL: 'from@example.com',
      SMTP_TO_EMAIL: 'to@example.com',
      SMTP_REJECT_UNAUTHORIZED: 'true',
    }
  })

  afterEach(() => {
    process.env = originalEnv
  })

  it('should send email successfully', async () => {
    mockSendMail.mockResolvedValue({
      messageId: 'test-message-id-123',
    })

    const result = await sendContactEmail({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Test message',
    })

    expect(result.success).toBe(true)
    expect(result.error).toBeUndefined()
    expect(mockSendMail).toHaveBeenCalledTimes(1)
    const callArgs = mockSendMail.mock.calls[0]?.[0]
    expect(callArgs).toMatchObject(
      expect.objectContaining({
        from: expect.stringContaining('John Doe'),
        to: 'to@example.com',
        replyTo: 'john@example.com',
        subject: expect.stringContaining('John Doe'),
      }),
    )
    expect(callArgs).toBeDefined()
  })

  it('should escape HTML in email content to prevent XSS', async () => {
    mockSendMail.mockResolvedValue({
      messageId: 'test-message-id-123',
    })

    await sendContactEmail({
      name: '<script>alert("XSS")</script>',
      email: 'test@example.com',
      message: 'Test <b>message</b> with <script>alert("XSS")</script>',
    })

    const callArgs = mockSendMail.mock.calls[0]?.[0]
    expect(callArgs?.html).not.toContain('<script>')
    expect(callArgs?.html).toContain('&lt;script&gt;')
    expect(callArgs?.html).toContain('&lt;b&gt;')
    expect(callArgs?.subject).not.toContain('<script>')
    expect(callArgs?.subject).toContain('&lt;script&gt;')
  })

  it('should convert newlines to <br> in HTML email', async () => {
    mockSendMail.mockResolvedValue({
      messageId: 'test-message-id-123',
    })

    await sendContactEmail({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Line 1\nLine 2\nLine 3',
    })

    const callArgs = mockSendMail.mock.calls[0]?.[0]
    expect(callArgs?.html).toContain('Line 1<br>Line 2<br>Line 3')
  })

  it('should include plain text version', async () => {
    mockSendMail.mockResolvedValue({
      messageId: 'test-message-id-123',
    })

    await sendContactEmail({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Test message',
    })

    const callArgs = mockSendMail.mock.calls[0]?.[0]
    expect(callArgs?.text).toContain('John Doe')
    expect(callArgs?.text).toContain('john@example.com')
    expect(callArgs?.text).toContain('Test message')
  })

  it('should return error when email sending fails', async () => {
    mockSendMail.mockRejectedValue(new Error('SMTP connection failed'))

    const result = await sendContactEmail({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Test message',
    })

    expect(result.success).toBe(false)
    expect(result.error).toBe('SMTP connection failed')
  })

  it('should return error when no messageId is returned', async () => {
    mockSendMail.mockResolvedValue({
      messageId: null,
    })

    const result = await sendContactEmail({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Test message',
    })

    expect(result.success).toBe(false)
    expect(result.error).toBe('Failed to send email: No message ID returned')
  })

  it('should return error when messageId is undefined', async () => {
    mockSendMail.mockResolvedValue({})

    const result = await sendContactEmail({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Test message',
    })

    expect(result.success).toBe(false)
    expect(result.error).toBe('Failed to send email: No message ID returned')
  })

  it('should handle unknown error types', async () => {
    mockSendMail.mockRejectedValue('String error')

    const result = await sendContactEmail({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Test message',
    })

    expect(result.success).toBe(false)
    expect(result.error).toBe('Unknown error occurred')
  })

  // Note: These tests check that getTransporter throws errors when env vars are missing
  // Since transporter is cached, we need to test the error handling in sendContactEmail
  // which catches and returns the error instead of throwing
  it('should return error when SMTP_HOST is not configured', async () => {
    const originalHost = process.env.SMTP_HOST
    delete process.env.SMTP_HOST
    // Clear transporter cache by accessing the module
    vi.resetModules()
    const { sendContactEmail: sendEmail } = await import('@/lib/email')

    const result = await sendEmail({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Test message',
    })

    expect(result.success).toBe(false)
    expect(result.error).toContain('SMTP_HOST')
    process.env.SMTP_HOST = originalHost
  })

  it('should return error when SMTP_PORT is not configured', async () => {
    const originalPort = process.env.SMTP_PORT
    delete process.env.SMTP_PORT
    vi.resetModules()
    const { sendContactEmail: sendEmail } = await import('@/lib/email')

    const result = await sendEmail({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Test message',
    })

    expect(result.success).toBe(false)
    expect(result.error).toContain('SMTP_PORT')
    process.env.SMTP_PORT = originalPort
  })

  it('should return error when SMTP_USER is not configured', async () => {
    const originalUser = process.env.SMTP_USER
    delete process.env.SMTP_USER
    vi.resetModules()
    const { sendContactEmail: sendEmail } = await import('@/lib/email')

    const result = await sendEmail({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Test message',
    })

    expect(result.success).toBe(false)
    expect(result.error).toContain('SMTP_USER')
    process.env.SMTP_USER = originalUser
  })

  it('should return error when SMTP_PASS is not configured', async () => {
    const originalPass = process.env.SMTP_PASS
    delete process.env.SMTP_PASS
    vi.resetModules()
    const { sendContactEmail: sendEmail } = await import('@/lib/email')

    const result = await sendEmail({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Test message',
    })

    expect(result.success).toBe(false)
    expect(result.error).toContain('SMTP_PASS')
    process.env.SMTP_PASS = originalPass
  })

  it('should return error when SMTP_FROM_EMAIL is not configured', async () => {
    const originalFrom = process.env.SMTP_FROM_EMAIL
    delete process.env.SMTP_FROM_EMAIL
    vi.resetModules()
    const { sendContactEmail: sendEmail } = await import('@/lib/email')

    const result = await sendEmail({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Test message',
    })

    expect(result.success).toBe(false)
    expect(result.error).toContain('SMTP_FROM_EMAIL')
    process.env.SMTP_FROM_EMAIL = originalFrom
  })

  it('should return error when SMTP_TO_EMAIL is not configured', async () => {
    const originalTo = process.env.SMTP_TO_EMAIL
    delete process.env.SMTP_TO_EMAIL
    vi.resetModules()
    const { sendContactEmail: sendEmail } = await import('@/lib/email')

    const result = await sendEmail({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Test message',
    })

    expect(result.success).toBe(false)
    expect(result.error).toContain('SMTP_TO_EMAIL')
    process.env.SMTP_TO_EMAIL = originalTo
  })

  it('should use SMTP_SECURE from environment', async () => {
    process.env.SMTP_SECURE = 'true'
    // Reset module to clear transporter cache
    vi.resetModules()
    const { sendContactEmail: sendEmail } = await import('@/lib/email')
    const nodemailerMock = await import('nodemailer')
    const mockCreateTransport = nodemailerMock.default.createTransport as unknown as ReturnType<typeof vi.fn>
    const mockSendMailFn = vi.fn().mockResolvedValue({
      messageId: 'test-message-id-123',
    })
    mockCreateTransport.mockReturnValue({
      sendMail: mockSendMailFn,
    } as never)

    await sendEmail({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Test message',
    })

    expect(mockCreateTransport).toHaveBeenCalledWith(
      expect.objectContaining({
        secure: true,
      }),
    )
  })

  it('should use SMTP_REJECT_UNAUTHORIZED from environment', async () => {
    process.env.SMTP_REJECT_UNAUTHORIZED = 'false'
    // Reset module to clear transporter cache
    vi.resetModules()
    const { sendContactEmail: sendEmail } = await import('@/lib/email')
    const nodemailerMock = await import('nodemailer')
    const mockCreateTransport = nodemailerMock.default.createTransport as unknown as ReturnType<typeof vi.fn>
    const mockSendMailFn = vi.fn().mockResolvedValue({
      messageId: 'test-message-id-123',
    })
    mockCreateTransport.mockReturnValue({
      sendMail: mockSendMailFn,
    } as never)

    await sendEmail({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Test message',
    })

    expect(mockCreateTransport).toHaveBeenCalledWith(
      expect.objectContaining({
        tls: expect.objectContaining({
          rejectUnauthorized: false,
        }),
      }),
    )
  })

  afterEach(() => {
    vi.clearAllMocks()
  })
})
