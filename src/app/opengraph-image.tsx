import { ImageResponse } from 'next/og'
export const alt = 'Zacky Achmad — Software Engineer, Indonesia'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        padding: 72,
        background: '#101722',
        color: '#edf2fa',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 26 }}>
        <span>zacky.id</span>
        <span style={{ color: '#a6b4c8' }}>Software Engineer / Indonesia</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ fontSize: 80, letterSpacing: -3, fontWeight: 700 }}>Zacky Achmad.</div>
        <div style={{ fontSize: 44, color: '#93b9ff' }}>Built for the real world.</div>
      </div>
      <div
        style={{
          display: 'flex',
          borderTop: '1px solid #2b3749',
          paddingTop: 24,
          fontSize: 22,
          color: '#a6b4c8',
        }}
      >
        Business applications · APIs · Integrations · Automation
      </div>
    </div>,
    size,
  )
}
