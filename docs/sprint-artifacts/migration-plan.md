# Migration Plan - Project Standardization

**Date:** 2025-01-27  
**Story:** 1.1 - Audit Current Project Structure  
**Epic:** Epic 1 - Project Foundation & Code Standardization  
**Status:** Draft

---

## Overview

This migration plan provides actionable steps untuk standardizing z-card project structure, naming conventions, dan code patterns based on audit findings. The plan is organized by priority dan can be executed incrementally.

**Migration Strategy:** Incremental improvements dengan minimal breaking changes. Each step can be completed independently.

---

## Priority Levels

- **P0 (Critical):** Must be done before other stories
- **P1 (High):** Should be done soon, blocks other improvements
- **P2 (Medium):** Nice to have, improves consistency
- **P3 (Low):** Optional, can be deferred

---

## Migration Tasks

### Phase 1: Import Pattern Standardization (P0)

**Goal:** Ensure all imports use path aliases consistently

**Tasks:**

1. **Replace Relative Imports dengan Path Aliases**
   - File: `src/app/page.tsx`
   - Current: `import HomePage from './(site)/page'`
   - Target: `import HomePage from '@/app/(site)/page'`
   - **Risk:** Low - Simple find/replace
   - **Effort:** 5 minutes

2. **Audit All Files untuk Relative Imports**
   - Search untuk patterns: `'./`, `'../`
   - Replace dengan `@/` aliases where appropriate
   - **Risk:** Low - TypeScript will catch errors
   - **Effort:** 15-30 minutes

3. **Verify ESLint Import Rules**
   - Ensure `simple-import-sort` rules are enforced
   - Run `pnpm lint` untuk verify
   - **Risk:** None
   - **Effort:** 5 minutes

**Dependencies:** None  
**Blocks:** Story 1.2 (TypeScript improvements)

---

### Phase 2: File Naming Standardization (P1)

**Goal:** Standardize utility file naming conventions

**Decision Required:** Choose naming convention untuk utility files

- **Option A:** camelCase (e.g., `siteHelpers.ts`)
- **Option B:** kebab-case (e.g., `site-helpers.ts`)

**Recommended:** Option A (camelCase) untuk consistency dengan `utils.ts`

**Tasks:**

1. **Rename Utility Files**
   - File: `src/lib/site-helpers.ts` → `src/lib/siteHelpers.ts`
   - Update all imports
   - **Risk:** Medium - Need to update imports
   - **Effort:** 10 minutes

2. **Update Import Statements**
   - Search untuk `site-helpers` imports
   - Replace dengan `siteHelpers`
   - **Risk:** Low - TypeScript will catch errors
   - **Effort:** 5 minutes

3. **Document Naming Convention**
   - Add to `docs/CODING_STANDARDS.md` (to be created in Epic 4)
   - Document: Utility files use camelCase
   - **Risk:** None
   - **Effort:** 5 minutes

**Dependencies:** None  
**Blocks:** None

---

### Phase 3: Component Optimization (P2)

**Goal:** Optimize Client Component usage

**Tasks:**

1. **Review Navbar Component**
   - File: `src/components/navbar.tsx`
   - Check if 'use client' is needed
   - If no hooks/interactivity, convert to Server Component
   - **Risk:** Low - Test navigation functionality
   - **Effort:** 10 minutes

2. **Review Footer Component**
   - File: `src/components/footer.tsx`
   - Check if 'use client' is needed
   - If no hooks/interactivity, convert to Server Component
   - **Risk:** Low - Test footer functionality
   - **Effort:** 10 minutes

3. **Document Server vs Client Component Guidelines**
   - Add to coding standards
   - When to use 'use client'
   - **Risk:** None
   - **Effort:** 10 minutes

**Dependencies:** None  
**Blocks:** None

---

### Phase 4: Constants Naming Standardization (P3)

**Goal:** Standardize constants naming

**Decision Required:** Choose constants naming convention

- **Option A:** UPPER_SNAKE_CASE untuk all constants
- **Option B:** camelCase untuk local constants, UPPER_SNAKE_CASE untuk exported

**Recommended:** Option B (context-dependent)

**Tasks:**

1. **Review Constants in Components**
   - Files: `about.tsx`, `projects.tsx`, etc.
   - Standardize based on scope (local vs exported)
   - **Risk:** Low - Mostly cosmetic
   - **Effort:** 20-30 minutes

2. **Document Constants Naming**
   - Add to coding standards
   - **Risk:** None
   - **Effort:** 5 minutes

**Dependencies:** None  
**Blocks:** None

---

### Phase 5: Type Organization (P2)

**Goal:** Improve type definition organization

**Tasks:**

1. **Review Type Definitions**
   - Current: `src/types/digital-card.d.ts`
   - Consider organizing by domain/feature
   - **Risk:** Low - Types are already organized
   - **Effort:** 15 minutes

2. **Create Type Index (Optional)**
   - File: `src/types/index.ts`
   - Re-export types untuk easier imports
   - **Risk:** Low
   - **Effort:** 10 minutes

3. **Document Type Organization**
   - Add to coding standards
   - **Risk:** None
   - **Effort:** 5 minutes

**Dependencies:** None  
**Blocks:** None

---

## Risk Assessment

### Low Risk Changes

- Import pattern standardization (TypeScript catches errors)
- File renaming (with proper import updates)
- Constants naming (cosmetic)

### Medium Risk Changes

- Component optimization (need testing)
- Type organization (need import updates)

### Mitigation Strategies

1. **Incremental Changes:** One file at a time
2. **TypeScript Safety:** Type checking catches most errors
3. **Testing:** Manual testing after each change
4. **Git Commits:** Small, focused commits untuk easy rollback

---

## Execution Timeline

**Story 1.1 (Current):**

- ✅ Audit complete
- ✅ Migration plan created

**Story 1.2 (Next):**

- Phase 1: Import pattern standardization (P0)
- Phase 5: Type organization (P2)

**Story 1.3 (After 1.2):**

- Phase 2: File naming standardization (P1)
- Phase 3: Component optimization (P2)
- Phase 4: Constants naming (P3)

**Note:** Phases can be executed in parallel if no dependencies exist.

---

## Success Criteria

**Migration Complete When:**

- ✅ All imports use path aliases
- ✅ File naming is consistent
- ✅ Constants naming is standardized
- ✅ Component optimization complete
- ✅ Type organization improved
- ✅ All changes documented
- ✅ No breaking changes introduced
- ✅ All tests pass (when test framework is setup)

---

## Notes

- **Incremental Approach:** Changes can be made gradually
- **No Breaking Changes:** All changes maintain backward compatibility
- **Documentation:** All standards will be documented in Epic 4
- **Testing:** Manual verification sufficient untuk these changes

---

**Migration Plan Status:** ✅ Ready for Execution  
**Next Story:** 1.2 - Setup TypeScript Strict Mode & Type Safety
