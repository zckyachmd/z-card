'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { Download } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { site } from '@/config/site'
import { buildVCard, buildWebsite } from '@/lib/siteHelpers'
import type { DigitalCardData, DigitalCardProps } from '@/types'

const defaults: DigitalCardData = {
  firstName: site.name.first,
  lastName: site.name.last,
  jobTitle: site.jobTitle,
  email: site.email,
  websiteHost: (() => {
    try {
      return new URL(site.website).host
    } catch {
      return site.website.replace(/^https?:\/\//, '')
    }
  })(),
  phone: site.phone,
  location: `${site.location.city}, ${site.location.country}`,
  tagline: site.tagline,
}

export function DigitalCard({
  open,
  onOpenChange,
  data,
  qrMode = 'vcard',
  safeUrl,
}: DigitalCardProps) {
  const d: Required<DigitalCardData> = useMemo(
    () =>
      ({
        firstName: data?.firstName ?? defaults.firstName,
        lastName: data?.lastName ?? defaults.lastName,
        jobTitle: data?.jobTitle ?? defaults.jobTitle,
        email: data?.email ?? defaults.email,
        websiteHost: data?.websiteHost ?? defaults.websiteHost,
        phone: data?.phone ?? defaults.phone,
        location: data?.location ?? defaults.location,
        tagline: data?.tagline ?? defaults.tagline,
      }) as Required<DigitalCardData>,
    [
      data?.firstName,
      data?.lastName,
      data?.jobTitle,
      data?.email,
      data?.websiteHost,
      data?.phone,
      data?.location,
      data?.tagline,
    ],
  )

  const email = d.email
  const website = useMemo(() => buildWebsite(d.websiteHost), [d.websiteHost])

  const [qrValue, setQrValue] = useState<string>('')
  useEffect(() => {
    if (!open) return
    if (qrMode === 'url' && safeUrl) {
      setQrValue(safeUrl)
    } else {
      setQrValue(buildVCard(d))
    }
  }, [open, qrMode, safeUrl, d])

  const handleDownloadVcf = () => {
    const vcard = buildVCard(d)
    const blob = new Blob([vcard], { type: 'text/vcard' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${(d.fullName || `${d.firstName}-${d.lastName ?? ''}`).trim().toLowerCase().replace(/\s+/g, '-')}.vcf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const displayName = `${d.firstName}${d.lastName ? ` ${d.lastName}` : ''}`

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='w-[calc(100vw-2rem)] sm:max-w-[540px]'>
        <DialogHeader>
          <DialogTitle>My Card</DialogTitle>
          <DialogDescription>Scan the QR or save my contact.</DialogDescription>
        </DialogHeader>

        <div className='my-6 flex justify-center'>
          <div className='from-background to-muted/30 w-full max-w-md overflow-hidden rounded-xl border bg-gradient-to-b shadow-md'>
            <div className='bg-primary/80 h-1.5' />
            <div className='grid items-start gap-3 p-4 md:grid-cols-[1fr_136px] md:items-center md:gap-5 md:p-6'>
              <div className='min-w-0'>
                <div className='flex items-center gap-3'>
                  <div className='bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-full font-medium'>
                    {displayName
                      .split(' ')
                      .map(s => s.charAt(0))
                      .slice(0, 2)
                      .join('')}
                  </div>
                  <div className='min-w-0'>
                    <div className='truncate text-lg leading-tight font-semibold md:text-xl'>
                      {displayName}
                    </div>
                    {d.jobTitle && (
                      <div className='text-muted-foreground text-xs tracking-wider uppercase'>
                        {d.jobTitle}
                      </div>
                    )}
                  </div>
                </div>

                <div className='bg-border my-2 h-px md:my-3' />
                {(email || website) && (
                  <div className='flex flex-wrap items-start gap-6'>
                    {email && (
                      <div>
                        <div className='text-muted-foreground text-[10px] font-medium tracking-wider uppercase'>
                          Email
                        </div>
                        <div className='text-foreground text-xs'>{d.email}</div>
                      </div>
                    )}
                    {website && (
                      <div>
                        <div className='text-muted-foreground text-[10px] font-medium tracking-wider uppercase'>
                          Website
                        </div>
                        <div className='text-foreground text-xs'>{d.websiteHost}</div>
                      </div>
                    )}
                  </div>
                )}
                {d.location && (
                  <div className='mt-2'>
                    <div className='text-muted-foreground text-[10px] font-medium tracking-wider uppercase'>
                      Location
                    </div>
                    <div className='text-foreground text-xs'>{d.location}</div>
                  </div>
                )}
                {d.tagline && (
                  <div className='mt-2'>
                    <div className='bg-border/80 my-1 h-px' />
                    <div className='text-muted-foreground text-xs italic'>{d.tagline}</div>
                  </div>
                )}
              </div>

              <div className='flex flex-col items-center justify-center md:w-[136px]'>
                <div className='bg-background rounded-lg border p-2'>
                  {qrValue ? (
                    <QRCodeSVG value={qrValue} size={120} />
                  ) : (
                    <div className='h-[120px] w-[120px] animate-pulse rounded-md border' />
                  )}
                </div>
                <span className='text-muted-foreground mt-2 text-[10px] leading-none'>
                  Scan to save
                </span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className='flex flex-wrap gap-2'>
          <Button variant='outline' onClick={handleDownloadVcf}>
            <Download className='mr-2 h-4 w-4' />
            Download vCard
          </Button>
          <Button variant='default' onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
