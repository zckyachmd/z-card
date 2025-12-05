# Code Review Guidelines - z-card

**Last Updated:** 2025-01-27  
**Status:** Active Standard  
**Project:** z-card

---

## Overview

Code review adalah critical part dari development process untuk memastikan code quality, consistency, dan knowledge sharing. Guidelines ini membantu reviewers dan authors untuk conduct effective code reviews.

---

## Review Process

### When to Request Review

- **Before merging:** All PRs require at least one approval
- **For complex changes:** Request review early untuk feedback
- **For breaking changes:** Multiple reviewers recommended
- **For security-sensitive code:** Security review required

### Review Timeline

- **Target:** Reviews completed within 24 hours
- **Urgent:** Mark as urgent jika blocking
- **Follow-up:** Respond to review comments within 24 hours

### Review Assignment

- **Primary reviewer:** Assigned by PR author atau automatically
- **Secondary reviewer:** For complex atau breaking changes
- **Self-review:** Not allowed (except for documentation-only changes)

---

## Review Criteria

### 🔴 Must Check (Blocking Issues)

**Functionality:**

- ✅ Code works as intended
- ✅ Edge cases handled
- ✅ Error handling implemented
- ✅ No breaking changes (unless explicitly marked)

**Code Quality:**

- ✅ Follows project coding standards (`docs/CODING_STANDARDS.md`)
- ✅ No obvious bugs atau logic errors
- ✅ Code is readable dan maintainable
- ✅ No security vulnerabilities

**Testing:**

- ✅ Tests written untuk new features/bug fixes (see [Test Requirements](#test-requirements))
- ✅ All tests pass
- ✅ Test coverage meets requirements (70% minimum, 90% for critical paths)

**Automated Checks:**

- ✅ ESLint passes
- ✅ TypeScript type-check passes
- ✅ Prettier formatting passes
- ✅ All tests pass

### 🟡 Should Check (Non-Blocking but Important)

**Code Design:**

- Code follows SOLID principles
- No code duplication (DRY)
- Appropriate abstraction levels
- Performance considerations

**Documentation:**

- Complex logic is commented
- README/docs updated if needed
- Type definitions are clear

**Accessibility:**

- Semantic HTML used
- ARIA attributes where needed
- Keyboard navigation works

**Performance:**

- No unnecessary re-renders
- Efficient algorithms/data structures
- Bundle size impact considered

### 🟢 Nice to Have (Optional)

- Code style consistency
- Variable naming improvements
- Minor refactoring opportunities
- Additional test cases

---

## Test Requirements

### When Tests Are Required

**New Features:**

- ✅ **New utilities/functions** → Unit tests required
- ✅ **New components with logic** → Component tests required
- ✅ **New API routes** → Integration tests required
- ✅ **Critical paths** → 90%+ coverage required

**Bug Fixes:**

- ✅ **Regression test** untuk bug (prevent regression)
- ✅ **Edge case test** untuk scenario that caused bug
- ✅ **Test coverage** untuk fix area

**Refactoring:**

- ✅ **Tests updated** jika behavior changes
- ✅ **Existing tests pass** (verify no breaking changes)
- ✅ **New tests** jika new edge cases discovered

### When Tests Are Optional

**UI-Only Changes:**

- ⚠️ Visual updates tanpa logic changes
- ⚠️ Style-only changes (CSS updates)
- ⚠️ Layout adjustments tanpa behavior change

**Documentation:**

- ⚠️ README updates
- ⚠️ Comment improvements
- ⚠️ Documentation-only changes

**Configuration:**

- ⚠️ Config file changes tanpa logic impact
- ⚠️ Environment variable updates

**Minor Changes:**

- ⚠️ Typo fixes
- ⚠️ Formatting-only changes
- ⚠️ Dependency updates (if no code changes)

### Test Coverage Requirements

**Minimum Thresholds:**

- **Overall Coverage:** 70% minimum
- **Critical Paths:** 90%+ (utilities, lib functions, API routes)
- **UI Components:** 60%+ (focus on logic, not rendering)

**Coverage Verification:**

```bash
pnpm test:coverage  # Check coverage report
```

**Coverage Exclusions:**

- Test files themselves
- Type definition files (`*.d.ts`)
- Configuration files
- Setup files

See `docs/STANDARDS/testing.md` untuk detailed testing guidelines dan best practices.

---

## Review Feedback Guidelines

### For Reviewers

**Be Constructive:**

- Explain why, not just what
- Suggest solutions, not just problems
- Acknowledge good work

**Be Respectful:**

- Use "we" instead of "you"
- Focus on code, not person
- Ask questions, don't assume

**Be Specific:**

- Point to exact lines/files
- Provide examples
- Reference standards when applicable

**Be Timely:**

- Review within 24 hours
- Respond to follow-up questions
- Don't block on minor issues

### For Authors

**Be Open:**

- Welcome feedback
- Don't take criticism personally
- Ask questions if unclear

**Be Responsive:**

- Address all comments
- Explain decisions if needed
- Update PR based on feedback

**Be Proactive:**

- Self-review before requesting review
- Fix obvious issues before review
- Add context in PR description

---

## Common Review Patterns

### Good Review Comments

✅ **Good:**

```
"Consider extracting this logic into a separate function. This would improve
testability and reusability. See `src/lib/utils.ts` for similar patterns."
```

✅ **Good:**

```
"This looks good! One suggestion: we could add error handling here for the
edge case where `data` is null. What do you think?"
```

### Bad Review Comments

❌ **Bad:**

```
"This is wrong."
```

❌ **Bad:**

```
"Fix this."
```

❌ **Bad:**

```
"Not my style."
```

---

## Review Checklist

### Before Starting Review

- [ ] Read PR description thoroughly
- [ ] Understand the context dan purpose
- [ ] Check related issues/discussions

### During Review

- [ ] Check functionality works as described
- [ ] Verify code follows standards
- [ ] Check tests are adequate
- [ ] Review for security issues
- [ ] Check performance implications
- [ ] Verify accessibility (if applicable)

### After Review

- [ ] Provide clear feedback
- [ ] Mark blocking vs non-blocking issues
- [ ] Approve jika all criteria met
- [ ] Request changes jika blocking issues found

---

## Approval Criteria

**Approve if:**

- ✅ All "Must Check" criteria met
- ✅ No blocking issues
- ✅ Tests pass dan coverage adequate
- ✅ Code follows standards

**Request Changes if:**

- ❌ Blocking issues found
- ❌ Tests missing atau inadequate
- ❌ Security concerns
- ❌ Breaking changes not documented

**Comment if:**

- 💬 Non-blocking suggestions
- 💬 Questions atau clarifications needed
- 💬 Optional improvements

---

## Escalation

**If Disagreement:**

1. Discuss in PR comments
2. Involve tech lead jika needed
3. Schedule sync meeting untuk complex issues

**If Blocked:**

- Mark PR as blocked
- Create follow-up issue
- Document decision in PR comments

---

## References

- [Coding Standards](docs/CODING_STANDARDS.md)
- [Testing Standards](docs/STANDARDS/testing.md)
- [Architecture Documentation](docs/ARCHITECTURE.md)
- [Contribution Guidelines](../CONTRIBUTING.md)

---

**Remember:** Code review is a collaborative process. Goal is to improve code quality dan share knowledge, not to find faults.
