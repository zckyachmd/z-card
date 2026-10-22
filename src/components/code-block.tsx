'use client'
import { useRef, useState, type ReactNode } from 'react'
export function CodeBlock({ children }: { children?: ReactNode }) {
  const pre = useRef<HTMLPreElement>(null)
  const [status, setStatus] = useState('Copy code')
  return (
    <div className='code-container'>
      <button
        className='copy-code'
        type='button'
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(pre.current?.textContent ?? '')
            setStatus('Copied')
          } catch {
            setStatus('Copy unavailable')
          }
        }}
      >
        <span aria-live='polite'>{status}</span>
      </button>
      <pre ref={pre} tabIndex={0}>
        {children}
      </pre>
    </div>
  )
}
