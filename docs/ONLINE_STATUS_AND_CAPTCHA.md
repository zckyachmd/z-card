# Online Status & Cloudflare Turnstile CAPTCHA

**Date:** 2025-01-27
**Status:** ✅ Completed

---

## Overview

This document outlines the implementation of:
1. **Online Status Detector** - Real-time system health indicator in navbar
2. **Cloudflare Turnstile CAPTCHA** - Bot protection for contact form

---

## 1. Online Status Detector ✅

### Implementation

**File:** `src/components/online-status.tsx`

**Features:**
- Polls `/api/health` endpoint every 30 seconds
- Displays status with colored dot indicator:
  - 🟢 **Green** - System healthy
  - 🟡 **Yellow** - System degraded
  - 🔴 **Red** - System unhealthy
  - ⚪ **Gray** - Offline/checking
- Animated pulse effect for active status
- Accessible with screen reader support

**Integration:**
- Added to navbar (`src/components/navbar.tsx`)
- Positioned before navigation links
- Minimal visual footprint

### Status Colors

| Status | Color | Meaning |
|--------|-------|---------|
| `healthy` | Green | System is online and healthy |
| `degraded` | Yellow | System is online but performance is degraded |
| `unhealthy` | Red | System is online but experiencing issues |
| `checking` | Gray (pulse) | Currently checking status |
| `offline` | Gray | System is offline or unreachable |

### Configuration

**Polling Interval:** 30 seconds (configurable in component)

**Timeout:** 5 seconds for health check requests

---

## 2. Cloudflare Turnstile CAPTCHA ✅

### Implementation

**Files:**
- `src/components/cloudflare-turnstile.tsx` - React component wrapper
- `src/lib/turnstile.ts` - Server-side verification
- `src/app/(site)/_components/contact.tsx` - Form integration
- `src/app/api/contact/route.ts` - API verification

### Features

**Client-Side:**
- Automatic script loading from Cloudflare CDN
- Theme-aware (light/dark/auto)
- Normal or compact size
- Error and expiration callbacks
- Automatic cleanup on unmount

**Server-Side:**
- Token verification with Cloudflare API
- IP address validation
- Graceful fallback if not configured
- Error handling and logging

### Setup Instructions

#### 1. Get Cloudflare Turnstile Keys

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Turnstile** section
3. Create a new site
4. Copy **Site Key** (public) and **Secret Key** (private)

#### 2. Configure Environment Variables

Add to `.env.local`:

```bash
# Cloudflare Turnstile
NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY=your_site_key_here
CLOUDFLARE_TURNSTILE_SECRET_KEY=your_secret_key_here
```

**Note:**
- `NEXT_PUBLIC_*` variables are exposed to the browser
- Secret key should NEVER be exposed to client

#### 3. Verification Flow

1. User loads contact form
2. Turnstile widget automatically loads
3. User completes verification (invisible or interactive)
4. Token is generated and stored in component state
5. On form submission, token is sent to API
6. Server verifies token with Cloudflare
7. If valid, form submission proceeds

### Fallback Behavior

**If Turnstile is NOT configured:**
- Widget does not render
- Form works with existing honeypot validation
- No breaking changes

**If Turnstile verification fails:**
- User sees error message
- Form submission is blocked
- User can retry verification

---

## Usage

### Online Status

The status indicator appears automatically in the navbar. No configuration needed.

### Turnstile CAPTCHA

**Automatic:**
- Widget loads when contact form is rendered
- Verification happens automatically
- No user interaction required (invisible mode)

**Manual Reset (if needed):**
```tsx
// Component handles reset automatically on form submission
// Or can be reset by re-rendering the component
```

---

## API Integration

### Contact Form API

**Endpoint:** `POST /api/contact`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello!",
  "honeypot": "",
  "submissionTime": 5000,
  "turnstileToken": "0.abcdef..." // Optional if Turnstile configured
}
```

**Verification Process:**
1. Check if `CLOUDFLARE_TURNSTILE_SECRET_KEY` is set
2. If set, verify `turnstileToken` with Cloudflare
3. If verification fails, return 400 error
4. If not configured, skip verification (fallback to honeypot)

---

## Security Considerations

### Turnstile Benefits

1. **Invisible CAPTCHA** - Most users don't see it
2. **Privacy-Friendly** - No tracking cookies
3. **Free Tier** - Unlimited requests
4. **Better UX** - No puzzles or image selection
5. **Server-Side Verification** - Token verified on server

### Best Practices

1. ✅ Always verify token on server-side
2. ✅ Never expose secret key to client
3. ✅ Use environment variables for keys
4. ✅ Handle verification errors gracefully
5. ✅ Keep honeypot as fallback

---

## Testing

### Online Status

1. **Healthy Status:**
   - Start dev server
   - Check navbar for green dot
   - Should pulse if active

2. **Offline Status:**
   - Stop server
   - Wait 30 seconds
   - Dot should turn gray

### Turnstile CAPTCHA

1. **With Keys Configured:**
   - Add keys to `.env.local`
   - Load contact form
   - Widget should appear
   - Submit form - should work

2. **Without Keys:**
   - Remove keys from `.env.local`
   - Load contact form
   - Widget should NOT appear
   - Form should work with honeypot only

3. **Verification Failure:**
   - Submit form without completing CAPTCHA
   - Should show error message
   - Form should not submit

---

## Troubleshooting

### Online Status Not Showing

- Check if `/api/health` endpoint is accessible
- Check browser console for errors
- Verify component is imported in navbar

### Turnstile Not Working

1. **Widget Not Appearing:**
   - Check `NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY` is set
   - Check browser console for script loading errors
   - Verify site key is correct

2. **Verification Failing:**
   - Check `CLOUDFLARE_TURNSTILE_SECRET_KEY` is set
   - Verify secret key matches site key
   - Check server logs for verification errors
   - Ensure IP address is not blocked

3. **Token Expired:**
   - Tokens expire after 5 minutes
   - User needs to verify again
   - Component handles expiration automatically

---

## Performance

### Online Status

- **Polling Interval:** 30 seconds (low impact)
- **Request Size:** ~1KB
- **Network:** Only when page is active

### Turnstile

- **Script Size:** ~50KB (loaded once)
- **Verification:** ~100-200ms server-side
- **No Impact:** If not configured

---

## Resources

- [Cloudflare Turnstile Docs](https://developers.cloudflare.com/turnstile/)
- [Turnstile Dashboard](https://dash.cloudflare.com/?to=/:account/turnstile)
- [Health Check API](./API_HEALTH_CHECK.md)

---

## Notes

- Online status is optional - works without configuration
- Turnstile is optional - form works without it (uses honeypot)
- Both features degrade gracefully if not configured
- No breaking changes to existing functionality

