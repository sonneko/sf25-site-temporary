/** @type {import('prettier').Config} */
export default {
  // 基本設定
  semi: true,
  trailingComma: 'es5',
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,

  // JSX設定
  jsxSingleQuote: true,

  // その他の設定
  arrowParens: 'avoid',
  bracketSpacing: true,
  endOfLine: 'lf',
  quoteProps: 'as-needed',

  // ファイル別設定
  overrides: [
    {
      files: '*.{js,jsx,ts,tsx}',
      options: {
        parser: 'typescript',
      },
    },
    {
      files: '*.{css,scss,sass}',
      options: {
        parser: 'css',
        printWidth: 120,
      },
    },
    {
      files: '*.json',
      options: {
        parser: 'json',
        printWidth: 120,
      },
    },
    {
      files: '*.md',
      options: {
        parser: 'markdown',
        printWidth: 80,
        proseWrap: 'always',
      },
    },
  ],
};
