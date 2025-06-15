# SF25 site

SF25のサイト開発用レポジトリです。

このプロジェクトは、以下の技術スタックに基づいて構築されています：

- [Next.js 14](https://nextjs.org/)
- TypeScript
- SCSS Modules（`*.module.scss`）
- [Vitest](https://vitest.dev/)
- Git Flow によるブランチ戦略

---

## ディレクトリ構成（App Router 構成）

```

src/
├── app/              # Next.js App Router（pagesではなくappを使用）
│   └── page.tsx
├── components/       # UIコンポーネント（SCSS Modulesと共に）
│   └── Header/
│       ├── Header.tsx
│       └── Header.module.scss
├── lib/              # ユーティリティや関数
├── styles/           # グローバルSCSSなど
├── tests/            # テストコード（Vitest）

```

---

## 使用技術・ライブラリ

| 種類           | ライブラリ                     |
| -------------- | ------------------------------ |
| フレームワーク | Next.js (App Router)           |
| 言語           | TypeScript                     |
| スタイリング   | SCSS Modules (`*.module.scss`) |
| テスト         | Vitest / Testing Library       |
| バージョン管理 | Git + Git Flow                 |

---

## テスト

### セットアップ

```bash
npm install
```

### テスト実行

```bash
npx vitest
```

or

```bash
npm run test
```

---

## Git Flow 運用ルール

このプロジェクトでは
[Git Flow](https://nvie.com/posts/a-successful-git-branching-model/)
に基づいたブランチ戦略を採用しています。

### ブランチ構成

- `main`：本番環境用（デプロイ対象）
- `develop`：開発統合用
- `feature/xxx`：機能追加・改善
- `bugfix/xxx`：バグ修正
- `release/xxx`：リリース準備
- `hotfix/xxx`：緊急修正

### ブランチの作成例

```bash
git checkout develop
git checkout -b feature/login-form
```

---

## 環境変数について

- `NEXT_PUBLIC_ENV`: "dev" or "product"
  - "dev": 開発環境・テスト用の企画モックデータが自動で入る。basePathがGitHubPagesのdemo用に調節される。テスト環境は自動でこちらに設定される。
  - "product": 本番環境・本番用の企画データが自動で入る。テストページ（`/test`は自動的に削除される）
