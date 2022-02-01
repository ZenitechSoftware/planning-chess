module.exports = {
  parserOptions: {
    ecmaVersion: 2021,
  },
  env: {
    commonjs: true,
    es2021: true,
    es6: true,
    browser: true,
    jest: true,
  },
  extends: ['airbnb', 'prettier'],
  rules: {
    'no-throw-literal': 'off',
    'no-console': 'error',
    'react/function-component-definition': 'off',
    'react/no-array-index-key': 'off',
    'no-nested-ternary': 'off',
    'import/prefer-default-export': 'off',
  },
};
