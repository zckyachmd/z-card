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
import { validateContactForm } from '@/lib/validation'
import type { ContactFormResponse } from '@/types'

export async function POST(request: Request) {
  try {
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

    // Parse request body
    let body: unknown
    try {
      body = await request.json()
    } catch {
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
    if (process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY) {
      const turnstileToken = validation.data.turnstileToken
      if (!turnstileToken) {
        return NextResponse.json<ContactFormResponse>(
          {
            success: false,
            error: 'CAPTCHA verification required',
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
      submissionTime: _submissionTime,
      turnstileToken: _turnstileToken,
      ...emailData
    } = validation.data
    const emailResult = await sendContactEmail(emailData)

    if (!emailResult.success) {
      console.error('Email sending failed:', emailResult.error)
      return NextResponse.json<ContactFormResponse>(
        {
          success: false,
          error: emailResult.error || 'Failed to send email',
        },
        {
          status: 500,
        },
      )
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
    console.error('Contact API error:', error)
    return NextResponse.json<ContactFormResponse>(
      {
        success: false,
        error: 'Internal server error',
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
