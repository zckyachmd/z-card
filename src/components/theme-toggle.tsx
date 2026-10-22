'use client'

import { useSyncExternalStore } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'

const subscribe = () => () => {}
export default function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, systemTheme } = useTheme()
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  )

  if (!mounted) {
    return (
      <button
        aria-label='Toggle theme'
        className={`inline-flex h-11 w-11 items-center justify-center rounded-md border ${className ?? ''}`}
      />
    )
  }

  const active = theme === 'system' ? systemTheme : theme

  return (
    <button
      aria-label='Toggle theme'
      onClick={() => setTheme(active === 'dark' ? 'light' : 'dark')}
      className={`hover:bg-accent inline-flex h-11 w-11 items-center justify-center rounded-md border ${className ?? ''}`}
    >
      {active === 'dark' ? <Sun className='size-4' /> : <Moon className='size-4' />}
    </button>
  )
}
