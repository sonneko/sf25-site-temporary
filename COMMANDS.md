# 開発用スクリプト

| コマンド                | 説明                                   |
| ----------------------- | -------------------------------------- |
| `npm run dev`           | 開発サーバー起動                       |
| `npm run build`         | 本番ビルド                             |
| `npm run start`         | 本番サーバー起動                       |
| `npm run export`        | 静的サイト生成（SSG）                  |
| `npm run lint`          | ESLintでコードチェック                 |
| `npm run lint:fix`      | ESLintで自動修正                       |
| `npm run lint:check`    | ESLint厳格チェック（警告もエラー扱い） |
| `npm run format`        | Prettierでコード整形                   |
| `npm run format:check`  | Prettierフォーマットチェック           |
| `npm run type-check`    | TypeScript型チェック                   |
| `npm run check-all`     | 全品質チェック一括実行                 |
| `npm run fix-all`       | 自動修正一括実行                       |
| `npm run test`          | 単体テスト（Vitest watch）             |
| `npm run test:ui`       | テストUI表示                           |
| `npm run test:run`      | テスト一回実行                         |
| `npm run test:coverage` | テストカバレッジ取得                   |
| `npm run full-check`    | 全てのチェックを行う                   |

このプロジェクトで使用可能なnpmスクリプトの詳細説明です。

## `npm run dev`

開発サーバーを起動します。

## `npm run build`

本番用のビルドを実行します。

## `npm run start`

ビルド済みのアプリケーションを本番モードで起動します。

- `npm run build` 実行後に使用

## `npm run export`

完全な静的サイト生成（SSG）を実行します。

- `next build` と `next export` を連続実行
- `out/` ディレクトリに静的ファイルを出力

## `npm run lint`

ESLintを実行してコードの問題を検出します。

- 設定に基づいてコードの問題を報告
- 修正可能な問題と修正不可能な問題を区別

## `npm run lint:fix`

ESLintを実行して自動修正可能な問題を修正します。

- インデント、セミコロン、クォートなどの自動修正
- 手動対応が必要な問題は警告として残る

## `npm run lint:check`

ESLintを実行して警告も含めて厳格にチェックします。

- 警告が1つでもあるとエラーで終了（`--max-warnings=0`）

## `npm run format`

Prettierを使用してコードを自動フォーマットします。

- JavaScript, TypeScript, CSS, Sass, JSON, Markdownに対応

## `npm run format:check`

Prettierの設定に従ってフォーマットされているかチェックします。

## `npm run type-check`

TypeScriptの型チェックのみを実行します。

- コンパイルは行わず、型エラーのみをチェック

## `npm run check-all`

すべての品質チェックを一括実行します。

- 型チェック → ESLint厳格チェック → Prettierチェックの順で実行
- いずれかが失敗すると処理を停止

```bash
# 実行される処理の順序
1. npm run type-check     # TypeScript型チェック
2. npm run lint:check     # ESLint厳格チェック
3. npm run format:check   # Prettierフォーマットチェック
```

## `npm run fix-all`

自動修正可能な問題をすべて修正します。

- Prettierフォーマット → ESLint自動修正の順で実行

## `npm run test`

Vitestを使用してテストをwatch モードで実行します。

- ファイル変更時の自動テスト実行

## `npm run test:ui`

VitestのUIモードでテストを実行します。

- テスト結果の視覚的確認

## `npm run test:run`

Vitestを一度だけ実行してテスト結果を出力します。

- watchモードなしの単発実行

## `npm run test:coverage`

テストカバレッジを取得してテストを実行します。

## 設定ファイル

- `eslint.config.js` - ESLint設定
- `.prettierrc.js` - Prettier設定
- `tsconfig.json` - TypeScript設定
- `vitest.config.ts` - Vitest設定
- `.vscode/settings.json` - VS Code統合設定
