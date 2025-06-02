# SF25 site

SF25のサイト開発用レポジトリです。

このプロジェクトは、以下の技術スタックに基づいて構築されています：

- [Next.js 14](https://nextjs.org/)
- TypeScript
- SCSS Modules（`*.module.scss`）
- [Vitest](https://vitest.dev/)  
- js-yaml



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
├── assets/           # 静的なyamlファイル

````



##  使用技術・ライブラリ

| 種類          | ライブラリ |
|---------------|------------|
| フレームワーク | Next.js (App Router) |
| 言語           | TypeScript |
| スタイリング   | SCSS Modules (`*.module.scss`) |
| テスト         | Vitest / Testing Library |
| yamlのパース | js-yaml |



## テスト

### テスト実行

```bash
vitest run
```



## ブランチ運用ルール

### ブランチ構成

* `main`：本番環境用（デプロイ対象）
* `develop`：開発統合用
* `xxx`：作業用（マージ後削除する）



## 開発用スクリプト

| コマンド            | 説明            |
| --------------- | ------------- |
| `npm run dev`   | 開発用サーバ起動      |
| `npm run build` | 本番ビルド         |
| `vitest run`  | 単体テスト（Vitest） |
