import * as tailwind from 'prettier-plugin-tailwindcss'

/** @type {import('prettier').Config} */
export default {
  semi: false,
  singleQuote: true,
  jsxSingleQuote: true,
  printWidth: 100,
  tabWidth: 2,
  trailingComma: 'all',
  bracketSpacing: true,
  arrowParens: 'avoid',
  plugins: [tailwind],
}