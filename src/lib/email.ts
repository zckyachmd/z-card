/**
 * Email Service
 *
 * Email service menggunakan Nodemailer dengan SMTP
 */

import nodemailer from 'nodemailer'

import { getIntEnv } from '@/lib/env'
import type { ContactFormData } from '@/types'

interface EmailMetadata {
  timestamp?: string
  ipAddress?: string
  submissionTime?: number
  userAgent?: string
}

// Create reusable transporter
let transporter: nodemailer.Transporter | null = null

/**
 * Check if SMTP is configured
 */
export function isSMTPConfigured(): boolean {
  return !!(
    process.env.SMTP_HOST &&
    process.env.SMTP_PORT &&
    process.env.SMTP_FROM_EMAIL &&
    process.env.SMTP_TO_EMAIL
  )
}

/**
 * Initialize email transporter
 * Returns null if SMTP is not configured (graceful fallback)
 */
function getTransporter(): nodemailer.Transporter | null {
  if (transporter) {
    return transporter
  }

  // Check if SMTP is configured (some SMTP servers don't require auth)
  if (!isSMTPConfigured()) {
    return null
  }

  // For SMTP servers that require authentication
  const requiresAuth = process.env.SMTP_USER && process.env.SMTP_PASS

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST!,
    port: getIntEnv('SMTP_PORT', 587),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    ...(requiresAuth && {
      auth: {
        user: process.env.SMTP_USER!,
        pass: process.env.SMTP_PASS!,
      },
    }),
    // Optional: Add TLS options
    tls: {
      rejectUnauthorized: process.env.SMTP_REJECT_UNAUTHORIZED !== 'false',
    },
  })

  return transporter
}

/**
 * Send contact form email
 * Returns success even if SMTP is not configured (logs to console instead)
 */
export async function sendContactEmail(
  data: ContactFormData,
  metadata?: EmailMetadata,
): Promise<{ success: boolean; error?: string; warning?: string }> {
  const mailTransporter = getTransporter()

  // If SMTP is not configured, log to console and return success
  if (!mailTransporter) {
    const submissionText = `
New Contact Form Submission (SMTP not configured - logged to console)

Name: ${data.name}
Email: ${data.email}

Message:
${data.message}
    `.trim()

    // eslint-disable-next-line no-console
    console.log('='.repeat(60))
    // eslint-disable-next-line no-console
    console.log('CONTACT FORM SUBMISSION (SMTP not configured)')
    // eslint-disable-next-line no-console
    console.log('='.repeat(60))
    // eslint-disable-next-line no-console
    console.log(submissionText)
    // eslint-disable-next-line no-console
    console.log('='.repeat(60))

    return {
      success: true,
      warning: 'SMTP is not configured. Submission logged to server console.',
    }
  }

  try {
    // Prevent email header injection
    const safeName = sanitizeEmailHeader(data.name)
    const safeEmail = sanitizeEmailHeader(data.email)

    // Validate email format to prevent header injection
    if (!isValidEmailFormat(safeEmail)) {
      return {
        success: false,
        error: 'Invalid email format',
      }
    }

    const timestamp = metadata?.timestamp || new Date().toISOString()
    const formattedDate = new Date(timestamp).toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
    })

    // Format submission time if available
    const submissionTimeMs = metadata?.submissionTime
    const submissionTimeFormatted = submissionTimeMs
      ? submissionTimeMs < 1000
        ? `${submissionTimeMs}ms`
        : `${(submissionTimeMs / 1000).toFixed(1)}s`
      : 'N/A'

    const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact Form Message</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8f9fa; line-height: 1.6; color: #333;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f8f9fa; padding: 20px;">
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border: 1px solid #e1e5e9; border-radius: 6px; border-collapse: collapse; overflow: hidden;">
          <!-- Header -->
          <tr>
            <td style="background-color: #f8f9fa; border-bottom: 1px solid #e1e5e9; padding: 24px 30px; text-align: left;">
              <h1 style="margin: 0; color: #1a1a1a; font-size: 20px; font-weight: 600;">
                Contact Form Message
              </h1>
              <p style="margin: 4px 0 0 0; color: #6c757d; font-size: 14px;">
                Received on ${escapeHtml(formattedDate)}
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 30px;">
              <!-- Contact Information -->
              <div style="margin-bottom: 24px;">
                <h2 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: #1a1a1a; border-bottom: 1px solid #dee2e6; padding-bottom: 8px;">
                  Sender Details
                </h2>
                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; width: 120px; font-weight: 500; color: #495057; vertical-align: top;">
                      Name:
                    </td>
                    <td style="padding: 8px 0; color: #212529;">
                      ${escapeHtml(safeName)}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; width: 120px; font-weight: 500; color: #495057; vertical-align: top;">
                      Email:
                    </td>
                    <td style="padding: 8px 0; color: #212529;">
                      <a href="mailto:${escapeHtml(safeEmail)}" style="color: #0066cc; text-decoration: none;">
                        ${escapeHtml(safeEmail)}
                      </a>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Message -->
              <div style="margin-bottom: 24px;">
                <h2 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: #1a1a1a; border-bottom: 1px solid #dee2e6; padding-bottom: 8px;">
                  Message Content
                </h2>
                <div style="background-color: #f8f9fa; border: 1px solid #dee2e6; padding: 16px; border-radius: 4px; white-space: pre-wrap; color: #212529; line-height: 1.5; font-family: 'Courier New', monospace; font-size: 14px;">
${escapeHtml(data.message)}
                </div>
              </div>

              <!-- Metadata -->
              <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #dee2e6;">
                <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #495057;">
                  Technical Details
                </h3>
                <table role="presentation" style="width: 100%; border-collapse: collapse; font-size: 13px; color: #6c757d;">
                  <tr>
                    <td style="padding: 4px 0; width: 120px; font-weight: 500;">
                      Timestamp:
                    </td>
                    <td style="padding: 4px 0;">
                      ${escapeHtml(formattedDate)}
                    </td>
                  </tr>
                  ${
                    submissionTimeMs
                      ? `
                  <tr>
                    <td style="padding: 4px 0; width: 120px; font-weight: 500;">
                      Form time:
                    </td>
                    <td style="padding: 4px 0;">
                      ${submissionTimeFormatted}
                    </td>
                  </tr>
                  `
                      : ''
                  }
                  ${
                    metadata?.ipAddress
                      ? `
                  <tr>
                    <td style="padding: 4px 0; width: 120px; font-weight: 500;">
                      IP:
                    </td>
                    <td style="padding: 4px 0; font-family: 'Courier New', monospace; font-size: 12px;">
                      ${escapeHtml(metadata.ipAddress)}
                    </td>
                  </tr>
                  `
                      : ''
                  }
                </table>
              </div>

              <!-- Action Button -->
              <div style="margin-top: 24px; text-align: center; padding-top: 16px; border-top: 1px solid #dee2e6;">
                <a href="mailto:${escapeHtml(safeEmail)}?subject=Re: Contact Form Message&body=Hi ${escapeHtml(safeName.split(' ')[0])},%0D%0A%0D%0AThank you for your message.%0D%0A%0D%0A"
                   style="display: inline-block; background-color: #007bff; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 4px; font-weight: 500; font-size: 14px;">
                    Reply to ${escapeHtml(safeName.split(' ')[0])}
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 20px 30px; text-align: center; border-top: 1px solid #dee2e6;">
              <p style="margin: 0; color: #6c757d; font-size: 12px; line-height: 1.4;">
                This message was sent via the contact form on <a href="https://zacky.id" style="color: #0066cc; text-decoration: none;">zacky.id</a><br>
                Please use the reply button above to respond.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim()

    const textTemplate = `
Contact Form Message
Received: ${formattedDate}

---
Sender Details:
Name:  ${safeName}
Email: ${safeEmail}

Message:
${data.message}

---
Technical Details:
${metadata?.ipAddress ? `IP Address: ${metadata.ipAddress}` : ''}
${submissionTimeMs ? `Form Fill Time: ${submissionTimeFormatted}` : ''}

---
This message was sent via the contact form on zacky.id
Please reply to: ${safeEmail}
    `.trim()

    const mailOptions = {
      from: `"${escapeHtml(data.name)}" <${process.env.SMTP_FROM_EMAIL}>`,
      to: process.env.SMTP_TO_EMAIL,
      replyTo: data.email,
      subject: `New message from ${escapeHtml(data.name)}`,
      html: htmlTemplate,
      text: textTemplate,
    }

    const info = await mailTransporter.sendMail(mailOptions)

    if (!info.messageId) {
      return {
        success: false,
        error: 'Failed to send email: No message ID returned',
      }
    }

    return {
      success: true,
    }
  } catch (error) {
    console.error('Email sending error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, m => map[m])
}

/**
 * Sanitize email header to prevent header injection
 * Removes newlines, carriage returns, and other dangerous characters
 */
function sanitizeEmailHeader(value: string): string {
  return value
    .replace(/[\r\n]/g, '') // Remove newlines and carriage returns
    .replace(/[<>]/g, '') // Remove angle brackets
    .trim()
    .slice(0, 100) // Limit length
}

/**
 * Validate email format (basic check)
 */
function isValidEmailFormat(email: string): boolean {
  // RFC 5322 compliant regex (simplified)
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  return emailRegex.test(email)
}
