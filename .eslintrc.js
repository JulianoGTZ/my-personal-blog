module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    'jest/globals': true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'jest'],
  rules: {
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off' ,
    'import/extensions': 'off',
    // airbnb 19 turns on two new stylistic rules that the whole codebase
    // already contradicts, consistently. Both are preference, not correctness,
    // so keep the existing style rather than churn every component.
    //
    // Every component is re-exported through a barrel index
    // (`export { default } from './Post'`).
    'no-restricted-exports': 'off',
    // Components are arrow functions here, not function declarations.
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
  },
};
