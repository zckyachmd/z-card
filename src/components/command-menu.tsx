'use client'
import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { Command, ArrowUpRight } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

const commands = [
  { title: 'Home', path: '/', hint: 'The introduction', query: 'home whoami zacky' },
  {
    title: 'About & experience',
    path: '/about',
    hint: 'The engineer behind the code',
    query: 'about resume cv experience skills',
  },
  {
    title: 'Projects',
    path: '/projects',
    hint: 'Inspect selected work',
    query: 'projects work build code',
  },
  {
    title: 'Journal',
    path: '/blog',
    hint: 'Technical writing',
    query: 'blog journal articles writing',
  },
  {
    title: 'Contact',
    path: '/contact',
    hint: 'Start a conversation',
    query: 'contact email hire collaborate',
  },
]
export function CommandMenu() {
  const trigger = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  useEffect(() => {
    const keyboard = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen(value => !value)
      }
    }
    window.addEventListener('keydown', keyboard)
    return () => window.removeEventListener('keydown', keyboard)
  }, [])
  const normalize = (value: string) =>
    value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
  const results = commands.filter(command =>
    normalize(`${command.title} ${command.query}`).includes(normalize(query.trim())),
  )
  return (
    <>
      <button
        ref={trigger}
        className='command-trigger'
        aria-label='Navigate — Open command menu'
        aria-keyshortcuts='Control+k Meta+k'
        onClick={() => {
          setQuery('')
          setOpen(true)
        }}
      >
        <Command size={16} aria-hidden='true' />
        <span>Navigate</span>
        <kbd>⌘ K</kbd>
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className='command-dialog'
          onCloseAutoFocus={event => {
            event.preventDefault()
            trigger.current?.focus()
          }}
        >
          <DialogHeader>
            <DialogTitle>Where to?</DialogTitle>
            <DialogDescription>
              A shortcut to the person, the projects, and the conversation.
            </DialogDescription>
          </DialogHeader>
          <label className='sr-only' htmlFor='command-query'>
            Find a page
          </label>
          <input
            id='command-query'
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder='Type a page or try “résumé”…'
            autoComplete='off'
            onKeyDown={event => {
              if (event.key === 'Enter' && results[0]) {
                document.getElementById(`command-${results[0].title}`)?.click()
              }
            }}
          />
          <nav aria-label='Command results'>
            {results.length ? (
              results.map(command => (
                <Link
                  id={`command-${command.title}`}
                  href={command.path}
                  key={command.path}
                  onClick={() => setOpen(false)}
                >
                  <span>
                    <strong>{command.title}</strong>
                    <span>{command.hint}</span>
                  </span>
                  <ArrowUpRight size={17} aria-hidden='true' />
                </Link>
              ))
            ) : (
              <p className='command-empty'>No matching page. Try “projects” or “contact”.</p>
            )}
          </nav>
          <p className='meta-line'>
            Enter opens the first result. Tab moves through results. Esc closes.
          </p>
        </DialogContent>
      </Dialog>
    </>
  )
}
