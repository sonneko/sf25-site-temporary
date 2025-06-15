import js from '@eslint/js';
import nextPlugin from 'eslint-config-next';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  // JavaScript基本設定
  js.configs.recommended,

  // TypeScript設定
  ...tseslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,

  // Next.js設定
  {
    ...nextPlugin,
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      ...nextPlugin.rules,
      // Next.js固有のルール調整
      '@next/next/no-html-link-for-pages': 'error',
      '@next/next/no-img-element': 'warn',
    },
  },

  // TypeScript専用設定
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // TypeScript固有のルール
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/prefer-const': 'error',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports' },
      ],

      // Zod使用時のベストプラクティス
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
    },
  },

  // React関連の設定
  {
    files: ['**/*.{jsx,tsx}'],
    plugins: {
      react: await import('eslint-plugin-react'),
      'react-hooks': await import('eslint-plugin-react-hooks'),
      'jsx-a11y': await import('eslint-plugin-jsx-a11y'),
    },
    rules: {
      // React関連のルール
      'react/react-in-jsx-scope': 'off', // Next.js 13+では不要
      'react/prop-types': 'off', // TypeScriptを使用するため
      'react/jsx-props-no-spreading': 'warn',
      'react/jsx-no-bind': 'warn',
      'react/self-closing-comp': 'error',
      'react/jsx-boolean-value': 'error',

      // React Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // アクセシビリティ
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/anchor-is-valid': 'error',
      'jsx-a11y/no-static-element-interactions': 'warn',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  // テストファイル用設定
  {
    files: ['**/__tests__/**/*', '**/?(*.)+(spec|test).[jt]s?(x)'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },

  // 設定ファイル用設定
  {
    files: ['*.config.{js,ts}', '.*rc.{js,ts}'],
    env: {
      node: true,
    },
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
    },
  },

  // Sass/SCSS関連（必要に応じて）
  {
    files: ['**/*.{sass,scss}'],
    rules: {
      // Sass固有のルールがあれば追加
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
      '.nyc_output/**',
      'public/**',
    ],
  },

  // Prettier設定（最後に配置）
  prettierConfig,

  // カスタムルール
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      // 一般的なベストプラクティス
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'prefer-template': 'error',

      // SSG関連の推奨事項
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['../../../*'],
              message: '相対パスが深すぎます。絶対パスを使用してください。',
            },
          ],
        },
      ],
    },
  },
];
