# Component Patterns

**Last Updated:** 2025-01-27  
**Status:** Active Standard

---

## Overview

Component patterns untuk z-card project memastikan consistent, maintainable, dan performant React components.

---

## Server vs Client Components

### Server Components (Default)

**When to Use:**

- Static content
- Data fetching
- No interactivity needed
- Better performance

**Pattern:**

```typescript
// ✅ Good - Server Component (no directive)
import Section from '@/components/section'
import { site } from '@/config/site'

export default function AboutSection() {
  return (
    <Section id='about'>
      <h1>{site.name.first}</h1>
    </Section>
  )
}
```

**Rules:**

- No `'use client'` directive
- Can use async/await
- Cannot use React hooks
- Cannot use browser APIs
- Better for SEO dan performance

### Client Components

**When to Use:**

- Need React hooks (useState, useEffect, etc.)
- Need browser APIs
- Need interactivity
- Need event handlers

**Pattern:**

```typescript
// ✅ Good - Client Component (explicit directive)
'use client'

import { useState } from 'react'
import Section from '@/components/section'

export default function ContactForm() {
  const [name, setName] = useState('')

  return (
    <Section id='contact'>
      <input value={name} onChange={e => setName(e.target.value)} />
    </Section>
  )
}
```

**Rules:**

- Must have `'use client'` directive at top
- Can use React hooks
- Can use browser APIs
- Use only when needed (performance consideration)

---

## Component Organization

### Shared Components

**Location:** `src/components/`

**Pattern:**

- Reusable across multiple routes
- Generic, composable components
- Examples: `navbar.tsx`, `footer.tsx`, `section.tsx`

**Example:**

```typescript
// src/components/section.tsx
import * as React from 'react'

type SectionProps = {
  id: string
  children: React.ReactNode
  className?: string
  full?: boolean
}

export default function Section({ id, children, className = '', full = false }: SectionProps) {
  return (
    <section id={id} className={className}>
      {children}
    </section>
  )
}
```

### Route-Specific Components

**Location:** `src/app/(route)/_components/`

**Pattern:**

- Used only in specific route
- Co-located dengan route
- Examples: `about.tsx`, `contact.tsx`, `hero.tsx`

**Example:**

```typescript
// src/app/(site)/_components/about.tsx
'use client'

import Section from '@/components/section'

export default function AboutSection() {
  return (
    <Section id='about'>
      <h1>About</h1>
    </Section>
  )
}
```

### UI Primitives

**Location:** `src/components/ui/`

**Pattern:**

- Low-level, reusable primitives
- Follow shadcn/ui pattern
- Examples: `button.tsx`, `dialog.tsx`, `card.tsx`

**Example:**

```typescript
// src/components/ui/button.tsx
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

// ... component implementation
```

---

## Component Patterns

### Default Export untuk Page Components

**Pattern:**

```typescript
// ✅ Good
export default function HomePage() {
  return <div>Home</div>
}
```

### Named Export untuk Reusable Components

**Pattern:**

```typescript
// ✅ Good
export function DigitalCard() {
  return <div>Card</div>
}
```

### Props Interface

**Pattern:**

```typescript
// ✅ Good - Props interface
interface ComponentProps {
  title: string
  description?: string
}

export default function Component({ title, description }: ComponentProps) {
  return <div>{title}</div>
}
```

**Rules:**

- Use `Props` suffix untuk component props
- Use optional properties (`?`) untuk optional props
- Document complex props

---

## Import Patterns dalam Components

**See:** [Import Patterns](./import-patterns.md) untuk detailed rules

**Summary:**

```typescript
// ✅ Good - Correct import order
'use client'

import * as React from 'react'
import Link from 'next/link'
import { Send } from 'lucide-react'

import Section from '@/components/section'
import { Button } from '@/components/ui/button'
import { site } from '@/config/site'
import type { ComponentProps } from '@/types'
```

---

## State Management

### Local State

**Pattern:** Use React hooks untuk local state

**Examples:**

```typescript
'use client'

import { useState } from 'react'

export default function Component() {
  const [count, setCount] = useState(0)
  // ...
}
```

### Form State

**Pattern:** Use React state untuk form handling

**Examples:**

```typescript
'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  // ...
}
```

---

## Best Practices

1. **Default to Server Components:** Use Client Components only when needed
2. **Clear Separation:** Separate shared vs route-specific components
3. **Composability:** Build complex components from simple primitives
4. **Type Safety:** Use TypeScript interfaces untuk props
5. **Documentation:** Add comments untuk complex components
6. **Performance:** Minimize Client Components untuk better performance

---

## Anti-Patterns

### Unnecessary Client Components

```typescript
// ❌ Bad - Unnecessary 'use client'
'use client'

import Link from 'next/link'

export default function Navbar() {
  return (
    <nav>
      <Link href='/'>Home</Link>
    </nav>
  )
}
```

**Fix:** Remove `'use client'` if no hooks/interactivity needed

### Mixed Import Styles

```typescript
// ❌ Bad - Mixed import styles
import Section from '@/components/section'
import { Button } from '../ui/button'
```

**Fix:** Use consistent path aliases

---

## Migration Status

**Completed (2025-01-27):**

- ✅ Component patterns documented
- ✅ Server vs Client Component guidelines established
- ✅ Component organization rules defined

**Future Considerations:**

- Review components untuk unnecessary Client Component usage
- Optimize component structure

---

**Related:** [Code Structure](./code-structure.md) | [Import Patterns](./import-patterns.md) | [TypeScript Patterns](./typescript-patterns.md)
