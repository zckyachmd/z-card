# Code Structure Standards

**Last Updated:** 2025-01-27  
**Status:** Active Standard

---

## Overview

Code structure standards untuk z-card project memastikan konsistensi, scalability, dan maintainability.

---

## Project Structure

### Root Directory

```
z-card/
├── src/                    # Source code
├── docs/                   # Documentation
├── public/                 # Static assets
├── .husky/                 # Git hooks
├── eslint.config.mjs       # ESLint configuration
├── prettier.config.cjs     # Prettier configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies
```

### Source Directory (`src/`)

```
src/
├── app/                    # Next.js App Router
│   ├── (site)/            # Route group
│   │   └── _components/   # Route-specific components
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Root page
│   └── globals.css        # Global styles
├── components/            # Shared UI components
│   ├── ui/                # UI primitives (shadcn/ui)
│   └── [components]       # Feature components
├── config/                # Configuration files
├── lib/                   # Utility functions
└── types/                 # TypeScript type definitions
```

---

## Directory Purposes

### `src/app/` - Next.js App Router

**Purpose:** Next.js 15 App Router directory untuk routes, layouts, dan pages

**Structure:**

- Route groups: `(site)` - Organize routes tanpa affecting URL
- Co-located components: `_components/` - Route-specific components
- Layouts: `layout.tsx` - Root dan nested layouts
- Pages: `page.tsx` - Route pages

**Rules:**

- Use route groups untuk organization
- Co-locate route-specific components in `_components/`
- Server Components by default
- Client Components dengan `'use client'` directive

### `src/components/` - Shared Components

**Purpose:** Reusable components used across multiple routes

**Structure:**

- `ui/` - UI primitives (shadcn/ui pattern)
- Top-level - Feature components (navbar, footer, section)

**Rules:**

- Shared components only
- Route-specific components go in `app/(route)/_components/`
- UI primitives in `ui/` subdirectory

### `src/components/ui/` - UI Primitives

**Purpose:** Low-level UI components (shadcn/ui pattern)

**Pattern:**

- Radix UI primitives dengan Tailwind styling
- Reusable, unstyled primitives
- Import via `@/components/ui/`

**Rules:**

- Follow shadcn/ui patterns
- Keep components primitive dan composable
- Use kebab-case untuk file names

### `src/config/` - Configuration

**Purpose:** Application configuration constants

**Pattern:**

- Exported as const objects
- Use `as const` untuk type safety

**Examples:**

```typescript
export const site = {
  name: { first: 'Zacky', last: 'Achmad' },
  // ...
} as const
```

### `src/lib/` - Utilities

**Purpose:** Shared utility functions

**Pattern:**

- camelCase file names
- One file per utility domain
- Pure functions preferred

**Examples:**

- `utils.ts` - General utilities (cn helper)
- `siteHelpers.ts` - Site-specific helpers

### `src/types/` - Type Definitions

**Purpose:** TypeScript type definitions

**Pattern:**

- kebab-case file names dengan `.d.ts` extension
- Centralized exports via `index.ts`
- Domain-based organization

**See:** [Type Definitions](./type-definitions.md) untuk details

---

## File Organization Rules

### Component Files

**Location:** `src/components/` atau `src/app/(route)/_components/`

**Naming:** PascalCase dengan `.tsx` extension

**Organization:**

- Shared components → `src/components/`
- Route-specific → `src/app/(route)/_components/`
- UI primitives → `src/components/ui/`

### Utility Files

**Location:** `src/lib/`

**Naming:** camelCase dengan `.ts` extension

**Organization:**

- General utilities → `utils.ts`
- Domain-specific → `[domain]Helpers.ts`

### Configuration Files

**Location:** `src/config/`

**Naming:** camelCase dengan `.ts` extension

**Organization:**

- Site config → `site.ts`
- Future: `api.ts`, `theme.ts`, etc.

### Type Files

**Location:** `src/types/`

**Naming:** kebab-case dengan `.d.ts` extension

**Organization:**

- Domain-based files
- Centralized exports via `index.ts`

---

## Component Organization

### Server vs Client Components

**Server Components (Default):**

- No `'use client'` directive
- Can use async/await
- No React hooks
- Better performance

**Client Components:**

- Require `'use client'` directive
- Can use React hooks
- Can use browser APIs
- Use only when needed

**Rules:**

- Default to Server Components
- Use Client Components only when needed (hooks, interactivity)
- Mark explicitly dengan `'use client'`

### Component Placement

**Shared Components:**

- Location: `src/components/`
- Used across multiple routes
- Examples: `navbar.tsx`, `footer.tsx`, `section.tsx`

**Route-Specific Components:**

- Location: `src/app/(route)/_components/`
- Used only in specific route
- Examples: `about.tsx`, `contact.tsx`, `hero.tsx`

**UI Primitives:**

- Location: `src/components/ui/`
- Low-level, reusable primitives
- Examples: `button.tsx`, `dialog.tsx`, `card.tsx`

---

## Import Organization

**See:** [Import Patterns](./import-patterns.md) untuk detailed rules

**Summary:**

- Always use path aliases (`@/`)
- Never use relative imports
- Follow import order: External → Path aliases

---

## Code Organization Within Files

### Component File Structure

**Pattern:**

```typescript
// 1. 'use client' directive (if Client Component)
'use client'

// 2. External imports
import * as React from 'react'
import Link from 'next/link'

// 3. Path alias imports
import Section from '@/components/section'
import { Button } from '@/components/ui/button'

// 4. Type imports
import type { ComponentProps } from '@/types'

// 5. Constants (if any)
const CONSTANT = 'value'

// 6. Types (if local)
type LocalType = {}

// 7. Component
export default function Component() {
  // ...
}

// 8. Helper functions (if any)
function helper() {
  // ...
}
```

### Utility File Structure

**Pattern:**

```typescript
// 1. Imports
import { site } from '@/config/site'
import type { TypeName } from '@/types'

// 2. Type definitions (if local)
type LocalType = {}

// 3. Exported functions
export function utilityFunction() {
  // ...
}

// 4. Helper functions (if any)
function internalHelper() {
  // ...
}
```

---

## Best Practices

1. **Clear Separation:** Separate concerns (components, utilities, config, types)
2. **Consistent Naming:** Follow naming conventions
3. **Logical Grouping:** Group related files together
4. **Scalability:** Structure supports growth
5. **Documentation:** Document structure decisions
6. **Consistency:** Follow established patterns

---

## Migration Status

**Completed (2025-01-27):**

- ✅ Structure documented
- ✅ Directory purposes defined
- ✅ File organization rules established

---

**Related:** [Naming Conventions](./naming-conventions.md) | [Component Patterns](./component-patterns.md)
