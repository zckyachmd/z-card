# Epic 1: Project Foundation & Code Standardization

**Epic ID:** epic-1-foundation-standardization
**Status:** contexted
**Created:** 2025-01-27
**Project:** z-card
**Priority:** P0 - Critical

---

## Epic Overview

**Goal:** Merapikan dan menstandarisasi struktur project z-card serta code quality standards sebagai fondasi untuk pengembangan full stack selanjutnya.

**User Value:** Developer dapat bekerja dengan codebase yang konsisten, maintainable, dan memiliki quality gates yang jelas untuk memastikan kualitas code tetap terjaga seiring project berkembang.

**Business Value:** Mempercepat development velocity dengan mengurangi technical debt, meminimalisir bugs, dan memudahkan onboarding developer baru.

---

## Technical Context

### Current Project State

**Framework:** Next.js 15.4.8 (App Router)
**Language:** TypeScript 5.9.3
**Package Manager:** pnpm
**Deployment:** Vercel-ready (standalone output configured)

**Current Structure:**

```
src/
├── app/
│   ├── (site)/
│   │   └── _components/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   └── [various components]
├── config/
├── lib/
└── types/
```

**Current Code Quality Status:**

- ✅ TypeScript strict mode: **ENABLED** (tsconfig.json sudah strict: true)
- ✅ ESLint: **CONFIGURED** (eslint.config.mjs dengan beberapa plugins)
- ✅ Prettier: **CONFIGURED** (prettier.config.cjs)
- ✅ Husky: **SETUP** (pre-commit hooks dengan lint-staged)
- ⚠️ **NEEDS AUDIT**: Struktur folder, naming conventions, code patterns
- ⚠️ **NEEDS REVIEW**: ESLint rules strength, Prettier consistency
- ⚠️ **NEEDS IMPROVEMENT**: Type definitions organization, path aliases usage

### Technical Decisions

**1. TypeScript Configuration Enhancement**

**Current State:**

- Strict mode sudah enabled
- Path aliases sudah setup (@/\*)
- Beberapa strict flags sudah aktif

**Required Actions:**

- Review dan strengthen TypeScript configuration
- Ensure all strict flags optimal
- Organize shared type definitions
- Fix any existing type errors
- Document type patterns dan best practices

**2. Code Style Standardization**

**Current State:**

- ESLint dengan plugins: prettier, unused-imports, simple-import-sort
- Prettier dengan Tailwind plugin
- Husky pre-commit hooks aktif

**Required Actions:**

- Audit current ESLint rules untuk strength
- Review Prettier configuration untuk consistency
- Fix all existing linting errors
- Document coding standards
- Ensure lint-staged working correctly

**3. Project Structure Standardization**

**Current State:**

- Basic Next.js App Router structure
- Components organized but may need review
- No clear separation untuk future backend code

**Required Actions:**

- Audit current folder structure
- Document purpose of each directory
- Plan structure untuk full stack (prepare untuk backend)
- Standardize naming conventions
- Create structure guidelines

### Technical Constraints

**Must Consider:**

- Next.js App Router architecture (Server vs Client Components)
- TypeScript strict mode compliance
- Existing codebase compatibility (brownfield project)
- Minimal breaking changes during standardization
- Performance impact dari linting/type checking

**Dependencies:**

- Current project structure (brownfield)
- Existing dependencies di package.json
- Current deployment setup (Vercel)

### Component Architecture

**Files to Review/Modify:**

- `tsconfig.json` - TypeScript configuration
- `eslint.config.mjs` - ESLint rules
- `prettier.config.cjs` - Prettier formatting
- `.husky/pre-commit` - Pre-commit hooks
- `package.json` - Scripts dan dependencies
- `src/types/` - Type definitions organization
- All source files - Linting dan type fixes

**New Files to Create:**

- `docs/ARCHITECTURE.md` - Project structure documentation
- `docs/CODING_STANDARDS.md` - Coding standards guide
- `.env.example` - Environment variables template (if needed)

### Environment Variables

**Current:**

- No environment variables currently required untuk foundation work

**Future Considerations:**

- May need environment variables untuk future backend features
- Setup `.env.example` template untuk consistency

### File Structure

**Current Structure:**

```
z-card/
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # UI components
│   ├── config/           # Configuration
│   ├── lib/              # Utilities
│   └── types/            # Type definitions
├── docs/
│   └── sprint-artifacts/
├── .husky/               # Git hooks
├── eslint.config.mjs
├── prettier.config.cjs
├── tsconfig.json
└── package.json
```

**Target Structure (After Epic 1):**

```
z-card/
├── src/
│   ├── app/              # Next.js App Router (FE + future API routes)
│   ├── components/       # Shared UI components
│   ├── lib/              # Shared utilities
│   ├── types/            # Shared TypeScript types
│   └── config/           # Configuration files
├── docs/
│   ├── ARCHITECTURE.md
│   ├── CODING_STANDARDS.md
│   └── sprint-artifacts/
├── tests/                # Test files (prepared for Epic 3)
├── .husky/
├── eslint.config.mjs     # Strengthened rules
├── prettier.config.cjs   # Reviewed consistency
├── tsconfig.json         # Optimized strict mode
└── package.json
```

### Implementation Stories

**Story 1.1: Audit Current Project Structure**

- Document current folder structure dengan purpose
- Identify inconsistencies dalam naming conventions
- List all dependencies dan categorize
- Document current code patterns dan anti-patterns
- Create migration plan document

**Story 1.2: Setup TypeScript Strict Mode & Type Safety**

- Review dan optimize TypeScript configuration
- Fix all existing type errors
- Organize shared type definitions di `src/types/`
- Ensure path aliases (@/) digunakan consistently
- Document type patterns dan best practices

**Story 1.3: Standardize Code Style with ESLint & Prettier**

- Review dan strengthen ESLint rules
- Verify Prettier configuration consistency
- Fix all existing linting errors
- Ensure Husky pre-commit hooks working correctly
- Document coding standards
- Add lint scripts ke package.json (if missing)

### Testing Considerations

**Manual Testing:**

- Verify TypeScript compilation tanpa errors
- Verify ESLint passes untuk semua files
- Verify Prettier formatting consistent
- Test pre-commit hooks (make intentional error, verify it's caught)
- Verify path aliases working correctly

**Automated Testing:**

- Type checking: `pnpm type-check`
- Linting: `pnpm lint`
- Formatting: `pnpm format:check`

**No Test Framework Required Yet:**

- Epic 3 akan setup testing framework
- Foundation work fokus pada static analysis (TypeScript, ESLint)

### Success Criteria

**Epic Complete When:**

- ✅ Project structure documented dan standardized
- ✅ TypeScript strict mode optimal dengan zero type errors
- ✅ ESLint rules strengthened dan all files pass linting
- ✅ Prettier configuration consistent dan all files formatted
- ✅ Pre-commit hooks working correctly
- ✅ Coding standards documented
- ✅ Path aliases used consistently
- ✅ Type definitions organized dan documented
- ✅ All existing code compliant dengan new standards

### Dependencies & Prerequisites

**Before Starting:**

- Current project structure (brownfield)
- Existing codebase
- Dependencies di package.json

**No Blocking Dependencies:**

- Epic ini dapat dimulai immediately
- Foundation work tidak depend pada epic lain
- Epic lain akan depend pada Epic 1 completion

**Infrastructure Requirements:**

- Node.js dan pnpm installed
- Git repository dengan Husky setup
- Development environment ready

### Notes & Considerations

**Brownfield Project Challenges:**

- Need to fix existing code while maintaining functionality
- Minimal breaking changes preferred
- Gradual improvement approach acceptable
- Document all changes untuk future reference

**Performance:**

- TypeScript compilation time (should be reasonable)
- ESLint linting time (should be fast dengan proper config)
- Pre-commit hooks should be fast (< 10 seconds)

**Developer Experience:**

- Clear documentation untuk onboarding
- Consistent patterns untuk maintainability
- Fast feedback loops (linting, type checking)

**Future Enhancements:**

- Backend structure preparation (Epic 5)
- Testing framework setup (Epic 3)
- CI/CD integration (future epic)
- Code generation tools (future epic)

---

## Story Dependencies

**Story Flow:**

1. Story 1.1 (Audit) → Story 1.2 (TypeScript) → Story 1.3 (ESLint/Prettier)

**Sequential Dependencies:**

- Story 1.1 MUST complete first (need audit results)
- Story 1.2 can start after 1.1 (but can work on types independently)
- Story 1.3 requires 1.2 completion (need type fixes before linting)

**Partial Parallel Work:**

- Story 1.2 dan 1.3 dapat overlap sedikit (types vs linting)
- But recommended sequential untuk avoid conflicts

---

**Context Status:** ✅ Ready for story drafting
