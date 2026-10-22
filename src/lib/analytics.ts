export type AnalyticsEvent =
  'project_source' | 'project_live' | 'article_engagement' | 'contact_start' | 'contact_success'
type AnalyticsWindow = Window & {
  dataLayer?: unknown[]
  gtag?: (...args: unknown[]) => void
  analyticsAllowed?: boolean
}
export function validMeasurementId(value: string | undefined): value is string {
  return !!value && /^G-[A-Z0-9]+$/.test(value)
}
export function trackEvent(event: AnalyticsEvent) {
  if (typeof window === 'undefined') return
  const analytics = window as AnalyticsWindow
  if (analytics.analyticsAllowed)
    analytics.gtag?.('event', event, { page_path: window.location.pathname })
}
