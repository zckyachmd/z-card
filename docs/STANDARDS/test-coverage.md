# Test Coverage Standards - z-card

**Last Updated:** 2025-01-27  
**Status:** Active Standard  
**Project:** z-card

---

## Overview

Test coverage standards untuk z-card project memastikan bahwa code quality is maintained dan critical functionality is properly tested. Standards ini define minimum coverage thresholds, file priorities, dan testing requirements untuk different types of code.

---

## Coverage Thresholds

### Overall Minimum Thresholds

**Configuration:** `vitest.config.ts`

```typescript
thresholds: {
  lines: 70,      // Minimum 70% line coverage
  functions: 70,  // Minimum 70% function coverage
  branches: 70,   // Minimum 70% branch coverage
  statements: 70, // Minimum 70% statement coverage
}
```

**Enforcement:**
- Tests will fail jika thresholds tidak met
- CI/CD should enforce these thresholds
- Pre-commit hooks can optionally check coverage

### Category-Specific Thresholds

**1. Critical Paths (90%+ Required):**
- ✅ **Utilities** (`src/lib/*.ts`) - Business logic, helper functions
- ✅ **API Routes** (`src/app/api/**/route.ts`) - Backend endpoints
- ✅ **Validation** (`src/lib/validation.ts`) - Input validation schemas
- ✅ **Security Functions** (`src/lib/rate-limit.ts`, `src/lib/robot-validation.ts`) - Security-critical code
- ✅ **Email Service** (`src/lib/email.ts`) - Email functionality

**2. UI Components (60%+ Required):**
- ⚠️ **React Components** (`src/components/**/*.tsx`) - Focus on logic, not rendering
- ⚠️ **Page Components** (`src/app/**/*.tsx`) - Focus on critical interactions

**3. Configuration & Types (Excluded):**
- ❌ **Type Definitions** (`src/types/**/*.d.ts`) - Excluded from coverage
- ❌ **Config Files** (`*.config.{ts,js,mjs}`) - Excluded from coverage
- ❌ **Test Files** (`tests/**`) - Excluded from coverage

---

## Coverage Measurement

### Metrics Explained

**Lines Coverage:**
- Percentage of executable lines that were executed
- **Target:** 70% minimum, 90%+ untuk critical paths

**Functions Coverage:**
- Percentage of functions that were called
- **Target:** 70% minimum, 90%+ untuk critical paths

**Branches Coverage:**
- Percentage of conditional branches (if/else, switch, ternary) that were executed
- **Target:** 70% minimum, 90%+ untuk critical paths

**Statements Coverage:**
- Percentage of statements that were executed
- **Target:** 70% minimum, 90%+ untuk critical paths

### Running Coverage

```bash
# Run tests dengan coverage report
pnpm test:coverage

# Coverage reports generated:
# - Terminal output (text format)
# - coverage/index.html (HTML report - open in browser)
# - coverage/lcov.info (LCOV format untuk CI/CD)
```

### Viewing Coverage Report

**HTML Report:**
```bash
# After running pnpm test:coverage
open coverage/index.html
```

**Terminal Report:**
- Shows summary dalam terminal
- Lists uncovered lines untuk each file
- Shows percentage untuk each metric

---

## File Priority for Testing

### Priority 1: Critical (90%+ Coverage Required)

**Must Have Tests:**

1. **`src/lib/validation.ts`** ⚠️ **NOT TESTED**
   - **Priority:** CRITICAL
   - **Reason:** Input validation is security-critical
   - **Required Tests:**
     - Valid input scenarios
     - Invalid input scenarios
     - Edge cases (empty strings, max length, special characters)
     - Type validation (string, number, email format)

2. **`src/lib/rate-limit.ts`** ⚠️ **NOT TESTED**
   - **Priority:** CRITICAL
   - **Reason:** Security feature untuk prevent spam
   - **Required Tests:**
     - Rate limit enforcement
     - IP tracking
     - Cleanup mechanism
     - Edge cases (unknown IP, reset time)

3. **`src/lib/robot-validation.ts`** ⚠️ **NOT TESTED**
   - **Priority:** CRITICAL
   - **Reason:** Security feature untuk prevent bots
   - **Required Tests:**
     - Honeypot detection
     - Submission timing validation
     - Edge cases (missing fields, boundary values)

4. **`src/lib/email.ts`** ⚠️ **NOT TESTED**
   - **Priority:** CRITICAL
   - **Reason:** Core email functionality
   - **Required Tests:**
     - Email sending success
     - Error handling (SMTP errors, network errors)
     - Environment variable validation
     - XSS prevention (escapeHtml function)
     - Email template formatting

5. **`src/app/api/contact/route.ts`** ⚠️ **NOT TESTED**
   - **Priority:** CRITICAL
   - **Reason:** API endpoint untuk contact form
   - **Required Tests:**
     - POST handler success
     - Validation errors (400)
     - Rate limiting (429)
     - Robot detection
     - Email sending errors (500)
     - Network errors
     - GET handler (405)

### Priority 2: Important (70%+ Coverage Required)

6. **`src/lib/utils.ts`** ✅ **TESTED (100%)**
   - **Status:** Complete
   - **Coverage:** 100%

7. **`src/lib/siteHelpers.ts`** ⚠️ **NOT TESTED**
   - **Priority:** MEDIUM
   - **Reason:** Helper functions, less critical
   - **Required Tests:**
     - Function return values
     - Edge cases

### Priority 3: Optional (60%+ Coverage)

8. **React Components** ⚠️ **NOT TESTED**
   - **Priority:** LOW
   - **Reason:** Focus on logic, not rendering
   - **Optional Tests:**
     - Complex component logic
     - User interactions
     - State management

---

## Coverage Checklist

### For New Features

**Before Merging:**

- [ ] Coverage meets minimum thresholds (70% overall)
- [ ] Critical paths have 90%+ coverage
- [ ] All exported functions are tested
- [ ] Error cases are tested
- [ ] Edge cases are tested
- [ ] Coverage report reviewed

### For Bug Fixes

**Before Merging:**

- [ ] Regression test added untuk bug
- [ ] Edge case test added jika applicable
- [ ] Coverage untuk fix area verified
- [ ] Existing tests still pass

### For Refactoring

**Before Merging:**

- [ ] Existing tests updated jika behavior changes
- [ ] All existing tests pass
- [ ] Coverage maintained atau improved
- [ ] New edge cases tested jika discovered

---

## Test Coverage Requirements by File Type

### Utility Functions (`src/lib/*.ts`)

**Required Coverage: 90%+**

**Test Requirements:**
- ✅ All exported functions tested
- ✅ All branches tested (if/else, switch, ternary)
- ✅ Error cases tested
- ✅ Edge cases tested (null, undefined, empty, max values)
- ✅ Type validation tested

**Example:**
```typescript
// src/lib/validation.ts
describe('validateContactForm', () => {
  it('should validate valid input', () => {})
  it('should reject invalid email', () => {})
  it('should reject name too short', () => {})
  it('should reject message too long', () => {})
  it('should handle missing fields', () => {})
})
```

### API Routes (`src/app/api/**/route.ts`)

**Required Coverage: 90%+**

**Test Requirements:**
- ✅ All HTTP methods tested (GET, POST, etc.)
- ✅ Success scenarios tested
- ✅ Error scenarios tested (400, 429, 500)
- ✅ Validation errors tested
- ✅ Rate limiting tested
- ✅ Security features tested (robot validation)

**Example:**
```typescript
// src/app/api/contact/route.ts
describe('POST /api/contact', () => {
  it('should send email dengan valid data', () => {})
  it('should return 400 untuk invalid data', () => {})
  it('should return 429 untuk rate limit exceeded', () => {})
  it('should return 500 untuk email error', () => {})
  it('should detect robots', () => {})
})
```

### React Components (`src/components/**/*.tsx`)

**Required Coverage: 60%+**

**Test Requirements:**
- ✅ Critical user interactions tested
- ✅ Complex logic tested
- ✅ State management tested
- ⚠️ Rendering details optional (focus on behavior)

**Example:**
```typescript
// src/components/ui/button.tsx
describe('Button component', () => {
  it('should call onClick when clicked', () => {})
  it('should be disabled when disabled prop is true', () => {})
  it('should render children correctly', () => {})
})
```

---

## Coverage Exclusions

### Automatically Excluded

**Configuration:** `vitest.config.ts`

```typescript
exclude: [
  'node_modules/',
  '.next/',
  'dist/',
  'build/',
  '**/*.d.ts',           // Type definitions
  '**/*.config.{ts,js,mjs}', // Config files
  '**/types/**',        // Type directories
  '**/__tests__/**',    // Test directories
  '**/tests/**',        // Test directories
]
```

### Rationale

**Type Definitions (`*.d.ts`):**
- No executable code
- Type-only definitions
- Don't need runtime testing

**Config Files:**
- Configuration, not logic
- Tested indirectly through usage
- Hard to test in isolation

**Test Files:**
- Self-explanatory
- Would skew coverage metrics

---

## Coverage Reporting

### Report Formats

**1. Terminal Output (Text):**
```bash
pnpm test:coverage
# Shows summary dalam terminal
```

**2. HTML Report:**
```bash
# Generated di coverage/index.html
# Open in browser untuk detailed view
open coverage/index.html
```

**3. LCOV Format:**
```bash
# Generated di coverage/lcov.info
# Used untuk CI/CD integration
# Compatible dengan coverage services (Codecov, Coveralls)
```

### Reading Coverage Reports

**HTML Report Features:**
- File-by-file coverage breakdown
- Line-by-line coverage highlighting
- Uncovered lines marked
- Branch coverage visualization
- Function coverage list

**Terminal Report:**
- Quick overview
- Percentage untuk each metric
- Uncovered line numbers
- Summary statistics

---

## Coverage Goals by Epic

### Epic 5: Minimal Email Backend

**Current Status:**
- ⚠️ **Low Coverage** - Most files not tested yet

**Required Tests:**

1. **`src/lib/validation.ts`** - 90%+ coverage
   - [ ] Valid input tests
   - [ ] Invalid input tests
   - [ ] Edge cases
   - [ ] Type validation

2. **`src/lib/email.ts`** - 90%+ coverage
   - [ ] Email sending success
   - [ ] Error handling
   - [ ] Environment variable validation
   - [ ] XSS prevention

3. **`src/lib/rate-limit.ts`** - 90%+ coverage
   - [ ] Rate limit enforcement
   - [ ] IP tracking
   - [ ] Cleanup mechanism

4. **`src/lib/robot-validation.ts`** - 90%+ coverage
   - [ ] Honeypot detection
   - [ ] Submission timing validation

5. **`src/app/api/contact/route.ts`** - 90%+ coverage
   - [ ] POST handler success
   - [ ] Error scenarios
   - [ ] Rate limiting
   - [ ] Robot detection

**Target:** 90%+ coverage untuk all Epic 5 files

---

## Coverage Improvement Strategy

### Step 1: Identify Gaps

```bash
# Run coverage report
pnpm test:coverage

# Review HTML report
open coverage/index.html

# Identify files dengan low coverage
# Focus on critical paths first
```

### Step 2: Prioritize Testing

**Priority Order:**
1. Critical paths (API routes, validation, security)
2. Utilities (helper functions)
3. Components (UI logic)

### Step 3: Write Tests

**For Each File:**
1. Create test file: `tests/unit/lib/[filename].test.ts`
2. Test all exported functions
3. Test error cases
4. Test edge cases
5. Verify coverage meets threshold

### Step 4: Verify Coverage

```bash
# Run coverage
pnpm test:coverage

# Check thresholds met
# Review uncovered lines
# Add tests untuk uncovered code
```

---

## Coverage Best Practices

### 1. Test Critical Paths First

**Focus on:**
- Security features (rate limiting, validation)
- Business logic (email sending, data processing)
- Error handling (all error paths)

### 2. Test Edge Cases

**Common Edge Cases:**
- Empty inputs (null, undefined, empty string)
- Maximum values (max length, max number)
- Invalid types (wrong type, malformed data)
- Boundary values (min, max, zero)

### 3. Test Error Scenarios

**Error Cases to Test:**
- Network errors
- Validation errors
- Authentication errors
- Rate limit errors
- Server errors

### 4. Maintain Coverage Over Time

**Regular Checks:**
- Run coverage sebelum merging PR
- Review coverage dalam code review
- Set coverage goals untuk each sprint
- Track coverage trends

### 5. Don't Chase 100% Coverage

**Reasonable Goals:**
- 70% overall minimum
- 90%+ untuk critical paths
- 60%+ untuk UI components
- Focus on meaningful tests, not just numbers

---

## Coverage Verification in CI/CD

### Pre-Commit (Optional)

```bash
# Add to .husky/pre-commit (optional)
pnpm test:coverage --thresholds.lines=70
```

### CI/CD Pipeline (Future)

```yaml
# Example GitHub Actions
- name: Run tests with coverage
  run: pnpm test:coverage

- name: Check coverage thresholds
  run: |
    pnpm test:coverage
    # Verify thresholds met
```

### Coverage Badges (Optional)

**Services:**
- Codecov
- Coveralls
- Code Climate

**Integration:**
- Add badge ke README
- Track coverage trends
- Set coverage goals

---

## Current Coverage Status

**Last Checked:** 2025-01-27

### Files Tested ✅

1. **`src/lib/utils.ts`** - 100% coverage ✅
   - **Status:** Complete
   - **Tests:** 27 tests
   - **Coverage:** 100% (lines, functions, branches, statements)

### Files Not Tested ⚠️

**Priority 1: Critical (90%+ Required)**

1. **`src/lib/validation.ts`** - 0% coverage ⚠️ **CRITICAL**
   - **Exports:** `contactFormSchema`, `validateContactForm`
   - **Priority:** HIGHEST
   - **Required Tests:** Valid/invalid inputs, edge cases, type validation

2. **`src/lib/email.ts`** - 0% coverage ⚠️ **CRITICAL**
   - **Exports:** `sendContactEmail`
   - **Priority:** HIGHEST
   - **Required Tests:** Email sending, error handling, XSS prevention

3. **`src/lib/rate-limit.ts`** - 0% coverage ⚠️ **CRITICAL**
   - **Exports:** `checkRateLimit`, `getClientIP`
   - **Priority:** HIGHEST
   - **Required Tests:** Rate limit enforcement, IP tracking, cleanup

4. **`src/lib/robot-validation.ts`** - 0% coverage ⚠️ **CRITICAL**
   - **Exports:** `validateRobot`
   - **Priority:** HIGHEST
   - **Required Tests:** Honeypot detection, timing validation

5. **`src/app/api/contact/route.ts`** - 0% coverage ⚠️ **CRITICAL**
   - **Exports:** `POST`, `GET` handlers
   - **Priority:** HIGHEST
   - **Required Tests:** All HTTP methods, error scenarios, security features

**Priority 2: Important (70%+ Required)**

6. **`src/lib/siteHelpers.ts`** - 0% coverage ⚠️ **MEDIUM**
   - **Exports:** Multiple helper functions
   - **Priority:** MEDIUM
   - **Required Tests:** Function return values, edge cases

### Overall Coverage

**Current:** ~14% (only utils.ts tested, 1 of 7 files)  
**Target:** 70% minimum overall  
**Critical Paths Target:** 90%+  
**Gap:** 56% below target

### Coverage Breakdown

| File | Priority | Status | Coverage | Tests Needed |
|------|----------|--------|----------|--------------|
| `utils.ts` | P2 | ✅ Tested | 100% | Complete |
| `validation.ts` | P1 | ⚠️ Not Tested | 0% | CRITICAL |
| `email.ts` | P1 | ⚠️ Not Tested | 0% | CRITICAL |
| `rate-limit.ts` | P1 | ⚠️ Not Tested | 0% | CRITICAL |
| `robot-validation.ts` | P1 | ⚠️ Not Tested | 0% | CRITICAL |
| `contact/route.ts` | P1 | ⚠️ Not Tested | 0% | CRITICAL |
| `siteHelpers.ts` | P2 | ⚠️ Not Tested | 0% | MEDIUM |

---

## Testing Roadmap

### Phase 1: Critical Paths (Priority 1)

**Goal:** 90%+ coverage untuk critical files

1. **`src/lib/validation.ts`** - Zod schema validation
2. **`src/lib/email.ts`** - Email service
3. **`src/lib/rate-limit.ts`** - Rate limiting
4. **`src/lib/robot-validation.ts`** - Robot detection
5. **`src/app/api/contact/route.ts`** - API route

### Phase 2: Important Utilities (Priority 2)

**Goal:** 70%+ coverage untuk utilities

6. **`src/lib/siteHelpers.ts`** - Helper functions

### Phase 3: Components (Priority 3)

**Goal:** 60%+ coverage untuk components dengan logic

7. **React Components** - Focus on critical interactions

---

## Coverage Checklist Template

### For Each New File

**Before Merging:**

- [ ] Test file created: `tests/unit/[path]/[filename].test.ts`
- [ ] All exported functions tested
- [ ] Error cases tested
- [ ] Edge cases tested
- [ ] Coverage meets threshold:
  - [ ] Critical path: 90%+
  - [ ] Utility: 70%+
  - [ ] Component: 60%+
- [ ] Coverage report reviewed
- [ ] Uncovered lines justified (if any)

### For Each PR

**Before Submitting:**

- [ ] Coverage report run: `pnpm test:coverage`
- [ ] Overall coverage meets 70% minimum
- [ ] Critical paths meet 90%+ requirement
- [ ] New code has tests
- [ ] Existing tests still pass
- [ ] Coverage not decreased (ideally increased)

---

## Common Coverage Issues

### Issue 1: Low Overall Coverage

**Problem:** Overall coverage below 70%

**Solution:**
1. Identify files dengan lowest coverage
2. Prioritize critical paths
3. Write tests untuk high-impact files first
4. Gradually increase coverage

### Issue 2: Critical Path Below 90%

**Problem:** Critical file below 90% coverage

**Solution:**
1. Review uncovered lines
2. Add tests untuk uncovered code
3. Test error cases
4. Test edge cases

### Issue 3: Hard-to-Test Code

**Problem:** Some code is difficult to test

**Solutions:**
1. Refactor untuk testability
2. Extract logic into testable functions
3. Use dependency injection
4. Mock external dependencies

### Issue 4: Coverage Decreasing

**Problem:** Coverage decreasing over time

**Solution:**
1. Enforce coverage checks dalam CI/CD
2. Require coverage untuk new code
3. Review coverage dalam code review
4. Set coverage goals untuk sprints

---

## Tools and Commands

### Coverage Commands

```bash
# Run tests dengan coverage
pnpm test:coverage

# Run tests dengan coverage (watch mode)
pnpm test:watch --coverage

# Run tests dengan coverage (UI mode)
pnpm test:ui --coverage
```

### Coverage Report Locations

- **HTML Report:** `coverage/index.html`
- **LCOV Report:** `coverage/lcov.info`
- **Terminal Output:** Console output

### Coverage Configuration

**File:** `vitest.config.ts`

```typescript
coverage: {
  provider: 'v8',
  reporter: ['text', 'html', 'lcov'],
  exclude: [
    'node_modules/',
    '.next/',
    'dist/',
    'build/',
    '**/*.d.ts',
    '**/*.config.{ts,js,mjs}',
    '**/types/**',
    '**/__tests__/**',
    '**/tests/**',
  ],
  thresholds: {
    lines: 70,
    functions: 70,
    branches: 70,
    statements: 70,
  },
}
```

---

## Related Documentation

- [Testing Standards](./testing.md) - General testing guidelines
- [Code Review Guidelines](../CODE_REVIEW.md) - Coverage requirements dalam reviews
- [Contributing Guide](../../CONTRIBUTING.md) - Testing requirements untuk contributors

---

**Last Updated:** 2025-01-27  
**Status:** Active Standard
