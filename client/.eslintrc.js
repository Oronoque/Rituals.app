module.exports = {
  env: {
    browser: true,
    amd: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    // 'plugin:@typescript-eslint/recommended',
  ],
  overrides: [],
  // parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/prop-types': 0,
    'react-hooks/exhaustive-deps': 'warn',
  },
};

// module.exports = {
//   env: {
//     browser: true,
//     amd: true,
//     node: true,
//     jest: true,
//   },
//   extends: [
//     'eslint:recommended',
//     'plugin:react/recommended',
//     'plugin:@typescript-eslint/recommended',
//   ],
//   overrides: [],
//   parser: '@typescript-eslint/parser',
//   parserOptions: {
//     ecmaVersion: 'latest',
//     sourceType: 'module',
//   },
//   plugins: ['react', 'react-hooks'],
//   rules: {
//     'react/prop-types': 0,
//     'react-hooks/exhaustive-deps': 'warn',
//     // 'react-hooks/rules-of-hooks': 'error',
//   },
// };
