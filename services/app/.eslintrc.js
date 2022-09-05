module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    es6: true,
    browser: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 2021,
  },
  extends: ['airbnb', 'prettier'],
  rules: {
    'no-throw-literal': 'off',
    'no-console': 'error',
    'react/function-component-definition': 'off',
    'react/no-array-index-key': 'off',
    'no-nested-ternary': 'off',
    'import/prefer-default-export': 'off',
    'jsx-a11y/label-has-associated-control': [ 2, {
      "required": {
        "some": [ "nesting", "id" ]
      },
    }],
    "jsx-a11y/no-autofocus": [ 0, {}],
  },
};
