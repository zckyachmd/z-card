# Naming Conventions

**Last Updated:** 2025-01-27  
**Status:** Active Standard

---

## Overview

Naming conventions untuk z-card project memastikan konsistensi dan memudahkan navigation codebase.

---

## File Naming

### React Components

**Pattern:** PascalCase dengan `.tsx` extension

**Examples:**

- ✅ `about.tsx`
- ✅ `contact.tsx`
- ✅ `digital-card.tsx`
- ✅ `theme-toggle.tsx`

**Rules:**

- Component files use PascalCase
- File name matches component name
- Use `.tsx` untuk React components

### Utility Files

**Pattern:** camelCase dengan `.ts` extension

**Examples:**

- ✅ `utils.ts`
- ✅ `siteHelpers.ts` (renamed from `site-helpers.ts`)

**Rules:**

- Utility files use camelCase
- Descriptive names that indicate purpose
- Use `.ts` untuk non-React files

### Configuration Files

**Pattern:** camelCase dengan `.ts` extension

**Examples:**

- ✅ `site.ts`

**Rules:**

- Config files use camelCase
- Descriptive names

### Type Definition Files

**Pattern:** kebab-case dengan `.d.ts` extension

**Examples:**

- ✅ `digital-card.d.ts`

**Rules:**

- Type files use kebab-case
- Use `.d.ts` untuk type-only definitions
- Descriptive names that match domain/feature

### UI Component Files (shadcn/ui)

**Pattern:** kebab-case dengan `.tsx` extension

**Examples:**

- ✅ `button.tsx`
- ✅ `dialog.tsx`
- ✅ `card.tsx`

**Rules:**

- UI primitives use kebab-case (shadcn/ui convention)
- Located in `src/components/ui/`

---

## Component Naming

### React Components

**Pattern:** PascalCase

**Examples:**

```typescript
// ✅ Good
export default function AboutSection() {}
export function DigitalCard() {}
export default function Hero() {}

// ❌ Bad
export default function aboutSection() {}
export function digitalCard() {}
```

**Rules:**

- Component names use PascalCase
- Descriptive names that indicate purpose
- Default export untuk page components
- Named export untuk reusable components

---

## Variable Naming

### Functions

**Pattern:** camelCase

**Examples:**

```typescript
// ✅ Good
export function buildVCard() {}
export function buildWebsite() {}
export function cn() {}

// ❌ Bad
export function BuildVCard() {}
export function build_vcard() {}
```

**Rules:**

- Functions use camelCase
- Descriptive, verb-based names
- Short names untuk common utilities (e.g., `cn`)

### Constants

**Pattern:** Context-dependent

**Exported Constants:**

- **Pattern:** UPPER_SNAKE_CASE (recommended) atau camelCase
- **Examples:**

  ```typescript
  // ✅ Good - UPPER_SNAKE_CASE
  export const SITE_CONFIG = {}

  // ✅ Good - camelCase (if preferred)
  export const siteConfig = {}
  ```

**Local Constants:**

- **Pattern:** camelCase atau UPPER_SNAKE_CASE
- **Examples:**

  ```typescript
  // ✅ Good - UPPER_SNAKE_CASE untuk arrays/objects
  const HEADLINE = `...`
  const BADGES: string[] = [...]
  const TECH_STACK: StackGroup[] = [...]

  // ✅ Good - camelCase untuk simple values
  const maxVisible = 4
  const isExpanded = false
  ```

**Rules:**

- Exported constants: UPPER_SNAKE_CASE (preferred) atau camelCase
- Local constants: UPPER_SNAKE_CASE untuk arrays/objects, camelCase untuk simple values
- Be consistent within same file

### Variables

**Pattern:** camelCase

**Examples:**

```typescript
// ✅ Good
const userName = 'John'
const isActive = true
const userCount = 10

// ❌ Bad
const user_name = 'John'
const IsActive = true
```

**Rules:**

- Variables use camelCase
- Descriptive names
- Boolean variables use `is`, `has`, `should` prefix

---

## Type Naming

### Interfaces

**Pattern:** PascalCase dengan descriptive names

**Examples:**

```typescript
// ✅ Good
export interface DigitalCardData {}
export interface DigitalCardProps {}
export interface SectionProps {}

// ❌ Bad
export interface digitalCardData {}
export interface DigitalCard {} // Too generic
```

**Rules:**

- Interfaces use PascalCase
- Descriptive names that indicate purpose
- Use `Props` suffix untuk component props
- Use `Data` suffix untuk data structures

### Types

**Pattern:** PascalCase

**Examples:**

```typescript
// ✅ Good
export type QRMode = 'vcard' | 'url'
export type Project = {}
export type StackGroup = {}

// ❌ Bad
export type qrMode = 'vcard' | 'url'
export type project = {}
```

**Rules:**

- Types use PascalCase
- Descriptive names
- Union types use descriptive names

---

## Summary Table

| Category           | Pattern                      | Example                 |
| ------------------ | ---------------------------- | ----------------------- |
| Component Files    | PascalCase                   | `about.tsx`             |
| Utility Files      | camelCase                    | `siteHelpers.ts`        |
| Config Files       | camelCase                    | `site.ts`               |
| Type Files         | kebab-case                   | `digital-card.d.ts`     |
| UI Components      | kebab-case                   | `button.tsx`            |
| React Components   | PascalCase                   | `AboutSection`          |
| Functions          | camelCase                    | `buildVCard`            |
| Exported Constants | UPPER_SNAKE_CASE             | `SITE_CONFIG`           |
| Local Constants    | UPPER_SNAKE_CASE / camelCase | `BADGES` / `maxVisible` |
| Variables          | camelCase                    | `userName`              |
| Interfaces         | PascalCase                   | `DigitalCardData`       |
| Types              | PascalCase                   | `QRMode`                |

---

## Migration Notes

**Completed (2025-01-27):**

- ✅ Renamed `site-helpers.ts` → `siteHelpers.ts`
- ✅ Standardized utility file naming to camelCase

**Future Considerations:**

- Constants naming standardization (if needed)
- Review component file naming consistency

---

**Related:** [Import Patterns](./import-patterns.md) | [Type Definitions](./type-definitions.md) | [TypeScript Patterns](./typescript-patterns.md)
