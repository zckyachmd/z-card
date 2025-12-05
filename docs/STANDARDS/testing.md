# Testing Standards - z-card

**Last Updated:** 2025-01-27  
**Status:** Active Standard  
**Project:** z-card

---

## Overview

Testing standards untuk z-card project menggunakan Vitest untuk unit testing dan React Testing Library untuk component testing. Standards ini memastikan consistent testing practices dan maintainable test code.

---

## Testing Framework

### Vitest

**Version:** 4.0.15  
**Configuration:** `vitest.config.ts`

**Key Features:**

- Fast execution (Vite-powered)
- Jest-compatible API
- Built-in coverage reporting
- ESM support (Next.js 15)
- TypeScript support

### React Testing Library

**Purpose:** Component testing dengan focus on user behavior

**Key Principles:**

- Test behavior, not implementation
- Query by accessible roles
- User-centric testing

---

## Test Structure

### Directory Organization

```
tests/
├── setup/
│   ├── vitest.setup.ts      # Global test setup
│   ├── test-utils.tsx       # React Testing Library utilities
│   └── mocks/
│       └── next.tsx         # Next.js module mocks
├── unit/
│   ├── lib/                 # Unit tests untuk utilities
│   └── components/          # Component tests (optional)
└── integration/             # Integration tests (future)
```

### File Naming

- **Unit tests:** `*.test.ts` atau `*.test.tsx`
- **Integration tests:** `*.integration.test.ts`
- **E2E tests:** `*.spec.ts` (Playwright convention)

---

## Test Utilities

### Custom Render Function

**Location:** `tests/setup/test-utils.tsx`

**Usage:**

```typescript
import { render, screen } from '@/tests/setup/test-utils'

test('my component', () => {
  render(<MyComponent />)
  expect(screen.getByText('Hello')).toBeInTheDocument()
})
```

**Benefits:**

- **ThemeProvider automatically included** - No need to wrap components manually
- Centralized providers untuk consistent test setup
- Easy to extend dengan additional providers
- Next.js mocks automatically loaded

**Note:** ThemeProvider dari `next-themes` is automatically included in custom render function dengan default theme "light" dan system theme disabled untuk test consistency.

### Next.js Mocks

**Location:** `tests/setup/mocks/next.tsx`

**Automatically Loaded:** Mocks are imported di `vitest.setup.ts` dan available untuk all tests.

**Mocks Included:**

1. **next/image** - Mocked sebagai regular `<img>` tag

   ```typescript
   import Image from 'next/image'
   // Works in tests without errors
   ```

2. **next/link** - Mocked sebagai regular `<a>` tag

   ```typescript
   import Link from 'next/link'
   // Works in tests without errors
   ```

3. **next/navigation** - All hooks mocked:
   - `useRouter()` - Returns mock router object
   - `usePathname()` - Returns '/'
   - `useSearchParams()` - Returns empty URLSearchParams
   - `useParams()` - Returns empty object

4. **CSS Imports** - All CSS file types mocked:
   - `*.css`, `*.scss`
   - `*.module.css`, `*.module.scss`

5. **Asset Imports** - All image formats mocked:
   - `*.svg`, `*.png`, `*.jpg`, `*.jpeg`, `*.gif`, `*.webp`

**Usage:** No action needed - mocks are automatically available untuk all tests.

---

## Coverage Requirements

**For detailed coverage standards, see [Test Coverage Standards](./test-coverage.md).**

### Thresholds

- **Minimum Overall:** 70%
  - Lines: 70%
  - Functions: 70%
  - Branches: 70%
  - Statements: 70%

- **Critical Paths:** 90%+ (utilities, lib functions, API routes)
- **UI Components:** 60%+ (focus on logic, not rendering)

### Coverage Commands

```bash
# Run tests dengan coverage
pnpm test:coverage

# Coverage report akan di-generate di:
# - coverage/ (HTML report)
# - coverage/lcov.info (LCOV format untuk CI/CD)
```

### Coverage Standards

**See [Test Coverage Standards](./test-coverage.md) for:**
- Detailed coverage requirements by file type
- File priority for testing
- Coverage checklist
- Current coverage status
- Testing roadmap

---

## Testing Best Practices

### Unit Tests

**Focus:**

- Utilities dan helper functions
- Business logic
- Pure functions

**Example:**

```typescript
import { describe, it, expect } from 'vitest'
import { cn } from '@/lib/utils'

describe('cn utility', () => {
  it('should merge class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })
})
```

### Component Tests

**Focus:**

- User interactions
- Component behavior
- Accessibility

**Example:**

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@/tests/setup/test-utils'
import { Button } from '@/components/ui/button'

describe('Button component', () => {
  it('should render button text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })
})
```

### Test Organization

**Structure:**

- One test file per source file
- Mirror source structure di `tests/unit/`
- Group related tests dengan `describe` blocks

**Pattern:**

```typescript
describe('ComponentName', () => {
  describe('when condition', () => {
    it('should behavior', () => {
      // test
    })
  })
})
```

---

## Test Scripts

### Available Scripts

```json
{
  "test": "vitest run", // Run tests once
  "test:watch": "vitest", // Watch mode
  "test:coverage": "vitest run --coverage", // Coverage report
  "test:ui": "vitest --ui" // UI mode (optional)
}
```

### Usage

```bash
# Run all tests
pnpm test

# Watch mode (development)
pnpm test:watch

# Coverage report
pnpm test:coverage

# UI mode (interactive)
pnpm test:ui
```

---

## Common Patterns

### Testing Utilities

```typescript
// Pure function testing
import { describe, it, expect } from 'vitest'
import { myFunction } from '@/lib/my-utils'

describe('myFunction', () => {
  it('should handle case 1', () => {
    expect(myFunction(input)).toBe(expected)
  })
})
```

### Testing Components

```typescript
// Component testing
import { render, screen } from '@/tests/setup/test-utils'
import userEvent from '@testing-library/user-event'

test('user interaction', async () => {
  const user = userEvent.setup()
  render(<MyComponent />)

  await user.click(screen.getByRole('button'))
  expect(screen.getByText('Result')).toBeInTheDocument()
})
```

### Mocking

**Next.js Mocks (Automatic):**

Next.js modules are automatically mocked di `tests/setup/mocks/next.tsx`:

- `next/image` - Mocked sebagai regular `<img>` tag
- `next/link` - Mocked sebagai regular `<a>` tag
- `next/navigation` - Mocked hooks (useRouter, usePathname, etc.)
- CSS imports - Mocked (no-op)
- Asset imports (images, fonts) - Mocked

**Custom Mocks:**

```typescript
// Mock external dependencies
import { vi } from 'vitest'

vi.mock('@/lib/api', () => ({
  fetchData: vi.fn(() => Promise.resolve({ data: 'test' })),
}))
```

---

## Test Writing Best Practices

### Test Structure (AAA Pattern)

Follow the **Arrange-Act-Assert** pattern:

```typescript
import { describe, it, expect } from 'vitest'
import { myFunction } from '@/lib/my-utils'

describe('myFunction', () => {
  it('should return expected result for valid input', () => {
    // Arrange: Set up test data
    const input = { value: 42 }
    const expected = { result: 84 }

    // Act: Execute function
    const result = myFunction(input)

    // Assert: Verify result
    expect(result).toEqual(expected)
  })
})
```

### Test Naming Conventions

**Format:** `should <expected behavior> when <condition>`

```typescript
// ✅ Good
it('should return error when input is invalid', () => {})
it('should format date correctly for different locales', () => {})
it('should handle empty array gracefully', () => {})

// ❌ Bad
it('test function', () => {})
it('works', () => {})
it('test case 1', () => {})
```

### Test Organization

**Group Related Tests:**

```typescript
describe('UserService', () => {
  describe('createUser', () => {
    it('should create user with valid data', () => {})
    it('should throw error when email is invalid', () => {})
    it('should hash password before saving', () => {})
  })

  describe('getUser', () => {
    it('should return user when found', () => {})
    it('should return null when not found', () => {})
  })
})
```

### Testing Best Practices

**1. Test Behavior, Not Implementation:**

```typescript
// ✅ Good: Test what user sees
expect(screen.getByText('Welcome')).toBeInTheDocument()

// ❌ Bad: Test implementation details
expect(component.state.isVisible).toBe(true)
```

**2. Use Descriptive Test Names:**

```typescript
// ✅ Good
it('should display error message when form submission fails', () => {})

// ❌ Bad
it('test form', () => {})
```

**3. One Assertion Per Test (when possible):**

```typescript
// ✅ Good: Clear what's being tested
it('should return formatted date', () => {
  expect(formatDate(date)).toBe('2025-01-27')
})

// ⚠️ Acceptable: Related assertions
it('should validate email format', () => {
  expect(isValidEmail('test@example.com')).toBe(true)
  expect(isValidEmail('invalid')).toBe(false)
})
```

**4. Use Appropriate Matchers:**

```typescript
// ✅ Good: Specific matchers
expect(result).toBeDefined()
expect(array).toHaveLength(3)
expect(obj).toHaveProperty('name')

// ❌ Bad: Generic matchers
expect(result).toBeTruthy() // Too vague
```

**5. Clean Up After Tests:**

```typescript
// Vitest automatically cleans up via vitest.setup.ts
// But for manual cleanup:
afterEach(() => {
  cleanup() // Already in setup
  // Additional cleanup if needed
})
```

### Mocking Best Practices

**1. Mock External Dependencies:**

```typescript
import { vi } from 'vitest'

// Mock API calls
vi.mock('@/lib/api', () => ({
  fetchData: vi.fn(() => Promise.resolve({ data: 'test' })),
}))
```

**2. Reset Mocks Between Tests:**

```typescript
beforeEach(() => {
  vi.clearAllMocks()
})
```

**3. Use Real Implementations When Possible:**

```typescript
// ✅ Good: Test real utility function
import { formatDate } from '@/lib/utils'

// ❌ Bad: Mock simple utility
vi.mock('@/lib/utils', () => ({
  formatDate: vi.fn(() => 'mocked'),
}))
```

**4. Mock at Module Level:**

```typescript
// ✅ Good: Mock at top level
vi.mock('next/navigation')

// ❌ Bad: Mock inside test
test('my test', () => {
  vi.mock('next/navigation') // Too late
})
```

### Common Patterns

**Testing Async Code:**

```typescript
it('should handle async operation', async () => {
  const result = await asyncFunction()
  expect(result).toBeDefined()
})
```

**Testing Error Cases:**

```typescript
it('should throw error for invalid input', () => {
  expect(() => myFunction(null)).toThrow('Invalid input')
})
```

**Testing Component Interactions:**

```typescript
import { render, screen } from '@/tests/setup/test-utils'
import userEvent from '@testing-library/user-event'

it('should handle user interaction', async () => {
  const user = userEvent.setup()
  render(<MyComponent />)

  await user.click(screen.getByRole('button'))
  expect(screen.getByText('Result')).toBeInTheDocument()
})
```

### Common Pitfalls

**1. Testing Implementation Details:**

```typescript
// ❌ Bad: Testing internal state
expect(component.state.count).toBe(1)

// ✅ Good: Testing user-visible behavior
expect(screen.getByText('Count: 1')).toBeInTheDocument()
```

**2. Over-Mocking:**

```typescript
// ❌ Bad: Mocking everything
vi.mock('@/lib/utils')
vi.mock('@/lib/helpers')
vi.mock('@/lib/constants')

// ✅ Good: Mock only external dependencies
vi.mock('@/lib/api') // External API
```

**3. Brittle Tests:**

```typescript
// ❌ Bad: Testing exact HTML structure
expect(container.innerHTML).toBe('<div><span>Text</span></div>')

// ✅ Good: Testing behavior
expect(screen.getByText('Text')).toBeInTheDocument()
```

**4. Not Testing Edge Cases:**

```typescript
// ❌ Bad: Only testing happy path
it('should work with valid input', () => {})

// ✅ Good: Testing various cases
it('should work with valid input', () => {})
it('should handle null input', () => {})
it('should handle empty string', () => {})
it('should handle very long input', () => {})
```

**5. Unclear Test Intent:**

```typescript
// ❌ Bad: Unclear what's being tested
it('test', () => {
  const result = doSomething()
  expect(result).toBeTruthy()
})

// ✅ Good: Clear intent
it('should return formatted date for valid input', () => {
  const result = formatDate(new Date('2025-01-27'))
  expect(result).toBe('2025-01-27')
})
```

---

## Testing Philosophy

### What to Test

✅ **Do Test:**

- Business logic
- Utility functions
- Critical user flows
- API routes (when implemented)
- Complex component interactions

❌ **Don't Test:**

- Implementation details
- Third-party library internals
- Simple prop passing
- Styling (use visual regression if needed)

### Test Quality

- **Fast:** Tests should run quickly (< 1s total untuk unit tests)
- **Isolated:** Tests should not depend on each other
- **Deterministic:** Tests should produce same results every time
- **Readable:** Test names should clearly describe what is being tested

---

## E2E Testing

### Playwright

**Version:** Latest  
**Configuration:** `playwright.config.ts`

**Key Features:**

- Browser support (Chromium configured, Firefox/WebKit available)
- Fast execution
- Great debugging tools
- Automatic screenshots on failure
- Trace viewer untuk debugging

### E2E Test Structure

**Location:** `tests/e2e/`

**File Naming:** `*.spec.ts` (Playwright convention)

**Test Organization:**

- One file per critical user flow
- `contact-form.spec.ts` - Contact form E2E tests
- `navigation.spec.ts` - Navigation E2E tests

### E2E Test Scripts

```bash
# Run all E2E tests
pnpm test:e2e

# Run E2E tests with UI (interactive)
pnpm test:e2e:ui

# Run E2E tests in debug mode
pnpm test:e2e:debug

# Run E2E tests in headed mode (see browser)
pnpm test:e2e:headed
```

### E2E Testing Best Practices

**1. Test Critical User Flows Only:**

```typescript
// ✅ Good: Test critical flows
test('should submit contact form', async ({ page }) => {
  await page.goto('/')
  await page.getByLabel('Name').fill('Test User')
  await page.getByLabel('Email').fill('test@example.com')
  await page.getByLabel('Message').fill('Test message')
  await page.getByRole('button', { name: /Send/i }).click()
  // Verify submission
})

// ❌ Bad: Test every small interaction
test('should change input border color on focus', async ({ page }) => {
  // Too granular for E2E
})
```

**2. Use Semantic Selectors:**

```typescript
// ✅ Good: Use role-based selectors
await page.getByRole('button', { name: /Send/i }).click()
await page.getByLabel('Email').fill('test@example.com')

// ❌ Bad: Use CSS selectors
await page.locator('.submit-button').click()
await page.locator('#email-input').fill('test@example.com')
```

**3. Wait for Elements Properly:**

```typescript
// ✅ Good: Use Playwright's auto-waiting
await expect(page.getByRole('heading', { name: 'Contact' })).toBeVisible()

// ❌ Bad: Use arbitrary timeouts
await page.waitForTimeout(2000)
```

**4. Test User Behavior, Not Implementation:**

```typescript
// ✅ Good: Test what user sees
await expect(page.getByText('Message sent')).toBeVisible()

// ❌ Bad: Test implementation details
await expect(page.locator('[data-testid="success-message"]')).toBeVisible()
```

**5. Clean Up Between Tests:**

```typescript
test.beforeEach(async ({ page }) => {
  // Reset state before each test
  await page.goto('/')
})
```

### E2E Test Examples

**Contact Form Test:**

```typescript
import { test, expect } from '@playwright/test'

test.describe('Contact Form', () => {
  test('should submit contact form', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: /Contact/i }).click()

    await page.getByLabel('Name').fill('Test User')
    await page.getByLabel('Email').fill('test@example.com')
    await page.getByLabel('Message').fill('Test message')

    await page.getByRole('button', { name: /Send/i }).click()

    // Verify form submission
    await expect(page.getByRole('button', { name: /Preparing/i })).toBeVisible()
  })
})
```

**Navigation Test:**

```typescript
import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('should navigate to sections', async ({ page }) => {
    await page.goto('/')

    // Navigate to About
    await page.getByRole('link', { name: /About/i }).click()
    await page.waitForURL(/#about$/)
    await expect(page.locator('#about')).toBeVisible()

    // Navigate to Projects
    await page.getByRole('link', { name: /Projects/i }).click()
    await page.waitForURL(/#projects$/)
    await expect(page.locator('#projects')).toBeVisible()
  })
})
```

### When to Use E2E Tests

**✅ Use E2E Tests For:**

- Critical user flows (contact form, checkout, signup)
- Navigation between pages
- Multi-step workflows
- Integration between components

**❌ Don't Use E2E Tests For:**

- Unit-level functionality (use unit tests)
- Component rendering (use component tests)
- Simple interactions (use component tests)
- Fast feedback loops (E2E tests are slower)

### E2E Test Coverage

**Current Coverage:**

- ✅ Contact form submission flow
- ✅ Navigation between sections
- ✅ Form validation

**Future Coverage (when features added):**

- API route testing (when Epic 5 implemented)
- Authentication flows (if added)
- Multi-page workflows

### Debugging E2E Tests

**1. Use Playwright UI Mode:**

```bash
pnpm test:e2e:ui
```

**2. Use Debug Mode:**

```bash
pnpm test:e2e:debug
```

**3. View Screenshots:**

- Screenshots automatically saved on failure
- Location: `test-results/`

**4. View Traces:**

- Traces saved on retry
- Use Playwright trace viewer: `npx playwright show-trace trace.zip`

### E2E Test Configuration

**Base URL:** `http://localhost:3000` (Next.js dev server)

**Browsers:** Chromium only (configured untuk faster test execution)

**Test Timeout:** 30 seconds (default)

**Retry:** 2 retries on failure (CI only)

**Web Server:** Automatically starts `pnpm dev` before tests

**Note:** Only Chromium is configured untuk faster test execution. Firefox dan WebKit can be added if cross-browser testing is needed.

---

## Future Enhancements

### Integration Testing

- API route testing
- Component integration
- Data flow testing

---

## Related Documentation

- [Architecture](../ARCHITECTURE.md) - Project architecture
- [Coding Standards](../CODING_STANDARDS.md) - Overall standards
- [Component Patterns](./component-patterns.md) - Component patterns

---

**Last Updated:** 2025-01-27  
**Status:** Active Standard
