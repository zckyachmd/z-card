# Project Architecture - z-card

**Last Updated:** 2025-01-27  
**Project:** z-card  
**Status:** Active  
**Version:** 1.0

---

## Overview

z-card is a modern, full-stack-ready portfolio website built dengan Next.js 15 App Router, TypeScript, dan Tailwind CSS. The project follows Next.js best practices dengan strong emphasis on code quality, type safety, dan maintainability.

**Project Type:** Portfolio Website (Digital Business Card)  
**Architecture:** Next.js App Router (Server Components by default)  
**Deployment:** Vercel-ready (standalone output configured)

---

## Technology Stack

### Core Framework

- **Next.js 15.4.8** - React framework dengan App Router
  - Server Components by default
  - Client Components dengan `'use client'` directive
  - Route groups untuk organization
  - Built-in optimizations (image, font, etc.)

- **React 19.1.0** - UI library
  - Latest stable version
  - Server Components support
  - Improved performance

- **TypeScript 5.9.3** - Type safety
  - Strict mode enabled
  - Path aliases (`@/*`)
  - Comprehensive type checking

### Styling

- **Tailwind CSS 4.1.17** - Utility-first CSS framework
  - PostCSS integration
  - Custom animations (`tw-animate-css`)
  - Prettier plugin untuk class sorting

### UI Components

- **Radix UI** - Accessible UI primitives
  - `@radix-ui/react-dialog` - Dialog component
  - `@radix-ui/react-progress` - Progress bar
  - `@radix-ui/react-separator` - Separator
  - `@radix-ui/react-slot` - Slot primitive
  - `@radix-ui/react-tabs` - Tabs component
  - `@radix-ui/react-tooltip` - Tooltip component

- **shadcn/ui Pattern** - Component architecture
  - Unstyled, accessible components
  - Tailwind CSS styling
  - Composable design

- **lucide-react** - Icon library
- **qrcode.react** - QR code generation

### Utilities

- **next-themes** - Theme management (dark/light mode)
- **clsx** - Class name utility
- **tailwind-merge** - Tailwind class merging
- **class-variance-authority** - Component variants

### Development Tools

- **ESLint 9.39.1** - Linting dengan flat config
  - React, React Hooks, Next.js rules
  - jsx-a11y accessibility rules
  - Import sorting (simple-import-sort)
  - Unused imports detection

- **Prettier 3.7.4** - Code formatting
  - Tailwind CSS plugin untuk class sorting
  - Consistent formatting rules

- **Husky 9.1.7** - Git hooks
  - Pre-commit hooks dengan lint-staged
  - Automatic formatting dan linting

- **TypeScript** - Type checking
  - Strict mode enabled
  - Comprehensive type safety

### Package Manager

- **pnpm** - Fast, disk space efficient package manager
  - Workspace support (`pnpm-workspace.yaml`)
  - Lock file: `pnpm-lock.yaml`

---

## Project Structure

### Root Directory

```
z-card/
├── src/                    # Source code
├── docs/                   # Documentation
│   ├── ARCHITECTURE.md    # This file
│   ├── CODING_STANDARDS.md # Coding standards
│   ├── STANDARDS/          # Detailed standards
│   └── sprint-artifacts/   # Epic/story documentation
├── public/                 # Static assets
├── .husky/                 # Git hooks
├── eslint.config.mjs       # ESLint configuration
├── prettier.config.cjs     # Prettier configuration
├── tsconfig.json           # TypeScript configuration
├── next.config.ts          # Next.js configuration
├── package.json            # Dependencies dan scripts
└── README.md               # Project documentation
```

### Source Directory (`src/`)

```
src/
├── app/                    # Next.js App Router
│   ├── (site)/            # Route group (doesn't affect URL)
│   │   └── _components/   # Route-specific components
│   │       ├── about.tsx
│   │       ├── contact.tsx
│   │       ├── hero.tsx
│   │       └── projects.tsx
│   ├── layout.tsx         # Root layout (Server Component)
│   ├── page.tsx           # Root page (Server Component)
│   └── globals.css        # Global styles
├── components/            # Shared UI components
│   ├── ui/                # UI primitives (shadcn/ui pattern)
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── progress.tsx
│   │   ├── separator.tsx
│   │   ├── tabs.tsx
│   │   └── tooltip.tsx
│   ├── digital-card.tsx   # Digital business card component
│   ├── footer.tsx         # Footer component
│   ├── navbar.tsx         # Navigation bar component
│   ├── section.tsx        # Section wrapper component
│   ├── theme-provider.tsx # Theme context provider
│   └── theme-toggle.tsx   # Theme toggle button
├── config/                # Configuration files
│   └── site.ts            # Site configuration constants
├── lib/                   # Utility functions
│   ├── utils.ts           # General utilities (cn helper)
│   └── site-helpers.ts    # Site-specific helper functions
└── types/                 # TypeScript type definitions
    ├── digital-card.d.ts  # Digital card types
    └── index.ts           # Centralized type exports
```

### Directory Purpose

#### `src/app/` - Next.js App Router

**Purpose:** Next.js 15 App Router directory untuk routes, layouts, dan pages.

**Key Features:**

- Server Components by default (no `'use client'` needed)
- Route groups `(site)` untuk organizing routes tanpa affecting URL
- Co-located components `_components/` untuk route-specific components
- Special files: `layout.tsx`, `page.tsx`, `globals.css`

**Patterns:**

- Server Components untuk static content dan data fetching
- Client Components untuk interactivity (explicit `'use client'` directive)
- Route groups untuk logical organization

#### `src/components/` - Shared UI Components

**Purpose:** Reusable components used across multiple routes.

**Structure:**

- `ui/` - Low-level UI primitives (shadcn/ui pattern)
- Top-level components - Layout components (navbar, footer, section)
- Feature components - Domain-specific components (digital-card, theme-toggle)

**Pattern:**

- Shared components are reusable across routes
- UI primitives follow shadcn/ui pattern (Radix UI + Tailwind)
- Components are composable dan accessible

#### `src/components/ui/` - UI Primitives

**Purpose:** Low-level, unstyled UI components following shadcn/ui pattern.

**Pattern:**

- Built on Radix UI primitives (accessible, unstyled)
- Styled dengan Tailwind CSS
- Composable dan customizable
- Imported via `@/components/ui/` path alias

#### `src/config/` - Configuration

**Purpose:** Application configuration constants.

**Current Files:**

- `site.ts` - Site metadata (name, email, social links, etc.)

**Pattern:**

- Exported as const object dengan `as const` assertion
- Type-safe configuration
- Single source of truth untuk site data

#### `src/lib/` - Utilities

**Purpose:** Shared utility functions.

**Current Files:**

- `utils.ts` - General utilities (e.g., `cn` helper untuk className merging)
- `site-helpers.ts` - Site-specific helpers (vCard generation, email helpers)

**Pattern:**

- Pure functions where possible
- Type-safe utilities
- Reusable across components

#### `src/types/` - Type Definitions

**Purpose:** Shared TypeScript type definitions.

**Current Files:**

- `digital-card.d.ts` - Digital card component types
- `index.ts` - Centralized type exports

**Pattern:**

- `.d.ts` files untuk type-only definitions
- Domain-based organization
- Centralized exports via `index.ts`
- Import via `@/types` path alias

---

## Component Architecture

### Server vs Client Components

**Server Components (Default):**

- No `'use client'` directive needed
- Rendered on server
- Can fetch data directly
- Smaller bundle size
- Better performance

**Client Components:**

- Require `'use client'` directive at top of file
- Rendered on client
- Can use React hooks (useState, useEffect, etc.)
- Can handle interactivity
- Can access browser APIs

**Decision Criteria:**

- Use Server Components by default
- Use Client Components only when needed:
  - Interactivity (onClick, onChange, etc.)
  - React hooks (useState, useEffect, etc.)
  - Browser APIs (localStorage, window, etc.)
  - Context providers (ThemeProvider, etc.)

### Component Organization

**Route-Specific Components:**

- Location: `src/app/(site)/_components/`
- Purpose: Components used only by specific routes
- Pattern: Co-located dengan route files

**Shared Components:**

- Location: `src/components/`
- Purpose: Components used across multiple routes
- Pattern: Organized by feature atau type

**UI Primitives:**

- Location: `src/components/ui/`
- Purpose: Low-level, reusable UI components
- Pattern: shadcn/ui architecture

---

## Technical Decisions & Rationale

### 1. Next.js App Router

**Decision:** Use Next.js 15 App Router (not Pages Router)

**Rationale:**

- Modern, recommended approach
- Server Components by default (better performance)
- Better code organization
- Built-in optimizations
- Future-proof

### 2. TypeScript Strict Mode

**Decision:** Enable TypeScript strict mode dengan additional strict flags

**Rationale:**

- Catch errors at compile time
- Better code quality
- Improved developer experience
- Type safety throughout codebase

**Strict Flags Enabled:**

- `strict: true` - All strict checks
- `noUnusedLocals: true` - Catch unused variables
- `noUnusedParameters: true` - Catch unused parameters
- `noImplicitReturns: true` - Require explicit returns
- `noFallthroughCasesInSwitch: true` - Prevent switch fallthrough
- `useUnknownInCatchVariables: true` - Type-safe error handling

### 3. Path Aliases

**Decision:** Use `@/*` path aliases untuk all imports

**Rationale:**

- Cleaner imports
- Easier refactoring
- Consistent import patterns
- Better developer experience

**Configuration:**

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**Usage:**

```typescript
import { Button } from '@/components/ui/button'
import { site } from '@/config/site'
import type { DigitalCardData } from '@/types'
```

### 4. ESLint & Prettier

**Decision:** Comprehensive ESLint setup dengan Prettier integration

**Rationale:**

- Consistent code style
- Catch errors early
- Enforce best practices
- Accessibility enforcement (jsx-a11y)

**Key Rules:**

- React best practices
- React Hooks rules
- Next.js specific rules
- Accessibility rules (jsx-a11y)
- Import sorting
- Unused imports detection

### 5. Pre-commit Hooks

**Decision:** Husky dengan lint-staged untuk pre-commit checks

**Rationale:**

- Prevent bad code from being committed
- Automatic formatting
- Consistent code quality
- Fast feedback loop

**Configuration:**

- Runs Prettier formatting on staged files
- Runs ESLint dengan auto-fix on staged files
- Only processes staged files (fast performance)

### 6. Component Architecture (shadcn/ui)

**Decision:** Follow shadcn/ui pattern untuk UI components

**Rationale:**

- Accessible by default (Radix UI)
- Unstyled, customizable
- Composable design
- Copy-paste friendly (not npm package)
- Full control over components

---

## File Organization Patterns

### Naming Conventions

**Files:**

- Components: PascalCase (e.g., `About.tsx`, `Contact.tsx`)
- Utilities: camelCase (e.g., `utils.ts`, `siteHelpers.ts`)
- Types: PascalCase dengan `.d.ts` extension (e.g., `digital-card.d.ts`)
- Config: camelCase (e.g., `site.ts`)

**Components:**

- PascalCase untuk component names
- Match file names
- Descriptive names

**Functions:**

- camelCase (e.g., `buildVCard()`, `personLdJson()`)
- Descriptive names

**Constants:**

- UPPER_SNAKE_CASE untuk exported constants
- camelCase untuk local constants

**Types:**

- PascalCase (e.g., `DigitalCardData`, `DigitalCardProps`)

### Import Patterns

**Order:**

1. External packages (React, Next.js, third-party)
2. Type imports (`import type`)
3. Path aliases (`@/`)
4. Relative imports (if needed)
5. CSS imports

**Example:**

```typescript
import { useState } from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'

import { Section } from '@/components/section'
import type { DigitalCardData } from '@/types'

import './styles.css'
```

**Rules:**

- Always use path aliases (`@/`) instead of relative imports
- Group imports logically
- ESLint `simple-import-sort` enforces order automatically

---

## Code Quality & Standards

### TypeScript

- **Strict Mode:** Enabled dengan comprehensive strict flags
- **Type Safety:** No `any` types, proper type annotations
- **Type Organization:** Centralized di `src/types/` dengan index exports
- **Path Aliases:** Consistent use of `@/*` aliases

### ESLint

- **Configuration:** Flat config format (ESLint 9+)
- **Rules:** React, Next.js, accessibility, code quality
- **Plugins:** prettier, unused-imports, simple-import-sort, jsx-a11y
- **Enforcement:** Pre-commit hooks, CI/CD ready

### Prettier

- **Configuration:** Explicit settings untuk consistency
- **Integration:** ESLint-Prettier integration (no conflicts)
- **Tailwind Plugin:** Automatic class sorting
- **Formatting:** Consistent across all files

### Pre-commit Hooks

- **Tool:** Husky dengan lint-staged
- **Behavior:** Automatic formatting dan linting on commit
- **Performance:** Fast (< 10 seconds) - only processes staged files

---

## Development Workflow

### Setup

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Type check
pnpm type-check

# Lint
pnpm lint

# Format
pnpm format
```

### Code Quality Checks

```bash
# Type checking
pnpm type-check

# Linting
pnpm lint

# Auto-fix linting issues
pnpm lint:fix

# Format check
pnpm format:check

# Format files
pnpm format
```

### Git Workflow

1. **Create feature branch**
2. **Make changes**
3. **Pre-commit hooks run automatically:**
   - Prettier formatting
   - ESLint auto-fix
4. **Commit changes**
5. **Push to remote**
6. **Create Pull Request**

---

## Future Considerations

### Backend Structure

**Current:** Frontend-only (no backend yet)

**Future (Epic 5):**

- Next.js API Routes untuk email service
- Structure: `src/app/api/` untuk API routes
- Minimal backend untuk contact form

**Future Enhancements:**

- Full backend architecture jika needed
- Database integration
- Authentication jika needed

### Testing

**Current:** No test framework (Epic 3 will add)

**Future:**

- Unit tests (Jest/Vitest)
- Component tests (React Testing Library)
- E2E tests (Playwright/Cypress)
- Test coverage requirements

### CI/CD

**Current:** Manual deployment

**Future:**

- GitHub Actions untuk CI/CD
- Automated testing
- Automated deployment
- Code quality checks

### Documentation

**Current:** Architecture, coding standards, contributing guide documented

**Future:**

- API documentation (when backend added)
- Component Storybook (optional)

---

## Related Documentation

- [Coding Standards](./CODING_STANDARDS.md) - Detailed coding standards
- [Standards Directory](./STANDARDS/) - Specific standards documentation
  - [Naming Conventions](./STANDARDS/naming-conventions.md)
  - [Import Patterns](./STANDARDS/import-patterns.md)
  - [TypeScript Patterns](./STANDARDS/typescript-patterns.md)
  - [Component Patterns](./STANDARDS/component-patterns.md)
  - [ESLint & Prettier](./STANDARDS/eslint-prettier.md)
- [Audit Report](./sprint-artifacts/audit-report.md) - Project audit findings
- [Migration Plan](./sprint-artifacts/migration-plan.md) - Standardization plan

---

## Summary

z-card follows modern Next.js best practices dengan strong emphasis on:

- **Type Safety:** TypeScript strict mode dengan comprehensive type checking
- **Code Quality:** ESLint, Prettier, pre-commit hooks
- **Accessibility:** jsx-a11y rules enforcement
- **Performance:** Server Components by default, optimizations
- **Maintainability:** Clear structure, consistent patterns, comprehensive documentation

The architecture is designed untuk be:

- **Scalable:** Easy to add new features
- **Maintainable:** Clear patterns dan documentation
- **Type-Safe:** Comprehensive TypeScript usage
- **Accessible:** Built-in accessibility enforcement
- **Performant:** Next.js optimizations, Server Components

---

**Last Updated:** 2025-01-27  
**Status:** Active  
**Maintained By:** Development Team
