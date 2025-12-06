# SEO Verification Guide

## 🔍 Search Engine Verification

Untuk memverifikasi website di search engines, tambahkan verification meta tags atau file verification.

### Google Search Console

1. **Via Meta Tag:**
   - Buka Google Search Console: https://search.google.com/search-console
   - Pilih metode "HTML tag"
   - Copy content attribute dari meta tag yang diberikan
   - Tambahkan ke `src/app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  // ... existing
  verification: {
    google: 'your-verification-code-here',
  },
}
```

2. **Via HTML File:**
   - Download file HTML verification
   - Simpan ke `public/google[verification-code].html`
   - Next.js akan serve file ini secara otomatis

### Bing Webmaster Tools

1. **Via Meta Tag:**
   - Buka Bing Webmaster Tools: https://www.bing.com/webmasters
   - Pilih metode "Meta tag"
   - Tambahkan ke `src/app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  // ... existing
  verification: {
    other: {
      'msvalidate.01': 'your-bing-verification-code-here',
    },
  },
}
```

### Yandex Webmaster

```typescript
verification: {
  other: {
    'yandex-verification': 'your-yandex-code-here',
  },
}
```

### Complete Example

```typescript
export const metadata: Metadata = {
  // ... existing metadata
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '',
    other: {
      'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION || '',
      'yandex-verification': process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || '',
    },
  },
}
```

**Note:** Gunakan environment variables untuk verification codes agar tidak ter-expose di public repository.

---

## 📝 Environment Variables Setup

Tambahkan ke `.env.local`:

```bash
NEXT_PUBLIC_GOOGLE_VERIFICATION=your-google-code
NEXT_PUBLIC_BING_VERIFICATION=your-bing-code
NEXT_PUBLIC_YANDEX_VERIFICATION=your-yandex-code
```

---

## ✅ Verification Checklist

- [ ] Google Search Console verification
- [ ] Bing Webmaster Tools verification
- [ ] Yandex Webmaster verification (optional)
- [ ] Test verification meta tags muncul di HTML source
- [ ] Verify di masing-masing platform

---

## 🔗 Useful Links

- Google Search Console: https://search.google.com/search-console
- Bing Webmaster Tools: https://www.bing.com/webmasters
- Yandex Webmaster: https://webmaster.yandex.com

