# TypeScript Patterns & Best Practices

**Last Updated:** 2025-01-27  
**Status:** Active Standard  
**Project:** z-card

---

## Overview

TypeScript patterns dan best practices untuk z-card project memastikan type safety, code quality, dan maintainability.

---

## TypeScript Configuration

### Strict Mode

**Status:** ✅ Enabled dengan optimal flags

**Configuration:**

- `strict: true` - Enables all strict type checking options
- `noUnusedLocals: true` - Report errors on unused local variables
- `noUnusedParameters: true` - Report errors on unused parameters
- `noImplicitReturns: true` - Report error when not all code paths return a value
- `noFallthroughCasesInSwitch: true` - Report errors for fallthrough cases in switch statements
- `useUnknownInCatchVariables: true` - Use `unknown` instead of `any` for catch clause variables

**Path Aliases:**

- `@/*` → `./src/*` - Configured untuk consistent imports

### Additional Strict Flags Consideration

**Flags Reviewed but Not Enabled:**

Beberapa additional strict flags dipertimbangkan tapi tidak diaktifkan dengan alasan berikut:

**`noUncheckedIndexedAccess`** - Not enabled

- **Rationale:** Flag ini membuat semua array/object index access return `T | undefined`, yang bisa terlalu strict untuk Next.js App Router patterns dan memerlukan banyak null checks tambahan.
- **Impact:** Akan memerlukan extensive refactoring untuk handle `undefined` cases di array/object access.
- **Decision:** Tidak diaktifkan untuk maintain development velocity, tapi bisa di-consider untuk future jika project memerlukan extra type safety.

**`exactOptionalPropertyTypes`** - Not enabled

- **Rationale:** Flag ini memisahkan `undefined` dari optional properties, yang bisa menyebabkan breaking changes di existing code patterns.
- **Impact:** Akan memerlukan refactoring untuk semua optional properties yang menggunakan `undefined` sebagai value.
- **Decision:** Tidak diaktifkan untuk avoid breaking changes di brownfield project, tapi recommended untuk greenfield projects.

**`noImplicitOverride`** - Not enabled

- **Rationale:** Flag ini memerlukan explicit `override` keyword untuk overridden methods, yang lebih relevant untuk class-based inheritance patterns.
- **Impact:** Project ini menggunakan functional components dan composition patterns, bukan class inheritance.
- **Decision:** Tidak diaktifkan karena tidak applicable untuk current architecture patterns.

**Future Considerations:**

- Re-evaluate `noUncheckedIndexedAccess` jika project memerlukan extra type safety untuk array/object access.
- Consider `exactOptionalPropertyTypes` untuk future greenfield features jika consistency dengan existing code tidak menjadi concern.

---

## Type Definition Patterns

### Interfaces vs Types

**Use Interfaces For:**

- Object shapes yang mungkin di-extend
- Component props
- API responses
- Data structures

**Example:**

```typescript
// ✅ Good - Interface untuk object shape
export interface DigitalCardData {
  firstName: string
  lastName?: string
  email?: string
}

export interface DigitalCardProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  data?: Partial<DigitalCardData>
}
```

**Use Types For:**

- Union types
- Intersection types
- Type aliases
- Mapped types
- Utility types

**Example:**

```typescript
// ✅ Good - Type untuk union
export type QRMode = 'vcard' | 'url'

// ✅ Good - Type untuk utility
type PartialDigitalCard = Partial<DigitalCardData>
```

### Naming Conventions

**Interfaces:**

- PascalCase dengan descriptive names
- Use `Props` suffix untuk component props
- Use `Data` suffix untuk data structures

**Types:**

- PascalCase dengan descriptive names
- Use descriptive names untuk union types

**Examples:**

```typescript
// ✅ Good
export interface DigitalCardProps {}
export interface DigitalCardData {}
export type QRMode = 'vcard' | 'url'
export type Project = {}

// ❌ Bad
export interface digitalCardProps {}
export type qrMode = 'vcard' | 'url'
```

---

## Type Organization

### Shared Types

**Location:** `src/types/`

**Pattern:**

- One file per domain/feature (kebab-case dengan `.d.ts`)
- Centralized exports via `index.ts`
- Import: `import type { TypeName } from '@/types'`

**Example Structure:**

```
src/types/
├── index.ts              # Centralized exports
├── digital-card.d.ts     # Digital card types
└── [domain].d.ts        # Future domain types
```

### Local Types

**Pattern:**

- Keep local types in the file where they're used
- Only move to `src/types/` if used in multiple files
- Use descriptive names even for local types

**Example:**

```typescript
// ✅ Good - Local type untuk component-specific props
type SectionProps = {
  id: string
  children: React.ReactNode
  className?: string
  full?: boolean
}

export default function Section({ id, children, className = '', full = false }: SectionProps) {
  // ...
}
```

---

## Utility Types

### Built-in Utility Types

**Common Usage:**

- `Partial<T>` - Make all properties optional
- `Required<T>` - Make all properties required
- `Pick<T, K>` - Select specific properties
- `Omit<T, K>` - Exclude specific properties
- `Readonly<T>` - Make all properties readonly

**Examples:**

```typescript
// ✅ Good - Using utility types
type PartialDigitalCard = Partial<DigitalCardData>
type DigitalCardRequired = Required<Pick<DigitalCardData, 'firstName' | 'email'>>

// ✅ Good - Component props dengan Partial
export interface DigitalCardProps {
  data?: Partial<DigitalCardData>
}
```

---

## Type Safety Best Practices

### Avoid `any` Type

**Rule:** Never use `any` type unless absolutely necessary

**Alternatives:**

- Use `unknown` untuk values yang type-nya tidak diketahui
- Use proper types atau generics
- Use type assertions dengan caution

**Example:**

```typescript
// ❌ Bad
function processData(data: any) {}

// ✅ Good
function processData(data: unknown) {
  if (typeof data === 'string') {
    // TypeScript knows data is string here
  }
}

// ✅ Good - Proper type
function processData(data: DigitalCardData) {}
```

### Type Assertions

**Use Sparingly:**

- Only when you're certain about the type
- Prefer type guards over assertions
- Document why assertion is needed

**Example:**

```typescript
// ⚠️ Use with caution
const data = response as DigitalCardData

// ✅ Better - Type guard
function isDigitalCardData(data: unknown): data is DigitalCardData {
  return typeof data === 'object' && data !== null && 'firstName' in data
}
```

### Null Safety

**Pattern:**

- Use optional chaining (`?.`)
- Use nullish coalescing (`??`)
- Handle null/undefined explicitly

**Example:**

```typescript
// ✅ Good - Null safety
const email = data?.email ?? 'no-email@example.com'
const name =
  data?.firstName && data?.lastName
    ? `${data.firstName} ${data.lastName}`
    : (data?.firstName ?? 'Unknown')
```

---

## Next.js App Router Type Patterns

### Server Components

**Pattern:**

- No special types needed
- Can use async/await
- Can use `Metadata` type untuk metadata

**Example:**

```typescript
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Zacky Achmad',
  description: 'Full-Stack Web Developer',
}
```

### Client Components

**Pattern:**

- Standard React component types
- Use `'use client'` directive
- Props types dengan interfaces

**Example:**

```typescript
'use client'

import type { DigitalCardProps } from '@/types'

export function DigitalCard({ open, onOpenChange, data }: DigitalCardProps) {
  // ...
}
```

---

## Import Patterns

### Type-Only Imports

**Pattern:** Use `import type` untuk type-only imports

**Example:**

```typescript
// ✅ Good - Type-only import
import type { DigitalCardData, DigitalCardProps } from '@/types'

// ✅ Good - Mixed import
import { DigitalCard } from '@/components/digital-card'
import type { DigitalCardProps } from '@/types'
```

**Benefits:**

- Type-only imports are removed at compile time
- Clear indication of type vs value imports
- Better tree-shaking

### Path Aliases

**Pattern:** Always use `@/` path aliases

**Example:**

```typescript
// ✅ Good
import type { DigitalCardData } from '@/types'
import { Section } from '@/components/section'

// ❌ Bad
import type { DigitalCardData } from '../../types'
import { Section } from '../components/section'
```

---

## Documentation

### Type Comments

**Pattern:** Add JSDoc comments untuk complex types

**Example:**

```typescript
/**
 * Digital Card Type Definitions
 *
 * Types for digital business card component
 */

export type QRMode = 'vcard' | 'url'

/**
 * Data structure for digital card information
 */
export interface DigitalCardData {
  firstName: string
  lastName?: string
  // ...
}
```

---

## Common Patterns

### Component Props

**Pattern:**

```typescript
// ✅ Good - Interface untuk props
export interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}

export function Button({ children, onClick, variant = 'primary', disabled = false }: ButtonProps) {
  // ...
}
```

### API Responses

**Pattern:**

```typescript
// ✅ Good - API response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

export interface ContactFormResponse {
  message: string
  timestamp: string
}
```

### Form Data

**Pattern:**

```typescript
// ✅ Good - Form data types
export interface ContactFormData {
  name: string
  email: string
  message: string
}

export interface ContactFormErrors {
  name?: string
  email?: string
  message?: string
}
```

---

## Common Migration Patterns

### Migrating from `any` to Proper Types

**Pattern:** Replace `any` dengan specific types atau `unknown`

**Example:**

```typescript
// ❌ Before - Using any
function processData(data: any) {
  return data.value
}

// ✅ After - Using proper type
function processData(data: { value: string }) {
  return data.value
}

// ✅ After - Using unknown dengan type guard
function processData(data: unknown) {
  if (typeof data === 'object' && data !== null && 'value' in data) {
    return (data as { value: string }).value
  }
  throw new Error('Invalid data')
}
```

### Migrating to Path Aliases

**Pattern:** Replace relative imports dengan `@/` aliases

**Example:**

```typescript
// ❌ Before - Relative imports
import { Section } from '../../components/section'
import type { DigitalCardData } from '../../../types'

// ✅ After - Path aliases
import { Section } from '@/components/section'
import type { DigitalCardData } from '@/types'
```

### Migrating to Centralized Type Exports

**Pattern:** Move types ke `src/types/` dan use centralized exports

**Example:**

```typescript
// ❌ Before - Types scattered in component files
// src/components/digital-card.tsx
export interface DigitalCardData {
  firstName: string
  email?: string
}

// ✅ After - Types in src/types/ dengan centralized exports
// src/types/digital-card.d.ts
export interface DigitalCardData {
  firstName: string
  email?: string
}

// src/types/index.ts
export type { DigitalCardData } from './digital-card'

// src/components/digital-card.tsx
import type { DigitalCardData } from '@/types'
```

### Migrating to Type-Only Imports

**Pattern:** Use `import type` untuk type-only imports

**Example:**

```typescript
// ❌ Before - Mixed import
import { DigitalCardData, DigitalCard } from '@/components/digital-card'

// ✅ After - Type-only import
import { DigitalCard } from '@/components/digital-card'
import type { DigitalCardData } from '@/types'
```

### Refactoring Component Props

**Pattern:** Extract props interfaces ke types directory

**Example:**

```typescript
// ❌ Before - Props defined inline
export function Button({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  // ...
}

// ✅ After - Props interface in types
// src/types/button.d.ts
export interface ButtonProps {
  onClick: () => void
  children: React.ReactNode
}

// src/components/button.tsx
import type { ButtonProps } from '@/types'

export function Button({ onClick, children }: ButtonProps) {
  // ...
}
```

---

## Best Practices Summary

1. **Use strict mode** - Enable all strict flags
2. **Avoid `any`** - Use `unknown` atau proper types
3. **Organize types** - Shared types in `src/types/`, local types in files
4. **Use path aliases** - Always use `@/` for imports
5. **Type-only imports** - Use `import type` untuk types
6. **Document complex types** - Add JSDoc comments
7. **Use utility types** - Leverage built-in utility types
8. **Null safety** - Handle null/undefined explicitly
9. **Consistent naming** - Follow naming conventions
10. **Type guards** - Prefer type guards over assertions

---

## Migration Status

**Completed (2025-01-27):**

- ✅ TypeScript strict mode enabled dengan optimal flags
- ✅ Type definitions organized di `src/types/`
- ✅ Path aliases configured dan used consistently
- ✅ Type patterns documented
- ✅ Zero type errors

---

## Related Documentation

- [Type Definitions](./type-definitions.md) - Type organization
- [Import Patterns](./import-patterns.md) - Import rules
- [Naming Conventions](./naming-conventions.md) - Naming rules
- [Coding Standards](../CODING_STANDARDS.md) - Overall standards

---

**Last Updated:** 2025-01-27  
**Status:** Active Standard
