# 開発者向け情報

## コーディング規約

- テンプレート文字列を使用する

    good:
    ```
    const s = `hello ${"world"}`;
    ```
    bad:
    ```
    const s = "hello" + "world";
    ```
- コンポーネントは全て関数コンポーネント
- ページコンポーネントは`*****Page`という名前
    ex: HomePage, InfoPage
- export default function ******()で統一

    ex:
    ```page.tsx
    export default function HomePage() {
        /* ... */
    }
    ```
- import文は、

    `module.scss` -> React/Next.jsのAPI -> ライブラリのコンポーネント/ヘルパー関数/フック -> 自作コンポーネント
    
    の順で

    ex:
    ```page.tsx
    // module.scss読み込み
    import "./page.module.scss";

    // reactかnextjsのapi
    import { useState, useEffect } from "react";

    // libraryの component/helper function/hook
    import { useScrollPosition } from "*****";

    // 自作component
    import { Header } from "*****";

    export default function HomePage() {
        /* ... */
    }
    ```

    (実際はコメントおよび\nは不要)

## 確認事項
- PR時
    - ビルドが通るかどうか
    - `npm runn test`
    - PAGES.mdの更新漏れがないかどうか