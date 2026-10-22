'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { CommandMenu } from '@/components/command-menu'
const links = [
  ['/about', 'About'],
  ['/projects', 'Projects'],
  ['/blog', 'Journal'],
  ['/contact', 'Contact'],
] as const
export default function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  return (
    <header className='site-header'>
      <div className='site-container header-inner'>
        <Link
          href='/'
          className='wordmark'
          aria-label='zacky.id — Zacky Achmad home'
          onClick={() => setOpen(false)}
        >
          zacky<span>.id</span>
        </Link>
        <div className='header-utilities'>
          <CommandMenu />
        </div>
        <button
          className='menu-toggle'
          type='button'
          aria-expanded={open}
          aria-controls='primary-navigation'
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          onClick={() => setOpen(!open)}
        >
          {open ? <X aria-hidden='true' size={22} /> : <Menu aria-hidden='true' size={22} />}
        </button>
        <nav
          id='primary-navigation'
          className={open ? 'primary-navigation is-open' : 'primary-navigation'}
          aria-label='Main navigation'
          onKeyDown={event => {
            if (event.key === 'Escape') {
              setOpen(false)
              document.querySelector<HTMLButtonElement>('.menu-toggle')?.focus()
            }
          }}
        >
          {links.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname.startsWith(href) ? 'page' : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
