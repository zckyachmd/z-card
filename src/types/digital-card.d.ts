export type QRMode = 'vcard' | 'url'

export interface DigitalCardData {
  firstName: string
  lastName?: string
  fullName?: string
  jobTitle?: string
  email?: string
  websiteHost?: string
  phone?: string
  location?: string
  tagline?: string
}

export interface DigitalCardProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  data?: Partial<DigitalCardData>
  qrMode?: QRMode
  safeUrl?: string
  showCopyEmail?: boolean
}
