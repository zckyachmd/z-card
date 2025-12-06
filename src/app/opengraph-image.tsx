import { ImageResponse } from 'next/og'
import { readFile } from 'fs/promises'
import { join } from 'path'

import { site } from '@/config/site'

export const alt = `${site.name.first} ${site.name.last} - ${site.jobTitle}`
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  // Load favicon from public folder using file system
  let faviconDataUrl = ''
  try {
    const faviconPath = join(process.cwd(), 'public', 'favicon', 'android-chrome-512x512.png')
    const faviconBuffer = await readFile(faviconPath)
    const base64 = faviconBuffer.toString('base64')
    faviconDataUrl = `data:image/png;base64,${base64}`
  } catch (error) {
    // If favicon fails to load, continue without it
    // This can happen in some deployment environments
    console.warn('Failed to load favicon for OG image:', error)
  }

  return new ImageResponse(
    <div
      style={{
        fontSize: 64,
        background: '#ffffff',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#0a0a0a',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        position: 'relative',
        padding: '80px',
      }}
    >
      {/* Top section with location badge */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          gap: 32,
        }}
      >
        {/* Location badge - like hero section */}
        <div
          style={{
            display: 'flex',
            fontSize: 18,
            color: '#525252',
            fontWeight: 400,
            padding: '6px 16px',
            border: '1px solid #e5e5e5',
            borderRadius: '9999px',
            backgroundColor: '#fafafa',
          }}
        >
          {site.location.city}, {site.location.country}
        </div>

        {/* Favicon/Logo Area - smaller, more subtle */}
        {faviconDataUrl && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={faviconDataUrl}
              alt=''
              width={80}
              height={80}
              style={{
                borderRadius: '50%',
                border: '1px solid #e5e5e5',
              }}
            />
          </div>
        )}
      </div>

      {/* Main content area */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          gap: 20,
          marginTop: 24,
        }}
      >
        {/* Name - larger, more prominent */}
        <div
          style={{
            display: 'flex',
            fontSize: 96,
            fontWeight: 600,
            textAlign: 'center',
            color: '#171717',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
          }}
        >
          {site.name.first} {site.name.last}
        </div>

        {/* Job Title - medium emphasis */}
        <div
          style={{
            display: 'flex',
            fontSize: 36,
            textAlign: 'center',
            color: '#525252',
            fontWeight: 500,
            letterSpacing: '-0.015em',
          }}
        >
          {site.jobTitle}
        </div>

        {/* Subtle separator line */}
        <div
          style={{
            display: 'flex',
            width: '120px',
            height: '1px',
            backgroundColor: '#e5e5e5',
            marginTop: 8,
            marginBottom: 8,
          }}
        />

        {/* Tagline - refined styling */}
        <div
          style={{
            display: 'flex',
            fontSize: 24,
            textAlign: 'center',
            color: '#737373',
            fontWeight: 400,
            maxWidth: '900px',
            lineHeight: 1.5,
            letterSpacing: '-0.01em',
          }}
        >
          {site.tagline}
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  )
}
