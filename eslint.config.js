import eslint from '@eslint/js';
import globals from 'globals';
import { FlatCompat } from '@eslint/eslintrc';
import tsEslint from 'typescript-eslint';
import pluginImport from 'eslint-plugin-import';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default tsEslint.config(
  eslint.configs.recommended,
  ...tsEslint.configs.recommendedTypeChecked,
  ...compat.extends('airbnb-base'),
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
      },
      parserOptions: {
        project: true,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-shadow': 'warn',
      '@typescript-eslint/indent': ['error', 2],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/member-delimiter-style': ['error', {
        multiline: {
          delimiter: 'semi',
          requireLast: true,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false,
        },
        multilineDetection: 'brackets',
      }],
      '@typescript-eslint/type-annotation-spacing': [
        2,
        {
          before: false,
          after: true,
        },
      ],
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      'import/prefer-default-export': 'off',
      'import/extensions': 'off',
      'import/no-extraneous-dependencies': [0, {
        'packageDir ': '.',
      }],
      // BUG: Migration to 9.x temporal fix
      // 'import/no-unresolved': 'error',
      'import/no-unresolved': 'off',
      'import/order': ['error', {
        pathGroups: [
          {
            pattern: '@models/**',
            group: 'type',
          },
          {
            pattern: '@config/**',
            group: 'internal',
          },
          {
            pattern: '@controllers/**',
            group: 'internal',
          },
          {
            pattern: '@db/**',
            group: 'internal',
          },
          {
            pattern: '@docs/**',
            group: 'internal',
          },
          {
            pattern: '@middlewares/**',
            group: 'internal',
          },
          {
            pattern: '@routes/**',
            group: 'internal',
          },
          {
            pattern: '@server/**',
            group: 'internal',
          },
        ],
        groups: [['builtin', 'external'], ['type'], ['internal', 'parent', 'sibling', 'index']],
        'newlines-between': 'always',
      }],
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      indent: 'off',
      'linebreak-style': 'off',
      'no-plusplus': 'off',
      'no-underscore-dangle': 'off',
      'max-len': ['error', {
        code: 160,
        ignorePattern: 'class="([\\s\\S]*?)"|d="([\\s\\S]*?)"',
        ignoreStrings: true,
        ignoreUrls: true,
        ignoreTemplateLiterals: true,
        ignoreComments: true,
        ignoreRegExpLiterals: true,
      }],
      'arrow-body-style': 'off',
      'class-methods-use-this': 'off',
      'no-unused-expressions': [
        'error',
        { allowShortCircuit: true, allowTernary: true },
      ],
      'no-shadow': 'off',
      'no-use-before-define': ['error', {
        functions: false,
      }],
      'id-length': [2, { exceptions: ['i', 'j'], properties: 'never' }],
      'no-unused-vars': 'off',
    },
    settings: {
      ...pluginImport.configs.typescript.settings,
    },
  },
  {
    files: ['**/*.js'],
    ...tsEslint.configs.disableTypeChecked,
  },
);
