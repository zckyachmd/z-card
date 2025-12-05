# Sprint Planning - z-card Project Cleanup & Full Stack Foundation

**Project:** z-card
**Created:** 2025-01-27
**Project Type:** Web Application (Next.js + TypeScript)
**Focus:** Brownfield project cleanup, standardization, dan minimal backend setup

---

## Sprint Overview

**Objective:** Merapikan dan menstandarisasi project z-card sebagai fondasi untuk pengembangan full stack, dengan fokus pada code quality, testing, documentation, dan minimal backend untuk contact form.

**Sprint Duration:** 3 Sprints
**Total Epics:** 4 Epics
**Total Stories:** 11 Stories

---

## Epic Summary

| Epic   | Title                                     | Priority      | Status    | Stories |
| ------ | ----------------------------------------- | ------------- | --------- | ------- |
| Epic 1 | Project Foundation & Code Standardization | P0 - Critical | contexted | 3       |
| Epic 3 | Quality Assurance & Testing Foundation    | P1 - High     | contexted | 3       |
| Epic 4 | Documentation & Knowledge Base            | P2 - Medium   | contexted | 2       |
| Epic 5 | Minimal Email Backend                     | P1 - High     | contexted | 3       |

---

## Sprint 1: Foundation & Standardization

**Duration:** 2-3 weeks
**Focus:** Project cleanup, TypeScript optimization, code style standardization, dan testing framework setup

**Epic 1: Project Foundation & Code Standardization** (P0 - Critical)

**Story 1.1: Audit Current Project Structure**

- **Status:** backlog
- **Priority:** P0
- **Description:** Comprehensive audit of current project structure, dependencies, dan code patterns
- **Acceptance Criteria:**
  - Document current folder structure dengan purpose
  - Identify inconsistencies dalam naming conventions
  - List all dependencies dan categorize
  - Document current code patterns dan anti-patterns
  - Create migration plan document

**Story 1.2: Setup TypeScript Strict Mode & Type Safety**

- **Status:** backlog
- **Priority:** P0
- **Description:** Optimize TypeScript configuration dan fix all type errors
- **Acceptance Criteria:**
  - Review dan optimize TypeScript configuration
  - Fix all existing type errors
  - Organize shared type definitions
  - Ensure path aliases (@/) digunakan consistently
  - Document type patterns dan best practices

**Story 1.3: Standardize Code Style with ESLint & Prettier**

- **Status:** backlog
- **Priority:** P0
- **Description:** Strengthen ESLint rules, verify Prettier consistency, fix linting errors
- **Acceptance Criteria:**
  - Review dan strengthen ESLint rules
  - Verify Prettier configuration consistency
  - Fix all existing linting errors
  - Ensure Husky pre-commit hooks working correctly
  - Document coding standards

**Epic 3: Quality Assurance & Testing Foundation** (P1 - High) - Parallel Work

**Story 3.1: Setup Testing Framework & Quality Gates**

- **Status:** backlog
- **Priority:** P1
- **Description:** Install dan configure Vitest untuk unit testing
- **Acceptance Criteria:**
  - Install Vitest dan dependencies
  - Configure Vitest untuk Next.js App Router
  - Setup test utilities
  - Create test scripts di package.json
  - Setup coverage reporting (70% minimum)
  - Write example test untuk verify setup
  - Document testing guidelines

**Sprint 1 Deliverables:**

- ✅ Project structure documented dan standardized
- ✅ TypeScript strict mode optimal dengan zero errors
- ✅ ESLint/Prettier strengthened dan all files compliant
- ✅ Testing framework setup dan working
- ✅ Pre-commit hooks verified working
- ✅ Coding standards documented

---

## Sprint 2: Quality Gates & Minimal Backend

**Duration:** 2 weeks
**Focus:** Code review standards, documentation, dan minimal email backend implementation

**Epic 3: Quality Assurance & Testing Foundation** (P1 - High) - Continue

**Story 3.2: Create Code Review Checklist & Standards**

- **Status:** backlog
- **Priority:** P1
- **Description:** Create PR template, code review criteria, dan contribution guidelines
- **Acceptance Criteria:**
  - Create PR template dengan checklist
  - Document code review criteria
  - Define when tests are required
  - Setup automated checks (lint, type, tests)
  - Create contribution guidelines

**Story 3.3: Setup E2E Testing with Playwright** (Optional)

- **Status:** backlog
- **Priority:** P2
- **Description:** Install Playwright dan write E2E tests untuk critical flows
- **Acceptance Criteria:**
  - Install Playwright
  - Configure Playwright untuk Next.js
  - Write E2E test untuk contact form (after Epic 5)
  - Write E2E test untuk navigation
  - Document E2E testing guidelines
  - Add E2E test scripts

**Epic 4: Documentation & Knowledge Base** (P2 - Medium)

**Story 4.1: Document Project Architecture & Standards**

- **Status:** backlog
- **Priority:** P2
- **Description:** Create architecture documentation dan coding standards guide
- **Acceptance Criteria:**
  - Create `docs/ARCHITECTURE.md` dengan complete information
  - Create `docs/CODING_STANDARDS.md` dengan clear guidelines
  - Update `README.md` dengan overview dan quick start
  - Code examples tested dan working

**Epic 5: Minimal Email Backend** (P1 - High)

**Story 5.1: Email API Route Setup**

- **Status:** backlog
- **Priority:** P1
- **Description:** Create Next.js API route untuk contact form dengan validation
- **Acceptance Criteria:**
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
- **Description:** Connect contact form ke API dengan proper error handling
- **Acceptance Criteria:**
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
- **Description:** Integrate Resend email service dan test email delivery
- **Acceptance Criteria:**
  - Choose email service provider (Resend)
  - Setup Resend account dan get API key
  - Configure email template dengan form data
  - Implement email sending logic
  - Add error logging
  - Test email delivery (dev & prod)
  - Document email setup in README

**Sprint 2 Deliverables:**

- ✅ Code review checklist dan PR template created
- ✅ Architecture dan coding standards documented
- ✅ Email API route working
- ✅ Contact form integrated dengan backend
- ✅ Email delivery verified
- ✅ E2E tests untuk critical flows (if Story 3.3 included)

---

## Sprint 3: Documentation & Polish

**Duration:** 1 week
**Focus:** Development workflow documentation, testing, dan final refinement

**Epic 4: Documentation & Knowledge Base** (P2 - Medium) - Continue

**Story 4.2: Create Development Workflow Documentation**

- **Status:** backlog
- **Priority:** P2
- **Description:** Create contributing guide dengan development workflow
- **Acceptance Criteria:**
  - Create `docs/CONTRIBUTING.md` dengan workflow details
  - Document environment setup
  - Create `.env.example` template
  - Document common tasks (dev, build, test, lint)
  - Document Git workflow dan PR process

**Sprint 3 Tasks:**

- Finalize all documentation
- Review dan test all implemented features
- Fix any bugs atau issues
- Code review semua changes
- Update documentation jika needed
- Prepare untuk next phase development

**Sprint 3 Deliverables:**

- ✅ Development workflow documented
- ✅ All documentation complete dan accurate
- ✅ All features tested dan working
- ✅ Code quality verified
- ✅ Project ready untuk next phase

---

## Sprint Dependencies

**Sprint 1 → Sprint 2:**

- Epic 1 completion required untuk Epic 5 (structure needed)
- Epic 3.1 completion helpful untuk Epic 3.2 (testing context)

**Sprint 2 → Sprint 3:**

- Epic 5 completion helpful untuk Epic 3.3 (E2E tests need contact form)
- Epic 4.1 completion helpful untuk Epic 4.2 (architecture context)

**Parallel Work Opportunities:**

- Epic 1 dan Epic 3.1 dapat run parallel (foundation vs testing setup)
- Epic 3.2 dan Epic 4.1 dapat run parallel (review checklist vs architecture docs)
- Epic 5.1 dan Epic 5.3 dapat overlap (API setup vs email service setup)

---

## Story Status Tracking

**Epic 1: Project Foundation & Code Standardization**

- `1-1-audit-project-structure`: backlog
- `1-2-typescript-strict-mode`: backlog
- `1-3-standardize-code-style`: backlog

**Epic 3: Quality Assurance & Testing Foundation**

- `3-1-setup-testing-framework`: backlog
- `3-2-code-review-checklist`: backlog
- `3-3-setup-e2e-testing`: backlog (optional)

**Epic 4: Documentation & Knowledge Base**

- `4-1-document-architecture`: backlog
- `4-2-development-workflow`: backlog

**Epic 5: Minimal Email Backend**

- `5-1-email-api-route`: backlog
- `5-2-contact-form-integration`: backlog
- `5-3-email-service-integration`: backlog

---

## Success Criteria

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

**Sprint Planning Status:** ✅ Ready for implementation
