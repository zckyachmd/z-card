# Standards Documentation Index

**Last Updated:** 2025-01-27  
**Project:** z-card

---

## Overview

Dokumentasi standarisasi z-card project dibagi ke dalam beberapa file untuk clarity dan maintainability.

---

## Documentation Files

### 1. [Naming Conventions](./naming-conventions.md)

**Covers:**

- File naming patterns (components, utilities, types)
- Component naming
- Variable dan function naming
- Constants naming
- Type dan interface naming

**Quick Reference:**

- Components: PascalCase
- Utilities: camelCase
- Types: kebab-case dengan `.d.ts`
- Constants: UPPER_SNAKE_CASE (exported) atau camelCase (local)

---

### 2. [Import Patterns](./import-patterns.md)

**Covers:**

- Path alias usage (`@/`)
- Import order rules
- Type imports
- Forbidden patterns (relative imports)

**Quick Reference:**

- Always use `@/` path aliases
- Never use relative imports (`./`, `../`)
- Import order: External → Path aliases

---

### 3. [Type Definitions](./type-definitions.md)

**Covers:**

- Type file organization
- Centralized exports (`@/types`)
- Type definition patterns
- Documentation standards

**Quick Reference:**

- Location: `src/types/`
- Import: `import type { TypeName } from '@/types'`
- Organization: Domain-based dengan `index.ts`

---

### 4. [Code Structure](./code-structure.md)

**Covers:**

- Project directory structure
- Directory purposes
- File organization rules
- Component organization

**Quick Reference:**

- `src/app/` - Next.js App Router
- `src/components/` - Shared components
- `src/lib/` - Utilities
- `src/types/` - Type definitions

---

### 5. [Component Patterns](./component-patterns.md)

**Covers:**

- Server vs Client Components
- Component organization
- State management patterns
- Best practices

**Quick Reference:**

- Server Components: Default (no directive)
- Client Components: `'use client'` when needed
- Shared components: `src/components/`
- Route-specific: `src/app/(route)/_components/`

---

### 6. [TypeScript Patterns](./typescript-patterns.md)

**Covers:**

- TypeScript configuration
- Type definition patterns (interfaces vs types)
- Utility types usage
- Type safety best practices
- Next.js App Router type patterns
- Common patterns dan examples

**Quick Reference:**

- Interfaces: Object shapes, component props
- Types: Unions, intersections, aliases
- Avoid `any`: Use `unknown` atau proper types
- Type-only imports: Use `import type`
- Shared types: `src/types/` dengan centralized exports

---

### 7. [ESLint & Prettier](./eslint-prettier.md)

**Covers:**

- ESLint configuration dan rules
- Prettier configuration dan settings
- Import sorting rules
- Pre-commit hooks configuration
- Package scripts
- Common patterns dan best practices

**Quick Reference:**

- ESLint: Flat config dengan React/Next.js rules
- Prettier: Tailwind CSS plugin untuk class sorting
- Import order: External → Types → Path aliases → Relative
- Pre-commit: Auto-format dan lint staged files
- Commands: `pnpm lint`, `pnpm lint:fix`, `pnpm format`

---

### 8. [Testing](./testing.md)

**Covers:**

- Testing framework (Vitest)
- Test structure dan organization
- Test utilities (React Testing Library)
- Coverage requirements (70% minimum)
- Testing best practices
- Common patterns dan examples

**Quick Reference:**

- Framework: Vitest (fast, Jest-compatible)
- Test location: `tests/unit/` untuk unit tests
- Coverage: 70% minimum overall, 90%+ untuk critical paths
- Commands: `pnpm test`, `pnpm test:watch`, `pnpm test:coverage`
- Test utilities: `@/tests/setup/test-utils` untuk component testing

### 9. [Test Coverage Standards](./test-coverage.md)

**Covers:**

- Coverage thresholds dan requirements
- File priority untuk testing
- Coverage measurement dan reporting
- Coverage checklist untuk new features
- Current coverage status
- Testing roadmap

**Quick Reference:**

- Overall minimum: 70% (lines, functions, branches, statements)
- Critical paths: 90%+ (utilities, API routes, validation, security)
- UI components: 60%+ (focus on logic)
- Command: `pnpm test:coverage`
- Report: `coverage/index.html` (HTML), `coverage/lcov.info` (LCOV)

---

## Quick Reference Table

| Standard            | File                                               | Key Rules                                  |
| ------------------- | -------------------------------------------------- | ------------------------------------------ |
| **Naming**          | [naming-conventions.md](./naming-conventions.md)   | PascalCase components, camelCase utilities |
| **Imports**         | [import-patterns.md](./import-patterns.md)         | Always use `@/` aliases, never relative    |
| **Types**           | [type-definitions.md](./type-definitions.md)       | Centralized `@/types` exports              |
| **TypeScript**      | [typescript-patterns.md](./typescript-patterns.md) | Interfaces vs types, utility types         |
| **ESLint/Prettier** | [eslint-prettier.md](./eslint-prettier.md)         | Code quality, formatting, import sorting   |
| **Testing**         | [testing.md](./testing.md)                         | Vitest, React Testing Library, coverage    |
| **Test Coverage**   | [test-coverage.md](./test-coverage.md)             | Coverage thresholds, requirements, roadmap |
| **Structure**       | [code-structure.md](./code-structure.md)           | Domain-based organization                  |
| **Components**      | [component-patterns.md](./component-patterns.md)   | Server by default, Client when needed      |

---

## Main Documentation

**See:** [CODING_STANDARDS.md](../CODING_STANDARDS.md) untuk overview dan quick reference.

---

## Updates

Standards ini adalah living documents dan akan diupdate ketika:

- New patterns are established
- Best practices evolve
- Project requirements change

**Last Major Update:** 2025-01-27

- Initial standards documentation created
- Naming conventions standardized
- Import patterns standardized
- Type definitions organized

---

## Enforcement

**Automated:**

- ESLint enforces import patterns
- Prettier enforces formatting
- TypeScript enforces type safety

**Manual:**

- Code reviews check compliance
- Documentation updates when patterns change

---

## Questions?

Jika ada pertanyaan tentang standards atau perlu clarification, refer ke specific documentation file atau discuss dengan team.
