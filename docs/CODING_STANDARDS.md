# Coding standards

Use strict TypeScript, explicit domain types, and idiomatic App Router components. Prefer Server Components; mark browser boundaries with `use client`. Keep secrets and filesystem operations server-side. Use the existing `@/` alias, descriptive component names, and plain domain functions rather than speculative wrappers.

Use Zod at untrusted boundaries. Never trust client validation alone. Encode text when generating XML or HTML; structured data escapes `<`. Keep external links safe and validate destinations before adding them to public content. Do not log names, addresses, contact messages or tokens. Return honest failure states.

Reuse semantic design tokens in `globals.css` and primitives in `components/ui`. Provide labels, focus states, semantic elements, touch targets and reduced-motion handling with every interaction. Keep reading content visible without animation. See DESIGN.md.

Format with Prettier; lint with Next's flat ESLint configuration. Avoid dead exports, duplicate validation rules, needless state, and explanatory comments that repeat code. Test behavior and boundaries; do not lower checks merely to make a change pass. Verification commands are in TESTING.md.
