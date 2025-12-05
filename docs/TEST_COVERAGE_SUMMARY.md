# Test Coverage Summary - z-card

**Last Updated:** 2025-01-27  
**Status:** Active  
**Project:** z-card

---

## Quick Status

**Current Overall Coverage:** ~14% (1 of 7 files tested)  
**Target Coverage:** 70% minimum overall  
**Critical Paths Target:** 90%+  
**Gap:** 56% below target

---

## Coverage Standards Created ✅

**Document:** `docs/STANDARDS/test-coverage.md`

Comprehensive coverage standards document telah dibuat dengan:
- ✅ Coverage thresholds (70% minimum, 90%+ untuk critical paths)
- ✅ File priority untuk testing
- ✅ Coverage checklist untuk new features
- ✅ Current coverage status
- ✅ Testing roadmap
- ✅ Best practices

---

## Current Coverage Status

### Files Tested ✅

| File | Coverage | Status | Tests |
|------|----------|--------|-------|
| `src/lib/utils.ts` | 100% | ✅ Complete | 27 tests |

### Files Not Tested ⚠️

**Priority 1: Critical (90%+ Required)**

| File | Priority | Status | Tests Needed |
|------|----------|--------|--------------|
| `src/lib/validation.ts` | 🔴 CRITICAL | ⚠️ Not Tested | Zod schema validation tests |
| `src/lib/email.ts` | 🔴 CRITICAL | ⚠️ Not Tested | Email sending, error handling, XSS |
| `src/lib/rate-limit.ts` | 🔴 CRITICAL | ⚠️ Not Tested | Rate limit enforcement, IP tracking |
| `src/lib/robot-validation.ts` | 🔴 CRITICAL | ⚠️ Not Tested | Honeypot, timing validation |
| `src/app/api/contact/route.ts` | 🔴 CRITICAL | ⚠️ Not Tested | All HTTP methods, error scenarios |

**Priority 2: Important (70%+ Required)**

| File | Priority | Status | Tests Needed |
|------|----------|--------|--------------|
| `src/lib/siteHelpers.ts` | 🟡 MEDIUM | ⚠️ Not Tested | Helper function tests |

---

## Coverage Thresholds

### Minimum Thresholds

**Configuration:** `vitest.config.ts`

```typescript
thresholds: {
  lines: 70,      // Minimum 70% line coverage
  functions: 70,  // Minimum 70% function coverage
  branches: 70,   // Minimum 70% branch coverage
  statements: 70, // Minimum 70% statement coverage
}
```

### Category-Specific Thresholds

- **Critical Paths:** 90%+ (utilities, API routes, validation, security)
- **UI Components:** 60%+ (focus on logic, not rendering)
- **Configuration:** Excluded (types, config files)

---

## Testing Roadmap

### Phase 1: Critical Paths (Priority 1) - 90%+ Coverage

**Goal:** Test all critical security and business logic files

1. **`src/lib/validation.ts`** ⚠️ **NOT TESTED**
   - **Test File:** `tests/unit/lib/validation.test.ts`
   - **Required Tests:**
     - Valid input scenarios
     - Invalid input scenarios (name too short, email invalid, message too long)
     - Edge cases (empty strings, max length, special characters)
     - Type validation (string, number, email format)
     - Honeypot dan submissionTime optional fields

2. **`src/lib/email.ts`** ⚠️ **NOT TESTED**
   - **Test File:** `tests/unit/lib/email.test.ts`
   - **Required Tests:**
     - Email sending success (mock nodemailer)
     - Error handling (SMTP errors, network errors)
     - Environment variable validation
     - XSS prevention (escapeHtml function)
     - Email template formatting (HTML dan text)

3. **`src/lib/rate-limit.ts`** ⚠️ **NOT TESTED**
   - **Test File:** `tests/unit/lib/rate-limit.test.ts`
   - **Required Tests:**
     - Rate limit enforcement (max requests)
     - IP tracking (different IPs)
     - Cleanup mechanism (expired entries)
     - Edge cases (unknown IP, reset time)
     - getClientIP function (headers parsing)

4. **`src/lib/robot-validation.ts`** ⚠️ **NOT TESTED**
   - **Test File:** `tests/unit/lib/robot-validation.test.ts`
   - **Required Tests:**
     - Honeypot detection (filled vs empty)
     - Submission timing validation (too fast vs normal)
     - Edge cases (missing fields, boundary values)
     - Environment variable configuration

5. **`src/app/api/contact/route.ts`** ⚠️ **NOT TESTED**
   - **Test File:** `tests/unit/api/contact/route.test.ts` atau `tests/integration/api/contact.test.ts`
   - **Required Tests:**
     - POST handler success
     - Validation errors (400)
     - Rate limiting (429)
     - Robot detection
     - Email sending errors (500)
     - Network errors
     - GET handler (405)
     - Request body parsing errors

### Phase 2: Important Utilities (Priority 2) - 70%+ Coverage

6. **`src/lib/siteHelpers.ts`** ⚠️ **NOT TESTED**
   - **Test File:** `tests/unit/lib/siteHelpers.test.ts`
   - **Required Tests:**
     - Function return values
     - Edge cases

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

## How to Check Coverage

### Run Coverage Report

```bash
# Run tests dengan coverage
pnpm test:coverage

# View HTML report
open coverage/index.html
```

### Coverage Report Locations

- **Terminal Output:** Summary dalam console
- **HTML Report:** `coverage/index.html` (detailed, line-by-line)
- **LCOV Report:** `coverage/lcov.info` (CI/CD integration)

### Reading Coverage Reports

**Terminal Report:**
```
% Coverage report from v8
----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------|---------|----------|---------|---------|-------------------
All files |     100 |      100 |     100 |     100 |                   
 utils.ts |     100 |      100 |     100 |     100 |                   
```

**HTML Report:**
- Open `coverage/index.html` in browser
- Click on file untuk see line-by-line coverage
- Green = covered, Red = uncovered
- Shows branch coverage, function coverage

---

## Coverage Standards Document

**Location:** `docs/STANDARDS/test-coverage.md`

**Contents:**
- Coverage thresholds dan requirements
- File priority untuk testing
- Coverage measurement dan reporting
- Coverage checklist untuk new features
- Current coverage status dengan breakdown
- Testing roadmap
- Best practices
- Common coverage issues dan solutions

---

## Next Steps

### Immediate Actions

1. **Review Coverage Standards:** Read `docs/STANDARDS/test-coverage.md`
2. **Identify Gaps:** Run `pnpm test:coverage` dan review HTML report
3. **Prioritize Testing:** Start dengan critical paths (Priority 1)
4. **Write Tests:** Create test files untuk untested files
5. **Verify Coverage:** Run coverage setelah adding tests

### Testing Priority Order

1. **`src/lib/validation.ts`** - Highest priority (security-critical)
2. **`src/lib/rate-limit.ts`** - High priority (security feature)
3. **`src/lib/robot-validation.ts`** - High priority (security feature)
4. **`src/lib/email.ts`** - High priority (core functionality)
5. **`src/app/api/contact/route.ts`** - High priority (API endpoint)
6. **`src/lib/siteHelpers.ts`** - Medium priority (helper functions)

---

## Related Documentation

- **[Test Coverage Standards](./STANDARDS/test-coverage.md)** - Detailed coverage standards
- **[Testing Standards](./STANDARDS/testing.md)** - General testing guidelines
- **[Code Review Guidelines](./CODE_REVIEW.md)** - Coverage requirements dalam reviews
- **[Contributing Guide](./CONTRIBUTING.md)** - Testing requirements untuk contributors

---

**Last Updated:** 2025-01-27  
**Status:** Active
