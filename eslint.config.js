const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const importPlugin = require('eslint-plugin-import');
const prettierPlugin = require('eslint-plugin-prettier');
const unicornPlugin = require('eslint-plugin-unicorn');

module.exports = [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: ['**/*.js', 'build/**/*', 'node_modules/**/*'],

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json'
      }
    },

    plugins: {
      '@typescript-eslint': tsPlugin,
      'import': importPlugin,
      'prettier': prettierPlugin,
      'unicorn': unicornPlugin
    },

    rules: {
      '@typescript-eslint/naming-convention': 'off',

      'curly': 'off',
      'no-underscore-dangle': 'off',
      'no-promise-executor-return': 'off',

      'import/order': [
        'error',
        {
          'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
          'newlines-between': 'never',
          'alphabetize': {
            'order': 'asc',
            'orderImportKind': 'asc',
            'caseInsensitive': true
          }
        }
      ],

      ...tsPlugin.configs['recommended'].rules,
      ...importPlugin.configs['recommended'].rules,
      ...unicornPlugin.configs['recommended'].rules,
      ...prettierPlugin.configs['recommended'].rules,


      '@typescript-eslint/no-explicit-any': 'off',
      'unicorn/no-null': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      'unicorn/no-process-exit': 'off',
      'unicorn/no-array-reduce': 'off',
    },

    settings: {
      'import/internal-regex': '^(@admin/|@/)',
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx']
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json'
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx']
        }
      }
    }
  }
];