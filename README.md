# Portfolio & Blog

## 概要

-   ポートフォリオサイトやブログサイトで利用可能
-   フロントエンドは Next.js (SSG / SSR) で構築
-   Notion API を利用してコンテンツを取得

## 使い方

### ローカル

-   .env を作成して api key を追記
-   ライブラリインストール　`yarn install`
-   ビルド　`yarn dev`
-   ホームぺ―ジ　 http://localhost:300/

### エラー対応

ビルド時に以下のエラーが出た場合

```
Unhandled Runtime Error
TypeError: io is not a function
```

node_modules/sourcebit-target-next/with-remote-data-updates.js
を編集して再度ビルドすると解消

`io(*******)` → `io.connect(*******)`
