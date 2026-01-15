import import js from '@eslint/js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

const eslintConfig = [lintConfig = [
  {
    ignores: ['**/*']
  },
  {
    plugins: {
      '@typescript-eslint': typescriptEslint
    },t-plugin-prettier";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import js from "@eslint/js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
  {
    ignores: ["**/node_modules/*", "**/.next/*"],
  },
  {
    plugins: {
      prettier,
      "@typescript-eslint": typescriptEslint,
    },
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 5,
      sourceType: "module",

      parserOptions: {
        project: "./tsconfig.json",
        createDefaultProgram: true,
      },
    },
    settings: {
      "import/resolver": {
        node: {
          moduleDirectory: ["node_modules", "src/"],
        },
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
    rules: {
      // Disable all TypeScript strict rules
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-this-alias": "off",
      "@typescript-eslint/naming-convention": "off",

      // Disable React strict rules
      "react/jsx-filename-extension": "off",
      "react/prop-types": "off",
      "react/require-default-props": "off",
      "react/no-array-index-key": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-props-no-spreading": "off",
      "react/display-name": "off",
      "react/no-unescaped-entities": "off",

      // Disable import/export rules
      "import/order": "off",
      "import/no-cycle": "off",
      "import/no-extraneous-dependencies": "off",
      "import/prefer-default-export": "off",
      "import/no-unresolved": "off",
      "import/extensions": "off",

      // Disable general strict rules
      "no-console": "off",
      "no-debugger": "off",
      "no-shadow": "off",
      "no-param-reassign": "off",
      "no-unused-vars": "off",
      "no-use-before-define": "off",
      "no-restricted-syntax": "off",
      "no-underscore-dangle": "off",
      "no-nested-ternary": "off",
      "prefer-destructuring": "off",
      "prefer-const": "warn",
      "no-restricted-imports": "off",

      // Keep minimal Prettier formatting
      "prettier/prettier": [
        "warn",
        {
          bracketSpacing: true,
          printWidth: 140,
          singleQuote: true,
          trailingComma: "none",
          tabWidth: 2,
          useTabs: false,
          endOfLine: "auto",
        },
      ],
    },
  },
];

export default eslintConfig;
