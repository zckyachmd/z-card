# Epic 1: Analytics Tracking - Technical Context

**Epic ID:** epic-1-analytics
**Status:** contexted
**Created:** 2025-12-05
**Project:** z-card

---

## Epic Overview

**Goal:** Implement comprehensive analytics tracking untuk portfolio website z-card agar dapat mengukur visitor behavior, popular sections, dan conversion metrics.

**User Value:** Website owner dapat memahami bagaimana visitors berinteraksi dengan portfolio, section mana yang paling menarik, dan apakah contact form berhasil mengkonversi visitors menjadi leads.

---

## Technical Context

### Current Project State

**Framework:** Next.js 15.4.8 (App Router)
**Language:** TypeScript 5.9.3
**Package Manager:** pnpm
**Deployment:** Vercel-ready (standalone output configured)

**Current Structure:**

- Root layout: `src/app/layout.tsx`
- Theme provider: `src/components/theme-provider.tsx`
- Client components untuk interactivity
- Server components untuk static content

**No Analytics Currently:**

- Tidak ada analytics tracking
- Tidak ada environment variables untuk analytics
- Tidak ada analytics provider component

### Technical Decisions

**1. Analytics Stack: FIRST-PARTY ONLY (Adblock Resistant)**

**REQUIREMENT:** First-party analytics agar tidak diblokir oleh adblock dan privacy tools.

**Recommended Options:**

**Option A: Umami Analytics (RECOMMENDED)**

- ✅ Open source, self-hosted
- ✅ First-party domain (analytics.zacky.id atau a.zacky.id)
- ✅ Privacy-friendly, GDPR compliant
- ✅ Lightweight (~2KB script)
- ✅ No cookies, no personal data collection
- ✅ Beautiful dashboard
- ✅ Docker-ready (sesuai dengan setup project)
- **Tech:** PostgreSQL/MySQL database, Node.js backend
- **Deployment:** Self-hosted di subdomain atau separate service

**Option B: Custom Analytics dengan Next.js API Routes**

- ✅ Full control, first-party
- ✅ No external dependencies
- ✅ Privacy-compliant by design
- ✅ Lightweight
- **Tech:** Next.js API routes + PostgreSQL/MySQL
- **Deployment:** Built-in dengan Next.js app
- **Effort:** Lebih tinggi (build dari scratch)

**Option C: PostHog Self-Hosted**

- ✅ Open source, self-hosted
- ✅ First-party domain
- ✅ Advanced features (session replay, feature flags)
- ⚠️ More complex setup
- **Tech:** PostgreSQL + ClickHouse, Python backend
- **Deployment:** Separate service dengan Docker

**DECISION: Umami Analytics (Option A)**

- Best balance antara ease of setup dan features
- Docker-ready (sesuai dengan project setup)
- Privacy-first, adblock-resistant
- Beautiful UI untuk dashboard

**2. Implementation Approach:**

- First-party domain setup (subdomain untuk analytics)
- Self-hosted Umami instance (Docker)
- Client-side tracking script dari first-party domain
- Next.js API route sebagai proxy (optional, untuk extra privacy)
- Environment variables untuk configuration
- Analytics provider component untuk centralized management
- Event tracking untuk user interactions

**3. Integration Points:**

- Root layout untuk global analytics
- Individual components untuk event tracking
- Contact form untuk conversion tracking

### Technical Constraints

**Must Consider:**

- Next.js App Router architecture (Server vs Client Components)
- Privacy compliance (GDPR-friendly jika diperlukan)
- Performance impact (minimal overhead)
- TypeScript strict mode (type safety required)

**Dependencies:**

- Umami Analytics instance (self-hosted)
- PostgreSQL database (untuk Umami)
- Subdomain setup (analytics.zacky.id atau a.zacky.id)
- Environment variables setup
- Docker & Docker Compose (untuk Umami deployment)

### Component Architecture

**New Components to Create:**

- `src/components/analytics.tsx` - Analytics provider wrapper
- Analytics hooks untuk event tracking (optional)

**Components to Modify:**

- `src/app/layout.tsx` - Add analytics provider
- `src/app/(site)/_components/contact.tsx` - Add conversion tracking
- `src/components/digital-card.tsx` - Track QR code scans (optional)

### Environment Variables

**Required:**

```env
# Umami Analytics Configuration
NEXT_PUBLIC_UMAMI_WEBSITE_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
NEXT_PUBLIC_UMAMI_SCRIPT_URL=https://analytics.zacky.id/script.js
# OR jika menggunakan proxy:
NEXT_PUBLIC_UMAMI_SCRIPT_URL=/api/analytics/script.js
```

**Optional:**

```env
# Jika menggunakan Next.js API route sebagai proxy
UMAMI_INSTANCE_URL=https://analytics.zacky.id
UMAMI_WEBSITE_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

### File Structure

```
src/
  components/
    analytics.tsx          # NEW: Analytics provider (Umami script loader)
  app/
    layout.tsx            # MODIFY: Add analytics provider
    api/
      analytics/
        script.js/route.ts # OPTIONAL: Proxy untuk Umami script (extra privacy)
```

**Umami Deployment (Separate):**

```
docker-compose.umami.yml  # NEW: Umami service dengan PostgreSQL
```

### Implementation Stories

**Story 1-1: Setup Umami Analytics Instance**

- Deploy Umami dengan Docker Compose
- Setup PostgreSQL database
- Configure subdomain (analytics.zacky.id)
- Create website di Umami dashboard
- Get website ID

**Story 1-2: Setup Analytics Provider Component**

- Create analytics component untuk load Umami script
- Setup environment variables
- Configure first-party script loading
- Add to root layout

**Story 1-3: Implement First-Party Script Loading**

- Load Umami script dari first-party domain
- Optional: Create Next.js API route proxy untuk extra privacy
- Verify script loads correctly
- Test adblock resistance

**Story 1-4: Add Page View Tracking**

- Automatic page view tracking dengan Umami
- Route change detection untuk Next.js App Router
- Verify tracking works di Umami dashboard

**Story 1-5: Add Event Tracking**

- Contact form submission events
- Digital card open events
- Button click events (optional)
- Custom event tracking dengan Umami API

### Testing Considerations

**Manual Testing:**

- Verify events appear di Umami dashboard
- Test dengan adblock enabled (should still work)
- Test dengan privacy tools enabled (should still work)
- Verify first-party domain setup
- Test di production (analytics tidak work di localhost)

**Adblock Resistance Testing:**

- Enable uBlock Origin / AdBlock Plus
- Verify Umami script masih load
- Verify events masih tracked
- Check browser network tab untuk confirm first-party requests

**No Automated Tests Required:**

- Analytics tracking adalah side effect
- Manual verification sufficient untuk MVP

### Success Criteria

**Epic Complete When:**

- ✅ Umami Analytics instance deployed dan running
- ✅ First-party domain configured (analytics.zacky.id)
- ✅ Umami script integrated di Next.js app
- ✅ Page view tracking working
- ✅ Contact form submission tracked sebagai event
- ✅ Analytics visible di Umami dashboard
- ✅ Adblock resistance verified (works dengan adblock enabled)
- ✅ Environment variables properly configured

### Dependencies & Prerequisites

**Before Starting:**

- Docker & Docker Compose installed
- PostgreSQL database (untuk Umami) - bisa self-hosted atau managed
- Subdomain DNS configured (analytics.zacky.id atau a.zacky.id)
- Server/hosting untuk Umami instance (bisa same server dengan Next.js atau separate)

**Infrastructure Requirements:**

- Server dengan Docker support
- PostgreSQL database (Umami requirement)
- Domain/subdomain untuk first-party analytics
- SSL certificate untuk subdomain (Let's Encrypt recommended)

**No Blocking Dependencies:**

- Epic ini dapat dimulai setelah infrastructure ready
- Tidak perlu menunggu epic lain

### Notes & Considerations

**Privacy:**

- Consider adding cookie consent jika diperlukan
- GDPR compliance jika target audience EU
- Privacy policy update mungkin diperlukan

**Performance:**

- Umami script sangat lightweight (~2KB)
- Analytics scripts loaded asynchronously
- Minimal impact pada page load time
- Use Next.js Script component dengan strategy="afterInteractive"

**Adblock Resistance:**

- First-party domain = tidak diblokir oleh adblock
- Script dari analytics.zacky.id (same domain family)
- No third-party requests yang bisa diblokir
- Privacy tools tidak akan block karena first-party

**Future Enhancements:**

- Custom event tracking untuk specific interactions
- Conversion funnel tracking
- Real-time dashboard untuk monitoring
- Export data untuk analysis
- Custom reports dan insights

---

## Story Dependencies

**Story Flow:**

1. 1-1 (Umami deployment) → 1-2 (Provider setup) → 1-3 (Script loading) → 1-4 (Page tracking) → 1-5 (Events)

**Sequential Dependencies:**

- Story 1-1 MUST complete first (Umami instance needed)
- Story 1-2 requires 1-1 (need website ID from Umami)
- Story 1-3 requires 1-2 (provider component needed)
- Story 1-4 requires 1-3 (script loading needed)
- Story 1-5 requires 1-4 (basic tracking needed)

**No Parallel Work:**

- Stories harus sequential karena dependencies
- Each story builds on previous one

---

## First-Party Analytics Architecture

### Why First-Party?

**Problem dengan Third-Party Analytics:**

- ❌ Google Analytics, Vercel Analytics diblokir oleh adblock
- ❌ Privacy tools (Privacy Badger, uBlock) block third-party trackers
- ❌ Users dengan adblock = no analytics data
- ❌ GDPR concerns dengan third-party data sharing

**Solution: First-Party Analytics**

- ✅ Script dari subdomain sendiri (analytics.zacky.id)
- ✅ Same domain family = tidak diblokir
- ✅ Full control atas data
- ✅ Privacy-compliant
- ✅ Adblock-resistant

### Umami Architecture

```
User Browser
    ↓
zacky.id (Next.js App)
    ↓ (loads script from)
analytics.zacky.id/script.js (Umami instance)
    ↓ (sends events to)
analytics.zacky.id/api/collect (Umami API)
    ↓ (stores in)
PostgreSQL Database
    ↓ (dashboard shows)
Umami Dashboard (analytics.zacky.id)
```

### Deployment Options

**Option 1: Same Server (Recommended untuk start)**

- Next.js app dan Umami di same server
- Different ports atau reverse proxy
- Shared PostgreSQL jika needed

**Option 2: Separate Server**

- Umami di dedicated server/service
- Better isolation dan scaling
- More complex setup

**Option 3: Managed Umami**

- Use Umami Cloud (paid)
- Easiest setup
- Less control

### DNS Configuration

**Required DNS Records:**

```
analytics.zacky.id  A  <server-ip>
# OR
a.zacky.id  A  <server-ip>  (shorter subdomain)
```

### Security Considerations

- SSL certificate untuk subdomain (HTTPS required)
- Umami authentication (admin password)
- Database security (PostgreSQL access control)
- Rate limiting untuk API endpoints
- CORS configuration jika needed

---

**Context Status:** ✅ Ready for story drafting (Updated untuk First-Party Analytics)
