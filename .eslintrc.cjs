module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: { browser: true, es2021: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  plugins: ['react', '@typescript-eslint'],
  settings: { react: { version: 'detect' } },
  rules: {
    'no-unused-vars': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  },
};
