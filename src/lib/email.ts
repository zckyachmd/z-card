/**
 * Email Service
 *
 * Email service menggunakan Nodemailer dengan SMTP
 */

import nodemailer from 'nodemailer'

import type { ContactFormData } from '@/types'

// Create reusable transporter
let transporter: nodemailer.Transporter | null = null

/**
 * Initialize email transporter
 */
function getTransporter(): nodemailer.Transporter {
  if (transporter) {
    return transporter
  }

  // Validate required environment variables
  if (!process.env.SMTP_HOST) {
    throw new Error('SMTP_HOST is not configured')
  }

  if (!process.env.SMTP_PORT) {
    throw new Error('SMTP_PORT is not configured')
  }

  if (!process.env.SMTP_USER) {
    throw new Error('SMTP_USER is not configured')
  }

  if (!process.env.SMTP_PASS) {
    throw new Error('SMTP_PASS is not configured')
  }

  if (!process.env.SMTP_FROM_EMAIL) {
    throw new Error('SMTP_FROM_EMAIL is not configured')
  }

  if (!process.env.SMTP_TO_EMAIL) {
    throw new Error('SMTP_TO_EMAIL is not configured')
  }

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    // Optional: Add TLS options
    tls: {
      rejectUnauthorized: process.env.SMTP_REJECT_UNAUTHORIZED !== 'false',
    },
  })

  return transporter
}

/**
 * Send contact form email
 */
export async function sendContactEmail(
  data: ContactFormData,
): Promise<{ success: boolean; error?: string }> {
  try {
    const mailTransporter = getTransporter()

    const mailOptions = {
      from: `"${escapeHtml(data.name)}" <${process.env.SMTP_FROM_EMAIL}>`,
      to: process.env.SMTP_TO_EMAIL,
      replyTo: data.email,
      subject: `Contact Form: ${escapeHtml(data.name)}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(data.message).replace(/\n/g, '<br>')}</p>
      `,
      text: `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}

Message:
${data.message}
      `.trim(),
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
