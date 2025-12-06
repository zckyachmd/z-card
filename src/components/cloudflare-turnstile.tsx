'use client'

import * as React from 'react'

declare global {
  interface Window {
    turnstile?: {
      render: (
        element: string | HTMLElement,
        options: {
          sitekey: string
          callback?: (token: string) => void
          'error-callback'?: () => void
          'expired-callback'?: () => void
          theme?: 'light' | 'dark' | 'auto'
          size?: 'normal' | 'compact'
        },
      ) => string
      reset: (widgetId: string) => void
      remove: (widgetId: string) => void
    }
  }
}

interface CloudflareTurnstileProps {
  siteKey: string
  onVerify: (token: string) => void
  onError?: () => void
  onExpire?: () => void
  theme?: 'light' | 'dark' | 'auto'
  size?: 'normal' | 'compact'
}

// Global script loading state to prevent multiple loads
let scriptLoading = false
let scriptLoaded = false

// Store the loading promise to reuse if multiple components try to load
let loadingPromise: Promise<void> | null = null

function loadTurnstileScript(): Promise<void> {
  // If already loaded, resolve immediately
  if (scriptLoaded && typeof window !== 'undefined' && window.turnstile) {
    return Promise.resolve()
  }

  // If already loading, return existing promise
  if (scriptLoading && loadingPromise) {
    return loadingPromise
  }

  // Check if script already exists in DOM
  const existingScript = document.querySelector(
    'script[src="https://challenges.cloudflare.com/turnstile/v0/api.js"]',
  )

  if (existingScript) {
    // Script exists, wait for it to load or check if already loaded
    if (window.turnstile) {
      scriptLoaded = true
      return Promise.resolve()
    }

    scriptLoading = true
    loadingPromise = new Promise<void>((resolve, reject) => {
      const checkInterval = setInterval(() => {
        if (window.turnstile) {
          clearInterval(checkInterval)
          scriptLoaded = true
          scriptLoading = false
          loadingPromise = null
          resolve()
        }
      }, 100)

      // Timeout after 10 seconds
      setTimeout(() => {
        clearInterval(checkInterval)
        if (!window.turnstile) {
          scriptLoading = false
          loadingPromise = null
          reject(new Error('Turnstile script timeout'))
        }
      }, 10000)

      existingScript.addEventListener('load', () => {
        clearInterval(checkInterval)
        scriptLoaded = true
        scriptLoading = false
        loadingPromise = null
        resolve()
      })
      existingScript.addEventListener('error', () => {
        clearInterval(checkInterval)
        scriptLoading = false
        loadingPromise = null
        reject(new Error('Failed to load existing Turnstile script'))
      })
    })

    return loadingPromise
  }

  // Load new script
  scriptLoading = true
  const script = document.createElement('script')
  script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
  script.async = true
  script.defer = true
  script.crossOrigin = 'anonymous'

  loadingPromise = new Promise<void>((resolve, reject) => {
    script.onload = () => {
      scriptLoaded = true
      scriptLoading = false
      loadingPromise = null
      resolve()
    }
    script.onerror = () => {
      scriptLoading = false
      loadingPromise = null
      console.error('Failed to load Cloudflare Turnstile script')
      reject(new Error('Failed to load Turnstile script'))
    }
  })

  document.body.appendChild(script)

  return loadingPromise
}

export default function CloudflareTurnstile({
  siteKey,
  onVerify,
  onError,
  onExpire,
  theme = 'auto',
  size = 'normal',
}: CloudflareTurnstileProps) {
  const widgetIdRef = React.useRef<string | null>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)

  // Memoize callbacks to prevent unnecessary re-renders
  const onVerifyRef = React.useRef(onVerify)
  const onErrorRef = React.useRef(onError)
  const onExpireRef = React.useRef(onExpire)

  React.useEffect(() => {
    onVerifyRef.current = onVerify
    onErrorRef.current = onError
    onExpireRef.current = onExpire
  }, [onVerify, onError, onExpire])

  React.useEffect(() => {
    let isMounted = true

    loadTurnstileScript()
      .then(() => {
        if (!isMounted || !containerRef.current || !window.turnstile) {
          return
        }

        // Remove existing widget if any
        if (widgetIdRef.current) {
          try {
            window.turnstile.remove(widgetIdRef.current)
          } catch {
            // Ignore errors if widget doesn't exist
          }
        }

        // Render new widget
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          callback: (token: string) => {
            onVerifyRef.current(token)
          },
          'error-callback': () => {
            onErrorRef.current?.()
          },
          'expired-callback': () => {
            onExpireRef.current?.()
          },
          theme,
          size,
        })
      })
      .catch(error => {
        console.error('Turnstile initialization error:', error)
        onErrorRef.current?.()
      })

    return () => {
      isMounted = false
      // Cleanup widget
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current)
        } catch {
          // Ignore errors
        }
        widgetIdRef.current = null
      }
    }
  }, [siteKey, theme, size]) // Removed callbacks from dependencies

  return <div ref={containerRef} id='cf-turnstile' />
}
