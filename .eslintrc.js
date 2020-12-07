module.exports = {
  env: {
    es2021: true,
    'jest/globals': true,
    node: true
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['jest'],
  rules: {
    indent: ['error', 2],
    'jest/no-disabled-tests': 'error',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'warn',
    'linebreak-style': ['error', 'windows'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'sort-imports': [
      'error',
      {
        allowSeparatedGroups: false,
        ignoreCase: false,
        ignoreDeclarationSort: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['single', 'multiple', 'all', 'none']
      }
    ],
    'sort-keys': ['error', 'asc', { caseSensitive: true }]
  }
};
