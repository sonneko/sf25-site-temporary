import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  // 基本設定
  js.configs.recommended,

  // TypeScript設定（シンプル版）
  ...tseslint.configs.recommended,

  // ファイル対象指定
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // 基本的なルール
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'prefer-const': 'error',
      'no-var': 'error',

      // TypeScript関連
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@/prefer-const': 'error',

      // React関連（基本的なもののみ）
      'react/react-in-jsx-scope': 'off', // Next.js 13+では不要
      'react/prop-types': 'off', // TypeScriptを使用するため
    },
  },

  // TypeScript専用ファイル
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports' },
      ],
    },
  },

  // テストファイル用設定
  {
    files: ['**/__tests__/**/*', '**/?(*.)+(spec|test).[jt]s?(x)'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  // 除外設定
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'dist/**',
      'build/**',
      '*.min.js',
      '*.d.ts',
      'coverage/**',
      'public/**',
    ],
  },

  // Prettier設定（最後に配置）
  prettierConfig,
];
