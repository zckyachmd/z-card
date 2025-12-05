import { site } from '@/config/site'
import type { DigitalCardData } from '@/types'

export const personLdJson = () => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  url: site.website,
  jobTitle: site.jobTitle,
  address: {
    '@type': 'PostalAddress',
    addressLocality: site.location.city,
    addressCountry: site.location.countryCode,
  },
  email: site.email,
})

export const mailto = () => `mailto:${site.email}`

export const baseHostname = () => new URL(site.website).hostname

export const buildEmail = (user: string, domain: string) =>
  user && domain ? `${user}@${domain}` : undefined

export const buildWebsite = (host: string) => (host ? `https://${host}` : undefined)

export const buildVCard = (d: Required<DigitalCardData>) => {
  const name = d.fullName || `${d.firstName}${d.lastName ? ` ${d.lastName}` : ''}`
  const email = d.email ?? ''
  const website = buildWebsite(d.websiteHost) ?? ''
  const phone = d.phone ?? ''
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${d.lastName ?? ''};${d.firstName};;;`,
    `FN:${name}`,
    `ORG:${name}`,
    d.jobTitle ? `jobTitle:${d.jobTitle}` : undefined,
    email ? `EMAIL;type=INTERNET;type=WORK;type=pref:${email}` : undefined,
    website ? `URL:${website}` : undefined,
    phone ? `TEL;type=CELL;type=VOICE;type=pref:${phone}` : undefined,
    d.location ? `ADR;type=WORK;type=pref:;;${d.location}` : undefined,
    'END:VCARD',
  ].filter(Boolean)
  return lines.join('\n')
}
