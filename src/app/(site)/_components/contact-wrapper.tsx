import { areEmailServicesAvailable } from '@/lib/turnstile-config'

import Contact from './contact'

export default function ContactWrapper() {
  const emailServicesAvailable = areEmailServicesAvailable()

  return <Contact emailServicesAvailable={emailServicesAvailable} />
}
