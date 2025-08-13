'use client'

import * as React from 'react'
import { Send } from 'lucide-react'

import Section from '@/components/section'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function Contact() {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [message, setMessage] = React.useState('')
  const [submitting, setSubmitting] = React.useState(false)

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)

    const subject = encodeURIComponent(`Inquiry from ${name || 'your website'}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
    const href = `mailto:hi@zacky.id?subject=${subject}&body=${body}`

    setTimeout(() => {
      window.location.href = href
      setSubmitting(false)
    }, 50)
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
                    rows={6}
                    placeholder='Tell me a bit about your project, goals, and timeline…'
                    className='bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-primary/50 min-h-[140px] rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
                  />
                </div>
              </CardContent>

              <CardFooter className='pt-0'>
                <Button
                  type='submit'
                  disabled={submitting}
                  aria-label='Send message via email'
                  className='w-full sm:w-auto'
                >
                  <Send className='mr-2 size-4' />
                  {submitting ? 'Preparing…' : 'Send'}
                </Button>
                <span className='sr-only' aria-live='polite'>
                  {submitting ? 'Preparing email link…' : ''}
                </span>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </Section>
  )
}
