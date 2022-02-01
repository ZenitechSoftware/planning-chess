module.exports = {
  env: {
    es6: true,
    node: true,
  },
  globals: {},
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  settings: {},
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    quotes: ['error', 'single'],
    indent: ['error', 2],
    semi: ['error', 'always'],
    'key-spacing': ['error', { beforeColon: false, afterColon: true }],
    'no-trailing-spaces': 'error',
    'space-before-blocks': 'error',
    'space-before-function-paren': [
      'error',
      { anonymous: 'always', named: 'ignore' },
    ],
    'keyword-spacing': ['error', { before: true }],
    'space-in-parens': ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    'no-console': ['error', { allow: ['warn', 'error', 'info', 'debug'] }],
    'comma-dangle': ['error', 'always-multiline'],
    'eol-last': ['error'],
    'require-atomic-updates': [0],
    '@typescript-eslint/ban-ts-ignore': 'off',
    'no-multiple-empty-lines': ['error', { max: 2 }],
  },
};