import { areEmailServicesAvailable, getTurnstileSiteKeyServer } from '@/lib/turnstile-config'

import Contact from './contact'

export default function ContactWrapper() {
  const emailServicesAvailable = areEmailServicesAvailable()
  const turnstileSiteKey = getTurnstileSiteKeyServer()

  return (
    <Contact emailServicesAvailable={emailServicesAvailable} turnstileSiteKey={turnstileSiteKey} />
  )
}
