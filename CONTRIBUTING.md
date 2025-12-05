# Contributing to z-card

Thank you for your interest in contributing to z-card! This document provides guidelines and instructions for contributing to the project.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Environment Setup](#environment-setup)
- [Development Workflow](#development-workflow)
- [Common Tasks](#common-tasks)
- [Coding Standards](#coding-standards)
- [Testing Requirements](#testing-requirements)
- [Pull Request Process](#pull-request-process)
- [Commit Messages](#commit-messages)
- [Getting Help](#getting-help)

---

## Code of Conduct

This project adheres to a code of conduct. By participating, you are expected to uphold this code:

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Respect different viewpoints and experiences

---

## Getting Started

### Prerequisites

- **Node.js:** 20.x or higher
- **pnpm:** 9.x or higher (package manager)
- **Git:** Latest version

### Setup

1. **Fork and Clone:**

   ```bash
   git clone https://github.com/your-username/z-card.git
   cd z-card
   ```

2. **Install Dependencies:**

   ```bash
   pnpm install
   ```

3. **Verify Setup:**

   ```bash
   pnpm type-check  # TypeScript check
   pnpm lint        # ESLint check
   pnpm test        # Run tests
   ```

4. **Start Development Server:**
   ```bash
   pnpm dev
   ```

---

## Environment Setup

### Current Environment Variables

**Status:** Currently, no environment variables are required for the frontend-only application.

The project is designed to work out-of-the-box without any environment configuration.

### Future Environment Variables (Epic 5)

When the email backend is implemented (Epic 5), the following environment variables will be required:

**Required:**
- `RESEND_API_KEY` - API key for Resend email service
- `RESEND_FROM_EMAIL` - Sender email address
- `RESEND_TO_EMAIL` - Recipient email address

**Optional:**
- `RATE_LIMIT_MAX_REQUESTS` - Maximum requests per window (default: 5)
- `RATE_LIMIT_WINDOW_MS` - Rate limit window in milliseconds (default: 60000)

### Setting Up Environment Variables

1. **Copy the example file:**
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env` file:**
   ```bash
   # Add your environment variables
   RESEND_API_KEY=your_api_key_here
   RESEND_FROM_EMAIL=noreply@example.com
   RESEND_TO_EMAIL=contact@example.com
   ```

3. **Never commit `.env` file:**
   - `.env` is already in `.gitignore`
   - Only commit `.env.example` as a template

### Environment File Structure

```
.env.example          # Template (committed to repo)
.env                  # Your local config (not committed)
.env.local            # Local overrides (not committed)
.env.production       # Production config (not committed)
```

**Note:** `.env.example` contains all required variables with placeholder values. Copy it to `.env` and fill in your actual values.

---

## Common Tasks

### Development

```bash
# Start development server with Turbopack
pnpm dev

# Start development server on custom port
pnpm dev -- -p 3001
```

### Building

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

### Code Quality

```bash
# TypeScript type checking
pnpm type-check

# ESLint check
pnpm lint

# ESLint auto-fix
pnpm lint:fix

# Prettier format check
pnpm format:check

# Prettier format files
pnpm format
```

### Testing

```bash
# Run unit tests once
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Run tests with Vitest UI
pnpm test:ui

# Run E2E tests
pnpm test:e2e

# Run E2E tests with Playwright UI
pnpm test:e2e:ui

# Debug E2E tests
pnpm test:e2e:debug

# Run E2E tests in headed mode
pnpm test:e2e:headed
```

### Pre-commit Checks

Before committing, ensure all checks pass:

```bash
pnpm type-check      # TypeScript
pnpm lint            # ESLint
pnpm format:check    # Prettier
pnpm test            # Tests
```

---

## Development Workflow

### Branch Naming

Use descriptive branch names:

- **Feature:** `feature/description` (e.g., `feature/add-contact-form`)
- **Bug fix:** `fix/description` (e.g., `fix/navbar-mobile-menu`)
- **Documentation:** `docs/description` (e.g., `docs/update-readme`)
- **Refactoring:** `refactor/description` (e.g., `refactor/utils-functions`)

### Git Workflow

1. **Create Feature Branch:**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes:**
   - Write code following project standards
   - Write tests for new features
   - Update documentation if needed

3. **Commit Changes:**

   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

   See [Commit Messages](#commit-messages) for format.

4. **Push Branch:**

   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create Pull Request:**
   - Use the PR template
   - Fill out all relevant sections
   - Link related issues

---

## Coding Standards

All code must follow project coding standards. See detailed documentation:

- **[Coding Standards](docs/CODING_STANDARDS.md)** - Main standards overview
- **[Naming Conventions](docs/STANDARDS/naming-conventions.md)** - File, variable, function naming
- **[Import Patterns](docs/STANDARDS/import-patterns.md)** - Import organization
- **[TypeScript Patterns](docs/STANDARDS/typescript-patterns.md)** - TypeScript best practices
- **[Component Patterns](docs/STANDARDS/component-patterns.md)** - React component patterns
- **[ESLint & Prettier](docs/STANDARDS/eslint-prettier.md)** - Code style enforcement

### Quick Checklist

- ✅ Use path aliases (`@/components`, `@/lib`) instead of relative imports
- ✅ Follow naming conventions (PascalCase for components, camelCase for functions)
- ✅ TypeScript strict mode compliance
- ✅ No `any` types (unless absolutely necessary)
- ✅ ESLint and Prettier pass
- ✅ Code is self-documenting

---

## Testing Requirements

### When Tests Are Required

**Tests Required:**

- ✅ New features (utilities, components, API routes)
- ✅ Bug fixes (regression tests)
- ✅ Critical paths (90%+ coverage)

**Tests Optional:**

- ⚠️ UI-only changes (visual updates)
- ⚠️ Refactoring (if behavior unchanged)
- ⚠️ Documentation updates

### Test Coverage

- **Minimum Overall:** 70%
- **Critical Paths:** 90%+ (utilities, lib functions, API routes)
- **UI Components:** 60%+ (focus on logic, not rendering)

### Running Tests

```bash
pnpm test              # Run tests once
pnpm test:watch        # Run tests in watch mode
pnpm test:coverage     # Run tests with coverage
pnpm test:ui           # Run tests with UI
```

See **[Testing Standards](docs/STANDARDS/testing.md)** for detailed guidelines.

---

## Pull Request Process

### Before Submitting

1. **Self-Review:**
   - Review your own code
   - Fix obvious issues
   - Ensure all checks pass

2. **Run Checks:**

   ```bash
   pnpm type-check      # TypeScript
   pnpm lint            # ESLint
   pnpm format:check    # Prettier
   pnpm test            # Tests
   ```

3. **Update Documentation:**
   - Update README if needed
   - Update code comments
   - Update CHANGELOG if applicable

### PR Template

Use the PR template (automatically loaded when creating PR):

- Fill out description
- Mark type of change
- Add testing information
- Complete checklist
- Add screenshots if applicable

### Review Process

1. **Automated Checks:**
   - ESLint passes
   - TypeScript type-check passes
   - Prettier formatting passes
   - All tests pass
   - Coverage meets requirements

2. **Code Review:**
   - At least one approval required
   - Address all review comments
   - Update PR based on feedback

3. **Merge:**
   - All checks pass
   - Review approved
   - No blocking issues

See **[Code Review Guidelines](docs/CODE_REVIEW.md)** for details.

---

## Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/) format:

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Test additions/changes
- `chore`: Build process, tooling changes
- `perf`: Performance improvements

### Examples

```bash
feat(contact): add contact form validation

Add email and message validation to contact form with error handling.

Closes #123
```

```bash
fix(navbar): fix mobile menu toggle

Fix issue where mobile menu didn't close when clicking outside.

Fixes #456
```

```bash
docs(readme): update setup instructions

Add pnpm-specific instructions and Node.js version requirements.
```

---

## Automated Checks

### Pre-commit Hooks

Husky runs automatically on commit:

- **Prettier:** Auto-formats code
- **ESLint:** Checks code quality
- **Type-check:** Validates TypeScript

### Manual Checks

```bash
pnpm type-check      # TypeScript type checking
pnpm lint            # ESLint
pnpm format:check    # Prettier formatting check
pnpm test            # Run tests
pnpm test:coverage   # Check coverage
```

### Fixing Issues

**ESLint Errors:**

```bash
pnpm lint:fix        # Auto-fix ESLint issues
```

**Prettier Formatting:**

```bash
pnpm format          # Auto-format code
```

**TypeScript Errors:**

- Fix type errors manually
- Check `docs/STANDARDS/typescript-patterns.md` for guidance

---

## Getting Help

### Resources

- **[Architecture Documentation](docs/ARCHITECTURE.md)** - Project architecture
- **[Coding Standards](docs/CODING_STANDARDS.md)** - Coding guidelines
- **[Testing Standards](docs/STANDARDS/testing.md)** - Testing guidelines
- **[Code Review Guidelines](docs/CODE_REVIEW.md)** - Review process

### Questions?

- Open an issue for bugs or feature requests
- Ask questions in PR comments
- Check existing documentation first

---

## Project Structure

```
z-card/
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # React components
│   ├── lib/              # Utility functions
│   ├── types/            # TypeScript types
│   └── config/            # Configuration
├── tests/                # Test files
│   ├── setup/            # Test utilities
│   └── unit/             # Unit tests
├── docs/                 # Documentation
│   ├── STANDARDS/        # Detailed standards
│   └── sprint-artifacts/ # Project planning
└── .github/              # GitHub templates
```

---

**Thank you for contributing to z-card!** 🎉
