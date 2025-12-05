# Type Definitions Organization

**Last Updated:** 2025-01-27  
**Status:** Active Standard

---

## Overview

Type definitions organization untuk z-card project memastikan type safety, reusability, dan maintainability.

---

## Directory Structure

### Location

**Base Directory:** `src/types/`

**Structure:**

```
src/types/
├── index.ts              # Centralized type exports
├── digital-card.d.ts      # Digital card types
└── [domain].d.ts         # Future domain-specific types
```

---

## File Organization

### Type Definition Files

**Pattern:** kebab-case dengan `.d.ts` extension

**Examples:**

- ✅ `digital-card.d.ts`
- ✅ `contact-form.d.ts` (future)
- ✅ `api-response.d.ts` (future)

**Rules:**

- Use `.d.ts` extension untuk type-only files
- Use kebab-case untuk file names
- One file per domain/feature
- Descriptive names that match domain

### Centralized Exports

**File:** `src/types/index.ts`

**Purpose:** Centralized type exports untuk easier imports

**Pattern:**

```typescript
/**
 * Type Definitions Index
 *
 * Centralized type exports for easier imports
 * Use: import type { TypeName } from '@/types'
 */

export type { DigitalCardData, DigitalCardProps, QRMode } from './digital-card'
```

**Benefits:**

- Single import source: `@/types`
- Easier refactoring (change internal structure without breaking imports)
- Clear type organization
- Better IDE autocomplete

---

## Import Patterns

### Recommended: Centralized Import

**Pattern:** Import from `@/types` index

**Examples:**

```typescript
// ✅ Good - Centralized import
import type { DigitalCardData, DigitalCardProps } from '@/types'
import type { QRMode } from '@/types'

// ❌ Bad - Direct file import (works but not preferred)
import type { DigitalCardData } from '@/types/digital-card'
```

**Benefits:**

- Consistent import pattern
- Easier to refactor internal structure
- Single source of truth

### Direct File Import (Allowed but Not Preferred)

**Pattern:** Direct import from type file

**Examples:**

```typescript
// ⚠️ Allowed but not preferred
import type { DigitalCardData } from '@/types/digital-card'
```

**When to Use:**

- Only if specific type file is needed
- Generally prefer centralized imports

---

## Type Definition Patterns

### Interfaces

**Pattern:** PascalCase dengan descriptive names

**Examples:**

```typescript
// ✅ Good
export interface DigitalCardData {
  firstName: string
  lastName?: string
  // ...
}

export interface DigitalCardProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  // ...
}
```

**Rules:**

- Use `Props` suffix untuk component props
- Use `Data` suffix untuk data structures
- Use descriptive names

### Types

**Pattern:** PascalCase

**Examples:**

```typescript
// ✅ Good
export type QRMode = 'vcard' | 'url'

export type Project = {
  title: string
  blurb: string
  tech: string[]
}
```

**Rules:**

- Use untuk union types, intersections, aliases
- Descriptive names

### Type Organization

**Pattern:** Group related types together

**Examples:**

```typescript
// ✅ Good - Related types together
export type QRMode = 'vcard' | 'url'

export interface DigitalCardData {
  // ...
}

export interface DigitalCardProps {
  // ...
}
```

---

## Documentation

### Type Comments

**Pattern:** JSDoc comments untuk complex types

**Examples:**

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

**Rules:**

- Add comments untuk complex types
- Document purpose dan usage
- Keep comments up-to-date

---

## Best Practices

1. **Centralized Exports:** Always export types through `index.ts`
2. **Domain Organization:** Group types by domain/feature
3. **Descriptive Names:** Use clear, descriptive type names
4. **Documentation:** Add comments untuk complex types
5. **Consistency:** Follow established patterns
6. **Reusability:** Extract shared types to common files

---

## Migration Status

**Completed (2025-01-27):**

- ✅ Created `src/types/index.ts` untuk centralized exports
- ✅ Updated all type imports to use `@/types`
- ✅ Added documentation comments

**Files Updated:**

- `src/types/index.ts` - New file
- `src/types/digital-card.d.ts` - Added documentation
- `src/components/digital-card.tsx` - Updated import
- `src/lib/siteHelpers.ts` - Updated import

---

## Future Organization

**Potential Structure:**

```
src/types/
├── index.ts              # Centralized exports
├── digital-card.d.ts     # Digital card types
├── contact.d.ts          # Contact form types (future)
├── api.d.ts              # API response types (future)
└── common.d.ts          # Shared/common types (future)
```

**Organization Strategy:**

- One file per domain/feature
- Shared types in `common.d.ts`
- All exports through `index.ts`

---

## Examples

### Complete Type Definition File

```typescript
/**
 * Digital Card Type Definitions
 *
 * Types for digital business card component
 */

export type QRMode = 'vcard' | 'url'

export interface DigitalCardData {
  firstName: string
  lastName?: string
  fullName?: string
  jobTitle?: string
  email?: string
  websiteHost?: string
  phone?: string
  location?: string
  tagline?: string
}

export interface DigitalCardProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  data?: Partial<DigitalCardData>
  qrMode?: QRMode
  safeUrl?: string
  showCopyEmail?: boolean
}
```

### Usage Example

```typescript
// ✅ Good - Centralized import
import type { DigitalCardData, DigitalCardProps } from '@/types'

export function DigitalCard({ data }: { data: DigitalCardData }) {
  // ...
}
```

---

## Related Documentation

- [TypeScript Patterns](./typescript-patterns.md) - Comprehensive TypeScript best practices
- [Naming Conventions](./naming-conventions.md) - Naming rules
- [Import Patterns](./import-patterns.md) - Import rules
- [Coding Standards](../CODING_STANDARDS.md) - Overall standards

---

**Related:** [Naming Conventions](./naming-conventions.md) | [Import Patterns](./import-patterns.md) | [TypeScript Patterns](./typescript-patterns.md)
