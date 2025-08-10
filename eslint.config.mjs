import { dirname } from "node:path"
import { fileURLToPath } from "node:url"
import { FlatCompat } from "@eslint/eslintrc"

import prettier from "eslint-config-prettier"
import pluginPrettier from "eslint-plugin-prettier"
import pluginUnusedImports from "eslint-plugin-unused-imports"
import simpleImportSort from "eslint-plugin-simple-import-sort"

import prettierConfig from "./prettier.config.mjs"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const compat = new FlatCompat({ baseDirectory: __dirname })

const {
  semi,
  singleQuote,
  jsxSingleQuote,
  printWidth,
  tabWidth,
  trailingComma,
  bracketSpacing,
  arrowParens,
} = prettierConfig

const prettierOptions = {
  semi,
  singleQuote,
  jsxSingleQuote,
  printWidth,
  tabWidth,
  trailingComma,
  bracketSpacing,
  arrowParens,
  endOfLine: "auto",
}

export default [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      prettier: pluginPrettier,
      "unused-imports": pluginUnusedImports,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "prettier/prettier": ["error", prettierOptions],
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        { vars: "all", args: "after-used", argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^react", "^next", "^@?\\w"],
            ["^\\u0000"],
            ["^@/"],
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            ["^.+\\.s?css$"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
    },
  },
  prettier,
]