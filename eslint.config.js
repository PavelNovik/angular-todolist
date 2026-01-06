import angularTemplate from '@angular-eslint/eslint-plugin-template';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
// @ts-check
const eslint = require('@eslint/js');
const { defineConfig } = require('eslint/config');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');

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
      '@typescript-eslint': tseslint.plugin,
      '@angular-eslint': angular,
      prettier,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...angular.configs.recommended.rules,
      ...prettierConfig.rules,
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'tl',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'tl',
          style: 'kebab-case',
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    extends: [angular.configs.templateRecommended, angular.configs.templateAccessibility],
    plugins: {
      '@angular-eslint/template': angularTemplate,
      prettier,
    },
    rules: {
      ...angularTemplate.configs.recommended.rules,
      ...prettierConfig.rules,
      'prettier/prettier': 'error',
    },
  },
]);
