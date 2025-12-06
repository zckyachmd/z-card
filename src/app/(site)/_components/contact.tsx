'use client'

import * as React from 'react'
import { Send } from 'lucide-react'
import { toast } from 'sonner'

import CloudflareTurnstile from '@/components/cloudflare-turnstile'
import Section from '@/components/section'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { getTurnstileSiteKey, isTurnstileEnabledClient } from '@/lib/turnstile-config'
import type { ContactFormResponse } from '@/types'

export default function Contact() {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [message, setMessage] = React.useState('')
  const [honeypot, setHoneypot] = React.useState('')
  const [turnstileToken, setTurnstileToken] = React.useState<string | null>(null)
  const [submitting, setSubmitting] = React.useState(false)
  const [formLoadTime] = React.useState(() => Date.now())
  // Note: Client checks NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY to show widget
  // Server checks CLOUDFLARE_TURNSTILE_SECRET_KEY to verify tokens
  // Both keys should be configured together. If only one is set, validation will be inconsistent.
  const turnstileEnabled = isTurnstileEnabledClient()
  const turnstileSiteKey = getTurnstileSiteKey()

  // Client-side validation
  function validateForm(): string | null {
    if (name.trim().length < 2) {
      return 'Name must be at least 2 characters'
    }
    if (name.trim().length > 100) {
      return 'Name must be less than 100 characters'
    }
    if (!email.trim()) {
      return 'Email is required'
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address'
    }
    if (email.length > 255) {
      return 'Email must be less than 255 characters'
    }
    if (message.trim().length < 10) {
      return 'Message must be at least 10 characters'
    }
    if (message.trim().length > 5000) {
      return 'Message must be less than 5000 characters'
    }
    return null
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    // Client-side validation
    const validationError = validateForm()
    if (validationError) {
      toast.error(validationError)
      return
    }

    // Check Turnstile token if Turnstile is enabled on client
    // Note: This checks NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY (client-side)
    // Server will check CLOUDFLARE_TURNSTILE_SECRET_KEY (server-side)
    // If only one key is configured, there will be a validation mismatch
    if (turnstileEnabled && !turnstileToken) {
      toast.error('Please complete the CAPTCHA verification')
      return
    }

    setSubmitting(true)

    try {
      // Calculate submission time
      const submissionTime = Date.now() - formLoadTime

      // Call API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          message: message.trim(),
          honeypot: honeypot.trim(),
          submissionTime,
          turnstileToken: turnstileToken || undefined,
        }),
      })

      const data = (await response.json()) as ContactFormResponse

      if (!response.ok || !data.success) {
        toast.error(data.error || 'Failed to send message. Please try again.')
        setSubmitting(false)
        return
      }

      // Success
      toast.success("Message sent successfully! I'll get back to you soon.")
      setName('')
      setEmail('')
      setMessage('')
      setHoneypot('')
      setTurnstileToken(null) // Reset Turnstile token
    } catch (err) {
      toast.error(
        err instanceof Error
          ? `Network error: ${err.message}`
          : 'Failed to send message. Please check your connection and try again.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Section id='contact'>
      <div>
        <div className='mb-5 flex flex-wrap items-center gap-2 text-[11px] md:text-xs'>
          <span className='rounded-full border px-2.5 py-0.5'>Contact</span>
          <span className='rounded-full border px-2.5 py-0.5'>Let’s talk</span>
        </div>

        <h2 className='text-2xl font-semibold tracking-tight text-balance sm:text-3xl lg:text-4xl'>
          Get in touch
        </h2>
        <p className='text-muted-foreground mt-2 max-w-2xl text-sm text-pretty sm:text-base lg:text-[17px]'>
          Have a project in mind, a question, or just want to say hi? Drop a message — I’ll get back
          to you.
        </p>

        <div className='mt-6 grid gap-6 sm:gap-8'>
          <Card className='overflow-hidden'>
            <form onSubmit={onSubmit} className='grid gap-5 sm:gap-6'>
              <CardHeader className='pb-1 sm:pb-2'>
                <CardTitle className='text-base sm:text-lg'>Send a message</CardTitle>
              </CardHeader>

              <CardContent className='grid gap-4 sm:gap-5'>
                {/* Honeypot field (hidden from users, bots will fill it) */}
                <input
                  type='text'
                  name='website'
                  value={honeypot}
                  onChange={e => setHoneypot(e.target.value)}
                  autoComplete='off'
                  tabIndex={-1}
                  aria-hidden='true'
                  className='pointer-events-none absolute left-[-9999px] opacity-0'
                  style={{ position: 'absolute', left: '-9999px' }}
                />

                <div className='grid gap-4 sm:gap-5 md:grid-cols-2'>
                  <div className='grid gap-1.5'>
                    <label htmlFor='name' className='text-sm font-medium'>
                      Name
                    </label>
                    <input
                      id='name'
                      name='name'
                      type='text'
                      value={name}
                      onChange={e => setName(e.target.value)}
                      autoComplete='name'
                      required
                      minLength={2}
                      maxLength={100}
                      placeholder='Your name'
                      className='bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-primary/50 h-11 w-full rounded-md border px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
                    />
                  </div>

                  <div className='grid gap-1.5'>
                    <label htmlFor='email' className='text-sm font-medium'>
                      Email
                    </label>
                    <input
                      id='email'
                      name='email'
                      type='email'
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      autoComplete='email'
                      required
                      maxLength={255}
                      placeholder='you@example.com'
                      className='bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-primary/50 h-11 w-full rounded-md border px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
                    />
                  </div>
                </div>

                <div className='grid gap-1.5'>
                  <label htmlFor='message' className='text-sm font-medium'>
                    Message
                  </label>
                  <textarea
                    id='message'
                    name='message'
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    required
                    minLength={10}
                    maxLength={5000}
                    rows={6}
                    placeholder='Tell me a bit about your project, goals, and timeline…'
                    className='bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-primary/50 min-h-[140px] rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
                  />
                </div>

                {/* Cloudflare Turnstile CAPTCHA */}
                {turnstileSiteKey && (
                  <div className='flex justify-start'>
                    <CloudflareTurnstile
                      siteKey={turnstileSiteKey}
                      onVerify={token => {
                        setTurnstileToken(token)
                      }}
                      onError={() => {
                        setTurnstileToken(null)
                        toast.error('CAPTCHA verification failed. Please try again.')
                      }}
                      onExpire={() => {
                        setTurnstileToken(null)
                        toast.error('CAPTCHA expired. Please verify again.')
                      }}
                      theme='auto'
                      size='normal'
                    />
                  </div>
                )}
              </CardContent>

              <CardFooter className='pt-0'>
                <Button
                  type='submit'
                  disabled={submitting}
                  aria-label='Send message'
                  className='w-full sm:w-auto'
                >
                  <Send className='mr-2 size-4' aria-hidden='true' />
                  {submitting ? 'Sending…' : 'Send'}
                </Button>
                <span className='sr-only' aria-live='polite'>
                  {submitting ? 'Sending message…' : ''}
                </span>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </Section>
  )
}
