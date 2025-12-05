# Import Patterns

**Last Updated:** 2025-01-27  
**Status:** Active Standard

---

## Overview

Import patterns untuk z-card project memastikan konsistensi, readability, dan memudahkan refactoring.

---

## Core Rules

### 1. Always Use Path Aliases

**Rule:** Always use `@/` path aliases, never relative imports

**Path Alias Configuration:**

```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**Examples:**

```typescript
// ✅ Good - Path aliases
import Section from '@/components/section'
import { Button } from '@/components/ui/button'
import { site } from '@/config/site'
import { buildVCard } from '@/lib/siteHelpers'
import type { DigitalCardData } from '@/types'

// ❌ Bad - Relative imports
import Section from '../../components/section'
import { Button } from '../ui/button'
import HomePage from './(site)/page'
```

**Benefits:**

- Consistent imports across codebase
- Easy refactoring (move files without breaking imports)
- Clear indication of import source
- Better IDE support

---

## Import Order

**Rule:** Follow ESLint `simple-import-sort` plugin rules

**Order:**

1. External packages (React, Next.js, third-party)
2. Path alias imports (`@/`)
3. Relative imports (only if absolutely necessary)

**Examples:**

```typescript
// ✅ Good - Correct order
import * as React from 'react'
import Link from 'next/link'
import { Send } from 'lucide-react'

import Section from '@/components/section'
import { Button } from '@/components/ui/button'
import { site } from '@/config/site'
import type { DigitalCardData } from '@/types'

// ❌ Bad - Wrong order
import Section from '@/components/section'
import * as React from 'react'
import { Button } from '@/components/ui/button'
```

**ESLint Configuration:**

```javascript
// eslint.config.mjs
'simple-import-sort/imports': [
  'error',
  {
    groups: [
      ['^react', '^next', '^@?\\w'],        // External packages
      ['^\\u0000'],                          // Side effects
      ['^@/'],                               // Path aliases
      ['^\\.\\.(?!/?$)', '^\\.\\./?$'],     // Parent directories
      ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'], // Same directory
      ['^.+\\.s?css$'],                      // CSS imports
    ],
  },
],
```

---

## Import Types

### Default Imports

**Pattern:** Use untuk single exports

**Examples:**

```typescript
// ✅ Good
import Section from '@/components/section'
import HomePage from '@/app/(site)/page'
import Navbar from '@/components/navbar'
```

### Named Imports

**Pattern:** Use untuk multiple exports atau specific exports

**Examples:**

```typescript
// ✅ Good
import { Button } from '@/components/ui/button'
import { site } from '@/config/site'
import { buildVCard, buildWebsite } from '@/lib/siteHelpers'
import type { DigitalCardData, DigitalCardProps } from '@/types'
```

### Type Imports

**Pattern:** Use `import type` untuk type-only imports

**Examples:**

```typescript
// ✅ Good - Type-only import
import type { DigitalCardData } from '@/types'
import type { ComponentType } from 'react'

// ✅ Good - Mixed import
import { Button } from '@/components/ui/button'
import type { ButtonProps } from '@/components/ui/button'
```

**Benefits:**

- Type-only imports are removed at compile time
- Clear indication of type vs value imports
- Better tree-shaking

### Namespace Imports

**Pattern:** Use untuk libraries dengan many exports

**Examples:**

```typescript
// ✅ Good
import * as React from 'react'
import { useState, useEffect } from 'react' // Also acceptable
```

---

## Path Alias Usage

### Components

```typescript
// ✅ Good
import Section from '@/components/section'
import { Button } from '@/components/ui/button'
import Navbar from '@/components/navbar'
```

### Utilities

```typescript
// ✅ Good
import { cn } from '@/lib/utils'
import { buildVCard } from '@/lib/siteHelpers'
```

### Configuration

```typescript
// ✅ Good
import { site } from '@/config/site'
```

### Types

```typescript
// ✅ Good - Use centralized type exports
import type { DigitalCardData, DigitalCardProps } from '@/types'

// ❌ Bad - Direct file import (still works, but not preferred)
import type { DigitalCardData } from '@/types/digital-card'
```

### App Router

```typescript
// ✅ Good
import HomePage from '@/app/(site)/page'
import About from '@/app/(site)/_components/about'
```

---

## Forbidden Patterns

### Relative Imports

**Rule:** Never use relative imports (`./`, `../`)

```typescript
// ❌ Forbidden
import Section from '../../components/section'
import { Button } from '../ui/button'
import HomePage from './(site)/page'
```

**Exception:** Only allowed dalam type definition files untuk internal re-exports:

```typescript
// ✅ Allowed - Internal re-export dalam types/index.ts
export type { DigitalCardData } from './digital-card'
```

### Mixed Import Styles

**Rule:** Don't mix relative dan path alias imports

```typescript
// ❌ Bad - Mixed styles
import Section from '@/components/section'
import { Button } from '../ui/button' // Inconsistent
```

---

## ESLint Enforcement

**Configuration:**

- `simple-import-sort/imports` - Enforces import order
- `simple-import-sort/exports` - Enforces export order
- Manual review untuk path alias usage

**Verification:**

```bash
# Check import patterns
pnpm lint

# Auto-fix import order
pnpm lint:fix
```

---

## Migration Status

**Completed (2025-01-27):**

- ✅ All relative imports replaced dengan path aliases
- ✅ Import order standardized
- ✅ Type imports use centralized `@/types` exports

**Files Updated:**

- `src/app/page.tsx`
- `src/app/(site)/page.tsx`
- `src/components/digital-card.tsx`
- `src/lib/siteHelpers.ts`

---

## Best Practices

1. **Always use path aliases** - Never use relative imports
2. **Follow import order** - External → Path aliases → Relative (if needed)
3. **Use type imports** - `import type` untuk type-only imports
4. **Centralized type exports** - Use `@/types` instead of direct file imports
5. **Group related imports** - Keep related imports together
6. **Remove unused imports** - ESLint will catch these automatically

---

## Examples

### Complete Import Example

```typescript
// External packages
import * as React from 'react'
import Link from 'next/link'
import { Send } from 'lucide-react'

// Path alias imports
import Section from '@/components/section'
import { Button } from '@/components/ui/button'
import { site } from '@/config/site'
import { buildVCard } from '@/lib/siteHelpers'
import type { DigitalCardData } from '@/types'

// Component code...
```

---

**Related:** [Naming Conventions](./naming-conventions.md) | [Type Definitions](./type-definitions.md) | [TypeScript Patterns](./typescript-patterns.md)
