# Pull Request

## Description

<!-- Provide a clear and concise description of what this PR does -->

## Type of Change

<!-- Mark the relevant option with an 'x' -->

- [ ] 🐛 Bug fix (non-breaking change which fixes an issue)
- [ ] ✨ New feature (non-breaking change which adds functionality)
- [ ] 💥 Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] 📝 Documentation update
- [ ] ♻️ Refactoring (no functional changes)
- [ ] ⚡ Performance improvement
- [ ] 🎨 Style/UI changes (no functional changes)
- [ ] 🧪 Test updates
- [ ] 🔧 Configuration changes

## Related Issues

<!-- Link related issues using #issue-number -->

Closes #
Related to #

## Testing

<!-- Describe the tests you ran to verify your changes -->

- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] E2E tests added/updated (if applicable)
- [ ] Manual testing performed
- [ ] All existing tests pass

**Test Coverage:**

<!-- If applicable, note test coverage for new code -->

## Checklist

<!-- Mark completed items with an 'x' -->

### Code Quality

- [ ] Code follows project coding standards (see `docs/CODING_STANDARDS.md`)
- [ ] Code is self-documenting dengan clear variable/function names
- [ ] No console.log statements (except console.warn/error)
- [ ] No commented-out code
- [ ] No TODO comments without issue tracking

### TypeScript

- [ ] TypeScript strict mode compliance
- [ ] No `any` types (unless absolutely necessary dengan justification)
- [ ] Proper type definitions for all functions/components
- [ ] Type imports use `type` keyword when appropriate

### Testing

- [ ] Tests written untuk new features/bug fixes (see `docs/CODE_REVIEW.md#Test-Requirements`)
- [ ] Test coverage meets minimum requirements (70% overall, 90% for critical paths)
- [ ] All tests pass locally
- [ ] Tests are meaningful dan test behavior, not implementation

### Documentation

- [ ] Code comments added untuk complex logic
- [ ] README updated (if applicable)
- [ ] Documentation updated (if applicable)
- [ ] CHANGELOG updated (if applicable)

### Automated Checks

- [ ] ✅ ESLint passes (`pnpm lint`)
- [ ] ✅ TypeScript type-check passes (`pnpm type-check`)
- [ ] ✅ Prettier formatting passes (`pnpm format:check`)
- [ ] ✅ All tests pass (`pnpm test`)
- [ ] ✅ Test coverage meets thresholds (`pnpm test:coverage`)

### Accessibility

- [ ] Semantic HTML used appropriately
- [ ] ARIA attributes added where needed
- [ ] Keyboard navigation works
- [ ] Screen reader compatibility verified (if applicable)

### Performance

- [ ] No unnecessary re-renders
- [ ] Images optimized (if applicable)
- [ ] Bundle size impact considered (if applicable)

## Screenshots / Demo

<!-- If applicable, add screenshots or a demo GIF -->

## Additional Notes

<!-- Any additional information, context, or notes for reviewers -->

**For Reviewers:** See [Code Review Guidelines](docs/CODE_REVIEW.md) for detailed review criteria and best practices.
