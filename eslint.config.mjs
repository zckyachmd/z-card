import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { FlatCompat } from '@eslint/eslintrc'

import prettier from 'eslint-config-prettier'
import pluginJsxA11y from 'eslint-plugin-jsx-a11y'
import pluginPrettier from 'eslint-plugin-prettier'
import pluginUnusedImports from 'eslint-plugin-unused-imports'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const compat = new FlatCompat({ baseDirectory: __dirname })

export default [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    ignores: ['.next/**', 'node_modules/**', 'dist/**', 'build/**', 'coverage/**'],
  },
  {
    plugins: {
      prettier: pluginPrettier,
      'jsx-a11y': pluginJsxA11y,
      'unused-imports': pluginUnusedImports,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      // Prettier integration
      'prettier/prettier': 'error',

      // Unused imports and variables
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        { vars: 'all', args: 'after-used', argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      // Import sorting
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^react', '^next', '^@?\\w'],
            ['^\\u0000'],
            ['^@/'],
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            ['^.+\\.s?css$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',

      // React best practices
      'react/react-in-jsx-scope': 'off', // Not needed in React 17+
      'react/prop-types': 'off', // Using TypeScript for prop validation
      'react/display-name': 'warn', // Warn if component missing display name
      'react/no-unescaped-entities': 'error', // Prevent unescaped entities in JSX
      'react/no-unknown-property': ['error', { ignore: ['jsx'] }], // Allow styled-jsx jsx attribute

      // React Hooks
      'react-hooks/rules-of-hooks': 'error', // Enforce Rules of Hooks
      'react-hooks/exhaustive-deps': 'warn', // Warn about missing dependencies

      // Accessibility (jsx-a11y)
      'jsx-a11y/alt-text': 'error', // Require alt text for images
      'jsx-a11y/anchor-is-valid': 'error', // Ensure anchors are valid
      'jsx-a11y/aria-props': 'error', // Validate ARIA props
      'jsx-a11y/aria-proptypes': 'error', // Validate ARIA prop types
      'jsx-a11y/aria-unsupported-elements': 'error', // Disallow unsupported ARIA elements
      'jsx-a11y/role-has-required-aria-props': 'error', // Require ARIA props for roles
      'jsx-a11y/role-supports-aria-props': 'error', // Ensure ARIA props are valid for role
      'jsx-a11y/click-events-have-key-events': 'warn', // Warn if click handlers lack keyboard handlers
      'jsx-a11y/no-static-element-interactions': 'warn', // Warn about interactive static elements
      'jsx-a11y/no-noninteractive-element-interactions': 'warn', // Warn about non-interactive elements with interactions

      // Next.js specific
      '@next/next/no-html-link-for-pages': 'error', // Use Next.js Link component
      '@next/next/no-img-element': 'warn', // Prefer next/image

      // General code quality
      'no-console': ['warn', { allow: ['warn', 'error'] }], // Allow console.warn/error
      'no-debugger': 'error', // Disallow debugger statements
      'no-alert': 'error', // Disallow alert, confirm, prompt
      'no-var': 'error', // Require let/const instead of var
      'prefer-const': 'error', // Require const for variables never reassigned
      'prefer-arrow-callback': 'warn', // Prefer arrow functions for callbacks
      'no-duplicate-imports': 'error', // Disallow duplicate imports
      'no-unused-expressions': 'error', // Disallow unused expressions
      'no-useless-return': 'error', // Disallow unnecessary return statements
      'no-useless-concat': 'error', // Disallow unnecessary string concatenation
      'prefer-template': 'warn', // Prefer template literals over string concatenation

      // TypeScript-specific (via next/typescript)
      '@typescript-eslint/no-unused-vars': 'off', // Handled by unused-imports plugin
      '@typescript-eslint/no-explicit-any': 'warn', // Warn about any types
      '@typescript-eslint/explicit-function-return-type': 'off', // Too strict for React components
      '@typescript-eslint/explicit-module-boundary-types': 'off', // Too strict for Next.js
    },
  },
  prettier,
]
