/** @type {import('prettier').Config} */
module.exports = {
  semi: false,
  singleQuote: true,
  jsxSingleQuote: true,
  printWidth: 100,
  tabWidth: 2,
  trailingComma: 'all',
  bracketSpacing: true,
  arrowParens: 'avoid',
  endOfLine: 'auto',
  plugins: ['prettier-plugin-tailwindcss'],
}
