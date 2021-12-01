/* global module */

module.exports = {
  env: {
    es6: true,
    browser: true,
    jest: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
  settings: {
    react: {
      version: '16.13.1',
    },
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  plugins: ['react', 'react-hooks'],
  rules: {
    semi: [2, 'always'],
    indent: ['error', 2],
    quotes: ['error', 'single', { avoidEscape: true }],
    'jsx-quotes': ['error', 'prefer-double'],
    'comma-dangle': ['warn', 'always-multiline'],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-multiple-empty-lines': ['error', { max: 2 }],
    'eol-last': ['error'],
    'no-console': ['error', { allow: ['warn', 'error', 'info', 'debug'] }],
    'object-curly-spacing': ['error', 'always'],
  },
};
