# Epic 3: Quality Assurance & Testing Foundation

**Epic ID:** epic-3-quality-assurance
**Status:** contexted
**Created:** 2025-01-27
**Project:** z-card
**Priority:** P1 - High

---

## Epic Overview

**Goal:** Setup comprehensive testing framework dan quality gates untuk memastikan code quality tetap terjaga seiring project berkembang.

**User Value:** Developer dapat menulis dan menjalankan tests dengan confidence, dan quality gates otomatis mencegah code berkualitas rendah masuk ke codebase.

**Business Value:** Mengurangi bugs di production, mempercepat development dengan confidence, dan memudahkan refactoring dengan test coverage.

---

## Technical Context

### Current Project State

**Framework:** Next.js 15.4.8 (App Router)
**Language:** TypeScript 5.9.3
**Testing Status:** ❌ **NO TESTING FRAMEWORK YET**

**Current Testing Infrastructure:**

- No test framework installed
- No test files exist
- No test scripts di package.json
- No CI/CD quality gates

**Dependencies:**

- TypeScript strict mode (from Epic 1)
- ESLint & Prettier (from Epic 1)
- Project structure standardized (from Epic 1)

### Technical Decisions

**1. Testing Framework Selection**

**Option A: Vitest (RECOMMENDED)**

- ✅ Fast, Vite-powered
- ✅ Great TypeScript support
- ✅ Jest-compatible API (familiar)
- ✅ Works well dengan Next.js
- ✅ Built-in coverage
- ✅ ESM support (Next.js 15 uses ESM)

**Option B: Jest**

- ✅ Established, widely used
- ⚠️ Slower than Vitest
- ⚠️ More configuration needed untuk Next.js
- ⚠️ ESM support requires additional setup

**DECISION: Vitest**

- Best fit untuk Next.js 15 dengan ESM
- Faster feedback loops
- Modern tooling

**2. E2E Testing Framework**

**Option A: Playwright (RECOMMENDED)**

- ✅ Modern, fast
- ✅ Great Next.js support
- ✅ Multi-browser support
- ✅ Great debugging tools
- ✅ Built by Microsoft

**Option B: Cypress**

- ✅ Popular, established
- ⚠️ Slower execution
- ⚠️ Different architecture (not ideal untuk Next.js App Router)

**DECISION: Playwright**

- Best fit untuk Next.js App Router
- Faster execution
- Better debugging experience

**3. Test Coverage Strategy**

**Coverage Thresholds:**

- **Minimum:** 70% overall coverage
- **Critical Paths:** 90%+ (utilities, lib functions, API routes)
- **UI Components:** 60%+ (focus on logic, not rendering)
- **E2E:** Critical user flows (contact form, navigation)

**Coverage Tools:**

- Vitest built-in coverage (c8/istanbul)
- Coverage reports di CI/CD
- Coverage badges (optional)

**4. Quality Gates**

**Pre-commit (Husky):**

- Type checking
- Linting
- Formatting
- Unit tests (fast tests only)

**CI/CD (Future):**

- Full test suite
- Coverage checks
- E2E tests
- Build verification

### Technical Constraints

**Must Consider:**

- Next.js App Router architecture (Server vs Client Components)
- TypeScript strict mode compliance
- ESM modules (Next.js 15)
- Performance (fast test execution)
- Developer experience (easy to write tests)

**Dependencies:**

- Epic 1 completion (TypeScript, ESLint, structure)
- Project structure standardized

### Component Architecture

**Test Structure:**

```
z-card/
├── src/
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── types/
├── tests/
│   ├── unit/              # Unit tests
│   │   ├── lib/
│   │   └── components/
│   ├── integration/       # Integration tests
│   ├── e2e/               # E2E tests
│   │   ├── contact-form.spec.ts
│   │   └── navigation.spec.ts
│   └── setup/              # Test utilities
│       ├── vitest.setup.ts
│       └── test-utils.tsx
├── vitest.config.ts
└── playwright.config.ts
```

**Files to Create:**

- `vitest.config.ts` - Vitest configuration
- `playwright.config.ts` - Playwright configuration
- `tests/setup/vitest.setup.ts` - Test setup
- `tests/setup/test-utils.tsx` - React testing utilities
- Test files untuk critical components dan utilities

**Files to Modify:**

- `package.json` - Add test scripts dan dependencies
- `.husky/pre-commit` - Add test command (optional, untuk fast tests)

### Environment Variables

**Test Environment:**

```env
# Test-specific environment variables
NODE_ENV=test
```

**E2E Test Environment:**

```env
# E2E test environment
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### File Structure

**Test File Naming:**

- Unit tests: `*.test.ts` atau `*.test.tsx`
- Integration tests: `*.integration.test.ts`
- E2E tests: `*.spec.ts` (Playwright convention)

**Test Organization:**

- Mirror source structure di `tests/unit/`
- Co-locate tests dengan source (optional, but `tests/` folder preferred untuk clarity)

### Implementation Stories

**Story 3.1: Setup Testing Framework & Quality Gates**

- Install Vitest dan dependencies
- Configure Vitest untuk Next.js App Router
- Setup test utilities (React Testing Library jika needed)
- Create test scripts di package.json
- Setup coverage reporting
- Write example test untuk verify setup
- Document testing guidelines

**Story 3.2: Create Code Review Checklist & Standards**

- Create PR template dengan checklist
- Document code review criteria
- Define when tests are required
- Setup automated checks (lint, type, tests)
- Create contribution guidelines
- Document test writing best practices

**Story 3.3: Setup E2E Testing with Playwright** (Optional untuk Sprint 1, bisa Sprint 2)

- Install Playwright
- Configure Playwright untuk Next.js
- Write E2E test untuk contact form (critical flow)
- Write E2E test untuk navigation
- Document E2E testing guidelines
- Add E2E test scripts

### Testing Considerations

**Unit Testing:**

- Focus on utilities, lib functions, business logic
- Test components dengan React Testing Library (if needed)
- Mock external dependencies
- Fast execution (< 1 second untuk most tests)

**Integration Testing:**

- Test API routes (when Epic 5 implemented)
- Test component interactions
- Test data flow

**E2E Testing:**

- Critical user flows only (contact form, navigation)
- Run sebelum deployment
- Can be slower, run in CI/CD

**Test Data:**

- Use factories untuk test data
- Mock external services
- Clean up after tests

### Success Criteria

**Epic Complete When:**

- ✅ Vitest installed dan configured
- ✅ Test scripts working di package.json
- ✅ Example tests written dan passing
- ✅ Coverage reporting working (70% minimum)
- ✅ Code review checklist created
- ✅ PR template dengan quality gates
- ✅ Testing guidelines documented
- ✅ Playwright setup (if Story 3.3 included)
- ✅ E2E tests untuk critical flows (if Story 3.3 included)

### Dependencies & Prerequisites

**Before Starting:**

- Epic 1 completion (TypeScript, ESLint, structure)
- Project structure standardized
- Dependencies di package.json

**Dependencies:**

- **Depends on:** Epic 1 (foundation work)
- **Can run parallel with:** Epic 4 (documentation)
- **Blocks:** Future epics (quality gates needed)

**Infrastructure Requirements:**

- Node.js dan pnpm
- Development environment
- CI/CD setup (optional, untuk full quality gates)

### Notes & Considerations

**Testing Philosophy:**

- Test critical paths, not everything
- Focus on business logic dan utilities
- E2E untuk user flows
- Fast feedback loops

**Performance:**

- Unit tests should be fast (< 1s total)
- E2E tests can be slower (run in CI/CD)
- Coverage collection adds overhead (acceptable)

**Developer Experience:**

- Easy to write tests
- Clear testing guidelines
- Helpful error messages
- Good debugging tools

**Future Enhancements:**

- Visual regression testing (optional)
- Performance testing (optional)
- Accessibility testing (optional)
- Test coverage badges
- CI/CD integration

---

## Story Dependencies

**Story Flow:**

1. Story 3.1 (Framework Setup) → Story 3.2 (Review Checklist) → Story 3.3 (E2E - Optional)

**Sequential Dependencies:**

- Story 3.1 MUST complete first (framework needed)
- Story 3.2 can start after 3.1 (but can work on checklist independently)
- Story 3.3 requires 3.1 (E2E needs basic setup)

**Parallel Work:**

- Story 3.1 dan 3.2 dapat overlap (setup vs documentation)
- Story 3.3 dapat ditunda ke Sprint 2 jika needed

---

**Context Status:** ✅ Ready for story drafting
