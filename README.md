# z-card

A modern, full-stack-ready portfolio website built with Next.js 15, TypeScript, and Tailwind CSS. This project serves as a digital business card with a focus on code quality, type safety, and maintainability.

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ (recommended: 20+)
- **pnpm** (recommended package manager)
- **SMTP Server** (for email functionality - optional)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd z-card

# Install dependencies
pnpm install

# Setup environment variables (optional, for email functionality)
cp .env.example .env
# Edit .env and add your SMTP configuration

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

### Available Scripts

```bash
# Development
pnpm dev              # Start development server with Turbopack
pnpm build            # Build for production
pnpm start            # Start production server

# Code Quality
pnpm type-check       # TypeScript type checking
pnpm lint             # Run ESLint
pnpm lint:fix         # Fix ESLint errors automatically
pnpm format           # Format code with Prettier
pnpm format:check     # Check code formatting (CI/CD)

# Testing
pnpm test             # Run unit tests
pnpm test:watch       # Run tests in watch mode
pnpm test:coverage    # Run tests with coverage report
pnpm test:ui          # Run tests with Vitest UI
pnpm test:e2e         # Run E2E tests with Playwright
pnpm test:e2e:ui      # Run E2E tests with Playwright UI
pnpm test:e2e:debug   # Debug E2E tests
pnpm test:e2e:headed  # Run E2E tests in headed mode
```

## 📚 Documentation

### Core Documentation

- **[Architecture](./docs/ARCHITECTURE.md)** - Project structure, technical decisions, and component architecture
- **[Coding Standards](./docs/CODING_STANDARDS.md)** - Coding standards, patterns, and best practices
- **[Contributing Guide](./CONTRIBUTING.md)** - Development workflow, Git workflow, and PR process

### Detailed Standards

- **[Naming Conventions](./docs/STANDARDS/naming-conventions.md)** - File, component, and variable naming rules
- **[Import Patterns](./docs/STANDARDS/import-patterns.md)** - Import organization and path aliases
- **[TypeScript Patterns](./docs/STANDARDS/typescript-patterns.md)** - TypeScript best practices
- **[Component Patterns](./docs/STANDARDS/component-patterns.md)** - React component patterns
- **[Code Structure](./docs/STANDARDS/code-structure.md)** - Project structure guidelines
- **[ESLint & Prettier](./docs/STANDARDS/eslint-prettier.md)** - Linting and formatting configuration
- **[Testing](./docs/STANDARDS/testing.md)** - Testing standards and guidelines

### Additional Resources

- **[Code Review Guidelines](./docs/CODE_REVIEW.md)** - Code review process and criteria
- **[Automated Checks](./docs/AUTOMATED_CHECKS.md)** - Pre-commit hooks and quality gates

## 🛠️ Technology Stack

### Core

- **Next.js 15.4.8** - React framework with App Router
- **React 19.1.0** - UI library
- **TypeScript 5.9.3** - Type safety with strict mode

### Styling

- **Tailwind CSS 4.1.17** - Utility-first CSS framework
- **Radix UI** - Accessible UI primitives
- **shadcn/ui Pattern** - Component architecture

### Development Tools

- **ESLint 9.39.1** - Linting with flat config
- **Prettier 3.7.4** - Code formatting
- **Husky 9.1.7** - Git hooks
- **Vitest 4.0.15** - Unit testing
- **Playwright** - E2E testing

## 📁 Project Structure

```
z-card/
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/      # Shared UI components
│   ├── config/          # Configuration files
│   ├── lib/             # Utility functions
│   └── types/           # TypeScript type definitions
├── docs/                # Documentation
├── public/              # Static assets
└── tests/               # Test files
```

For detailed project structure, see [Architecture Documentation](./docs/ARCHITECTURE.md).

## 🎯 Key Features

- ✅ **Type Safety** - TypeScript strict mode with comprehensive type checking
- ✅ **Code Quality** - ESLint, Prettier, and pre-commit hooks
- ✅ **Accessibility** - jsx-a11y rules enforcement
- ✅ **Performance** - Server Components by default, Next.js optimizations
- ✅ **Testing** - Unit tests (Vitest) and E2E tests (Playwright)
- ✅ **Documentation** - Comprehensive documentation for onboarding and maintenance
- ✅ **Contact Form** - Email functionality with SMTP integration, rate limiting, and bot protection

## 📧 Email Configuration

The contact form requires SMTP configuration to send emails. The project uses **Nodemailer** with SMTP for email delivery.

### Setup Instructions

1. **Copy environment template:**
   ```bash
   cp .env.example .env
   ```

2. **Configure SMTP settings in `.env`:**
   ```env
   # SMTP Server Configuration
   SMTP_HOST=smtp.example.com
   SMTP_PORT=587
   SMTP_SECURE=false  # true for port 465 (SSL), false for port 587 (TLS)

   # SMTP Authentication
   SMTP_USER=your-smtp-username
   SMTP_PASS=your-smtp-password

   # Email Addresses
   SMTP_FROM_EMAIL=noreply@example.com
   SMTP_TO_EMAIL=contact@example.com
   ```

3. **Common SMTP Providers:**
   - **Gmail**: `smtp.gmail.com`, port `587`, TLS
   - **Outlook**: `smtp-mail.outlook.com`, port `587`, TLS
   - **SendGrid**: `smtp.sendgrid.net`, port `587`, TLS
   - **Mailgun**: `smtp.mailgun.org`, port `587`, TLS
   - **Custom SMTP**: Use your provider's SMTP settings

### Testing Email

1. **Start the development server:**
   ```bash
   pnpm dev
   ```

2. **Submit the contact form** at `http://localhost:3000/#contact`

3. **Check your email** (the address configured in `SMTP_TO_EMAIL`)

### Troubleshooting

**Email not sending?**
- Verify all SMTP environment variables are set correctly
- Check SMTP server credentials (username/password)
- Ensure SMTP server allows connections from your IP
- Check firewall/network settings
- Review server logs for error messages

**Common Issues:**
- **"SMTP_HOST is not configured"**: Set `SMTP_HOST` in `.env`
- **"Authentication failed"**: Verify `SMTP_USER` and `SMTP_PASS` are correct
- **"Connection timeout"**: Check `SMTP_HOST` and `SMTP_PORT` settings
- **"TLS/SSL error"**: Verify `SMTP_SECURE` matches your port (true for 465, false for 587)

For more details, see [`.env.example`](./.env.example) for all available configuration options.

## 🚢 Deployment

### Vercel (Recommended)

The easiest way to deploy this Next.js app is using the [Vercel Platform](https://vercel.com/new):

1. Push your code to GitHub
2. Import your repository to Vercel
3. **Add environment variables** in Vercel dashboard (SMTP configuration)
4. Vercel will automatically detect Next.js and configure the build

**Important:** Don't forget to configure SMTP environment variables in your deployment platform!

For more details, see the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

### Docker

The project includes Docker configuration:

```bash
# Build Docker image
docker build -t z-card .

# Run container with environment variables
docker run -p 3000:3000 --env-file .env z-card
```

**Note:** Ensure `.env` file is configured with SMTP settings before running the container.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for:

- Development setup
- Git workflow
- Code standards
- Pull request process
- Testing requirements

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) - The React framework
- [shadcn/ui](https://ui.shadcn.com) - Component architecture inspiration
- [Radix UI](https://www.radix-ui.com) - Accessible UI primitives
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework

---

**Last Updated:** 2025-01-27
**Status:** Active Development
**Version:** 0.1.0
