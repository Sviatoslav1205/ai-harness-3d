import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', 'node_modules'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      'max-lines': [
        'error',
        { max: 150, skipBlankLines: true, skipComments: true },
      ],
      'no-restricted-imports': [
        'error',
        { patterns: ['../../*'] },
      ],
      'no-console': ['error', { allow: ['warn', 'error'] }],
    },
  },
  {
    files: ['**/*.test.{ts,tsx}', 'src/test/**'],
    rules: {
      'max-lines': 'off',
    },
  },
);
