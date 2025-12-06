/**
 * Email Service
 *
 * Email service menggunakan Nodemailer dengan SMTP
 */

import nodemailer from 'nodemailer'

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
    port: parseInt(process.env.SMTP_PORT!, 10),
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
  <title>New Contact Form Submission</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5; line-height: 1.6; color: #333;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5; padding: 20px;">
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); border-collapse: collapse; overflow: hidden;">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600; letter-spacing: -0.5px;">
                New Contact Form Submission
              </h1>
              <p style="margin: 8px 0 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">
                ${escapeHtml(formattedDate)}
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <!-- Contact Information -->
              <div style="margin-bottom: 32px;">
                <h2 style="margin: 0 0 20px 0; font-size: 18px; font-weight: 600; color: #1a1a1a; border-bottom: 2px solid #e5e5e5; padding-bottom: 12px;">
                  Contact Information
                </h2>
                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; width: 140px; font-weight: 600; color: #666; vertical-align: top;">
                      Name:
                    </td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #1a1a1a;">
                      ${escapeHtml(safeName)}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; width: 140px; font-weight: 600; color: #666; vertical-align: top;">
                      Email:
                    </td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #1a1a1a;">
                      <a href="mailto:${escapeHtml(safeEmail)}" style="color: #667eea; text-decoration: none;">
                        ${escapeHtml(safeEmail)}
                      </a>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Message -->
              <div style="margin-bottom: 32px;">
                <h2 style="margin: 0 0 20px 0; font-size: 18px; font-weight: 600; color: #1a1a1a; border-bottom: 2px solid #e5e5e5; padding-bottom: 12px;">
                  Message
                </h2>
                <div style="background-color: #f9f9f9; border-left: 4px solid #667eea; padding: 20px; border-radius: 4px; white-space: pre-wrap; color: #1a1a1a; line-height: 1.8;">
${escapeHtml(data.message)}
                </div>
              </div>

              <!-- Metadata -->
              <div style="margin-top: 32px; padding-top: 24px; border-top: 2px solid #e5e5e5;">
                <h3 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600; color: #666; text-transform: uppercase; letter-spacing: 0.5px;">
                  Submission Details
                </h3>
                <table role="presentation" style="width: 100%; border-collapse: collapse; font-size: 13px; color: #666;">
                  <tr>
                    <td style="padding: 8px 0; width: 140px; font-weight: 500;">
                      Submitted:
                    </td>
                    <td style="padding: 8px 0;">
                      ${escapeHtml(formattedDate)}
                    </td>
                  </tr>
                  ${
                    submissionTimeMs
                      ? `
                  <tr>
                    <td style="padding: 8px 0; width: 140px; font-weight: 500;">
                      Form Fill Time:
                    </td>
                    <td style="padding: 8px 0;">
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
                    <td style="padding: 8px 0; width: 140px; font-weight: 500;">
                      IP Address:
                    </td>
                    <td style="padding: 8px 0; font-family: monospace; font-size: 12px;">
                      ${escapeHtml(metadata.ipAddress)}
                    </td>
                  </tr>
                  `
                      : ''
                  }
                </table>
              </div>

              <!-- Action Button -->
              <div style="margin-top: 32px; text-align: center;">
                <a href="mailto:${escapeHtml(safeEmail)}?subject=Re: Contact Form Submission&body=Hi ${escapeHtml(safeName.split(' ')[0])},%0D%0A%0D%0AThank you for reaching out!%0D%0A%0D%0A"
                   style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-weight: 600; font-size: 14px; box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);">
                    Reply to ${escapeHtml(safeName.split(' ')[0])}
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9f9f9; padding: 24px 40px; text-align: center; border-top: 1px solid #e5e5e5;">
              <p style="margin: 0; color: #999; font-size: 12px; line-height: 1.6;">
                This email was sent from the contact form on <a href="https://zacky.id" style="color: #667eea; text-decoration: none;">zacky.id</a><br>
                <span style="color: #bbb;">Please do not reply directly to this email. Use the reply button above.</span>
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
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NEW CONTACT FORM SUBMISSION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📅 Submitted: ${formattedDate}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTACT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name:  ${safeName}
Email: ${safeEmail}
${metadata?.ipAddress ? `IP:    ${metadata.ipAddress}` : ''}
${submissionTimeMs ? `Time:  ${submissionTimeFormatted} (form fill time)` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MESSAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${data.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This email was sent from the contact form on zacky.id
Please reply to: ${safeEmail}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `.trim()

    const mailOptions = {
      from: `"${escapeHtml(data.name)}" <${process.env.SMTP_FROM_EMAIL}>`,
      to: process.env.SMTP_TO_EMAIL,
      replyTo: data.email,
      subject: `Contact Form: ${escapeHtml(data.name)}`,
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
