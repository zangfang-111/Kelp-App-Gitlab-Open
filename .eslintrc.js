/* eslint-disable @typescript-eslint/no-var-requires */
const { readFileSync } = require('fs')
const schemaString = readFileSync(`${__dirname}/data/schema.graphql`, 'utf8')

module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
    // jest: true,
    es6: true,
  },
  extends: [
    'prettier',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'graphql', 'react-hooks'],
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
  rules: {
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'react/prop-types': 'off',
    'no-console': 'off',
    'require-atomic-updates': 'warn',
    complexity: ['warn', 16],
    'no-alert': 'warn',
    'graphql/named-operations': [
      'error',
      {
        schemaString,
      },
    ],
  },
}
