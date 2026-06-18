// @ts-check
const eslint = require('@eslint/js');
const { defineConfig } = require('eslint/config');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const boundaries = require('eslint-plugin-boundaries');

module.exports = defineConfig([
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    plugins: {
      boundaries,
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.app.json',
        },
      },
      'boundaries/include': ['src/app/**/*.ts'],
      'boundaries/elements': [
        { type: 'shared', pattern: 'src/app/shared/**' },
        { type: 'core', pattern: 'src/app/core/**' },
        { type: 'feature', pattern: 'src/app/features/*/**', capture: ['feature'] },
        { type: 'app', pattern: 'src/app/*.ts' },
      ],
    },
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
      'boundaries/dependencies': [
        'error',
        {
          default: 'disallow',
          rules: [
            { from: { type: 'core' }, allow: { to: { type: 'shared' } } },
            {
              from: { type: 'feature' },
              allow: {
                to: [
                  { type: 'shared' },
                  { type: 'core' },
                  { type: 'feature', captured: { feature: '{{from.captured.feature}}' } },
                ],
              },
            },
            { from: { type: 'app' }, allow: { to: { type: ['shared', 'core', 'feature'] } } },
          ],
        },
      ],
      // Pre-existing findings from turning on lint for the first time in this
      // codebase — not part of the dependency-boundary fix, kept as warnings
      // rather than mass-fixed here. boundaries/dependencies above stays an
      // error: that's the rule this config exists to enforce.
      'no-useless-escape': 'warn',
      'no-irregular-whitespace': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-unused-expressions': 'warn',
      '@angular-eslint/no-output-native': 'warn',
      '@angular-eslint/use-lifecycle-interface': 'warn',
      '@angular-eslint/prefer-inject': 'warn',
    },
  },
  {
    files: ['**/*.html'],
    extends: [angular.configs.templateRecommended, angular.configs.templateAccessibility],
    rules: {
      // Same pre-existing-findings note as the **/*.ts block above.
      '@angular-eslint/template/click-events-have-key-events': 'warn',
      '@angular-eslint/template/interactive-supports-focus': 'warn',
    },
  },
]);
