/** @type {import('prettier').Config} */
module.exports = {
  semi: false,
  singleQuote: true,
  jsxSingleQuote: true,
  printWidth: 100,
  tabWidth: 2,
  useTabs: false, // Use spaces, not tabs (explicit for consistency)
  trailingComma: 'all',
  bracketSpacing: true,
  bracketSameLine: false, // Put > on new line for JSX (better readability)
  arrowParens: 'avoid',
  endOfLine: 'auto',
  plugins: ['prettier-plugin-tailwindcss'],
}
