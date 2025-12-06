# Instruksi Pembuatan OG Image

## 📋 Overview

OG Image (Open Graph Image) adalah gambar yang muncul saat website di-share di social media platforms seperti Facebook, LinkedIn, WhatsApp, Twitter, dll.

**Status:** Metadata sudah dikonfigurasi di `src/app/layout.tsx`, sekarang perlu membuat gambar fisik.

---

## 🎨 Spesifikasi OG Image

### Requirements:
- **Size:** 1200 x 630 pixels (recommended)
- **Format:** PNG atau JPG
- **File Location:** `public/og-image.png` atau `public/og-image.jpg`
- **File Size:** Optimal < 1MB (untuk fast loading)

### Design Guidelines:
1. **High Contrast Text** - Pastikan text readable di berbagai background
2. **Branding** - Include nama, title, dan tagline
3. **Minimal Text** - Jangan terlalu banyak text
4. **Professional Look** - Sesuai dengan portfolio branding

---

## 🛠️ Cara Membuat OG Image

### Option 1: Design Tool (Recommended)

**Tools yang bisa digunakan:**
- Figma (free)
- Canva (free tier)
- Adobe Photoshop/Illustrator
- GIMP (free, open source)

**Template Content:**
```
Zacky Achmad
Full-Stack Web Developer
Clean, secure, and efficient systems.
```

**Design Tips:**
- Background: Solid color atau subtle gradient
- Font: Bold, readable (minimal 48px untuk nama, 32px untuk title)
- Colors: Sesuai dengan website theme (dark/light mode aware jika mungkin)
- Spacing: Adequate padding (minimal 60px dari edges)

### Option 2: Online OG Image Generators

**Free Tools:**
- https://www.opengraph.xyz/ (preview + bisa generate)
- https://og-image.vercel.app/ (Vercel's OG Image Generator)
- https://www.bannerbear.com/tools/open-graph-image-generator/

### Option 3: Dynamic OG Image (Advanced)

Next.js 13+ support dynamic OG images. Jika ingin implement ini:

1. Install package:
```bash
pnpm add @vercel/og
```

2. Buat file `src/app/opengraph-image.tsx`:
```typescript
import { ImageResponse } from 'next/og'
import { site } from '@/config/site'

export const alt = `${site.name.first} ${site.name.last} - ${site.jobTitle}`
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 64,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'system-ui',
        }}
      >
        <div style={{ fontSize: 96, fontWeight: 'bold', marginBottom: 20 }}>
          {site.name.first} {site.name.last}
        </div>
        <div style={{ fontSize: 48, marginBottom: 10 }}>{site.jobTitle}</div>
        <div style={{ fontSize: 32, opacity: 0.9 }}>{site.tagline}</div>
      </div>
    ),
    {
      ...size,
    }
  )
}
```

**Note:** Dynamic OG images akan override static `/og-image.png`. Pilih salah satu approach.

---

## ✅ Testing OG Image

Setelah membuat OG image, test dengan tools berikut:

1. **Facebook Sharing Debugger:**
   - https://developers.facebook.com/tools/debug/
   - Paste URL: `https://zacky.id`
   - Click "Scrape Again" untuk refresh cache

2. **Twitter Card Validator:**
   - https://cards-dev.twitter.com/validator
   - Paste URL dan verify

3. **LinkedIn Post Inspector:**
   - https://www.linkedin.com/post-inspector/
   - Paste URL dan verify

4. **Open Graph Preview:**
   - https://www.opengraph.xyz/
   - Paste URL untuk preview

5. **WhatsApp Preview:**
   - Share link ke WhatsApp (test manual)
   - Verify thumbnail muncul

---

## 🚨 Important Notes

1. **File Naming:** Pastikan file name exact match dengan yang di metadata:
   - Metadata: `/og-image.png`
   - File: `public/og-image.png`

2. **Cache:** Social media platforms cache OG images. Jika update image:
   - Facebook: Use Sharing Debugger untuk clear cache
   - Twitter: Use Card Validator untuk refresh
   - LinkedIn: Use Post Inspector untuk refresh

3. **File Size:** Keep image < 1MB untuk fast loading. Compress jika perlu:
   - Online: https://tinypng.com/ atau https://squoosh.app/
   - CLI: `pngquant` atau `imagemagick`

4. **Accessibility:** Pastikan text readable dan contrast ratio cukup (WCAG AA minimum)

---

## 📝 Quick Checklist

- [ ] Buat OG image 1200x630px
- [ ] Save ke `public/og-image.png` (atau `.jpg`)
- [ ] Verify file size < 1MB
- [ ] Test dengan Facebook Sharing Debugger
- [ ] Test dengan Twitter Card Validator
- [ ] Test dengan LinkedIn Post Inspector
- [ ] Test manual di WhatsApp
- [ ] Verify image muncul di preview semua platforms

---

## 🎯 Current Status

✅ **Metadata Configuration:** DONE
⏳ **OG Image File:** NEEDS CREATION
✅ **Testing Tools:** READY

Setelah OG image dibuat dan di-test, SEO dan social media thumbnails akan fully functional!

