/**
 * Contact Form Type Definitions
 */

export interface ContactFormData {
  name: string
  email: string
  message: string
  honeypot?: string // Hidden field untuk bot detection
  submissionTime?: number // Time from form load to submit (ms)
}

export interface ContactFormResponse {
  success: boolean
  message?: string
  error?: string
  details?: {
    field?: string
    [key: string]: unknown
  }
}
