# z-card - Epic Breakdown

**Author:** Zacky Achmad
**Date:** 2025-01-27
**Project:** z-card
**Project Type:** Web Application (Next.js + TypeScript)
**Focus:** Brownfield project cleanup, standardization, dan minimal backend setup

---

## Overview

Dokumen ini menyediakan breakdown lengkap semua epic dan story untuk project z-card, dengan fokus pada:

1. **Project Cleanup & Standardization** - Merapikan struktur project dan standarisasi code quality
2. **Quality Assurance Foundation** - Setup testing framework dan quality gates
3. **Documentation** - Comprehensive project documentation
4. **Minimal Backend** - Email functionality untuk contact form

**Living Document Notice:** Dokumen ini akan diupdate setelah tech spec dan story files dibuat untuk menambahkan detail implementasi.

---

## Epic Summary

| Epic   | Title                                     | Priority      | Status    | Stories | Sprint     |
| ------ | ----------------------------------------- | ------------- | --------- | ------- | ---------- |
| Epic 1 | Project Foundation & Code Standardization | P0 - Critical | contexted | 3       | Sprint 1   |
| Epic 3 | Quality Assurance & Testing Foundation    | P1 - High     | contexted | 3       | Sprint 1-2 |
| Epic 4 | Documentation & Knowledge Base            | P2 - Medium   | contexted | 2       | Sprint 2-3 |
| Epic 5 | Minimal Email Backend                     | P1 - High     | contexted | 3       | Sprint 2   |

**Total:** 4 Epics, 11 Stories

---

## Epic 1: Project Foundation & Code Standardization

**Epic ID:** epic-1-foundation-standardization  
**Status:** contexted  
**Priority:** P0 - Critical  
**Sprint:** Sprint 1  
**Epic Document:** [epic-1-foundation-standardization.md](./sprint-artifacts/epic-1-foundation-standardization.md)

### Epic Overview

**Goal:** Merapikan dan menstandarisasi struktur project z-card serta code quality standards sebagai fondasi untuk pengembangan full stack selanjutnya.

**User Value:** Developer dapat bekerja dengan codebase yang konsisten, maintainable, dan memiliki quality gates yang jelas untuk memastikan kualitas code tetap terjaga seiring project berkembang.

**Business Value:** Mempercepat development velocity dengan mengurangi technical debt, meminimalisir bugs, dan memudahkan onboarding developer baru.

### Current State

- ✅ TypeScript strict mode: **ENABLED**
- ✅ ESLint: **CONFIGURED**
- ✅ Prettier: **CONFIGURED**
- ✅ Husky: **SETUP**
- ⚠️ **NEEDS AUDIT**: Struktur folder, naming conventions, code patterns
- ⚠️ **NEEDS REVIEW**: ESLint rules strength, Prettier consistency
- ⚠️ **NEEDS IMPROVEMENT**: Type definitions organization, path aliases usage

### Stories

**Story 1.1: Audit Current Project Structure**

- **Status:** backlog
- **Priority:** P0
- **Description:** Comprehensive audit of current project structure, dependencies, dan code patterns
- **Key Deliverables:**
  - Document current folder structure dengan purpose
  - Identify inconsistencies dalam naming conventions
  - List all dependencies dan categorize
  - Document current code patterns dan anti-patterns
  - Create migration plan document

**Story 1.2: Setup TypeScript Strict Mode & Type Safety**

- **Status:** backlog
- **Priority:** P0
- **Description:** Optimize TypeScript configuration dan fix all type errors
- **Key Deliverables:**
  - Review dan optimize TypeScript configuration
  - Fix all existing type errors
  - Organize shared type definitions di `src/types/`
  - Ensure path aliases (@/) digunakan consistently
  - Document type patterns dan best practices

**Story 1.3: Standardize Code Style with ESLint & Prettier**

- **Status:** backlog
- **Priority:** P0
- **Description:** Strengthen ESLint rules, verify Prettier consistency, fix linting errors
- **Key Deliverables:**
  - Review dan strengthen ESLint rules
  - Verify Prettier configuration consistency
  - Fix all existing linting errors
  - Ensure Husky pre-commit hooks working correctly
  - Document coding standards

### Success Criteria

- ✅ Project structure documented dan standardized
- ✅ TypeScript strict mode optimal dengan zero type errors
- ✅ ESLint rules strengthened dan all files pass linting
- ✅ Prettier configuration consistent dan all files formatted
- ✅ Pre-commit hooks working correctly
- ✅ Coding standards documented

### Dependencies

- **No blocking dependencies** - Epic ini dapat dimulai immediately
- **Blocks:** Epic 3, Epic 5 (foundation needed)

---

## Epic 3: Quality Assurance & Testing Foundation

**Epic ID:** epic-3-quality-assurance  
**Status:** contexted  
**Priority:** P1 - High  
**Sprint:** Sprint 1-2  
**Epic Document:** [epic-3-quality-assurance.md](./sprint-artifacts/epic-3-quality-assurance.md)

### Epic Overview

**Goal:** Setup comprehensive testing framework dan quality gates untuk memastikan code quality tetap terjaga seiring project berkembang.

**User Value:** Developer dapat menulis dan menjalankan tests dengan confidence, dan quality gates otomatis mencegah code berkualitas rendah masuk ke codebase.

**Business Value:** Mengurangi bugs di production, mempercepat development dengan confidence, dan memudahkan refactoring dengan test coverage.

### Current State

- ❌ **NO TESTING FRAMEWORK YET**
- No test files exist
- No test scripts di package.json
- No CI/CD quality gates

### Technical Decisions

- **Testing Framework:** Vitest (fast, ESM support, Jest-compatible)
- **E2E Framework:** Playwright (modern, Next.js support)
- **Coverage Threshold:** 70% minimum overall, 90%+ untuk critical paths

### Stories

**Story 3.1: Setup Testing Framework & Quality Gates**

- **Status:** backlog
- **Priority:** P1
- **Sprint:** Sprint 1 (parallel dengan Epic 1)
- **Description:** Install dan configure Vitest untuk unit testing
- **Key Deliverables:**
  - Install Vitest dan dependencies
  - Configure Vitest untuk Next.js App Router
  - Setup test utilities
  - Create test scripts di package.json
  - Setup coverage reporting (70% minimum)
  - Write example test untuk verify setup
  - Document testing guidelines

**Story 3.2: Create Code Review Checklist & Standards**

- **Status:** backlog
- **Priority:** P1
- **Sprint:** Sprint 2
- **Description:** Create PR template, code review criteria, dan contribution guidelines
- **Key Deliverables:**
  - Create PR template dengan checklist
  - Document code review criteria
  - Define when tests are required
  - Setup automated checks (lint, type, tests)
  - Create contribution guidelines

**Story 3.3: Setup E2E Testing with Playwright** (Optional)

- **Status:** backlog
- **Priority:** P2
- **Sprint:** Sprint 2 (optional, can defer)
- **Description:** Install Playwright dan write E2E tests untuk critical flows
- **Key Deliverables:**
  - Install Playwright
  - Configure Playwright untuk Next.js
  - Write E2E test untuk contact form (after Epic 5)
  - Write E2E test untuk navigation
  - Document E2E testing guidelines
  - Add E2E test scripts

### Success Criteria

- ✅ Vitest installed dan configured
- ✅ Test scripts working di package.json
- ✅ Example tests written dan passing
- ✅ Coverage reporting working (70% minimum)
- ✅ Code review checklist created
- ✅ PR template dengan quality gates
- ✅ Testing guidelines documented

### Dependencies

- **Depends on:** Epic 1 (foundation work)
- **Can run parallel with:** Epic 4 (documentation)
- **Blocks:** Future epics (quality gates needed)

---

## Epic 4: Documentation & Knowledge Base

**Epic ID:** epic-4-documentation  
**Status:** contexted  
**Priority:** P2 - Medium  
**Sprint:** Sprint 2-3  
**Epic Document:** [epic-4-documentation.md](./sprint-artifacts/epic-4-documentation.md)

### Epic Overview

**Goal:** Membuat comprehensive project documentation untuk memudahkan onboarding, maintenance, dan future development.

**User Value:** Developer baru dapat memahami project structure, coding standards, dan development workflow dengan cepat. Developer existing dapat reference documentation untuk consistency.

**Business Value:** Mengurangi onboarding time, memudahkan knowledge transfer, dan memastikan consistency dalam development practices.

### Current State

- ⚠️ **MINIMAL DOCUMENTATION**
- Basic README.md (if exists)
- No architecture documentation
- No coding standards documentation
- No development workflow guide

### Stories

**Story 4.1: Document Project Architecture & Standards**

- **Status:** backlog
- **Priority:** P2
- **Sprint:** Sprint 2
- **Description:** Create architecture documentation dan coding standards guide
- **Key Deliverables:**
  - Create `docs/ARCHITECTURE.md` dengan complete information
  - Create `docs/CODING_STANDARDS.md` dengan clear guidelines
  - Update `README.md` dengan overview dan quick start
  - Code examples tested dan working

**Story 4.2: Create Development Workflow Documentation**

- **Status:** backlog
- **Priority:** P2
- **Sprint:** Sprint 3
- **Description:** Create contributing guide dengan development workflow
- **Key Deliverables:**
  - Create `docs/CONTRIBUTING.md` dengan workflow details
  - Document environment setup
  - Create `.env.example` template
  - Document common tasks (dev, build, test, lint)
  - Document Git workflow dan PR process

### Success Criteria

- ✅ `docs/ARCHITECTURE.md` created dengan complete information
- ✅ `docs/CODING_STANDARDS.md` created dengan clear guidelines
- ✅ `docs/CONTRIBUTING.md` created dengan workflow details
- ✅ `README.md` updated dengan overview dan quick start
- ✅ `.env.example` template created
- ✅ All documentation accurate dan up-to-date

### Dependencies

- **Depends on:** Epic 1, Epic 3 (for accurate content)
- **Can run parallel with:** Epic 5 (documentation can be updated later)
- **No blocking dependencies**

---

## Epic 5: Minimal Email Backend

**Epic ID:** epic-5-minimal-email-backend  
**Status:** contexted  
**Priority:** P1 - High  
**Sprint:** Sprint 2  
**Epic Document:** [epic-5-minimal-email-backend.md](./sprint-artifacts/epic-5-minimal-email-backend.md)

### Epic Overview

**Goal:** Implement minimal backend infrastructure untuk email functionality, specifically untuk contact form submission, menggunakan Next.js API Routes tanpa perlu full backend infrastructure.

**User Value:** Users dapat submit contact form dan receive confirmation, serta website owner dapat receive email notifications untuk form submissions.

**Business Value:** Enable contact form functionality yang essential untuk portfolio website, dengan minimal infrastructure overhead.

### Current State

- ❌ **NO BACKEND YET**
- Frontend form exists di `src/app/(site)/_components/contact.tsx`
- No backend integration
- No email functionality
- Form submission not working

### Technical Decisions

- **Backend Architecture:** Next.js API Routes (App Router)
- **Email Service:** Resend (modern, developer-friendly, good free tier)
- **Validation:** Zod untuk schema validation (client + server)
- **Rate Limiting:** Simple in-memory (sufficient untuk portfolio)

### Stories

**Story 5.1: Email API Route Setup**

- **Status:** backlog
- **Priority:** P1
- **Sprint:** Sprint 2
- **Description:** Create Next.js API route untuk contact form dengan validation
- **Key Deliverables:**
  - Create `src/app/api/contact/route.ts` dengan POST handler
  - Setup environment variables (RESEND_API_KEY, etc.)
  - Create `src/lib/email.ts` dengan email service abstraction
  - Implement basic request validation
  - Return standardized API responses
  - Add error handling dan logging
  - Add rate limiting (optional but recommended)

**Story 5.2: Contact Form Integration**

- **Status:** backlog
- **Priority:** P1
- **Sprint:** Sprint 2
- **Description:** Connect contact form ke API dengan proper error handling
- **Key Deliverables:**
  - Update contact form component untuk call API
  - Add loading states (disabled button, spinner)
  - Add success/error toast notifications
  - Client-side validation sebelum submit
  - Server-side validation di API route
  - Handle network errors gracefully
  - Test form submission end-to-end

**Story 5.3: Email Service Integration**

- **Status:** backlog
- **Priority:** P1
- **Sprint:** Sprint 2
- **Description:** Integrate Resend email service dan test email delivery
- **Key Deliverables:**
  - Choose email service provider (Resend)
  - Setup Resend account dan get API key
  - Configure email template dengan form data
  - Implement email sending logic
  - Add error logging
  - Test email delivery (dev & prod)
  - Document email setup in README

### Success Criteria

- ✅ API route created dan working
- ✅ Email service integrated (Resend)
- ✅ Contact form connected ke API
- ✅ Form validation working (client + server)
- ✅ Error handling implemented
- ✅ Success/error feedback untuk users
- ✅ Email delivery verified
- ✅ Environment variables documented
- ✅ Tests written (unit + E2E)

### Dependencies

- **Depends on:** Epic 1 (TypeScript, structure)
- **Can start after:** Epic 1 completion
- **No blocking dependencies:** Can start Epic 5 after Epic 1

---

## Epic Dependencies Map

```
Epic 1 (Foundation)
  ├── Blocks: Epic 3, Epic 5
  └── No dependencies

Epic 3 (Quality Assurance)
  ├── Depends on: Epic 1
  ├── Can parallel: Epic 4
  └── Blocks: Future epics

Epic 4 (Documentation)
  ├── Depends on: Epic 1, Epic 3 (for accurate content)
  ├── Can parallel: Epic 5
  └── No blocking

Epic 5 (Minimal Email Backend)
  ├── Depends on: Epic 1
  ├── Can start after: Epic 1
  └── No blocking
```

---

## Sprint Allocation

### Sprint 1: Foundation & Standardization

- **Epic 1:** All stories (1.1, 1.2, 1.3)
- **Epic 3.1:** Setup Testing Framework (parallel)

### Sprint 2: Quality Gates & Minimal Backend

- **Epic 3.2:** Code Review Checklist
- **Epic 3.3:** E2E Testing (Optional)
- **Epic 4.1:** Document Architecture & Standards
- **Epic 5:** All stories (5.1, 5.2, 5.3)

### Sprint 3: Documentation & Polish

- **Epic 4.2:** Development Workflow Documentation
- Testing & refinement
- Final code review

---

## Story Inventory

### Epic 1: Project Foundation & Code Standardization

- `1-1-audit-project-structure`
- `1-2-typescript-strict-mode`
- `1-3-standardize-code-style`

### Epic 3: Quality Assurance & Testing Foundation

- `3-1-setup-testing-framework`
- `3-2-code-review-checklist`
- `3-3-setup-e2e-testing` (optional)

### Epic 4: Documentation & Knowledge Base

- `4-1-document-architecture`
- `4-2-development-workflow`

### Epic 5: Minimal Email Backend

- `5-1-email-api-route`
- `5-2-contact-form-integration`
- `5-3-email-service-integration`

**Total Stories:** 11 (10 required + 1 optional)

---

## Success Criteria (Project Level)

**Project Complete When:**

- ✅ All Epic 1 stories completed (foundation solid)
- ✅ All Epic 3 stories completed (quality gates active)
- ✅ All Epic 4 stories completed (documentation complete)
- ✅ All Epic 5 stories completed (email backend working)
- ✅ All code compliant dengan standards
- ✅ All tests passing
- ✅ Documentation accurate dan up-to-date
- ✅ Contact form fully functional
- ✅ Project ready untuk feature development

---

## Notes

**Brownfield Project Considerations:**

- Focus on incremental improvement
- Minimal breaking changes
- Document all changes
- Maintain backward compatibility where possible

**Priority Adjustments:**

- Epic 1 is critical - must complete first
- Epic 5 can start after Epic 1 (minimal dependency)
- Epic 3.3 (E2E) can be deferred jika time constrained
- Epic 4 can run parallel dengan other epics

**Future Considerations:**

- After Epic 5, consider full backend architecture jika needed
- Testing coverage dapat ditingkatkan gradually
- Documentation dapat diperluas dengan API docs, deployment guides, etc.

---

## Related Documents

- [Sprint Planning](./sprint-planning.md) - Detailed sprint breakdown
- [Sprint Status](./sprint-status.yaml) - Story status tracking
- [Epic 1 Context](./sprint-artifacts/epic-1-foundation-standardization.md)
- [Epic 3 Context](./sprint-artifacts/epic-3-quality-assurance.md)
- [Epic 4 Context](./sprint-artifacts/epic-4-documentation.md)
- [Epic 5 Context](./sprint-artifacts/epic-5-minimal-email-backend.md)

---

_For implementation: Use the `create-story` workflow to generate individual story implementation plans from epic context documents._

_This document will be updated after tech spec creation to incorporate technical implementation details._
