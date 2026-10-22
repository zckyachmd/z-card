'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { trackEvent, validMeasurementId, type AnalyticsEvent } from '@/lib/analytics'

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
const consentKey = 'zacky-analytics-consent'
type AnalyticsWindow = Window & {
  dataLayer?: unknown[]
  gtag?: (...args: unknown[]) => void
  analyticsAllowed?: boolean
}
function preferenceBlocksTracking() {
  return (
    navigator.doNotTrack === '1' ||
    Boolean((navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl)
  )
}
export function AnalyticsConsent() {
  const [consent, setConsent] = useState('loading')
  const [ready, setReady] = useState(false)
  const pathname = usePathname()
  const configured = validMeasurementId(measurementId)
  useEffect(() => {
    const read = () => {
      let choice: string | null = null
      try {
        choice = localStorage.getItem(consentKey)
      } catch {
        /* Storage is optional. */
      }
      setConsent(
        preferenceBlocksTracking()
          ? 'denied'
          : choice === 'granted'
            ? 'granted'
            : choice === 'denied'
              ? 'denied'
              : 'pending',
      )
    }
    read()
    window.addEventListener('storage', read)
    window.addEventListener('analytics-preference', read)
    return () => {
      window.removeEventListener('storage', read)
      window.removeEventListener('analytics-preference', read)
    }
  }, [])
  useEffect(() => {
    const analytics = window as AnalyticsWindow
    analytics.analyticsAllowed = configured && consent === 'granted'
    if (consent !== 'granted' && ready)
      analytics.gtag?.('consent', 'update', { analytics_storage: 'denied' })
  }, [consent, configured, ready])
  useEffect(() => {
    if (!ready || consent !== 'granted') return
    const analytics = window as AnalyticsWindow
    analytics.gtag?.('event', 'page_view', {
      page_path: pathname,
      page_location: `${location.origin}${pathname}`,
      page_title: document.title,
    })
    const started = Date.now()
    let engaged = false
    const scroll = () => {
      if (
        !engaged &&
        pathname.startsWith('/blog/') &&
        Date.now() - started > 10000 &&
        window.scrollY > (document.documentElement.scrollHeight - innerHeight) * 0.5
      ) {
        trackEvent('article_engagement')
        engaged = true
      }
    }
    const click = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest('[data-track]') : null
      const name = link?.getAttribute('data-track')
      if (name === 'project_source' || name === 'project_live') trackEvent(name as AnalyticsEvent)
    }
    window.addEventListener('scroll', scroll, { passive: true })
    document.addEventListener('click', click)
    return () => {
      window.removeEventListener('scroll', scroll)
      document.removeEventListener('click', click)
    }
  }, [pathname, ready, consent])
  function choose(choice: string) {
    try {
      localStorage.setItem(consentKey, choice)
    } catch {
      /* Continue without persistence. */
    }
    setConsent(choice)
  }
  if (!configured) return null
  return (
    <>
      {consent === 'granted' && (
        <Script
          id='google-analytics'
          src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
          strategy='afterInteractive'
          onReady={() => {
            const analytics = window as AnalyticsWindow
            analytics.dataLayer = analytics.dataLayer || []
            analytics.gtag = (...args: unknown[]) => {
              analytics.dataLayer!.push(args)
            }
            analytics.gtag('consent', 'default', {
              analytics_storage: 'granted',
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
            })
            analytics.gtag('js', new Date())
            analytics.gtag('config', measurementId, {
              send_page_view: false,
              allow_google_signals: false,
              allow_ad_personalization_signals: false,
              page_location: `${location.origin}${location.pathname}`,
              page_referrer: '',
            })
            setReady(true)
          }}
        />
      )}
      {consent === 'pending' && (
        <aside className='consent-panel' aria-label='Analytics preference'>
          <p>
            Allow optional, anonymous usage measurement? Analytics stays off unless you choose to
            allow it.{' '}
            <Link className='text-link' href='/privacy'>
              Privacy details
            </Link>
          </p>
          <div className='consent-actions'>
            <button onClick={() => choose('denied')}>Decline</button>
            <button onClick={() => choose('granted')}>Allow analytics</button>
          </div>
        </aside>
      )}
    </>
  )
}
export function ResetAnalyticsConsent() {
  return (
    <button
      className='text-link'
      onClick={() => {
        try {
          localStorage.removeItem(consentKey)
        } catch {
          /* Storage is optional. */
        }
        window.dispatchEvent(new Event('analytics-preference'))
      }}
    >
      Change analytics preference
    </button>
  )
}
