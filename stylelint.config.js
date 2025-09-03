/** @type {import('stylelint').Config} */
export default {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-clean-order',
    'stylelint-config-standard-scss',
  ],
  rules: {
    'value-keyword-case': 'lower',
    'scss/at-rule-conditional-no-parentheses': null,
    'no-descending-specificity': null,
    'no-duplicate-selectors': null,
  },
  ignoreFiles: ['dist/**/*', '.next/**/*', 'coverage/**/*', 'node_modules/**/*'],
};
