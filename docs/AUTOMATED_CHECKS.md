# Automated Checks - z-card

**Last Updated:** 2025-01-27  
**Status:** Active Standard  
**Project:** z-card

---

## Overview

This document describes all automated checks that run during development dan how to fix common issues.

---

## Pre-commit Hooks

### Husky Setup

Pre-commit hooks run automatically via Husky when you commit:

**Location:** `.husky/pre-commit`

**What Runs:**

```bash
pnpm lint-staged
```

### lint-staged Configuration

**Location:** `package.json` → `lint-staged`

**What It Does:**

- Runs Prettier (auto-format)
- Runs ESLint (auto-fix)

**Files Checked:**

- `src/**/*.{ts,tsx,js,jsx,css,md}`

---

## Manual Checks

### TypeScript Type Checking

**Command:**

```bash
pnpm type-check
```

**What It Checks:**

- Type errors
- Type mismatches
- Missing type definitions
- Strict mode compliance

**Common Issues:**

**1. Type Errors:**

```typescript
// ❌ Error: Type 'string' is not assignable to type 'number'
const count: number = '5'

// ✅ Fix: Correct type
const count: number = 5
```

**2. Missing Types:**

```typescript
// ❌ Error: Parameter 'data' implicitly has an 'any' type
function processData(data) {}

// ✅ Fix: Add type annotation
function processData(data: unknown) {}
```

**3. Strict Mode Issues:**

```typescript
// ❌ Error: Object is possibly 'undefined'
const value = obj.property

// ✅ Fix: Add null check
const value = obj?.property ?? defaultValue
```

**How to Fix:**

- Fix type errors manually
- Check `docs/STANDARDS/typescript-patterns.md` for guidance
- Use TypeScript's error messages to locate issues

---

### ESLint

**Command:**

```bash
pnpm lint              # Check for issues
pnpm lint:fix          # Auto-fix issues
```

**What It Checks:**

- Code quality
- Best practices
- React rules
- Accessibility (jsx-a11y)
- Import organization
- Unused imports/variables

**Common Issues:**

**1. Unused Imports:**

```typescript
// ❌ Error: 'Button' is defined but never used
import { Button } from '@/components/ui/button'

// ✅ Fix: Remove unused import
// (or use it if needed)
```

**2. Import Order:**

```typescript
// ❌ Error: Import order incorrect
import { Button } from '@/components/ui/button'
import React from 'react'

// ✅ Fix: External imports first
import React from 'react'
import { Button } from '@/components/ui/button'
```

**3. React Hooks:**

```typescript
// ❌ Error: React Hook useEffect has missing dependency
useEffect(() => {
  fetchData(id)
}, []) // Missing 'id'

// ✅ Fix: Add missing dependency
useEffect(() => {
  fetchData(id)
}, [id])
```

**4. Accessibility:**

```typescript
// ❌ Error: Image missing alt text
<img src="image.jpg" />

// ✅ Fix: Add alt text
<img src="image.jpg" alt="Description" />
```

**How to Fix:**

```bash
pnpm lint:fix  # Auto-fix most issues
```

For issues that can't be auto-fixed, check ESLint error message untuk guidance.

**Configuration:** `eslint.config.mjs`

---

### Prettier

**Command:**

```bash
pnpm format:check      # Check formatting
pnpm format            # Auto-format
```

**What It Checks:**

- Code formatting
- Indentation (2 spaces)
- Quote style (single quotes)
- Semicolons (none)
- Line length (100 characters)
- Trailing commas

**Common Issues:**

**1. Trailing Commas:**

```typescript
// ❌ Missing trailing comma
const obj = {
  name: 'John',
  age: 30,
}

// ✅ Fix: Add trailing comma
const obj = {
  name: 'John',
  age: 30,
}
```

**2. Quote Style:**

```typescript
// ❌ Double quotes
const name = 'John'

// ✅ Fix: Single quotes
const name = 'John'
```

**3. Semicolons:**

```typescript
// ❌ Semicolon present
const name = 'John'

// ✅ Fix: Remove semicolon
const name = 'John'
```

**How to Fix:**

```bash
pnpm format  # Auto-format all files
```

**Configuration:** `prettier.config.cjs`

---

### Tests

**Command:**

```bash
pnpm test              # Run tests once
pnpm test:watch        # Run tests in watch mode
pnpm test:coverage     # Run tests with coverage
```

**What It Checks:**

- All unit tests pass
- Test coverage meets thresholds (70% minimum)
- No test errors or failures

**Common Issues:**

**1. Test Failures:**

```typescript
// ❌ Test fails
expect(result).toBe('expected')

// ✅ Fix: Check test logic, fix implementation or test
```

**2. Coverage Below Threshold:**

```bash
# ❌ Error: Coverage below 70%
# ✅ Fix: Add tests untuk uncovered code
```

**3. Test Timeout:**

```typescript
// ❌ Test times out
it('should complete', async () => {
  await longRunningFunction()
})

// ✅ Fix: Add timeout atau mock async function
it('should complete', async () => {
  await longRunningFunction()
}, 10000) // 10 second timeout
```

**How to Fix:**

- Fix failing tests
- Add tests untuk uncovered code
- Check `docs/STANDARDS/testing.md` for guidance

**Configuration:** `vitest.config.ts`

---

## CI/CD Checks (Future)

### Planned Checks

**GitHub Actions (Future):**

- Full test suite
- Coverage checks
- Build verification
- E2E tests (when implemented)

**Location:** `.github/workflows/` (to be created)

---

## Troubleshooting

### Pre-commit Hook Not Running

**Issue:** Husky hooks not executing

**Fix:**

```bash
pnpm prepare  # Reinstall Husky hooks
```

### lint-staged Not Running

**Issue:** lint-staged not executing on commit

**Fix:**

1. Check `.husky/pre-commit` exists
2. Verify `package.json` has `lint-staged` config
3. Run `pnpm prepare` to reinstall hooks

### Type Errors After Dependency Update

**Issue:** Type errors after updating dependencies

**Fix:**

```bash
pnpm install           # Reinstall dependencies
pnpm type-check        # Check for type errors
```

### ESLint/Prettier Conflicts

**Issue:** ESLint and Prettier disagree on formatting

**Fix:**

- ESLint config includes `eslint-config-prettier` to disable conflicting rules
- Prettier runs first, then ESLint
- If conflicts persist, check `eslint.config.mjs`

### Tests Failing Locally But Pass in CI

**Issue:** Tests pass locally but fail in CI

**Possible Causes:**

- Environment differences
- Timezone issues
- File system differences
- Missing dependencies

**Fix:**

- Check CI logs untuk error details
- Run tests in clean environment
- Verify all dependencies installed

---

## Quick Reference

### Run All Checks

```bash
pnpm type-check      # TypeScript
pnpm lint            # ESLint
pnpm format:check    # Prettier
pnpm test            # Tests
```

### Auto-fix Issues

```bash
pnpm lint:fix        # Fix ESLint issues
pnpm format          # Format code
```

### Check Before Commit

```bash
# Run all checks
pnpm type-check && pnpm lint && pnpm format:check && pnpm test
```

---

## References

- [Coding Standards](docs/CODING_STANDARDS.md)
- [ESLint & Prettier](docs/STANDARDS/eslint-prettier.md)
- [Testing Standards](docs/STANDARDS/testing.md)
- [TypeScript Patterns](docs/STANDARDS/typescript-patterns.md)

---

**Remember:** Automated checks help maintain code quality. Fix issues before committing to keep the codebase clean.
