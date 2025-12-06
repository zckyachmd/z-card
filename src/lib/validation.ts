/**
 * Validation Schemas
 *
 * Zod schemas untuk form validation
 */

import { z } from 'zod'

/**
 * Contact form validation schema
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .trim(),
  email: z
    .string()
    .min(1, 'Email is required')
    .trim()
    .email('Invalid email address')
    .max(255, 'Email must be less than 255 characters')
    .toLowerCase(),
  message: z
    .string()
    .min(1, 'Message is required')
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message must be less than 5000 characters')
    .trim(),
  // Honeypot field (hidden from users, bots will fill it)
  honeypot: z.string().optional().default(''),
  // Submission time in milliseconds (from form load to submit)
  submissionTime: z.number().optional(),
  // Cloudflare Turnstile token
  turnstileToken: z.string().optional(),
})

export type ContactFormInput = z.infer<typeof contactFormSchema>

/**
 * Validate contact form data
 */
export function validateContactForm(data: unknown) {
  return contactFormSchema.safeParse(data)
}
