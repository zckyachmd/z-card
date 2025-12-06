import { describe, expect, it } from 'vitest'

import { contactFormSchema, validateContactForm } from '@/lib/validation'

describe('contactFormSchema', () => {
  describe('name validation', () => {
    it('should accept valid name', () => {
      const result = contactFormSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'This is a valid message with enough characters.',
      })
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.name).toBe('John Doe')
      }
    })

    it('should reject empty name', () => {
      const result = contactFormSchema.safeParse({
        name: '',
        email: 'john@example.com',
        message: 'This is a valid message with enough characters.',
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe('Name is required')
      }
    })

    it('should reject name shorter than 2 characters', () => {
      const result = contactFormSchema.safeParse({
        name: 'J',
        email: 'john@example.com',
        message: 'This is a valid message with enough characters.',
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe('Name must be at least 2 characters')
      }
    })

    it('should reject name longer than 100 characters', () => {
      const longName = 'a'.repeat(101)
      const result = contactFormSchema.safeParse({
        name: longName,
        email: 'john@example.com',
        message: 'This is a valid message with enough characters.',
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe('Name must be less than 100 characters')
      }
    })

    it('should trim whitespace from name', () => {
      const result = contactFormSchema.safeParse({
        name: '  John Doe  ',
        email: 'john@example.com',
        message: 'This is a valid message with enough characters.',
      })
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.name).toBe('John Doe')
      }
    })
  })

  describe('email validation', () => {
    it('should accept valid email', () => {
      const result = contactFormSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'This is a valid message with enough characters.',
      })
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.email).toBe('john@example.com')
      }
    })

    it('should reject empty email', () => {
      const result = contactFormSchema.safeParse({
        name: 'John Doe',
        email: '',
        message: 'This is a valid message with enough characters.',
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe('Email is required')
      }
    })

    it('should reject invalid email format', () => {
      const result = contactFormSchema.safeParse({
        name: 'John Doe',
        email: 'invalid-email',
        message: 'This is a valid message with enough characters.',
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe('Invalid email address')
      }
    })

    it('should reject email longer than 255 characters', () => {
      const longEmail = `a@${'b'.repeat(250)}.com`
      const result = contactFormSchema.safeParse({
        name: 'John Doe',
        email: longEmail,
        message: 'This is a valid message with enough characters.',
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe('Email must be less than 255 characters')
      }
    })

    it('should convert email to lowercase', () => {
      const result = contactFormSchema.safeParse({
        name: 'John Doe',
        email: 'JOHN@EXAMPLE.COM',
        message: 'This is a valid message with enough characters.',
      })
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.email).toBe('john@example.com')
      }
    })

    it('should trim whitespace from email', () => {
      const result = contactFormSchema.safeParse({
        name: 'John Doe',
        email: '  john@example.com  ',
        message: 'This is a valid message with enough characters.',
      })
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.email).toBe('john@example.com')
      }
    })
  })

  describe('message validation', () => {
    it('should accept valid message', () => {
      const result = contactFormSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'This is a valid message with enough characters.',
      })
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.message).toBe('This is a valid message with enough characters.')
      }
    })

    it('should reject empty message', () => {
      const result = contactFormSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        message: '',
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe('Message is required')
      }
    })

    it('should reject message shorter than 10 characters', () => {
      const result = contactFormSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Short',
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe('Message must be at least 10 characters')
      }
    })

    it('should reject message longer than 5000 characters', () => {
      const longMessage = 'a'.repeat(5001)
      const result = contactFormSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        message: longMessage,
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe('Message must be less than 5000 characters')
      }
    })

    it('should trim whitespace from message', () => {
      const result = contactFormSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        message: '  This is a valid message with enough characters.  ',
      })
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.message).toBe('This is a valid message with enough characters.')
      }
    })
  })

  describe('honeypot field', () => {
    it('should accept empty honeypot', () => {
      const result = contactFormSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'This is a valid message with enough characters.',
        honeypot: '',
      })
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.honeypot).toBe('')
      }
    })

    it('should default honeypot to empty string if not provided', () => {
      const result = contactFormSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'This is a valid message with enough characters.',
      })
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.honeypot).toBe('')
      }
    })

    it('should accept non-empty honeypot (will be checked by robot validation)', () => {
      const result = contactFormSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'This is a valid message with enough characters.',
        honeypot: 'filled',
      })
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.honeypot).toBe('filled')
      }
    })
  })

  describe('submissionTime field', () => {
    it('should accept submissionTime as number', () => {
      const result = contactFormSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'This is a valid message with enough characters.',
        submissionTime: 5000,
      })
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.submissionTime).toBe(5000)
      }
    })

    it('should accept undefined submissionTime', () => {
      const result = contactFormSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'This is a valid message with enough characters.',
      })
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.submissionTime).toBeUndefined()
      }
    })
  })

  describe('validateContactForm function', () => {
    it('should return success for valid data', () => {
      const result = validateContactForm({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'This is a valid message with enough characters.',
      })
      expect(result.success).toBe(true)
    })

    it('should return error for invalid data', () => {
      const result = validateContactForm({
        name: '',
        email: 'invalid',
        message: 'Short',
      })
      expect(result.success).toBe(false)
    })

    it('should handle unknown data type', () => {
      const result = validateContactForm(null)
      expect(result.success).toBe(false)
    })
  })
})
