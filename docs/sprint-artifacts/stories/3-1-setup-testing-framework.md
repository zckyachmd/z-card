# Story 3.1: Setup Testing Framework & Quality Gates

**Status:** review  
**Epic:** Epic 3 - Quality Assurance & Testing Foundation  
**Priority:** P1 - High  
**Sprint:** Sprint 1  
**Depends on:** Epic 1 (Foundation)

---

## Story

As a **developer**,  
I want **testing framework setup dengan Vitest dan quality gates configured**,  
so that **I can write dan run tests dengan confidence, dan code quality is automatically enforced**.

---

## Acceptance Criteria

1. **Given** no testing framework exists  
   **When** Vitest is installed  
   **Then** Vitest dan required dependencies are installed (React Testing Library, jsdom, etc.)

2. **Given** Vitest is installed  
   **When** configuration is created  
   **Then** Vitest is configured untuk Next.js App Router dengan proper settings

3. **Given** test utilities are needed  
   **When** utilities are created  
   **Then** test utilities are setup (test-utils.tsx, vitest.setup.ts) untuk React components

4. **Given** package.json exists  
   **When** scripts are reviewed  
   **Then** test scripts are added ke package.json (test, test:watch, test:coverage)

5. **Given** coverage reporting is needed  
   **When** coverage is configured  
   **Then** coverage reporting is setup dengan 70% minimum threshold

6. **Given** testing framework is setup  
   **When** example test is written  
   **Then** example test is created dan passing untuk verify setup

7. **Given** testing guidelines are needed  
   **When** documentation is created  
   **Then** testing guidelines are documented dengan examples

---

## Tasks / Subtasks

- [x] Task 1: Install Vitest dan Dependencies (AC: 1)
  - [x] Install `vitest` package
  - [x] Install `@testing-library/react` untuk React component testing
  - [x] Install `@testing-library/jest-dom` untuk DOM matchers
  - [x] Install `@testing-library/user-event` untuk user interactions
  - [x] Install `jsdom` untuk DOM environment
  - [x] Install `@vitest/coverage-v8` untuk coverage reporting
  - [x] Install `@vitejs/plugin-react` untuk React support
  - [x] Verify all packages installed correctly

- [x] Task 2: Configure Vitest (AC: 2)
  - [x] Create `vitest.config.ts` file
  - [x] Configure untuk Next.js App Router
  - [x] Setup path aliases (`@/*`)
  - [x] Configure test environment (jsdom)
  - [x] Setup globals (vitest globals)
  - [x] Configure coverage settings dengan 70% thresholds
  - [x] Test Vitest configuration - working correctly

- [x] Task 3: Setup Test Utilities (AC: 3)
  - [x] Create `tests/setup/` directory
  - [x] Create `tests/setup/vitest.setup.ts` untuk global test setup
  - [x] Create `tests/setup/test-utils.tsx` untuk React Testing Library utilities
  - [x] Configure jsdom environment
  - [x] Setup custom render function dengan providers
  - [x] Document test utilities usage di testing.md

- [x] Task 4: Add Test Scripts (AC: 4)
  - [x] Add `test` script: `vitest run`
  - [x] Add `test:watch` script: `vitest`
  - [x] Add `test:coverage` script: `vitest run --coverage`
  - [x] Add `test:ui` script: `vitest --ui` (optional)
  - [x] Verify all scripts working - all tests pass

- [x] Task 5: Configure Coverage Reporting (AC: 5)
  - [x] Configure coverage provider (v8)
  - [x] Set coverage thresholds (70% minimum overall)
  - [x] Configure coverage reporters (text, html, lcov)
  - [x] Exclude files dari coverage (node_modules, .next, etc.)
  - [x] Test coverage reporting - working correctly (100% coverage untuk utils.ts)

- [x] Task 6: Write Example Test (AC: 6)
  - [x] Create example test untuk utility function (`lib/utils.ts`)
  - [x] Verify tests pass - 5 tests passing
  - [x] Verify coverage reporting works - 100% coverage untuk utils.ts

- [x] Task 7: Document Testing Guidelines (AC: 7)
  - [x] Create `docs/STANDARDS/testing.md` dengan comprehensive documentation
  - [x] Document testing philosophy
  - [x] Document test structure dan organization
  - [x] Document test utilities usage
  - [x] Create code examples untuk common patterns
  - [x] Document coverage requirements
  - [x] Update `docs/CODING_STANDARDS.md` dengan testing reference

---

## Dev Notes

### Relevant Architecture Patterns and Constraints

- **Testing Framework:** Vitest (fast, ESM support, Jest-compatible)
- **React Testing:** React Testing Library untuk component testing
- **Test Environment:** jsdom untuk DOM simulation
- **Coverage:** v8 provider dengan 70% minimum threshold
- **Next.js App Router:** Server Components vs Client Components testing patterns

### Source Tree Components to Touch

**Files to Create:**

- `vitest.config.ts` - Vitest configuration
- `tests/setup/vitest.setup.ts` - Global test setup
- `tests/setup/test-utils.tsx` - React Testing Library utilities
- `tests/unit/lib/utils.test.ts` - Example test untuk utility
- `docs/STANDARDS/testing.md` - Testing guidelines (optional, bisa di Epic 4)

**Files to Modify:**

- `package.json` - Add test dependencies dan scripts
- `.husky/pre-commit` - Optional: Add test command untuk fast tests

**Files to Review:**

- `tsconfig.json` - Ensure test files are included
- `eslint.config.mjs` - Ensure test files are linted

### Testing Standards Summary

- **Unit Tests:** Fast execution (< 1s total), focus on utilities dan business logic
- **Component Tests:** React Testing Library, focus on behavior not implementation
- **Coverage:** 70% minimum overall, 90%+ untuk critical paths
- **Test Organization:** Mirror source structure di `tests/unit/`

### Project Structure Notes

**Test Structure:**

```
tests/
├── setup/
│   ├── vitest.setup.ts      # Global test setup
│   └── test-utils.tsx       # React Testing Library utilities
├── unit/
│   ├── lib/                 # Unit tests untuk utilities
│   └── components/          # Component tests (optional)
└── integration/             # Integration tests (future)
```

**Vitest Configuration:**

- Environment: jsdom untuk DOM testing
- Globals: Enabled untuk convenience
- Coverage: v8 provider dengan thresholds
- Path aliases: `@/*` support

### References

- [Source: docs/sprint-artifacts/epic-3-quality-assurance.md#Technical-Decisions]
- [Source: docs/sprint-artifacts/epic-3-quality-assurance.md#Component-Architecture]
- [Source: docs/epics.md#Epic-3]
- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)

---

## Dev Agent Record

### Context Reference

- Epic Context: `docs/sprint-artifacts/epic-3-quality-assurance.md`
- Epic 1: `docs/sprint-artifacts/epic-1-foundation-standardization.md`
- Project Context: `docs/epics.md`
- Architecture: `docs/ARCHITECTURE.md`

### Agent Model Used

Claude Sonnet 4.5 (via Cursor)

### Debug Log References

No errors encountered during implementation. All tasks completed successfully.

### Completion Notes List

**Task 1 - Install Vitest dan Dependencies:**

- ✅ Installed `vitest@4.0.15` - Fast testing framework
- ✅ Installed `@testing-library/react@16.3.0` - React component testing
- ✅ Installed `@testing-library/jest-dom@6.9.1` - DOM matchers
- ✅ Installed `@testing-library/user-event@14.6.1` - User interaction testing
- ✅ Installed `jsdom@27.2.0` - DOM environment untuk tests
- ✅ Installed `@vitest/coverage-v8@4.0.15` - Coverage reporting
- ✅ Installed `@vitejs/plugin-react@5.1.1` - React support untuk Vitest
- ✅ All packages installed correctly tanpa errors

**Task 2 - Configure Vitest:**

- ✅ Created `vitest.config.ts` dengan comprehensive configuration
- ✅ Configured untuk Next.js App Router dengan React plugin
- ✅ Setup path aliases (`@/*`) untuk consistent imports
- ✅ Configured test environment: jsdom untuk DOM testing
- ✅ Enabled globals untuk convenience (vitest globals)
- ✅ Added CSS support (`css: true`) untuk CSS imports
- ✅ Configured coverage settings dengan 70% minimum thresholds
- ✅ Tested Vitest configuration - working correctly

**Task 3 - Setup Test Utilities:**

- ✅ Created `tests/setup/` directory structure
- ✅ Created `tests/setup/vitest.setup.ts` dengan jest-dom setup, cleanup, dan Next.js mocks import
- ✅ Created `tests/setup/test-utils.tsx` dengan custom render function
- ✅ Added ThemeProvider wrapper automatically di custom render function
- ✅ Created `tests/setup/mocks/next.tsx` dengan comprehensive Next.js mocks:
  - next/image (mocked sebagai img tag)
  - next/link (mocked sebagai a tag)
  - next/navigation (useRouter, usePathname, useSearchParams, useParams)
  - CSS imports (_.css, _.scss, _.module.css, _.module.scss)
  - Asset imports (_.svg, _.png, _.jpg, _.jpeg, _.gif, _.webp)
- ✅ Configured jsdom environment untuk DOM testing
- ✅ Documented test utilities usage di `docs/STANDARDS/testing.md`

**Task 4 - Add Test Scripts:**

- ✅ Added `test` script: `vitest run` - Run tests once
- ✅ Added `test:watch` script: `vitest` - Watch mode untuk development
- ✅ Added `test:coverage` script: `vitest run --coverage` - Coverage reporting
- ✅ Added `test:ui` script: `vitest --ui` - Interactive UI mode
- ✅ Verified all scripts working - tests pass successfully

**Task 5 - Configure Coverage Reporting:**

- ✅ Configured coverage provider: v8 (fast, accurate)
- ✅ Set coverage thresholds: 70% minimum untuk lines, functions, branches, statements
- ✅ Configured coverage reporters: text, html, lcov (untuk CI/CD)
- ✅ Excluded files dari coverage: node_modules, .next, config files, types, tests
- ✅ Tested coverage reporting - working correctly (100% coverage untuk utils.ts example)

**Task 6 - Write Example Test:**

- ✅ Created `tests/unit/lib/utils.test.ts` dengan 5 test cases
- ✅ Tested `cn` utility function dengan various scenarios:
  - Basic class merging
  - Conditional classes
  - Tailwind class merging
  - Empty inputs
  - Undefined/null handling
- ✅ Verified tests pass - 5/5 tests passing
- ✅ Verified coverage reporting works - 100% coverage untuk utils.ts

**Task 7 - Document Testing Guidelines:**

- ✅ Created `docs/STANDARDS/testing.md` dengan comprehensive documentation
- ✅ Documented testing philosophy (what to test, what not to test)
- ✅ Documented test structure dan organization patterns
- ✅ Documented test utilities usage dengan examples
- ✅ Created code examples untuk common patterns (unit tests, component tests, mocking)
- ✅ Documented coverage requirements (70% minimum, 90%+ untuk critical paths)
- ✅ Updated `docs/CODING_STANDARDS.md` dengan testing reference

**Key Deliverables:**

- `vitest.config.ts` - Vitest configuration untuk Next.js App Router dengan CSS support
- `tests/setup/vitest.setup.ts` - Global test setup dengan Next.js mocks
- `tests/setup/test-utils.tsx` - React Testing Library utilities dengan ThemeProvider wrapper
- `tests/setup/mocks/next.tsx` - Comprehensive Next.js module mocks
- `tests/unit/lib/utils.test.ts` - Example test (5 tests passing)
- `docs/STANDARDS/testing.md` - Comprehensive testing guidelines dengan Next.js mocks documentation
- Updated `package.json` dengan test scripts
- Updated `tsconfig.json` untuk include test files
- Updated `eslint.config.mjs` dengan coverage directory ignore

**Findings Summary:**

- Vitest setup successful dengan Next.js compatibility ✅
- Next.js mocks comprehensive (image, link, navigation, CSS, assets) ✅
- Test utilities dengan ThemeProvider support ✅
- All test scripts working ✅
- Coverage reporting configured dengan 70% thresholds ✅
- Example test passing dengan 100% coverage ✅
- Testing guidelines documented dengan Next.js mocks ✅

### File List

**Files Created:**

- `vitest.config.ts` - Vitest configuration dengan CSS support
- `tests/setup/vitest.setup.ts` - Global test setup dengan Next.js mocks
- `tests/setup/test-utils.tsx` - React Testing Library utilities dengan ThemeProvider
- `tests/setup/mocks/next.tsx` - Next.js module mocks (image, link, navigation, CSS, assets)
- `tests/unit/lib/utils.test.ts` - Example test untuk utils.ts
- `docs/STANDARDS/testing.md` - Testing guidelines documentation

**Files Modified:**

- `package.json` - Added test dependencies dan scripts
- `tsconfig.json` - Added test files to include
- `eslint.config.mjs` - Added coverage directory to ignores
- `docs/CODING_STANDARDS.md` - Added testing reference
- `docs/STANDARDS/testing.md` - Updated dengan Next.js mocks documentation

**Files Reviewed:**

- All test files - Verified working correctly
- Configuration files - Verified optimal settings

---

## Senior Developer Review (AI)

**Review Date:** 2025-01-27  
**Reviewer:** AI Code Reviewer (Adversarial)  
**Review Outcome:** ✅ **Approve - All Issues Resolved**

### Review Summary

**Overall Assessment:** Story implementation is solid dengan excellent setup. Semua acceptance criteria terpenuhi dan tasks completed dengan baik. Vitest configuration optimal untuk Next.js App Router dengan Next.js mocks, test utilities well-structured dengan ThemeProvider support, dan comprehensive documentation created.

**Issues Found:** 5 issues (0 Critical, 1 High, 2 Medium, 2 Low) - **All Resolved**

---

### 🔴 CRITICAL ISSUES

**None** - No critical issues found.

---

### 🟡 HIGH SEVERITY ISSUES

**1. Missing Next.js Specific Mocks/Transforms** [HIGH]

- **Location:** `vitest.config.ts`
- **Issue:** Vitest configuration tidak include mocks untuk Next.js specific features seperti `next/image`, `next/link`, CSS imports, atau other Next.js modules. Ketika testing components yang use Next.js features, tests akan fail karena modules tidak resolved.
- **Impact:** Tests akan fail ketika components use Next.js features (Image, Link, CSS imports). Developer perlu manually mock setiap time.
- **Recommendation:** Add Vitest mocks untuk common Next.js modules di `vitest.setup.ts` atau create `tests/setup/mocks/` directory dengan Next.js mocks. Atau document bahwa mocks perlu ditambahkan ketika needed.

---

### 🟠 MEDIUM SEVERITY ISSUES

**2. ESLint Configuration Missing Test File Patterns** [MEDIUM] - **RESOLVED**

- **Location:** `eslint.config.mjs`
- **Issue:** ESLint ignores tidak explicitly include test files pattern.
- **Resolution:** Added `coverage/**` ke ESLint ignores. Test files are linted dengan same rules as source files (appropriate untuk consistency).

**3. Missing Vitest Configuration for CSS/Asset Imports** [MEDIUM] - **RESOLVED**

- **Location:** `vitest.config.ts`
- **Issue:** Vitest configuration tidak handle CSS imports atau asset imports.
- **Resolution:** Added `css: true` di Vitest config dan comprehensive mocks untuk CSS/asset imports di `tests/setup/mocks/next.tsx`.

---

### 🟢 LOW SEVERITY ISSUES

**4. Test Utilities Could Include More Examples** [LOW] - **RESOLVED**

- **Location:** `tests/setup/test-utils.tsx`
- **Issue:** Custom render function is basic dan tidak include examples untuk common providers.
- **Resolution:** Added ThemeProvider implementation di test-utils.tsx dengan automatic wrapper. Updated documentation dengan usage examples.

**5. Coverage Directory Not Explicitly in .gitignore** [LOW] - **RESOLVED**

- **Location:** `.gitignore`
- **Issue:** Coverage directory should be verified as ignored.
- **Resolution:** Verified `/coverage` is in `.gitignore` (line 14). Added `coverage/**` ke ESLint ignores untuk completeness.

---

### ✅ POSITIVE FINDINGS

1. **Excellent Configuration:** Vitest config is well-structured dengan proper settings untuk Next.js App Router, CSS support, dan comprehensive mocks.
2. **Comprehensive Test Utilities:** Test utilities setup dengan ThemeProvider wrapper dan good structure untuk future extension.
3. **Next.js Compatibility:** Comprehensive Next.js mocks (image, link, navigation, CSS, assets) enable testing components tanpa manual mocking.
4. **Good Example Test:** Example test covers multiple scenarios untuk utility function.
5. **Complete Documentation:** Testing guidelines sangat comprehensive dengan Next.js mocks documentation dan examples.
6. **Proper Coverage Setup:** Coverage reporting configured dengan appropriate thresholds (70% minimum).
7. **All Scripts Working:** All test scripts verified working correctly.

---

### Action Items

**Review Follow-ups (AI):**

- [x] [AI-Review][HIGH] Add Next.js specific mocks - **RESOLVED**: Created `tests/setup/mocks/next.tsx` dengan comprehensive mocks untuk next/image, next/link, next/navigation, CSS imports, dan asset imports
- [x] [AI-Review][MEDIUM] Verify ESLint configuration handles test files - **RESOLVED**: Added `coverage/**` ke ESLint ignores, test files are linted dengan same rules
- [x] [AI-Review][MEDIUM] Add CSS/asset import handling - **RESOLVED**: Added `css: true` di Vitest config dan mocks untuk CSS/asset imports di next.tsx
- [x] [AI-Review][LOW] Add example implementation untuk providers - **RESOLVED**: Added ThemeProvider implementation di test-utils.tsx dengan automatic wrapper
- [x] [AI-Review][LOW] Verify coverage directory - **RESOLVED**: Coverage directory already in .gitignore, added explicit pattern ke ESLint ignores

---

### Review Conclusion

**Status:** ✅ **Approve - All Issues Resolved**

Story implementation sangat solid dengan excellent setup. Semua acceptance criteria terpenuhi dan code quality tinggi. **All review issues have been resolved:**

- ✅ HIGH issue: Next.js mocks added dengan comprehensive coverage (next/image, next/link, next/navigation, CSS, assets)
- ✅ MEDIUM issues: ESLint configuration updated, CSS/asset handling added di Vitest config
- ✅ LOW issues: ThemeProvider example added di test-utils.tsx, coverage directory verified

**Recommendation:** Story is ready untuk merge. All HIGH, MEDIUM, dan LOW issues have been addressed dengan comprehensive updates to Vitest configuration, mocks, dan test utilities.

---

**Next Steps:**

1. ✅ All review issues resolved
2. Story ready untuk merge
3. Excellent work on comprehensive testing framework setup dengan Next.js compatibility!
