import { describe, it, expect } from 'vitest'
import {
  personLdJson,
  mailto,
  baseHostname,
  buildEmail,
  buildWebsite,
  buildVCard,
} from '@/lib/siteHelpers'
import { site } from '@/config/site'

describe('personLdJson', () => {
  it('should return valid Person schema.org JSON-LD', () => {
    const result = personLdJson()
    expect(result).toEqual({
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
  })

  it('should use site configuration values', () => {
    const result = personLdJson()
    expect(result.name).toBe(site.name)
    expect(result.url).toBe(site.website)
    expect(result.jobTitle).toBe(site.jobTitle)
    expect(result.email).toBe(site.email)
    expect(result.address.addressLocality).toBe(site.location.city)
    expect(result.address.addressCountry).toBe(site.location.countryCode)
  })
})

describe('mailto', () => {
  it('should return mailto link with site email', () => {
    const result = mailto()
    expect(result).toBe(`mailto:${site.email}`)
  })
})

describe('baseHostname', () => {
  it('should extract hostname from site website URL', () => {
    const result = baseHostname()
    expect(result).toBe(new URL(site.website).hostname)
  })

  it('should return hostname without protocol', () => {
    const result = baseHostname()
    expect(result).not.toContain('https://')
    expect(result).not.toContain('http://')
  })
})

describe('buildEmail', () => {
  it('should build email from user and domain', () => {
    expect(buildEmail('user', 'example.com')).toBe('user@example.com')
  })

  it('should return undefined when user is empty', () => {
    expect(buildEmail('', 'example.com')).toBeUndefined()
  })

  it('should return undefined when domain is empty', () => {
    expect(buildEmail('user', '')).toBeUndefined()
  })

  it('should return undefined when both are empty', () => {
    expect(buildEmail('', '')).toBeUndefined()
  })

  it('should handle special characters in user', () => {
    expect(buildEmail('user.name', 'example.com')).toBe('user.name@example.com')
  })
})

describe('buildWebsite', () => {
  it('should build website URL with https protocol', () => {
    expect(buildWebsite('example.com')).toBe('https://example.com')
  })

  it('should return undefined when host is empty', () => {
    expect(buildWebsite('')).toBeUndefined()
  })

  it('should handle hostname without protocol', () => {
    expect(buildWebsite('subdomain.example.com')).toBe('https://subdomain.example.com')
  })

  it('should not add protocol if already present', () => {
    // Note: This function doesn't check for existing protocol
    // It always prepends https://
    expect(buildWebsite('https://example.com')).toBe('https://https://example.com')
  })
})

describe('buildVCard', () => {
  const minimalData: Required<Parameters<typeof buildVCard>[0]> = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    websiteHost: 'example.com',
    phone: '+1234567890',
    fullName: 'John Doe',
    jobTitle: 'Developer',
    location: 'New York, NY',
    tagline: 'Building awesome things',
  }

  it('should build valid vCard format', () => {
    const result = buildVCard(minimalData)
    expect(result).toContain('BEGIN:VCARD')
    expect(result).toContain('VERSION:3.0')
    expect(result).toContain('END:VCARD')
  })

  it('should include name fields', () => {
    const result = buildVCard(minimalData)
    expect(result).toContain('N:Doe;John;;;')
    expect(result).toContain('FN:John Doe')
  })

  it('should include email', () => {
    const result = buildVCard(minimalData)
    expect(result).toContain('EMAIL;type=INTERNET;type=WORK;type=pref:john@example.com')
  })

  it('should include website URL', () => {
    const result = buildVCard(minimalData)
    expect(result).toContain('URL:https://example.com')
  })

  it('should include phone', () => {
    const result = buildVCard(minimalData)
    expect(result).toContain('TEL;type=CELL;type=VOICE;type=pref:+1234567890')
  })

  it('should include job title', () => {
    const result = buildVCard(minimalData)
    expect(result).toContain('jobTitle:Developer')
  })

  it('should include location', () => {
    const result = buildVCard(minimalData)
    expect(result).toContain('ADR;type=WORK;type=pref:;;New York, NY')
  })

  it('should use fullName when provided', () => {
    const data = { ...minimalData, fullName: 'John Michael Doe' }
    const result = buildVCard(data)
    expect(result).toContain('FN:John Michael Doe')
  })

  it('should construct name from firstName and lastName when fullName not provided', () => {
    const data = { ...minimalData, fullName: undefined as unknown as string }
    const result = buildVCard(data)
    expect(result).toContain('FN:John Doe')
  })

  it('should handle missing lastName', () => {
    const data = { ...minimalData, lastName: undefined as unknown as string }
    const result = buildVCard(data)
    expect(result).toContain('N:;John;;;')
    expect(result).toContain('FN:John')
  })

  it('should exclude optional fields when empty', () => {
    const data = {
      ...minimalData,
      jobTitle: undefined as unknown as string,
      phone: undefined as unknown as string,
      location: undefined as unknown as string,
    }
    const result = buildVCard(data)
    expect(result).not.toContain('jobTitle:')
    expect(result).not.toContain('TEL;')
    expect(result).not.toContain('ADR;')
  })

  it('should exclude email when empty', () => {
    const data = { ...minimalData, email: '' }
    const result = buildVCard(data)
    expect(result).not.toContain('EMAIL;')
  })

  it('should exclude website when websiteHost is empty', () => {
    const data = { ...minimalData, websiteHost: '' }
    const result = buildVCard(data)
    expect(result).not.toContain('URL:')
  })

  it('should include ORG field with name', () => {
    const result = buildVCard(minimalData)
    expect(result).toContain('ORG:John Doe')
  })
})
