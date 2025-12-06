/**
 * Validation Schemas
 *
 * Zod schemas untuk form validation
 */

import { z } from 'zod'

import { isTurnstileEnabledServer } from '@/lib/turnstile-config'

/**
 * Base contact form validation schema
 * turnstileToken is optional in base schema, but will be conditionally validated
 */
const baseContactFormSchema = z.object({
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
  // Note: Optional in schema, but conditionally required when CLOUDFLARE_TURNSTILE_SECRET_KEY is set
  // Client-side checks NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY to show widget
  // Both keys should be configured together for proper functionality
  turnstileToken: z.string().optional(),
})

/**
 * Contact form validation schema with conditional Turnstile validation
 * This adds a refinement that requires turnstileToken when Turnstile is enabled on server
 */
export const contactFormSchema = baseContactFormSchema.superRefine((data, ctx) => {
  // If Turnstile is enabled on server but no token provided, add error
  if (isTurnstileEnabledServer() && !data.turnstileToken) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message:
        'CAPTCHA verification required. Please ensure both NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY and CLOUDFLARE_TURNSTILE_SECRET_KEY are configured.',
      path: ['turnstileToken'],
    })
  }
})

export type ContactFormInput = z.infer<typeof baseContactFormSchema>

/**
 * Validate contact form data
 * Includes conditional validation for Turnstile token
 */
export function validateContactForm(data: unknown) {
  return contactFormSchema.safeParse(data)
}
