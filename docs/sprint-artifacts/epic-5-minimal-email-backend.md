# Epic 5: Minimal Email Backend

**Epic ID:** epic-5-minimal-email-backend
**Status:** done
**Created:** 2025-01-27
**Project:** z-card
**Priority:** P1 - High

---

## Epic Overview

**Goal:** Implement minimal backend infrastructure untuk email functionality, specifically untuk contact form submission, menggunakan Next.js API Routes tanpa perlu full backend infrastructure.

**User Value:** Users dapat submit contact form dan receive confirmation, serta website owner dapat receive email notifications untuk form submissions.

**Business Value:** Enable contact form functionality yang essential untuk portfolio website, dengan minimal infrastructure overhead.

---

## Technical Context

### Current Project State

**Framework:** Next.js 15.4.8 (App Router)
**Language:** TypeScript 5.9.3
**Backend Status:** ❌ **NO BACKEND YET**

**Current Contact Form:**

- Frontend form exists di `src/app/(site)/_components/contact.tsx`
- No backend integration
- No email functionality
- Form submission not working

**Dependencies:**

- Epic 1 completion (TypeScript, ESLint, structure)
- Epic 3 completion (testing) - untuk test email functionality
- Project structure standardized

### Technical Decisions

**1. Backend Architecture: Minimal API Routes**

**Approach:** Next.js API Routes (App Router)

- ✅ No separate backend server needed
- ✅ Leverages Next.js built-in API routes
- ✅ Can scale to full backend later if needed
- ✅ Minimal infrastructure overhead
- ✅ TypeScript support built-in

**Structure:**

```
src/app/api/contact/route.ts  # Next.js 13+ App Router API route
src/lib/email.ts              # Email service abstraction
src/lib/validation.ts          # Form validation utilities
```

**2. Email Service Provider**

**Option A: Resend (RECOMMENDED)**

- ✅ Modern, developer-friendly API
- ✅ Simple setup
- ✅ Good free tier (100 emails/day)
- ✅ Great TypeScript support
- ✅ Fast delivery
- ✅ Built for developers

**Option B: SendGrid**

- ✅ Established, reliable
- ✅ More features (templates, analytics)
- ⚠️ More complex setup
- ⚠️ Heavier API

**Option C: Nodemailer + SMTP**

- ✅ Full control
- ✅ Self-hosted option
- ⚠️ More complex setup
- ⚠️ Need SMTP server

**DECISION: Resend**

- Best developer experience
- Simple untuk minimal backend
- Good free tier untuk portfolio site
- Easy to switch later if needed

**3. Form Validation Strategy**

**Client-Side:**

- React Hook Form atau native validation
- Immediate feedback untuk users
- Prevent unnecessary API calls

**Server-Side:**

- Zod atau similar untuk schema validation
- Validate all inputs di API route
- Return clear error messages
- Security: sanitize inputs, prevent injection

**4. Error Handling**

**API Response Standardization:**

```typescript
// Success
{ success: true, message: string }

// Error
{ success: false, error: string, details?: object }
```

**Error Scenarios:**

- Validation errors (400)
- Email service errors (500)
- Rate limiting (429) - optional
- Network errors

**5. Rate Limiting** (Optional but Recommended)

**Strategy:**

- Simple in-memory rate limiting (sufficient untuk portfolio)
- Or use middleware (if needed)
- Prevent spam submissions

### Technical Constraints

**Must Consider:**

- Next.js App Router API routes
- TypeScript strict mode compliance
- Email service API limits
- Security (input validation, sanitization)
- Error handling dan user feedback
- Performance (fast response times)

**Dependencies:**

- Epic 1 (TypeScript, structure)
- Epic 3 (testing) - untuk test email functionality
- Resend account setup (free tier)

### Component Architecture

**API Route Structure:**

```
src/app/api/contact/route.ts
```

**Service Layer:**

```
src/lib/email.ts          # Email service abstraction
src/lib/validation.ts     # Form validation (Zod schemas)
```

**Types:**

```
src/types/contact.d.ts    # Contact form types
```

**Files to Create:**

- `src/app/api/contact/route.ts` - POST handler untuk contact form
- `src/lib/email.ts` - Email service wrapper
- `src/lib/validation.ts` - Validation schemas
- `src/types/contact.d.ts` - TypeScript types

**Files to Modify:**

- `src/app/(site)/_components/contact.tsx` - Connect form ke API
- `.env.example` - Add email service variables
- `docs/API.md` - Document API endpoint (Epic 4)

### Environment Variables

**Required:**

```env
# Resend API Configuration
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@zacky.id
RESEND_TO_EMAIL=contact@zacky.id
```

**Optional:**

```env
# Rate limiting (if implemented)
RATE_LIMIT_MAX_REQUESTS=5
RATE_LIMIT_WINDOW_MS=60000  # 1 minute
```

### File Structure

**New Structure:**

```
src/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts      # NEW: API route handler
│   └── (site)/
│       └── _components/
│           └── contact.tsx   # MODIFY: Connect to API
├── lib/
│   ├── email.ts              # NEW: Email service
│   └── validation.ts         # NEW: Validation schemas
└── types/
    └── contact.d.ts          # NEW: Contact types
```

### Implementation Stories

**Story 5.1: Email API Route Setup**

- Create `src/app/api/contact/route.ts` dengan POST handler
- Setup environment variables (RESEND_API_KEY, etc.)
- Create `src/lib/email.ts` dengan email service abstraction
- Implement basic request validation
- Return standardized API responses (success/error)
- Add error handling dan logging
- Add rate limiting (optional but recommended)

**Story 5.2: Contact Form Integration**

- Update contact form component untuk call API
- Add loading states (disabled button, spinner)
- Add success/error toast notifications
- Client-side validation sebelum submit
- Server-side validation di API route
- Handle network errors gracefully
- Test form submission end-to-end

**Story 5.3: Email Service Integration**

- Choose email service provider (Resend)
- Setup Resend account dan get API key
- Configure email template dengan form data
- Implement email sending logic
- Add error logging (console.log untuk dev, proper logging untuk prod)
- Test email delivery (dev & prod)
- Document email setup in README

### Testing Considerations

**Unit Testing:**

- Test validation schemas
- Test email service abstraction
- Test error handling

**Integration Testing:**

- Test API route dengan valid/invalid inputs
- Test email service integration
- Mock email service untuk tests

**E2E Testing:**

- Test contact form submission flow
- Test success/error scenarios
- Test email delivery (manual verification)

**Manual Testing:**

- Submit form dengan valid data
- Submit form dengan invalid data
- Test error scenarios
- Verify email received
- Test rate limiting (if implemented)

### Success Criteria

**Epic Complete When:**

- ✅ API route created dan working
- ✅ Email service integrated (Resend)
- ✅ Contact form connected ke API
- ✅ Form validation working (client + server)
- ✅ Error handling implemented
- ✅ Success/error feedback untuk users
- ✅ Email delivery verified
- ✅ Environment variables documented
- ✅ API documented (Epic 4)
- ✅ Tests written (unit + E2E)

### Dependencies & Prerequisites

**Before Starting:**

- Epic 1 completion (TypeScript, structure)
- Epic 3 completion (testing) - untuk test email
- Contact form component exists (frontend)

**Dependencies:**

- **Depends on:** Epic 1, Epic 3 (foundation)
- **Can start after:** Epic 1 completion (can work on Epic 5 while Epic 3/4 in progress)
- **No blocking dependencies:** Can start Epic 5 after Epic 1

**Infrastructure Requirements:**

- Resend account (free tier sufficient)
- Environment variables setup
- Email domain configured (optional, can use Resend domain)

### Notes & Considerations

**Minimal Backend Philosophy:**

- Only implement what's needed now
- Keep it simple
- Can expand later if needed
- No over-engineering

**Security:**

- Validate all inputs
- Sanitize user data
- Rate limiting untuk prevent spam
- No sensitive data in responses
- Proper error messages (don't leak info)

**Performance:**

- Fast API response times
- Async email sending (don't block response)
- Efficient validation

**Developer Experience:**

- Clear error messages
- Easy to test
- Good logging
- Simple configuration

**Future Enhancements:**

- Email templates (if needed)
- Email queue (if volume increases)
- Multiple recipients
- Email analytics
- Spam detection (if needed)
- Full backend migration (if needed)

---

## Story Dependencies

**Story Flow:**

1. Story 5.1 (API Setup) → Story 5.2 (Form Integration) → Story 5.3 (Email Service)

**Sequential Dependencies:**

- Story 5.1 MUST complete first (API route needed)
- Story 5.2 requires 5.1 (need API to connect)
- Story 5.3 can start early (email service setup) but needs 5.1 untuk integration

**Partial Parallel Work:**

- Story 5.1 dan 5.3 dapat overlap (API setup vs email service setup)
- Story 5.2 requires both 5.1 dan 5.3 completion

---

**Context Status:** ✅ Ready for story drafting
