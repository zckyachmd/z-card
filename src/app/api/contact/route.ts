/**
 * Contact Form API Route
 *
 * POST /api/contact
 * Handles contact form submissions
 */

import { NextResponse } from 'next/server'

import { sendContactEmail } from '@/lib/email'
import { checkRateLimit, getClientIP } from '@/lib/rate-limit'
import { validateRobot } from '@/lib/robot-validation'
import { verifyTurnstileToken } from '@/lib/turnstile'
import { isTurnstileEnabledServer } from '@/lib/turnstile-config'
import { validateContactForm } from '@/lib/validation'
import type { ContactFormResponse } from '@/types'

// Maximum request body size (1MB)
const MAX_BODY_SIZE = 1024 * 1024 // 1MB

export async function POST(request: Request) {
  try {
    // Validate Content-Type
    const contentType = request.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json<ContactFormResponse>(
        {
          success: false,
          error: 'Invalid content type. Expected application/json',
        },
        {
          status: 400,
        },
      )
    }

    // Check Content-Length to prevent DoS
    const contentLength = request.headers.get('content-length')
    if (contentLength) {
      const size = parseInt(contentLength, 10)
      if (size > MAX_BODY_SIZE) {
        return NextResponse.json<ContactFormResponse>(
          {
            success: false,
            error: 'Request body too large',
          },
          {
            status: 413,
          },
        )
      }
    }

    // Get client IP untuk rate limiting
    const clientIP = getClientIP(request)
    const rateLimit = checkRateLimit(clientIP)

    // Check rate limit
    if (!rateLimit.allowed) {
      return NextResponse.json<ContactFormResponse>(
        {
          success: false,
          error: 'Too many requests. Please try again later.',
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': process.env.RATE_LIMIT_MAX_REQUESTS || '5',
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimit.resetAt).toISOString(),
            'Retry-After': Math.ceil((rateLimit.resetAt - Date.now()) / 1000).toString(),
          },
        },
      )
    }

    // Parse request body with size limit
    let body: unknown
    try {
      // Read body as text first to check size
      const text = await request.text()
      if (text.length > MAX_BODY_SIZE) {
        return NextResponse.json<ContactFormResponse>(
          {
            success: false,
            error: 'Request body too large',
          },
          {
            status: 413,
          },
        )
      }

      // Parse JSON
      body = JSON.parse(text)
    } catch (error) {
      // Handle JSON parse errors
      if (error instanceof SyntaxError) {
        return NextResponse.json<ContactFormResponse>(
          {
            success: false,
            error: 'Invalid JSON in request body',
          },
          {
            status: 400,
          },
        )
      }
      // Re-throw other errors
      throw error
    }

    // Validate request data
    const validation = validateContactForm(body)
    if (!validation.success) {
      const firstError = validation.error.issues[0]
      return NextResponse.json<ContactFormResponse>(
        {
          success: false,
          error: firstError?.message || 'Validation failed',
          details: {
            field: firstError?.path[0]?.toString(),
          },
        },
        {
          status: 400,
        },
      )
    }

    // Cloudflare Turnstile verification
    // Note: Server checks CLOUDFLARE_TURNSTILE_SECRET_KEY, while client checks
    // NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY. Both keys should be configured
    // together for proper functionality. If only one is set, validation will be inconsistent.
    const turnstileEnabled = isTurnstileEnabledServer()
    if (turnstileEnabled) {
      const turnstileToken = validation.data.turnstileToken
      if (!turnstileToken) {
        return NextResponse.json<ContactFormResponse>(
          {
            success: false,
            error:
              'CAPTCHA verification required. Please ensure both NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY and CLOUDFLARE_TURNSTILE_SECRET_KEY are configured.',
          },
          {
            status: 400,
          },
        )
      }

      const turnstileResult = await verifyTurnstileToken(turnstileToken, clientIP)
      if (!turnstileResult.success) {
        console.warn('Turnstile verification failed:', turnstileResult.error, 'IP:', clientIP)
        return NextResponse.json<ContactFormResponse>(
          {
            success: false,
            error: 'CAPTCHA verification failed. Please try again.',
          },
          {
            status: 400,
          },
        )
      }
    }

    // Robot validation (fallback if Turnstile is not configured)
    const robotCheck = validateRobot({
      honeypot: validation.data.honeypot,
      submissionTime: validation.data.submissionTime,
    })

    if (robotCheck.isRobot) {
      console.warn('Robot detected:', robotCheck.reason, 'IP:', clientIP)
      // Return success to avoid revealing bot detection
      return NextResponse.json<ContactFormResponse>(
        {
          success: true,
          message: 'Message sent successfully',
        },
        {
          status: 200,
        },
      )
    }

    // Send email (only name, email, message - exclude honeypot, submissionTime, and turnstileToken)
    const {
      honeypot: _honeypot,
      submissionTime,
      turnstileToken: _turnstileToken,
      ...emailData
    } = validation.data

    // Get user agent from request headers
    const userAgent = request.headers.get('user-agent') || undefined

    // Prepare email metadata
    const emailMetadata = {
      timestamp: new Date().toISOString(),
      ipAddress: clientIP !== 'unknown' ? clientIP : undefined,
      submissionTime,
      userAgent,
    }

    const emailResult = await sendContactEmail(emailData, emailMetadata)

    // If email sending fails, still return success but log the error
    // This allows form submissions even when SMTP is misconfigured
    if (!emailResult.success) {
      console.error('Email sending failed:', emailResult.error)
      // Log submission to console as fallback
      // eslint-disable-next-line no-console
      console.log('Contact form submission (email failed):', {
        name: emailData.name,
        email: emailData.email,
        message: emailData.message,
        timestamp: new Date().toISOString(),
      })
      // Return success to user, but log the issue
      // In production, you might want to use a logging service or database
    }

    // Success response
    return NextResponse.json<ContactFormResponse>(
      {
        success: true,
        message: 'Message sent successfully',
      },
      {
        status: 200,
        headers: {
          'X-RateLimit-Limit': process.env.RATE_LIMIT_MAX_REQUESTS || '5',
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
          'X-RateLimit-Reset': new Date(rateLimit.resetAt).toISOString(),
        },
      },
    )
  } catch (error) {
    // Log full error for debugging (server-side only)
    console.error('Contact API error:', error)

    // Return generic error to client (prevent information disclosure)
    return NextResponse.json<ContactFormResponse>(
      {
        success: false,
        error: 'An error occurred while processing your request. Please try again later.',
      },
      {
        status: 500,
      },
    )
  }
}

// Only allow POST method
export async function GET() {
  return NextResponse.json<ContactFormResponse>(
    {
      success: false,
      error: 'Method not allowed',
    },
    {
      status: 405,
    },
  )
}
