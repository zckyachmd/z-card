# Coding Standards - z-card

**Last Updated:** 2025-01-27  
**Project:** z-card  
**Status:** Active

---

## Overview

Dokumen ini mendefinisikan coding standards yang berlaku untuk project z-card. Semua code harus mengikuti standar ini untuk memastikan konsistensi, maintainability, dan quality.

**Related Documents:**

- [Architecture](./ARCHITECTURE.md) - Project architecture dan technical decisions
- [Naming Conventions](./STANDARDS/naming-conventions.md) - Detailed naming rules
- [Import Patterns](./STANDARDS/import-patterns.md) - Import organization rules
- [Type Definitions](./STANDARDS/type-definitions.md) - TypeScript type organization
- [TypeScript Patterns](./STANDARDS/typescript-patterns.md) - TypeScript best practices
- [ESLint & Prettier](./STANDARDS/eslint-prettier.md) - ESLint dan Prettier configuration
- [Testing](./STANDARDS/testing.md) - Testing standards dan guidelines
- [Test Coverage Standards](./STANDARDS/test-coverage.md) - Coverage requirements dan standards
- [Code Structure](./STANDARDS/code-structure.md) - Project structure guidelines
- [Component Patterns](./STANDARDS/component-patterns.md) - React component patterns

---

## Quick Reference

### Naming Conventions

- **Files:** PascalCase untuk components, camelCase untuk utilities
- **Components:** PascalCase
- **Functions:** camelCase
- **Constants:** UPPER_SNAKE_CASE untuk exported, camelCase untuk local
- **Types:** PascalCase

### Import Patterns

- **Always use path aliases:** `@/components`, `@/lib`, `@/types`
- **Never use relative imports:** `./`, `../`
- **Import order:** External → Path aliases → Relative (if needed)

### Type Definitions

- **Location:** `src/types/`
- **Import:** `import type { TypeName } from '@/types'`
- **Organization:** Domain-based dengan index.ts untuk exports

---

## Code Style & Formatting

### ESLint

**Configuration:** `eslint.config.mjs` (flat config format)

**Key Features:**

- Import sorting enforcement (simple-import-sort)
- Unused imports removal (unused-imports)
- Prettier integration (no conflicts)
- React & Next.js best practices
- TypeScript compatibility

**Commands:**

- `pnpm lint` - Check for linting errors
- `pnpm lint:fix` - Auto-fix linting errors

**See:** [ESLint & Prettier Configuration](./STANDARDS/eslint-prettier.md) untuk detailed rules

### Prettier

**Configuration:** `prettier.config.cjs`

**Key Features:**

- Tailwind CSS class sorting (prettier-plugin-tailwindcss)
- Consistent formatting across all files
- ESLint integration (no conflicts)

**Commands:**

- `pnpm format` - Format all files
- `pnpm format:check` - Check formatting (CI/CD)

**See:** [ESLint & Prettier Configuration](./STANDARDS/eslint-prettier.md) untuk detailed settings

### Pre-commit Hooks

**Tool:** Husky + lint-staged

**Behavior:**

- Automatically formats staged files dengan Prettier
- Automatically fixes linting errors dengan ESLint
- Prevents commit jika errors remain

**See:** [ESLint & Prettier Configuration](./STANDARDS/eslint-prettier.md) untuk hook details

## Enforcement

**Automated:**

- ESLint rules enforce import patterns, code quality, dan React best practices
- Prettier enforces formatting consistency
- TypeScript enforces type safety
- Pre-commit hooks prevent bad code from being committed

**Manual:**

- Code reviews check compliance
- Documentation updates when patterns change

---

## Updates

Standards ini adalah living document dan akan diupdate ketika:

- New patterns are established
- Best practices evolve
- Project requirements change

**Change Process:**

1. Discuss dengan team
2. Update documentation
3. Update codebase jika needed
4. Update linting rules jika needed

---

**For detailed standards, see:** [STANDARDS/](./STANDARDS/) directory
